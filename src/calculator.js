#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting the four basic
 * arithmetic operations shown on a standard calculator keypad:
 *   +     Addition
 *   -     Subtraction
 *   *     Multiplication (x)
 *   /     Division (÷)
 *   %     Modulo (remainder)
 *   ^, ** Exponentiation (power)
 *   sqrt  Square root (unary operation)
 *
 * Usage:
 *   node calculator.js <num1> <operator> <num2>
 *   node calculator.js sqrt <num>
 *
 * Example:
 *   node calculator.js 5 + 3
 *   => 8
 *   node calculator.js sqrt 16
 *   => 4
 */

/**
 * Adds two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number} sum of a and b
 */
function add(a, b) {
  return a + b;
}

/**
 * Subtracts the second number from the first.
 * @param {number} a
 * @param {number} b
 * @returns {number} difference of a and b
 */
function subtract(a, b) {
  return a - b;
}

/**
 * Multiplies two numbers.
 * @param {number} a
 * @param {number} b
 * @returns {number} product of a and b
 */
function multiply(a, b) {
  return a * b;
}

/**
 * Divides the first number by the second.
 * Throws an error when dividing by zero.
 * @param {number} a
 * @param {number} b
 * @returns {number} quotient of a and b
 */
function divide(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a / b;
}

/**
 * Returns the remainder of a divided by b.
 * Throws an error when the divisor is zero.
 * @param {number} a
 * @param {number} b
 * @returns {number} remainder of a divided by b
 */
function modulo(a, b) {
  if (b === 0) {
    throw new Error('Division by zero is not allowed.');
  }
  return a % b;
}

/**
 * Raises a base number to the given exponent.
 * @param {number} base
 * @param {number} exponent
 * @returns {number} base raised to the power of exponent
 */
function power(base, exponent) {
  return Math.pow(base, exponent);
}

/**
 * Returns the square root of a number.
 * Throws an error when given a negative number, since the result
 * would not be a real number.
 * @param {number} n
 * @returns {number} square root of n
 */
function squareRoot(n) {
  if (n < 0) {
    throw new Error('Cannot compute the square root of a negative number.');
  }
  return Math.sqrt(n);
}

/**
 * Performs the requested arithmetic operation on two numbers.
 * Supported operators: '+', '-', '*', '/', '%', '^'/'**', 'sqrt'.
 * Note: 'sqrt' is unary and only uses the first operand (b is ignored).
 * @param {number} a
 * @param {string} operator
 * @param {number} [b]
 * @returns {number} result of the operation
 */
function calculate(a, operator, b) {
  switch (operator) {
    case '+':
      return add(a, b);
    case '-':
      return subtract(a, b);
    case '*':
    case 'x':
    case 'X':
      return multiply(a, b);
    case '/':
      return divide(a, b);
    case '%':
      return modulo(a, b);
    case '^':
    case '**':
      return power(a, b);
    case 'sqrt':
      return squareRoot(a);
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

/**
 * Entry point for CLI usage. Parses process arguments in the form
 * "<num1> <operator> <num2>" and prints the result.
 */
function main() {
  const [, , first, second, third] = process.argv;

  // Support unary form: node calculator.js sqrt <num>
  if (first === 'sqrt') {
    const n = Number(second);

    if (second === undefined || Number.isNaN(n)) {
      console.error('Usage: node calculator.js sqrt <num>');
      process.exitCode = 1;
      return;
    }

    try {
      console.log(calculate(n, 'sqrt'));
    } catch (error) {
      console.error(`Error: ${error.message}`);
      process.exitCode = 1;
    }
    return;
  }

  // Standard binary form: node calculator.js <num1> <operator> <num2>
  const rawA = first;
  const operator = second;
  const rawB = third;

  if (rawA === undefined || operator === undefined || rawB === undefined) {
    console.error('Usage: node calculator.js <num1> <operator> <num2>');
    console.error('       node calculator.js sqrt <num>');
    console.error('Supported operators: + - * / % ^ ** sqrt');
    process.exitCode = 1;
    return;
  }

  const a = Number(rawA);
  const b = Number(rawB);

  if (Number.isNaN(a) || Number.isNaN(b)) {
    console.error('Error: both operands must be valid numbers.');
    process.exitCode = 1;
    return;
  }

  try {
    const result = calculate(a, operator, b);
    console.log(result);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exitCode = 1;
  }
}

if (require.main === module) {
  main();
}

module.exports = { add, subtract, multiply, divide, modulo, power, squareRoot, calculate };
