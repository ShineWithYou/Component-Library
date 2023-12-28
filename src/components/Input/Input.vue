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
        <input class="zyt-input__inner" :type="type" :disabled="disabled" />
        <!-- suffix slot -->
        <span v-if="$slots.suffix" class="zyt-input__suffix">
          <slot name="suffix" />
        </span>
      </div>
      <!-- append slot -->
      <div v-if="$slots.append" class="zyt-input__append">
        <slot name="append" />
      </div>
    </template>
    <!-- textarea -->
    <template v-else>
      <textarea class="zyt-textarea__wrapper" :disabled="disabled" />
    </template>
  </div>
</template>
<script setup lang="ts">
import type { InputProps } from './types';

defineOptions({
  name: 'zytInput',
});
withDefaults(defineProps<InputProps>(), { type: 'text' });
</script>
