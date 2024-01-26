---
title: Button | ZYT-Element
description: Button 组件的文档
---

# Button 按钮
常用的操作按钮。

## 基础用法
使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。


<preview path="../demo/Button/Basic.vue" title="基础用法" description="Button 组件的基础用法"></preview>

### Button Attributes

| Name              | Description                                                             | Type                                                                            | Default |
| ----------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------------------- | ------- |
| size              | 尺寸                                                             | `enum` - `'large'\| 'small'`                                                    | —       |
| type              | 类型                                                             | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'`                | —       |
| plain             | 是否为朴素按钮                                   | `boolean`                                                                       | false   |
| round             | 是否为圆角按钮                                   | `boolean`                                                                       | false   |
| circle            | 是否为圆形按钮                                  | `boolean`                                                                       | false   |
| loading           | 是否为加载中状态                                          | `boolean`                                                                       | false   |
| disabled          | 按钮是否为禁用状态                                                      | `boolean`                                                                       | false   |
| icon              | 图标组件                                                          | `string`                                                                        | —       |
| autofocus         | 原生 `autofocus` 属性                                     | `boolean`                                                                       | false   |
| native-type       | 原生 `type` 属性                                          | `enum` - `'button'\| 'submit'\| 'reset'`                                        | button  |
