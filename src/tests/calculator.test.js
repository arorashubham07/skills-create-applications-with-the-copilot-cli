const { add, subtract, multiply, divide, modulo, power, squareRoot, calculate } = require('../calculator');

describe('calculator', () => {
  describe('add', () => {
    test('2 + 3 = 5 (from example image)', () => {
      expect(add(2, 3)).toBe(5);
    });

    test('adds two positive numbers', () => {
      expect(add(10, 20)).toBe(30);
    });

    test('adds negative numbers', () => {
      expect(add(-5, -7)).toBe(-12);
    });

    test('adds a positive and a negative number', () => {
      expect(add(-5, 10)).toBe(5);
    });

    test('adds with zero', () => {
      expect(add(0, 8)).toBe(8);
    });

    test('adds decimal numbers', () => {
      expect(add(1.5, 2.25)).toBeCloseTo(3.75);
    });
  });

  describe('subtract', () => {
    test('10 - 4 = 6 (from example image)', () => {
      expect(subtract(10, 4)).toBe(6);
    });

    test('subtracts two positive numbers', () => {
      expect(subtract(20, 8)).toBe(12);
    });

    test('subtracting a larger number yields a negative result', () => {
      expect(subtract(4, 10)).toBe(-6);
    });

    test('subtracts negative numbers', () => {
      expect(subtract(-5, -3)).toBe(-2);
    });

    test('subtracts with zero', () => {
      expect(subtract(5, 0)).toBe(5);
    });

    test('subtracts decimal numbers', () => {
      expect(subtract(5.5, 2.2)).toBeCloseTo(3.3);
    });
  });

  describe('multiply', () => {
    test('45 * 2 = 90 (from example image)', () => {
      expect(multiply(45, 2)).toBe(90);
    });

    test('multiplies two positive numbers', () => {
      expect(multiply(6, 7)).toBe(42);
    });

    test('multiplies by zero', () => {
      expect(multiply(100, 0)).toBe(0);
    });

    test('multiplies negative numbers', () => {
      expect(multiply(-3, 4)).toBe(-12);
      expect(multiply(-3, -4)).toBe(12);
    });

    test('multiplies decimal numbers', () => {
      expect(multiply(1.5, 2)).toBeCloseTo(3);
    });
  });

  describe('divide', () => {
    test('20 / 5 = 4 (from example image)', () => {
      expect(divide(20, 5)).toBe(4);
    });

    test('divides two positive numbers', () => {
      expect(divide(10, 2)).toBe(5);
    });

    test('divides resulting in a decimal', () => {
      expect(divide(7, 2)).toBeCloseTo(3.5);
    });

    test('divides negative numbers', () => {
      expect(divide(-10, 2)).toBe(-5);
      expect(divide(-10, -2)).toBe(5);
    });

    test('dividing zero by a number returns zero', () => {
      expect(divide(0, 5)).toBe(0);
    });

    test('throws an error when dividing by zero', () => {
      expect(() => divide(5, 0)).toThrow('Division by zero is not allowed.');
    });
  });

  describe('modulo', () => {
    test('5 % 2 = 1 (from example image)', () => {
      expect(modulo(5, 2)).toBe(1);
    });

    test('returns 0 when evenly divisible', () => {
      expect(modulo(10, 5)).toBe(0);
    });

    test('handles negative dividend', () => {
      expect(modulo(-7, 3)).toBe(-1);
    });

    test('handles decimal operands', () => {
      expect(modulo(5.5, 2)).toBeCloseTo(1.5);
    });

    test('throws an error when the divisor is zero', () => {
      expect(() => modulo(5, 0)).toThrow('Division by zero is not allowed.');
    });
  });

  describe('power', () => {
    test('2 ^ 3 = 8 (from example image)', () => {
      expect(power(2, 3)).toBe(8);
    });

    test('raises a number to the power of zero', () => {
      expect(power(5, 0)).toBe(1);
    });

    test('handles negative exponents', () => {
      expect(power(2, -2)).toBeCloseTo(0.25);
    });

    test('handles a base of zero', () => {
      expect(power(0, 5)).toBe(0);
    });

    test('handles decimal bases and exponents', () => {
      expect(power(2.5, 2)).toBeCloseTo(6.25);
    });
  });

  describe('squareRoot', () => {
    test('√16 = 4 (from example image)', () => {
      expect(squareRoot(16)).toBe(4);
    });

    test('returns 0 for the square root of 0', () => {
      expect(squareRoot(0)).toBe(0);
    });

    test('handles non-perfect squares', () => {
      expect(squareRoot(2)).toBeCloseTo(1.4142135623730951);
    });

    test('throws an error for negative numbers', () => {
      expect(() => squareRoot(-4)).toThrow(
        'Cannot compute the square root of a negative number.'
      );
    });
  });

  describe('calculate', () => {
    test.each([
      [2, '+', 3, 5],
      [10, '-', 4, 6],
      [45, '*', 2, 90],
      [45, 'x', 2, 90],
      [20, '/', 5, 4],
      [5, '%', 2, 1],
      [2, '^', 3, 8],
      [2, '**', 3, 8],
    ])('calculate(%p, %p, %p) === %p', (a, operator, b, expected) => {
      expect(calculate(a, operator, b)).toBe(expected);
    });

    test('calculate with "sqrt" operator computes the square root of the first operand', () => {
      expect(calculate(16, 'sqrt')).toBe(4);
    });

    test('throws an error for an unsupported operator', () => {
      expect(() => calculate(1, '@', 2)).toThrow('Unsupported operator: @');
    });

    test('propagates division by zero error', () => {
      expect(() => calculate(1, '/', 0)).toThrow('Division by zero is not allowed.');
    });

    test('propagates modulo by zero error', () => {
      expect(() => calculate(1, '%', 0)).toThrow('Division by zero is not allowed.');
    });

    test('propagates square root of negative number error', () => {
      expect(() => calculate(-4, 'sqrt')).toThrow(
        'Cannot compute the square root of a negative number.'
      );
    });
  });
});
