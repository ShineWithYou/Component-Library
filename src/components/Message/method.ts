import { render, h } from "vue";
import type { CreateMessgaeProps } from "./types";
import MessageConstructer from "./Message.vue";

export const createMessgae = (props: CreateMessgaeProps) => {
  const container = document.createElement('div');
  const destroy = () => {
    render(null, container);
  }
  const newProps = {
    ...props,
    onDestory: destroy,
  }
  const vnode = h(MessageConstructer, newProps);
  render(vnode, container);
  document.body.appendChild(container.firstElementChild!);
}
