import { Placement, Options } from '@popperjs/core';

export interface TooltipProps {
  content?: string;
  trigger?: 'hover' | 'click';
  placement?: Placement;
  manual?: boolean;
  popoerOptions?: Partial<Options>;
  transition?: string;
  openDelay?: number;
  closeDelay?: number;
  needAutoClose?: boolean;
}

export interface TooltipEmits {
  (e: 'visible-change', value: boolean): void;
  (e: 'click-outside', value: boolean) : void;
}

export interface TooltipInstance {
  show: () => void;
  hide: () => void;
}