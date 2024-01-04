<template>
  <div
    class="zyt-input"
    :class="{
      [`zyt-input--${type}`]: type,
      [`zyt-input--${size}`]: size,
      'is-disabled': disabled,
      'is-prepend': $slots.prepend,
      'is-append': $slots.append,
      'is-prefix': $slots.prefix,
      'is-suffix': $slots.suffix,
      'is-focus': isFocus,
    }"
  >
    <!-- input -->
    <template v-if="type !== 'textarea'">
      <!-- prepend slot -->
      <div v-if="$slots.prepend" class="zyt-input__prepend">
        <slot name="prepend" />
      </div>
      <div class="zyt-input__wrapper">
        <!-- prefix slot -->
        <span v-if="$slots.prefix" class="zyt-input__prefix">
          <slot name="prefix" />
        </span>
        <input
          class="zyt-input__inner"
          ref="inputRef"
          v-bind="attrs"
          v-model="innerValue"
          :type="showPassword ? (passwordVisible ? 'text' : 'password') : type"
          :disabled="disabled"
          :readonly="readonly"
          :autocomplete="autocomplete"
          :placeholder="placeholder"
          :autofocus="autofocus"
          :form="form"
          @input="handleInput"
          @change="handleChange"
          @focus="handleFocus"
          @blur="handleBlur"
        />
        <!-- suffix slot -->
        <span
          v-if="$slots.suffix || showClear || showPasswordArea"
          class="zyt-input__suffix"
        >
          <slot name="suffix" />
          <Icon
            v-if="showClear"
            icon="circle-xmark"
            class="zyt-input__clear"
            @click="clear"
          />
          <Icon
            icon="eye"
            v-if="showPasswordArea && passwordVisible"
            class="zyt-input__password"
            @click="togglePasswordVisible"
          />
          <Icon
            icon="eye-slash"
            v-if="showPasswordArea && !passwordVisible"
            class="zyt-input__password"
            @click="togglePasswordVisible"
          />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="zyt-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea
        v-bind="attrs"
        ref="inputRef"
        class="zyt-textarea__wrapper"
        :disabled="disabled"
        :readonly="readonly"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :autofocus="autofocus"
        :form="form"
        @input="handleInput"
        @change="handleChange"
        @focus="handleFocus"
        @blur="handleBlur"
      />
    </template>
  </div>
</template>
<script setup lang="ts">
import { ref, watch, computed, useAttrs } from 'vue';
import type { Ref } from 'vue';
import type { InputProps, InputEmits } from './types';
import Icon from '../Icon/Icon.vue';
defineOptions({
  name: 'zytInput',
  inheritAttrs: false,
});
const props = withDefaults(defineProps<InputProps>(), {
  type: 'text',
  autocomplete: 'off',
});
const emits = defineEmits<InputEmits>();
const attrs = useAttrs();
const innerValue = ref(props.modelValue);
const isFocus = ref(false);
const passwordVisible = ref(false);
const inputRef = ref() as Ref<HTMLInputElement>;

const showClear = computed(
  () =>
    props.clearable && !props.disabled && !!innerValue.value && isFocus.value
);
const showPasswordArea = computed(
  () => props.showPassword && !props.disabled && !!innerValue.value
);
const togglePasswordVisible = () => {
  passwordVisible.value = !passwordVisible.value;
};
const handleInput = () => {
  emits('update:modelValue', innerValue.value);
  emits('input', innerValue.value);
};
const handleChange = () => {
  emits('change', innerValue.value);
};
const handleFocus = (event: FocusEvent) => {
  isFocus.value = true;
  emits('focus', event);
};
const handleBlur = (event: FocusEvent) => {
  isFocus.value = false;
  emits('blur', event);
};
const clear = () => {
  innerValue.value = '';
  emits('update:modelValue', '');
  emits('clear');
  emits('input', '');
  emits('change', '');
};
watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal;
  }
);
defineExpose({
  ref: inputRef,
});
</script>
