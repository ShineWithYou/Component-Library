---
title: Collapse | ZYT-Element
description: Collapse 组件的文档
---

# Collapse 折叠面板
通过折叠面板收纳内容区域

## 基础用法
可同时展开多个面板，面板之间不影响


<preview path="../demo/Collapse/Basic.vue" title="基础用法" description="Collapse 组件的基础用法"></preview>


## 手风琴效果
每次只能展开一个面板
通过 `accordion` 属性来设置是否以手风琴模式显示


<preview path="../demo/Collapse/Accordion.vue" title="基础用法" description="Collapse 组件的手风琴效果"></preview>

### Collapse Attributes

| Name              | Description                                                             | Type                                                                            | Default |
| ----------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------- |
| model-value / v-model              | 当前活动面板                                                            | `array`                                                    | —       |
| accordion              | 是否手风琴模式	                                                             | `boolean`                | false       |

### CollapseItem Attributes

| Name              | Description                                                             | Type                                                                            | Default |
| ----------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------- |
| name              | 唯一标志符	                                                            | `string` / `number`                                                    | —       |
| title              | 面板标题		                                                             | `string`                | —       |
| disabled              | 是否禁用		                                                             | `boolean`                | false       |
