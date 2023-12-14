import { expect, test, describe, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Collapse from './Collapse.vue';
import CollapseItem from './CollapseItem.vue'
// import Icon from '../Icon/Icon.vue';

describe('Collapse Vue', () => {
  test('basic collapse', async () => {
    const onChange =vi.fn();
    const wrapper = mount(() => (
      <Collapse modelValue={['a']} onChange={onChange}>
        <CollapseItem name='a' title='title a'>
          content a
        </CollapseItem>
        <CollapseItem name='b' title='title b'>
          content b
        </CollapseItem>
        <CollapseItem name='c' title='title c' disabled>
          content c
        </CollapseItem>
      </Collapse>
      ), {
        global: {
          stubs: ['Icon']
        },
        attachTo: document.body
      })
      const headers = wrapper.findAll('.zyt-collapse-item__header');
      const contents = wrapper.findAll('.zyt-collapse-item__content');
      // length
      expect(headers.length).toBe(3);
      expect(contents.length).toBe(3);

      // text
      const firstHeader = headers[0];
      const secondHeader = headers[1];
      expect(firstHeader.text()).toBe('title a');

      // content
      const firstContent = contents[0];
      const secondContent = contents[1];
      const disableContent = contents[2];
      expect(firstContent.isVisible()).toBeTruthy();
      expect(secondContent.isVisible()).toBeFalsy();
      expect(firstContent.text()).toBe('content a');

      // event
      await firstHeader.trigger('click');
      expect(firstContent.isVisible()).toBeFalsy();
      expect(onChange).toHaveBeenCalledWith([]);
      await secondHeader.trigger('click');
      expect(secondContent.isVisible()).toBeTruthy();
      expect(onChange).toHaveBeenLastCalledWith(['b']);

      // disabled
      const disableHeader = headers[2];
      expect(disableHeader.classes()).toContain('is-disabled');
      await disableHeader.trigger('click');
      expect(disableContent.isVisible()).toBeFalsy()

  })
})
