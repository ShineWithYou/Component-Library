---
title: Input | ZYT-Element
description: Input 组件的文档
---

# Input 输入框
通过鼠标或键盘输入字符

## 基础文本框

<preview path="../demo/Input/Basic.vue" title="基础文本框" description="Input 基础文本框"></preview>

## 禁用文本框

通过 **disabled** 属性指定是否禁用 input 组件


<preview path="../demo/Input/Disable.vue" title="禁用文本框" description="Input 禁用文本框"></preview>

## 尺寸
使用 size 属性改变输入框大小。 除了默认大小外，还有另外两个选项： **large**, **small**。

<preview path="../demo/Input/Size.vue" title="不同尺寸文本框" description="不同尺寸文本框"></preview>


## 复合型输入框

可以在输入框前置或后置一个元素，通常是标签或按钮。可以使用 **prepend** 和 **append** 插槽。
要在输入框中添加前后元素，可以使用 **prefix** 和 **suffix** 插槽。

<preview path="../demo/Input/Combo.vue" title="复合型输入框" description="Input 复合型输入框"></preview>

## Textarea

用于输入多行文本信息可缩放的输入框。 添加 **type="textarea"** 属性来将 input 元素转换为原生的 textarea 元素。

<preview path="../demo/Input/Textarea.vue" title="Textarea" description="Textarea"></preview>

## 密码文本框

使用 **show-password** 属性即可得到一个可切换显示隐藏的密码框

<preview path="../demo/Input/Password.vue" title="密码文本框" description="Input 密码文本框"></preview>

## 清空文本框

使用 **clearable** 属性即可得到一个可一键清空的输入框


<preview path="../demo/Input/Clear.vue" title="清空文本框" description="Input 清空文本框"></preview>


### Input Attributes

| Name                  | Description                                                                                                                            | Type                                                                                                                                                                                                                         | Default |
| --------------------- | -------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| type                  | 类型                                                                                                                          |  `'text' \| 'textarea' \| 'password' \| 'button' \| 'checkbox' \| 'file' \| 'number' \| 'radio' \| ...` [native input types](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#Form_%3Cinput%3E_types) | text    |
| model-value / v-model | 绑定值                                                                                                                          |      `number`                                                                                                                                                                                                        | —       |
| maxlength             | 同原生 maxlength 属性                                                                                                    |      `number`                                                                                                                                                                                                        | —       |
| minlength             | 原生属性，最小输入长度                                                                                                    |      `number`                                                                                                                                                                                                        | —       |                                                                                           | false   |
| placeholder           | 输入框占位文本                                                                                                                   |                                                                                                                                                                                                                      | —       |
| clearable             | 是否显示清除按钮，只有当 type 不是 textarea时生效                                                                 |   `boolean`                                                                                                                                                                                                                   | false   |
| show-password         | 是否显示切换密码图标                                                                                              |   `boolean`                                                                                                                                                                                                                   | false   |
| disabled              | 是否禁用                                                                                                              |   `boolean`                                                                                                                                                                                                                   | false   |
| size                  | 输入框尺寸，只在 type 不为 'textarea' 时有效                                                                                     |   `enum``'large' \| 'default' \| 'small'`                                                                                                                                                                                     | —       |
| prefix-icon           | 自定义前缀图标 component                                                                                                                  |      `Component`                                                                                                                                                                                                     | —       |
| suffix-icon           | 自定义后缀图标 component                                                                                                                  |      `Component`                                                                                                                                                                                                     | —       |
| name                  | 等价于原生 input name 属性 input                                                                                                         |                                                                                                                                                                                                                      | —       |
| readonly              | 原生 readonly 属性，是否只读 input                                                                                                     |   `boolean`                                                                                                                                                                                                                   | false   |
| autofocus             | 原生属性，自动获取焦点                                                                                                    |   `boolean`                                                                                                                                                                                                                   | false   |
| form                  | 原生属性                                                                                                         | `string`                                                                                                                                                                                                                     | —       |                             
