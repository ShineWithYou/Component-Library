<template>
  <div
    class="zyt-message"
    :class="{
      [`zyt-message--${type}`]: type,
      'is-close': showClose
    }"
    role="alert"
    v-show="visible"
  >
    <div class="zyt-message__content">
      <slot>
        <RenderVnode vNode="message" v-if="message"></RenderVnode>
      </slot>
    </div>
    <div class="zyt-message__close" v-if="showClose">
      <Icon @click.stop="visible = false" icon="xmark" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { MessageProps } from './types';
import RenderVnode from '../Common/RenderVnode'
import Icon from '../Icon/Icon.vue';
const props = withDefaults(defineProps<MessageProps>(), {
  type: 'info',
  duration: 3000
})
const visible = ref(false);
function startTimer() {
  if (props.duration === 0) return;
  setTimeout(() => {
    visible.value = false;
  }, props.duration)
}
onMounted(() => {
  visible.value = true;
  startTimer();
})
watch(visible, (newVal) => {
  if (!newVal) {
    props.onDestory();
  }
})
</script>

<style lang="less" scoped>
</style>