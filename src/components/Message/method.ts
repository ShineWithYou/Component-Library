import { render, h, shallowReactive } from 'vue';
import type { CreateMessgaeProps, MessageContext } from './types';
import MessageConstructer from './Message.vue';
import useZIndex from '../../hooks/useZIndex';

let seed = 1;
const instances: MessageContext[] = shallowReactive([]);

export const createMessgae = (props: CreateMessgaeProps) => {
  const { nextZIndex } = useZIndex();
  const id = `message_${seed++}`;
  const container = document.createElement('div');
  const destroy = () => {
    // 删除instances中的实例
    const idx = instances.findIndex((instance) => instance.id === id);
    if (idx === -1) return;
    instances.splice(idx, 1);
    render(null, container);
  };
  // 手动调用删除，即将组件中的visible值变成false
  const manualDestory = () => {
    const instance = instances.find((instance) => instance.id === id);
    if (instance) {
      instance.vm.exposed!.visible.value = false;
    }
  };
  const newProps = {
    ...props,
    id,
    onDestory: destroy,
    zIndex: nextZIndex(),
  };
  const vnode = h(MessageConstructer, newProps);
  render(vnode, container);
  document.body.appendChild(container.firstElementChild!);
  const vm = vnode.component!;
  const instance = {
    id,
    vnode,
    vm,
    props: newProps,
    manualDestory,
  };
  instances.push(instance);
  return instance;
};

export const getLastInstance = () => {
  return instances.at(-1);
};

export const getLastButtonOffset = (id: string) => {
  const idx = instances.findIndex((instance) => instance.id === id);
  if (idx <= 0) return 0;
  const prev = instances[idx - 1];
  return prev.vm.exposed!.bottomOffset.value;
};

export const closeAll = () => {
  instances.forEach(instance => {
    instance.manualDestory();
  })
}
