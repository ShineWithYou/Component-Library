import { describe, expect, test, vi } from 'vitest';
import { nextTick } from 'vue';
import { createMessgae, closeAll } from './method';

export const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null);
        await nextTick();
      });
    });
  });
};

function getTopValue(element: Element) {
    const styles = window.getComputedStyle(element);
    const topValue = styles.getPropertyValue('top');
    return Number.parseFloat(topValue);
}

describe('createMessgae', () => {
  test('create Message component function', async () => {
    const instance = createMessgae({ message: 'test message', duration: 0 });
    await rAF();
    expect(document.querySelector('.zyt-message')).toBeTruthy();
    instance.manualDestory();
    await rAF();
    expect(document.querySelector('.zyt-message')).toBeFalsy();
  });

  test('create Message component function for several times', async () => {
    createMessgae({ message: 'test2 message 01', duration: 0 })
    createMessgae({ message: 'test2 message 02', duration: 0 })
    await rAF();
    const elements = document.querySelectorAll('.zyt-message');
    expect(elements.length).toBe(2);
    closeAll();
    await rAF();
    expect(document.querySelector('.zyt-message')).toBeFalsy();
  });

  test('create Message for several times with correct offset', async () => {
    createMessgae({ message: 'test3 message 01', duration: 0, offset: 100 })
    createMessgae({ message: 'test3 message 02', duration: 0, offset: 50 })
    await rAF();
    const elements = document.querySelectorAll('.zyt-message');
    expect(elements.length).toBe(2);
    const firstElementTop = getTopValue(elements[0]);
    const secondElementTop = getTopValue(elements[1]);
    expect(firstElementTop).toBe(100);
    expect(secondElementTop).toBe(150);
  });
});
