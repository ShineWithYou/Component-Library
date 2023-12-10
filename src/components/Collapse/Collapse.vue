<template>
  <div class="zyt-collapse">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ref, provide, watch } from 'vue'
import type { NameType, CollapseProps, CollapseEmit } from './types';
import { collapseContextKey } from './types'
defineOptions({
  name: "zytCollapse",
});
const props = defineProps<CollapseProps>(); // 属性创建
const emits = defineEmits<CollapseEmit>(); // 事件创建
const activeNames = ref<NameType[]>(props.modelValue);
watch(() => props.modelValue, () => {
  activeNames.value = props.modelValue;
});
if (props.accordion && activeNames.value.length > 1) {
  console.log('accordion mode should only have one active item');
}
const handleItemClick = (item: NameType) => {
  if (props.accordion) {
    activeNames.value = [activeNames.value[0] === item ? '' : item];
  } else {
    const index = activeNames.value.indexOf(item);
    if (index > -1) {
      // 删除数组中对应的那一项
      activeNames.value.splice(index, 1);
    } else {
      // 不存在，插入对应的name
      activeNames.value.push(item);

    }
  }
  emits('update:modelValue', activeNames.value);
  emits('change', activeNames.value)
}
provide(collapseContextKey, {
  activeNames,
  handleItemClick
})
</script>

<style lang="less" scoped></style>
