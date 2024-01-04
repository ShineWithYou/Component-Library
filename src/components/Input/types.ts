export interface InputProps {
    type?: string;
    modelValue: string;
    size?: 'large' | 'small';
    clearable?: boolean;
    showPassword?: boolean;
    disabled?: boolean;
    placeholder?: string;
    readonly?: boolean;
    autocomplete?: string;
    autofocus?: boolean;
    form?: string;
}

export interface InputEmits {
    (e:'update:modelValue', value: string) : void;
    (e:'change', value: string) : void;
    (e:'input', value: string) : void;
    (e:'focus', value: FocusEvent) : void;
    (e:'blur', value: FocusEvent) : void;
    (e:'clear') : void;
}

export interface InputInstance {
    ref: HTMLInputElement | HTMLTextAreaElement;
}