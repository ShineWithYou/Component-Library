import type { VNode } from "vue";
export type RenderLabelFunc = (option: SelectOption) => VNode;

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps {
  modelValue: string;
  options: SelectOption[];
  placeholder: string;
  disabled: boolean;
  clearable?: boolean;
  renderLabel?: RenderLabelFunc;
}

export interface SelectStates {
  inputValue: string;
  selectedOption: null | SelectOption;
  mouseHover: boolean;
}

export interface SelectEmits {
  (e: 'change', value: string | number): void;
  (e: 'update:modelValue', value: string | number): void;
  (e: 'visible-change', value: boolean): void;
  (e: 'clear'): void;
}
