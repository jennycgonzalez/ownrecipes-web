import { isNumber } from '../utility';

test('isNumber', () => {
  expect(isNumber('1')).toBeTruthy();
  expect(isNumber('10')).toBeTruthy();
  expect(isNumber('1.0')).toBeTruthy();
  // expect(isNumber('1,0')).toBeTruthy();
  expect(isNumber('-1')).toBeTruthy();
  expect(isNumber('-1.5')).toBeTruthy();
  expect(isNumber('0')).toBeTruthy();
  expect(isNumber('0.5')).toBeTruthy();
  expect(isNumber('-0')).toBeTruthy();

  // expect(isNumber('1,500.50')).toBeTruthy();

  // expect(isNumber(' 1,500.50')).toBeTruthy();
  // expect(isNumber('1,500.50 ')).toBeTruthy();
  // expect(isNumber('   1,500.50  ')).toBeTruthy();

  expect(isNumber('.0')).toBeTruthy();
  expect(isNumber('.9')).toBeTruthy();

  expect(isNumber('0,')).toBeFalsy();
  expect(isNumber('0.')).toBeFalsy();
  expect(isNumber(',0')).toBeFalsy();

  expect(isNumber('9,')).toBeFalsy();
  expect(isNumber('9.')).toBeFalsy();
  expect(isNumber(',9')).toBeFalsy();

  expect(isNumber('9a')).toBeFalsy();
  expect(isNumber('a9')).toBeFalsy();
});
