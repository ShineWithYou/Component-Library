import type { App } from 'vue';
import Form from './Form.vue';
import FormItem from './FormItem.vue';

Form.install = (app: App) => {
  app.component(Form.name || 'zytForm', Form);
};
FormItem.install = (app: App) => {
  app.component(FormItem.name || 'zytFormItem', Form);
};

export default Form;

export { FormItem };

export * from './types';
