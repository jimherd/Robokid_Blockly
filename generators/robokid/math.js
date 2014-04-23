/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use block file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Generating Robokid for math blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

 'use strict';

goog.provide('Blockly.Robokid.math');

goog.require('Blockly.Robokid');

Blockly.Robokid['math_number'] = function(block) {
//Blockly.Robokid.math_number = function() {
  // Numeric value.
  var code = parseFloat(block.getTitleValue('NUM'));
  return [code, Blockly.Robokid.ORDER_UNARY_SIGN];
};

Blockly.Robokid['math_arithmetic'] = function(block) {
//Blockly.Robokid.math_arithmetic = function() {
  // Basic arithmetic operators, and power.
  var OPERATORS = {
      'ADD': ['+', Blockly.Robokid.ORDER_ADDITIVE],
      'MINUS': ['-', Blockly.Robokid.ORDER_ADDITIVE],
      'MULTIPLY': ['*', Blockly.Robokid.ORDER_MULTIPLICATIVE],
      'DIVIDE': ['/', Blockly.Robokid.ORDER_MULTIPLICATIVE],
      'POWER': ['**', Blockly.Robokid.ORDER_EXPONENTIATION]
  }; 
  var tuple = OPERATORS[block.getTitleValue('OP')];
//  var mode = block.getTitleValue('OP');
//  var tuple = Blockly.Robokid.math_arithmetic.OPERATORS[mode];
  var operator = tuple[0];
  var order = tuple[1];
  var argument0 = Blockly.Robokid.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Robokid.valueToCode(block, 'B', order) || '0';
  var code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.Robokid['math_change'] = function(block) {
//Blockly.Robokid.math_change = function() {
  // Add to a variable in place.
  var argument0 = Blockly.Robokid.valueToCode(block, 'DELTA',
      Blockly.Robokid.ORDER_ADDITIVE) || '0';
  var varName = Blockly.Robokid.variableDB_.getName(block.getTitleValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return varName + ' = (' + varName + ' if type(' + varName + ') in (int, float) else 0)' +
      ' + ' + argument0 + '\n';
};

Blockly.Robokid['math_single'] = function(block) {
//Blockly.Robokid.math_single = function() {
  // Math operators with single operand.
 
  var operator = block.getTitleValue('OP');
  var code;
  var arg;
  if (operator == 'NEG') {
    // Negation is a special case given its different operator precedence.
    var code = Blockly.Robokid.valueToCode(block, 'NUM',
        Blockly.Robokid.ORDER_UNARY_SIGN) || '0';
    return ['-' + code, Blockly.Robokid.ORDER_UNARY_SIGN];
  }
  Blockly.Robokid.definitions_['import_math'] = 'import math';
  if (operator == 'SIN' || operator == 'COS' || operator == 'TAN') {
    arg = Blockly.Robokid.valueToCode(block, 'NUM',
        Blockly.Robokid.ORDER_MULTIPLICATIVE) || '0';
  } else {
    arg = Blockly.Robokid.valueToCode(block, 'NUM',
        Blockly.Robokid.ORDER_NONE) || '0';
  }
  // First, handle cases which generate values that don't need parentheses
  // wrapping the code.
  switch (operator) {
    case 'ABS':
      code = 'math.fabs(' + arg + ')';
      break;
    case 'ROOT':
      code = 'math.sqrt(' + arg + ')';
      break;
    case 'LN':
      code = 'math.log(' + arg + ')';
      break;
    case 'LOG10':
      code = 'math.log10(' + arg + ')';
      break;
    case 'EXP':
      code = 'math.exp(' + arg + ')';
      break;
    case 'POW10':
      code = 'math.pow(10,' + arg + ')';
      break;
    case 'ROUND':
      code = 'round(' + arg + ')';
      break;
    case 'ROUNDUP':
      code = 'math.ceil(' + arg + ')';
      break;
    case 'ROUNDDOWN':
      code = 'math.floor(' + arg + ')';
      break;
    case 'SIN':
      code = 'math.sin(' + arg + ' / 180.0 * math.pi)';
      break;
    case 'COS':
      code = 'math.cos(' + arg + ' / 180.0 * math.pi)';
      break;
    case 'TAN':
      code = 'math.tan(' + arg + ' / 180.0 * math.pi)';
      break;
  }
  if (code) {
    return [code, Blockly.Robokid.ORDER_FUNCTION_CALL];
  }
  // Second, handle cases which generate values that may need parentheses wrapping the code.
  switch (operator) {
    case 'ASIN':
      code = 'math.asin(' + arg + ') / math.pi * 180';
      break;
    case 'ACOS':
      code = 'math.acos(' + arg + ') / math.pi * 180';
      break;
    case 'ATAN':
      code = 'math.atan(' + arg + ') / math.pi * 180';
      break;
    default:
      throw 'Unknown math operator: ' + operator;
  }
  return [code, Blockly.Robokid.ORDER_MULTIPLICATIVE];
};

// Rounding functions have a single operand.
Blockly.Robokid.math_round = Blockly.Robokid.math_single;
// Trigonometry functions have a single operand.
Blockly.Robokid.math_trig = Blockly.Robokid.math_single;

Blockly.Robokid['math_on_list'] = function(block) {
//Blockly.Robokid.math_on_list = function() {
  // Math functions for lists.
  func = block.getTitleValue('OP');
  list = Blockly.Robokid.valueToCode(block, 'LIST',
      Blockly.Robokid.ORDER_NONE) || '[]';
  var code;
  switch (func) {
    case 'SUM':
      code = 'sum(' + list + ')';
      break;
    case 'MIN':
      code = 'min(' + list + ')';
      break;
    case 'MAX':
      code = 'max(' + list + ')';
      break;
    case 'AVERAGE':
      if (!Blockly.Robokid.definitions_['math_mean']) {
        // block operation exclude null values: math_mean([null,null,1,9]) == 5.0.
        var functionName = Blockly.Robokid.variableDB_.getDistinctName(
            'math_mean', Blockly.Generator.NAME_TYPE);
        Blockly.Robokid.math_on_list.math_mean = functionName;
        var func = [];
        func.push('def ' + functionName + '(myList):');
        func.push('  localList = [e for e in myList if type(e) in [int, float]]');
        func.push('  if not localList: return');
        func.push('  return float(sum(localList)) / len(localList)');
        Blockly.Robokid.definitions_['math_mean'] = func.join('\n');
      }
      code = Blockly.Robokid.math_on_list.math_mean + '(' + list + ')';
      break;
    case 'MEDIAN':
      if (!Blockly.Robokid.definitions_['math_median']) {
        // block operation exclude null values: math_median([null,null,1,3]) == 2.0.
        var functionName = Blockly.Robokid.variableDB_.getDistinctName('math_median',
            Blockly.Generator.NAME_TYPE);
        Blockly.Robokid.math_on_list.math_median = functionName;
        var func = [];
        func.push('def ' + functionName + '(myList):');
        func.push('  localList = sorted([e for e in myList if type(e) in [int, float]])');
        func.push('  if not localList: return');
        func.push('  if len(localList) % 2 == 0:');
        func.push('    return (localList[len(localList) / 2 - 1] + localList[len(localList) / 2]) / 2.0');
        func.push('  else:');
        func.push('    return localList[(len(localList) - 1) / 2]');
        Blockly.Robokid.definitions_['math_median'] = func.join('\n');
      }
      code = Blockly.Robokid.math_on_list.math_median + '(' + list + ')';
      break;
    case 'MODE':
      if (!Blockly.Robokid.definitions_['math_modes']) {
        // As a list of numbers can contain more than one mode,
        // the returned result is provided as an array.
        // Mode of [3, 'x', 'x', 1, 1, 2, '3'] -> ['x', 1].
        var functionName = Blockly.Robokid.variableDB_.getDistinctName('math_modes',
            Blockly.Generator.NAME_TYPE);
        Blockly.Robokid.math_on_list.math_modes = functionName;
        var func = [];
        func.push('def ' + functionName + '(some_list):');
        func.push('  modes = []');
        func.push('  # Using a lists of [item, count] to keep count rather than dict');
        func.push('  # to avoid "unhashable" errors when the counted item is itself a list or dict.');
        func.push('  counts = []');
        func.push('  maxCount = 1');
        func.push('  for item in some_list:');
        func.push('    found = False');
        func.push('    for count in counts:');
        func.push('      if count[0] == item:');
        func.push('        count[1] += 1');
        func.push('        maxCount = max(maxCount, count[1])');
        func.push('        found = True');
        func.push('    if not found:');
        func.push('      counts.append([item, 1])');
        func.push('  for counted_item, item_count in counts:');
        func.push('    if item_count == maxCount:');
        func.push('      modes.append(counted_item)');
        func.push('  return modes');
        Blockly.Robokid.definitions_['math_modes'] = func.join('\n');
      }
      code = Blockly.Robokid.math_on_list.math_modes + '(' + list + ')';
      break;
    case 'STD_DEV':
      Blockly.Robokid.definitions_['import_math'] = 'import math';
      if (!Blockly.Robokid.definitions_['math_standard_deviation']) {
        var functionName = Blockly.Robokid.variableDB_.getDistinctName(
            'math_standard_deviation', Blockly.Generator.NAME_TYPE);
        Blockly.Robokid.math_on_list.math_standard_deviation = functionName;
        var func = [];
        func.push('def ' + functionName + '(numbers):');
        func.push('  n = len(numbers)');
        func.push('  if n == 0: return');
        func.push('  mean = float(sum(numbers)) / n');
        func.push('  variance = sum((x - mean) ** 2 for x in numbers) / n');
        func.push('  standard_dev = math.sqrt(variance)');
        func.push('  return standard_dev');
        Blockly.Robokid.definitions_['math_standard_deviation'] = func.join('\n');
      }
      code = Blockly.Robokid.math_on_list.math_standard_deviation + '(' + list + ')';
      break;
    case 'RANDOM':
      Blockly.Robokid.definitions_['import_random_choice'] = 'from random import choice';
      code = 'choice(' + list + ')';
      break;
    default:
      throw 'Unknown operator.';
  }
  return [code, Blockly.Robokid.ORDER_FUNCTION_CALL];
};

Blockly.Robokid['math_constrain'] = function(block) {
//Blockly.Robokid.math_constrain = function() {
  // Constrain a number between two limits.
  var argument0 = Blockly.Robokid.valueToCode(block, 'VALUE',
      Blockly.Robokid.ORDER_NONE) || '0';
  var argument1 = Blockly.Robokid.valueToCode(block, 'LOW',
      Blockly.Robokid.ORDER_NONE) || '0';
  var argument2 = Blockly.Robokid.valueToCode(block, 'HIGH',
      Blockly.Robokid.ORDER_NONE) || '0';
  code = 'min(max(' + argument0 + ', ' + argument1 + '), ' + argument2 + ')';
  return [code, Blockly.Robokid.ORDER_FUNCTION_CALL];
};

Blockly.Robokid['math_modulo'] = function(block) {
//Blockly.Robokid.math_modulo = function() {
  // Remainder computation.
  var argument0 = Blockly.Robokid.valueToCode(block, 'DIVIDEND',
      Blockly.Robokid.ORDER_MULTIPLICATIVE) || '0';
  var argument1 = Blockly.Robokid.valueToCode(block, 'DIVISOR',
      Blockly.Robokid.ORDER_MULTIPLICATIVE) || '0';
  var code = argument0 + ' % ' + argument1;
  return [code, Blockly.Robokid.ORDER_MULTIPLICATIVE];
};

Blockly.Robokid['math_random_int'] = function(block) {
//Blockly.Robokid.math_random_int = function() {
  // Random integer between [X] and [Y].
  Blockly.Robokid.definitions_['import_random'] = 'import random';
  var argument0 = Blockly.Robokid.valueToCode(block, 'FROM',
      Blockly.Robokid.ORDER_NONE) || '0';
  var argument1 = Blockly.Robokid.valueToCode(block, 'TO',
      Blockly.Robokid.ORDER_NONE) || '0';
  code = 'random.randint(' + argument0 + ', ' + argument1 + ')';
  return [code, Blockly.Robokid.ORDER_FUNCTION_CALL];
};

Blockly.Robokid['math_random_float'] = function(block) {
//Blockly.Robokid.math_random_float = function() {
  // Random fraction between 0 and 1.
  Blockly.Robokid.definitions_['import_random'] = 'import random';
  return ['random.random()', Blockly.Robokid.ORDER_FUNCTION_CALL];
};
