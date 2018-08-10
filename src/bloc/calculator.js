export default class Calculator {
  add (a, b) {
    return +a + +b
  }

  divide (a, b) {
    if (+b === 0) return 'Cannot divide by 0'

    return +a / +b
  }

  multiply (a, b) {
    if (a === 0 || b === 0) return 0

    return +a * +b
  }

  power (a, b) {
    return Math.pow(+a, +b)
  }

  substract (a, b) {
    return +a - +b
  }
}
