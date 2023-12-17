import { describe, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import Tooltip from './Tooltip.vue';

vi.mock('@popperjs/core');

describe('Tooltip.vue', async () => {
	beforeEach(() => {
		vi.useFakeTimers();
	})
  const wrapper = mount(
    () => (
      <Tooltip
        content="hellow zyt"
        trigger="click"
      >
        <button id="trigger">Trigger</button>
      </Tooltip>
    ),
    {
      attachTo: document.body,
    }
  );
	// 静态测试
	const triggerArea = wrapper.find('#trigger');
	expect(triggerArea.exists()).toBeTruthy();
	expect(wrapper.find('.zyt-tooltip__popper').exists()).toBeFalsy();
	// 点击操作测试
	triggerArea.trigger('click');
	await vi.runAllTimers();
	expect(wrapper.find('.zyt-tooltip__popper').exists()).toBeTruthy();
	expect(wrapper.find('.zyt-tooltip__popper').text()).toBe('hello zyt');
	// 第二次点击
	triggerArea.trigger('click');
	await vi.runAllTimers();
	expect(wrapper.find('.zyt-tooltip__popper').exists()).toBeFalsy();
	
});
