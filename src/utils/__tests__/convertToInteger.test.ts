import { convertToInteger } from '../convertToInteger';

it('convert string to integer', () => {
  expect(convertToInteger('12')).toEqual(12);
  expect(convertToInteger('1')).toEqual(1);
  expect(convertToInteger('WoW')).toEqual(NaN);
});
