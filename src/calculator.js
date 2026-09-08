#!/usr/bin/env node

/**
 * calculator.js
 *
 * A simple Node.js CLI calculator supporting the four basic
 * arithmetic operations shown on a standard calculator keypad:
 *   +  Addition
 *   -  Subtraction
 *   *  Multiplication (x)
 *   /  Division (÷)
 *
 * Usage:
 *   node calculator.js <num1> <operator> <num2>
 *
 * Example:
 *   node calculator.js 5 + 3
 *   => 8
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
 * Performs the requested arithmetic operation on two numbers.
 * Supported operators: '+', '-', '*', '/'.
 * @param {number} a
 * @param {string} operator
 * @param {number} b
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
    default:
      throw new Error(`Unsupported operator: ${operator}`);
  }
}

/**
 * Entry point for CLI usage. Parses process arguments in the form
 * "<num1> <operator> <num2>" and prints the result.
 */
function main() {
  const [, , rawA, operator, rawB] = process.argv;

  if (rawA === undefined || operator === undefined || rawB === undefined) {
    console.error('Usage: node calculator.js <num1> <operator> <num2>');
    console.error('Supported operators: + - * /');
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

module.exports = { add, subtract, multiply, divide, calculate };
