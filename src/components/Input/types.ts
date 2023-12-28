export interface InputProps {
    type: string;
    size?: 'large' | 'small';
    clearable?: boolean;
    showPassword?: boolean;
    disabled?: boolean;
}

export interface InputEmits {
    (e:'change', value: string) : void;
    (e:'input', value: string) : void;
    (e:'focus') : void;
    (e:'blur') : void;
    (e:'clear') : void;
}

export interface InputInstance {
    ref: HTMLInputElement | HTMLTextAreaElement;
}