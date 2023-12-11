<template>
  <i class="zyt-icon" :class="{[`zyt-icon--${type}`]: type}" :style="customStyles" v-bind="$attrs">
    <font-awesome-icon v-bind="filteredProps"/>
  </i>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { omit } from 'lodash-es'
import type { IconProps } from './types'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import "@fortawesome/fontawesome-svg-core/styles.css"
defineOptions({
  name: 'zytIcon',
  inheritAttrs: false, // 禁止透传到根组件
});
const props = defineProps<IconProps>();
const filteredProps = computed(() => omit(props, ['type', 'color']));
const customStyles = computed(() => {
  return props.color ? {color: props.color} : {};
})
</script>

<style lang="less" scoped>

</style>