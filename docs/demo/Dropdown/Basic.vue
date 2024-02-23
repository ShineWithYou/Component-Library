<script setup>
import { h } from 'vue';
import Button from '@/components/Button/Button.vue';
import Dropdown from '@/components/Dropdown/Dropdown.vue';
const options = [
  { key: 1, label: h('b', 'item1 is bold') },
  { key: 2, label: 'item2', disabled: true },
  { key: 3, label: 'item3', divided: true },
  { key: 4, label: 'item4' },
];
</script>

<template>
  <Dropdown placement="bottom" :menu-options="options">
    <Button plain>Test plain</Button>
  </Dropdown>
</template>
