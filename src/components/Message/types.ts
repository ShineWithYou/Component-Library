import type { VNode, ComponentInternalInstance } from 'vue';

export interface MessageProps {
  onDestory: () => void;
  message?: string | VNode;
  duration?: number;
  showClose?: boolean;
  type?: 'success' | 'info' | 'warning' | 'error';
  id: string;
  offset?: number;
  zIndex: number;
  transitionName?: string;
}

export interface MessageContext {
  id: string;
  vnode: VNode;
  vm: ComponentInternalInstance;
  props: MessageProps;
  manualDestory: () => void;
}

export type CreateMessgaeProps = Omit<MessageProps, 'onDestory' | 'id' | 'zIndex'>