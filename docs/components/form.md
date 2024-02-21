---
title: Form | ZYT-Element
description: Form 组件的文档
---

# Form 表单

表单包含 `输入框`, `单选框`, `下拉选择`, `多选框` 等用户输入的组件。 
使用表单，您可以收集、验证和提交数据。

## 典型表单

最基础的表单包括各种输入表单项，比如input、select、radio、checkbox等。

在每一个 form 组件中，你需要一个 form-item 字段作为输入项的容器，用于获取值与验证值。

<preview path="../demo/Form/Basic.vue" title="典型表单" description="Form 典型表单"></preview>

## Form API

### Form Attributes

| Name                              | Description                                                                                                                                                                              | Type                                           | Default |
| --------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------- | ------- |
| model                             | 表单数据对象	                                                                                                                                                                  | `object Record<string, any>`                 | —       |
| rules                             | 表单验证规则	                                                                                                                                                                | `object FormRules`                           | —       |

### Form Events

| Name     | Description                             | Type                                                                         |
| -------- | --------------------------------------- | ---------------------------------------------------------------------------- |
| validate | triggers after a form item is validated | `Function 任一表单项被校验后触发` |

### Form Slots

| Name    | Description               | Subtags  |
| ------- | ------------------------- | -------- |
| default | 自定义默认内容	 | FormItem |

### Form Exposes

| Name          | Description                                                        | Type                                                                                                                              |
| ------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| validate      | 对整个表单的内容进行验证。 接收一个回调函数，或返回 `Promise` | `Function (callback?: FormValidateCallback) => Promise<void>`                                                                   |
| resetFields   | 重置该表单项，将其值重置为初始值，并移除校验结果               | `Function] (props?: Arrayable<FormItemProp> \| undefined) => void`                                                               |
| clearValidate | 清理某个字段的表单验证信息                     | `Function (props?: Arrayable<FormItemProp> \| undefined) => void`                                                               |

## FormItem API

### FormItem Attributes

| Name            | Description                                                                                                                                                            | Type                                                | Default |
| --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------- | ------- |
| prop            |model 的键名。 它可以是一个属性的值(如 a.b.0 或 [a', 'b', '0'])。 在使用了 validate、resetFields 的方法时，该属性是必填的 | `string` / `string[]`                     | —       |
| label           | 标签文本	                                                                                                                                                            | `string`                                           | —       |
| validate-status | formitem 校验的状态                                                                                                                                          |  `'init' \| 'success' \| 'error'` | —       |

#### FormItemRule

| Name    | Description                     | Type                        | Default |
| ------- | ------------------------------- | --------------------------- | ------- |
| trigger | 验证逻辑的触发方式	 | `'blur' \| 'change'` | —       |

### FormItem Exposes

| Name          | Description                                                        | Type                                                                                                                              |
| ------------- | ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| validate      | 对整个表单的内容进行验证。 接收一个回调函数，或返回 `Promise` | `Function (callback?: FormValidateCallback) => Promise<void>`                                                                   |
| resetFields   | 重置该表单项，将其值重置为初始值，并移除校验结果               | `Function (props?: Arrayable<FormItemProp> \| undefined) => void`                                                               |
| clearValidate | 清理某个字段的表单验证信息                     | `Function (props?: Arrayable<FormItemProp> \| undefined) => void`                                                               |
