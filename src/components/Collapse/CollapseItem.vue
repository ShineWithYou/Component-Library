<template>
  <div
    class="zyt-collapse-item"
    :class="{
      'is-disabled': disabled,
    }"
  ></div>
  <div
    class="zyt-collapse-item__header"
    :class="{
      'is-disabled': disabled,
      'is-active': isActive,
    }"
    :id="`item-header-${name}`"
    @click="handleClick"
  >
    <slot name="title">{{ title }}</slot>
    <Icon icon="angle-right" class="header-angle" />
  </div>
  <Transition name="slide" v-on="transitionEvents">
    <div class="zyt-collapse-item__wrapper" v-show="isActive">
      <div
        class="zyt-collapse-item__content"
        :id="`item-content-${name}`"
        
      >
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { inject, computed } from "vue";
import { collapseContextKey } from "./types";
import type { CollapseItemProps } from "./types";
import Icon from '../Icon/Icon.vue'
defineOptions({
  name: "zytCollapseItem",
});
const props = defineProps<CollapseItemProps>();
const collapseContext = inject(collapseContextKey);
const isActive = computed(() =>
  collapseContext?.activeNames.value.includes(props.name)
);
const handleClick = () => {
  if (props.disabled) {
    return;
  }
  collapseContext?.handleItemClick(props.name);
};
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const transitionEvents: Record<string, (el: HTMLElement) => void> = {
  beforeEnter(el) {
    el.style.height = '0px';
    el.style.overflow = 'hidden';
  },
  enter(el) {
    el.style.height = `${el.scrollHeight}px`;
  },
  afterEnter(el) {
    el.style.height = '';
    el.style.overflow = '';
  },
  beforeLeave(el) {
    el.style.height = `${el.scrollHeight}px`;
    el.style.overflow = 'hidden';
  },
  leave(el) {
    el.style.height = '0px';
  },
  afterLeave(el) {
    el.style.height = '';
    el.style.overflow = '';
  },
}
</script>

<style lang="less" scoped></style>
