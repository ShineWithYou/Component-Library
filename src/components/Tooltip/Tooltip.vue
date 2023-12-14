<template>
  <div class="zyt-tooltip" v-on="outerEvents" ref="tooltipNode">
    <div
      class="zyt-tooltip__trigger"
      ref="triggerNode"
      v-on="events">
      <slot />
    </div>
    <Transition :name="transition">
      <div
        v-if="isOpen"
        class="zyt-tooltip__popper"
        ref="popperNode">
        <slot name="content">
          {{ content }}
        </slot>
        <div id="arrow" data-popper-arrow></div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, reactive, onUnmounted, computed } from "vue";
import { debounce } from 'lodash-es';
import type { TooltipProps, TooltipEmits, TooltipInstance } from "./types";
import type { Instance } from '@popperjs/core'
import { createPopper } from '@popperjs/core'
import clickOutside from '../../hooks/clickOutside';
const props = withDefaults(defineProps<TooltipProps>(), {
  placement: 'bottom',
  trigger: 'hover',
  transition: 'fade',
  openDelay: 0,
  closeDelay: 0
});
const emits = defineEmits<TooltipEmits>();
const isOpen = ref(false);
const popperNode = ref<HTMLElement>();
const triggerNode = ref<HTMLElement>();
const tooltipNode = ref<HTMLElement>();
let popperInstance: Instance | null = null;
let events: Record<string, any> = reactive({});
let outerEvents: Record<string, any> = reactive({});
const popperOptions = computed(() => {
  return {
    placement: props.placement,
    modifiers: [{
      name: 'offset',
      options: {
        offset: [0, 9]
      }
    }],
    ...props.popoerOptions
  }
})
const open = () => {
  isOpen.value = true;
  emits('visible-change', true);
}
const close = () => {
  isOpen.value = false;
  emits('visible-change', false);
}
const openDebounce = debounce(open, props.openDelay);
const closeDebounce = debounce(open, props.closeDelay);

const finalOpenDebounce = () => {
  closeDebounce.cancel();
  openDebounce();
}
const finalCloseDebounce = () => {
  openDebounce.cancel();
  closeDebounce();
}
const changePopper = () => {
  if (isOpen.value) {
    finalCloseDebounce();
  } else {
    finalOpenDebounce();
  }
}
const attachEvent = () => {
  debugger;
  if (props.trigger === 'hover') {
    events['mouseenter'] = finalOpenDebounce;
    outerEvents['mouseleave'] = finalCloseDebounce;
  } else {
    events['click'] = changePopper;
  }
}
attachEvent();
clickOutside(tooltipNode, () => {
  if (props.trigger === 'click' && isOpen.value && !props.manual) {
    finalCloseDebounce();
  }
})
if (!props.manual) {
  attachEvent();
}
watch(() => props.manual, (isManual) => {
  if (isManual) {
    events = {};
    outerEvents = {};
  } else {
    attachEvent();
  }
})
watch(() => props.trigger, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    events = {};
    outerEvents = {};
    attachEvent();
  }
})
watch(isOpen, (newVal) => {
  if (newVal) {
    if (popperNode.value && triggerNode.value) {
      popperInstance = createPopper(triggerNode.value, popperNode.value, popperOptions.value);
    } else {
      popperInstance?.destroy();
    }
  }
}, { flush: 'post' })

defineExpose<TooltipInstance>({
  'show': open,
  'hide': close
})

onUnmounted(() => {
  popperInstance?.destroy();
})
</script>

