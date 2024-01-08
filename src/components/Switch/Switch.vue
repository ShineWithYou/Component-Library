<template>
  <div
    class="zyt-switch"
    :class="{
      [`zyt-switch--${size}`]: size,
      'is-disabled': disabled,
      'is-checked': checked,
    }"
    @click="switchValue"
  >
    <input
      class="zyt-switch__input"
      type="checkbox"
      role="switch"
      ref="input"
      :name="name"
      :disabled="disabled"
      @keydown.enter="switchValue"
    />
    <div class="zyt-switch__core">
      <div class="zyt-switch__core-inner">
        <span v-if="activeText || inactiveText" class="zyt-switch__core-inner-text">
          {{checked ? activeText : inactiveText}}
        </span>
      </div>
      <div class="zyt-switch__core-action"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import type { SwitchProps, SwitchEmits } from './types';
defineOptions({
  name: 'zytSwitch',
  inheritAttrs: false,
});
const props = withDefaults(defineProps<SwitchProps>(), {
  activeValue: true,
  inactiveValue: false
})
const emits = defineEmits<SwitchEmits>();
const input = ref<HTMLInputElement>();
const innerValue = ref(props.modelValue);
const checked = computed(() => innerValue.value === props.activeValue);
const switchValue = () => {
  if (props.disabled) return;
  const newValue = checked.value ? props.inactiveValue : props.activeValue;
  innerValue.value = newValue;
  emits('update:modelValue', newValue);
  emits('change', newValue);
};
onMounted(() => {
  input.value!.checked = checked.value;
});
watch(checked, (val) => {
  input.value!.checked = val;
});
watch(
  () => props.modelValue,
  (newVal) => {
    innerValue.value = newVal;
  }
);
</script>
