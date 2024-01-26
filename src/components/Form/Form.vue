<template>
  <form class="zyt-form">
    <slot />
  </form>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import type {
  FormProps,
  FormContext,
  FormItemContext,
  FormValidateFailure,
  FormInstance,
} from './types';
import { formContextKey } from './types';
import type { ValidateFieldsError } from 'async-validator';
defineOptions({
  name: 'zytForm',
});
const props = defineProps<FormProps>();
const fields: FormItemContext[] = [];
const addField: FormContext['addField'] = (field) => {
  fields.push(field);
};
const removeField: FormContext['removeField'] = (field) => {
  if (field.prop) {
    fields.splice(fields.indexOf(field), 1);
  }
};
const resetFields = (keys: string[] = []) => {
    const filter = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields;
    filter.forEach(field => field.resetField())
}
const clearValidate = (keys: string[] = []) => {
    const filter = keys.length > 0 ? fields.filter(field => keys.includes(field.prop)) : fields;
    filter.forEach(field => field.clearValidate())
}
const validate = async () => {
  let validationErrors: ValidateFieldsError = {};
  for (const field of fields) {
    try {
      await field.validate('');
    } catch (err) {
      const error = err as FormValidateFailure;
      validationErrors = {
        ...validationErrors,
        ...error.fields,
      };
    }
  }
  if (Object.keys(validationErrors).length === 0) return true;
  return Promise.reject(validationErrors);
};
provide(formContextKey, {
  ...props,
  addField,
  removeField,
});
defineExpose<FormInstance>({
  validate,
  clearValidate,
  resetFields,
});
</script>
