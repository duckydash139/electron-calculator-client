import Calculator from './calculator'

const cal = new Calculator()

test('add numbers', () => {
  expect(cal.add(1, 2)).toBe(3)
  expect(cal.add(-5, 3)).toBe(-2)
  expect(cal.add(0, 2)).toBe(2)
  expect(cal.add(2, 0)).toBe(2)
})

test('substract numbers', () => {
  expect(cal.substract(42, 7)).toBe(35)
  expect(cal.substract(-7, -12)).toBe(5)
})

test('multiply numbers', () => {
  expect(cal.multiply(2, 10)).toBe(20)
  expect(cal.multiply(7, 0)).toBe(0)
  expect(cal.multiply(0, 7)).toBe(0)
})

test('divide numbers', () => {
  expect(cal.divide(3, 2)).toBe(1.5)
  expect(cal.divide(3, 0)).toEqual('Cannot divide by 0')
})

test('power numbers', () => {
  expect(cal.power(3, 2)).toBe(9)
})
