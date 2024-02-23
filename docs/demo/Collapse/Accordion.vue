<script setup>
import { ref } from 'vue';
import Collapse from '@/components/Collapse/Collapse.vue';
import CollapseItem from '@/components/Collapse/CollapseItem.vue';
const openedVal = ref(['a']);
</script>
<template>
  <Collapse v-model="openedVal" accordion>
    <CollapseItem name="a">
      <template #title>
        <h1>zyt title</h1>
      </template>
      <h1>zyt headline title</h1>
      <div>this is aaaaaaaaa</div>
    </CollapseItem>
    <CollapseItem name="b" title="zyt title b">
      <div>this is bbbbbbbbb</div>
    </CollapseItem>
    <CollapseItem name="c" title="zyt title c" disabled>
      <div>this is ccccccccc</div>
    </CollapseItem>
  </Collapse>
</template>
