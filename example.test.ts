import { expect, test } from 'vitest'

test('test common matcher', () => {
  const name = 'zyt';
  expect(name).toBe('zyt');
})