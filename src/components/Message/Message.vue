<template>
  <Transition
    :name="transitionName"
    @enter="updateHeight"
    @after-leave="destoryComponent"
  >
    <div
      ref="messageRef"
      class="zyt-message"
      :class="{
        [`zyt-message--${type}`]: type,
        'is-close': showClose,
      }"
      :style="cssStyle"
      role="alert"
      v-show="visible"
      @mouseenter="clearTimer"
      @mouseleave="startTimer"
    >
      <div class="zyt-message__content">
        <slot>
          <RenderVnode :vNode="message" v-if="message"></RenderVnode>
        </slot>
      </div>
      <div class="zyt-message__close" v-if="showClose">
        <Icon @click.stop="visible = false" icon="xmark" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import type { MessageProps } from './types';
import RenderVnode from '../Common/RenderVnode';
import Icon from '../Icon/Icon.vue';
import { getLastButtonOffset } from './method';
import useEventListener from '../../hooks/useEventListener';

const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000,
  offset: 20,
  transitionName: 'fade-up',
});
const visible = ref(false);
const messageRef = ref<HTMLDivElement>();

// 计算偏移高度
// 计算当前div的高度
const height = ref(0);
// 获取上一个实例的button坐标数字，第一个是0
const lastOffset = computed(() => getLastButtonOffset(props.id));
// 计算当前实例的top
const topOffset = computed(() => props.offset + lastOffset.value);
// 为下一个实例预留offset，记录当前实例的bottomOffset的值
const bottomOffset = computed(() => height.value + topOffset.value);
const cssStyle = computed(() => ({
  top: topOffset.value + 'px',
  zIndex: props.zIndex,
}));
let timer: any;
function startTimer() {
  if (props.duration === 0) return;
  timer = setTimeout(() => {
    visible.value = false;
  }, props.duration);
}
function clearTimer() {
  clearTimeout(timer);
}
onMounted(() => {
  visible.value = true;
  startTimer();
});
function keydown(e: Event) {
  const event = e as KeyboardEvent;
  if (event.code === 'Escape') {
    visible.value = false;
  }
}
useEventListener(document, 'keydown', keydown);
function destoryComponent() {
  props.onDestory();
}
function updateHeight() {
  height.value = messageRef.value!.getBoundingClientRect().height;
}
defineExpose({
  bottomOffset,
  visible,
});
</script>

<style lang="less" scoped></style>
