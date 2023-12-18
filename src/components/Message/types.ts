import type { VNode } from 'vue';

export interface MessageProps {
  onDestory: () => void;
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  type?: 'success' | 'info' | 'warning' | 'error';
}

export type CreateMessgaeProps = Omit<MessageProps, 'onDestory'>