<template>
  <div
    class="zyt-form-item"
    :class="{
      'is-error': validateStatus.state === 'error',
      'is-success': validateStatus.state === 'success',
      'is-loading': validateStatus.loading,
    }"
  >
    <label class="zyt-form-item__label">
      <slot name="label" :label="label">
        {{ label }}
      </slot>
    </label>
    <div class="zyt-form-item__content">
      <slot :validate="validate" />
      <div
        class="zyt-form-item__error-msg"
        v-if="validateStatus.state === 'error'"
      >
        {{ validateStatus.errorMsg }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { isNil } from 'lodash';
import Schema from 'async-validator';
import {
  provide,
  inject,
  computed,
  reactive,
  onMounted,
  onUnmounted,
} from 'vue';
import { formContextKey, formItemContextKey } from './types';
import type {
  FormItemProps,
  FormValidateFailure,
  FormItemContext,
  ValidateStatusProp,
  FormItemInstance,
} from './types';
defineOptions({
  name: 'zytFormItem',
});
const props = defineProps<FormItemProps>();

const formContext = inject(formContextKey);
const validateStatus: ValidateStatusProp = reactive({
  state: 'init',
  errorMsg: '',
  loading: false,
});
let initialValue: any = null;
const innerValue = computed(() => {
  const model = formContext?.model;
  if (model && props.prop && !isNil(model[props.prop])) {
    return model[props.prop];
  }
  return null;
});
const itemRules = computed(() => {
  const rules = formContext?.rules;
  if (rules && props.prop && rules[props.prop]) {
    return rules[props.prop];
  }
  return [];
});
const getTriggeredRules = (trigger?: string) => {
  const rules = itemRules.value;
  if (rules) {
    return rules.filter((rule) => {
      if (!rule.trigger || !trigger) return true;
      return rule.trigger && rule.trigger === trigger;
    });
  } else {
    return [];
  }
};
const validate = async (trigger?: string) => {
  const modelName = props.prop;
  const triggeredRules = getTriggeredRules(trigger);
  if (triggeredRules.length === 0) {
    return true;
  }
  if (modelName) {
    const validator = new Schema({
      [modelName]: triggeredRules,
    });
    validateStatus.loading = true;
    return validator
      .validate({ [modelName]: innerValue.value })
      .then(() => {
        validateStatus.state = 'success';
        console.log('no error');
      })
      .catch((err: FormValidateFailure) => {
        const { errors } = err;
        validateStatus.state = 'error';
        validateStatus.errorMsg =
          errors && errors.length > 0 ? errors[0].message || '' : '';
        return Promise.reject(err);
      })
      .finally(() => {
        validateStatus.loading = false;
      });
  }
};
const clearValidate = () => {
  validateStatus.state = 'init';
  validateStatus.loading = false;
  validateStatus.errorMsg = '';
};
const resetField = () => {
  clearValidate();
  const model = formContext?.model;
  if (model && props.prop && isNil(model[props.prop])) {
    model[props.prop] = initialValue;
  }
};
const context: FormItemContext = {
  prop: props.prop || '',
  validate,
  clearValidate,
  resetField,
};
provide(formItemContextKey, context);

onMounted(() => {
  if (props.prop) {
    formContext?.addField(context);
    initialValue = innerValue.value;
  }
});
onUnmounted(() => {
  formContext?.removeField(context);
});

defineExpose<FormItemInstance>({
  validateStatus,
  validate,
  resetField,
  clearValidate,
});
</script>
