import type { VNode } from "vue";
export type RenderLabelFunc = (option: SelectOption) => VNode;
export type CustomFilterFunc = (value: string) => SelectOption[];
export type CustomFilterRemoteFunc = (value: string) => SelectOption[];

export interface SelectOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface SelectProps {
  modelValue: string;
  options?: SelectOption[];
  placeholder: string;
  disabled: boolean;
  clearable?: boolean;
  renderLabel?: RenderLabelFunc;
  filterable?: boolean;
  filterMethod?: CustomFilterFunc;
  remote?: boolean;
  remoteMethod?: CustomFilterRemoteFunc;
  multiple?: boolean;
}

export interface SelectStates {
  inputValue: string;
  selectedOption: null | SelectOption;
  mouseHover: boolean;
  loading: boolean;
  highlightIndex: number;
}

export interface SelectEmits {
  (e: 'change', value: string | number): void;
  (e: 'update:modelValue', value: string | number): void;
  (e: 'visible-change', value: boolean): void;
  (e: 'clear'): void;
}
