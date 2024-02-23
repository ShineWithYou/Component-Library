---
title: Dropdown | ZYT-Element
description: Dropdown 组件的文档
---

# Dropdown 下拉菜单
将动作或菜单折叠到下拉菜单中。

## 基础用法
悬停在下拉菜单上以展开更多操作。
通过组件 `slot` 来设置下拉触发的元素以及需要通过具名 `slot` 为 `dropdown` 来设置下拉菜单。 默认情况下，只需要悬停在触发菜单的元素上即可，无需点击也会显示下拉菜单。

<preview path="../demo/Dropdown/Basic.vue" title="基础用法" description="Dropdown 组件的基础用法"></preview>

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
