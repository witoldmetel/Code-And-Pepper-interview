import { getPageCount } from '../getPageCount';

it('get proper page count', () => {
  expect(getPageCount(10)).toEqual(1);
  expect(getPageCount(101)).toEqual(11);
  expect(getPageCount(28)).toEqual(3);
});
