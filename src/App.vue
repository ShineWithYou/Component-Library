<script setup lang="ts">
import { ref, onMounted, h } from "vue";
import Button from "./components/Button/Button.vue";
import type { ButtonInstance } from "./components/Button/types";
import Collapse from "./components/Collapse/Collapse.vue";
import CollapseItem from "./components/Collapse/CollapseItem.vue";
import Icon from "./components/Icon/Icon.vue";
import Tooltip from "./components/Tooltip/Tooltip.vue";
import Dropdown from "./components/Dropdown/Dropdown.vue";
import Switch from "./components/Switch/Switch.vue";
import type { MenuOption } from "./components/Dropdown/types";
import { createMessgae } from "./components/Message/method";
const buttonRef = ref<ButtonInstance | null>(null);
const openedVal = ref(["a"]);
const switchVal = ref(false);
const options: MenuOption[] = [
  { key: 1, label: h("b", "item1 is bold") },
  { key: 2, label: "item2", disabled: true },
  { key: 3, label: "item3", divided: true },
  { key: 4, label: "item4" },
];
onMounted(() => {
  createMessgae({ message: "zyt message 111111", duration: 0, type: 'info', showClose: true });
  createMessgae({ message: "zyt message 222222", duration: 0, type: 'success' });
  createMessgae({ message: "zyt message 333333", duration: 0, type: 'warning' });
  createMessgae({ message: "zyt message 444444", duration: 0, type: 'error' });
  if (buttonRef.value) {
    console.log("buttonRef", buttonRef.value.ref);
  }
});
</script>

<template>
  <div>
    <Tooltip content="hello zyt" trigger="click">
      <Button ref="buttonRef">Test</Button>
    </Tooltip>
    <br />
    <br />
    <Dropdown placement="bottom" trigger="click" :menu-options="options">
      <Button plain>Test plain</Button>
    </Dropdown>
    <Button circle>Test circle</Button>
    <Button round disabled>Test</Button>
    <br />
    <br />
    <Button type="primary">Primary</Button>
    <Button type="success">Success</Button>
    <Button type="info">Info</Button>
    <Button type="warning">Warning</Button>
    <Button type="danger">Danger</Button>
    <br />
    <br />
    <Button type="primary" plain>Primary</Button>
    <Button type="success" plain>Success</Button>
    <Button type="info" plain>Info</Button>
    <Button type="warning" plain>Warning</Button>
    <Button type="danger" plain>Danger</Button>
    <br />
    <br />
    <Button plain size="large">Large</Button>
    <Button plain size="small">Small</Button>
    <br />
    <br />
    <Button type="primary" plain size="large" loading>loading...</Button>
    <Button type="primary" plain size="large" icon="arrow-up">icon</Button>
    <br />
    <br />
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
    <Icon icon="user-secret" size="2xl" spin type="danger" />
    <br />
    <br />
    <Switch :model-value="switchVal" active-text="111" inactive-text="222"></Switch>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
