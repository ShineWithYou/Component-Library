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
      :need-auto-close="false"
      ref="tooltipRef"
    >
      <Input
        v-model="states.inputValue"
        :disabled="disabled"
        :placeholder="filteredPlaceholder"
        :readonly="!filterable || !isDropdownShow"
        @input="debounceOnFilter"
        @keydown="handleKeydown"
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
        <div class="zyt-select__loading" v-if="states.loading">
          <Icon icon="spinner" spin />
        </div>
        <div
          class="zyt-select__nodata"
          v-else-if="filterable && filteredOptions.length === 0"
        >
          No Data
        </div>
        <ul v-else class="zyt-select__menu">
          <template v-for="(item, index) in filteredOptions" :key="index">
            <li
              class="zyt-select__menu-item"
              :class="{
                'is-disabled': item.disabled,
                'is-selected': states.selectedOption?.value === item.value,
                'is-highlighted': states.highlightIndex === index,
              }"
              :id="`select-item-${item.value}`"
              @click.stop="itemSelect(item)"
            >
              <RenderVNode
                :v-node="renderLabel ? renderLabel(item) : item.label"
              ></RenderVNode>
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
import { isFunction, debounce } from 'lodash-es';
import { ref, reactive, computed, watch } from 'vue';
import type { Ref } from 'vue';
import type {
  SelectProps,
  SelectEmits,
  SelectOption,
  SelectStates,
} from './types';
import Input from '../Input/Input.vue';
import Tooltip from '../Tooltip/Tooltip.vue';
import Icon from '../Icon/Icon.vue';
import type { TooltipInstance } from '../Tooltip/types';
import type { InputInstance } from '../Input/types';
import RenderVNode from '../Common/RenderVnode';
defineOptions({
  name: 'zytSelect',
});
const findOption = (value: string) => {
  const option = props.options.find((option) => option.value === value);
  return option ? option : null;
};
const props = withDefaults(defineProps<SelectProps>(), {
  options: () => [],
});
const emits = defineEmits<SelectEmits>();
const timeout = computed(() => (props.remote ? 300 : 0));
let initialOption = findOption(props.modelValue);
const states = reactive<SelectStates>({
  inputValue: initialOption ? initialOption.label : '',
  selectedOption: initialOption,
  mouseHover: false,
  loading: false,
  highlightIndex: -1,
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
const filteredOptions = ref(props.options);
watch(
  () => props.options,
  (newOptions) => {
    filteredOptions.value = newOptions;
  }
);
watch(
  () => props.modelValue,
  (newVal) => {
    initialOption = findOption(newVal);
  }
);
const generateFilterOptions = async (searchValue: string) => {
  if (!props.filterable) return;
  if (props.filterMethod && isFunction(props.filterMethod)) {
    filteredOptions.value = props.filterMethod(searchValue);
  } else if (
    props.remote &&
    props.remoteMethod &&
    isFunction(props.remoteMethod)
  ) {
    states.loading = true;
    try {
      filteredOptions.value = await props.remoteMethod(searchValue);
    } catch (e) {
      console.error(e);
    } finally {
      states.loading = false;
    }
  } else {
    filteredOptions.value = props.options.filter((option) =>
      option.label.includes(searchValue)
    );
  }
  states.highlightIndex = -1;
};
const onFilter = () => {
  generateFilterOptions(states.inputValue);
};
const debounceOnFilter = debounce(() => {
  onFilter();
}, timeout.value);
const isDropdownShow = ref(false);
const filteredPlaceholder = computed(() => {
  // filter 并且 之前选择过对应的值 并且 展开菜单  ----- 显示之前选的值
  return props.filterable && states.selectedOption && isDropdownShow
    ? states.selectedOption.label
    : props.placeholder;
});
const controlDropdown = (show: boolean) => {
  if (show) {
    // filter 并且 之前选择过对应的值  ----- 清空
    if (props.filterable && states.selectedOption) {
      states.inputValue = '';
    }
    // 进行一次默认选项的生成
    if (props.filterable) {
      generateFilterOptions(states.inputValue);
    }
    tooltipRef.value.show();
  } else {
    tooltipRef.value.hide();
    // blur 将之前选择的值回灌到 input
    if (props.filterable) {
      states.inputValue = states.selectedOption
        ? states.selectedOption.label
        : '';
    }
    states.highlightIndex = -1;
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
const handleKeydown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'Enter':
      if (!isDropdownShow.value) {
        controlDropdown(true);
      } else {
        if (
          states.highlightIndex > -1 &&
          filteredOptions.value[states.highlightIndex]
        ) {
          itemSelect(filteredOptions.value[states.highlightIndex]);
        } else {
          controlDropdown(false);
        }
      }
      break;
    case 'Escape':
      if (isDropdownShow.value) {
        controlDropdown(false);
      }
      break;
    case 'ArrowUp':
      e.preventDefault();
      if (filteredOptions.value.length > 0) {
        if (states.highlightIndex <= 0) {
          states.highlightIndex = filteredOptions.value.length - 1;
        } else {
          states.highlightIndex--;
        }
      }
      break;
    case 'ArrowDown':
      e.preventDefault();
      if (filteredOptions.value.length > 0) {
        if (
          states.highlightIndex === -1 ||
          states.highlightIndex === filteredOptions.value.length - 1
        ) {
          states.highlightIndex = 0;
        } else {
          states.highlightIndex++;
        }
      }
      break;
    default:
      break;
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
