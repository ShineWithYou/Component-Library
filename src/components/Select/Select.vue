<template>
  <div
    class="zyt-select"
    :class="{
      'is-disabled': disabled,
    }"
    @click="toogleDropdown"
    @mouseenter="states.mouseHover = true"
    @mouseleave="states.mouseHover = false"
  >
    <Tooltip
      placement="bottom-start"
      :popoer-options="popperOptions"
      manual
      @click-outside="controlDropdown(false)"
      ref="tooltipRef"
    >
      <Input
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="placeholder"
        readonly
        ref="inputRef"
      >
        <template #suffix>
          <Icon
            v-if="showClearIcon"
            icon="circle-xmark"
            class="zyt_input__clear"
            @mousedown.prevent="NOOP"
            @click.stop="onClear"
          />
          <Icon
            v-else
            icon="angle-down"
            class="header-angle"
            :class="{ 'is-active': isDropdownShow }"
          />
        </template>
      </Input>
      <template #content>
        <ul class="zyt-select__menu">
          <template v-for="(item, index) in options" :key="index">
            <li
              class="zyt-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVNode :v-node="renderLabel ? renderLabel(item) : item.label"></RenderVNode>
              <span v-if="states.selectedOption?.value === item.value">
                Selected!
              </span>
            </li>
          </template>
        </ul>
      </template>
    </Tooltip>
  </div>
</template>
<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import type { Ref } from 'vue';
import type {
  SelectProps,
  SelectEmits,
  SelectOption,
  SelectStates,
} from './types';
import Input from '../input/Input.vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import Icon from '../Icon/Icon.vue';
import type { TooltipInstance } from '../Tooltip/types';
import type { InputInstance } from '../input/types';
import RenderVNode from '../Common/RenderVnode';
defineOptions({
  name: 'zytSelect',
});
const findOption = (value: string) => {
  const option = props.options.find((option) => option.value === value);
  return option ? option : null;
};
const props = defineProps<SelectProps>();
const emits = defineEmits<SelectEmits>();
const initialOption = findOption(props.modelValue);
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption,
  mouseHover: false,
});
const tooltipRef = ref() as Ref<TooltipInstance>;
const inputRef = ref() as Ref<InputInstance>;
const popperOptions: any = {
  modifiers: [
    {
      name: 'offset',
      options: {
        offset: [0, 9],
      },
    },
    {
      name: 'sameWidth',
      enabled: true,
      fn: ({ state }: { state: any }) => {
        state.styles.popper.width = `${state.rects.reference.width}px`;
      },
      phase: 'beforeWrite',
      requires: ['computeStyles'],
    },
  ],
};
const isDropdownShow = ref(false);
const controlDropdown = (show: boolean) => {
  if (show) {
    tooltipRef.value.show();
  } else {
    tooltipRef.value.hide();
  }
  isDropdownShow.value = show;
  emits('visible-change', show);
};
const toogleDropdown = () => {
  if (props.disabled) return;
  if (isDropdownShow.value) {
    controlDropdown(false);
  } else {
    controlDropdown(true);
  }
};
const showClearIcon = computed(() => {
  return (
    props.clearable &&
    states.mouseHover &&
    states.selectedOption &&
    states.inputValue.trim() !== ''
  );
});
const onClear = () => {
  states.inputValue = '';
  states.selectedOption = null;
  emits('clear');
  emits('change', '');
  emits('update:modelValue', '');
};
const NOOP = () => {};
const itemSelect = (e: SelectOption) => {
  if (e.disabled) return;
  states.inputValue = e.label;
  states.selectedOption = e;
  emits('change', e.value);
  emits('update:modelValue', e.value);
  controlDropdown(false);
  inputRef.value.ref.focus();
};
</script>
