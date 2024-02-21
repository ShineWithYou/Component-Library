import type { App } from 'vue';

import Button from './components/Button';
import Collapse, { CollapseItem } from './components/Collapse';
import Dropdown from './components/Dropdown';
import Form, { FormItem } from './components/Form';
import Icon from './components/Icon';
import Input from './components/Input';
import Message, {
  createMessgae,
  closeAll as closeMessageAll,
} from './components/Message';
import Select from './components/Select';
import Switch from './components/Switch';
import Tooltip from './components/Tooltip';

const components = [
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Form,
  FormItem,
  Icon,
  Input,
  Message,
  Select,
  Switch,
  Tooltip,
];

const install = (app: App) => {
  components.forEach((component) => {
    app.component(component.name!, component);
  });
};

export {
  install,
  Button,
  Collapse,
  CollapseItem,
  Dropdown,
  Form,
  FormItem,
  Icon,
  Input,
  Message,
  Select,
  Switch,
  Tooltip,
  createMessgae,
  closeMessageAll,
};

export default {
  install,
};
