import { describe, test, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Tooltip from './Tooltip.vue';

vi.mock('@popperjs/core')
const onVisibleChange = vi.fn();
describe('Tooltip.vue', async () => {
  const wrapper = mount(
    () => (
      <Tooltip
        content="hellow zyt"
        trigger="click"
        onVisibleChange={onVisibleChange}
      >
        <button id="trigger">Trigger</button>
      </Tooltip>
    ),
    {
      attachTo: document.body,
    }
  );
	// 静态测试
	const triggerArea = wrapper.find('#trigger')
});
