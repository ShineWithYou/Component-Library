<template>
  <button
    ref="buttonRef"
    class="zyt-button"
    :class="{
      [`zyt-button--${type}`]: type,
      [`zyt-button--${size}`]: size,
      'is-plain': plain,
      'is-round': round,
      'is-circle': circle,
      'is-disabled': disabled,
    }"
    :disabled="disabled"
    :autofocus="autofocus"
    :type="nativeType"
  >
    <span>
      <slot />
    </span>
  </button>
</template>

<script setup lang="ts">
import { ref } from "vue";
import type { ButtonProps } from "./types";
defineOptions({
  name: "zytButton",
});
withDefaults(defineProps<ButtonProps>(), {
  nativeType: "button",
});
const buttonRef = ref<HTMLButtonElement>();

defineExpose({
  ref: buttonRef,
});
</script>

<style>
@import url(./style.css);
</style>
