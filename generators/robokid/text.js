/**
 * Visual Blocks Language
 *
 * Copyright 2012 Google Inc.
 * http://code.google.com/p/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
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
 * @fileoverview Generating Robokid for text blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

Blockly.Robokid = Blockly.Generator.get('Robokid');

Blockly.Robokid.text = function() {
  // Text value.
  var code = Blockly.Robokid.quote_(this.getTitleValue('TEXT'));
  return [code, Blockly.Robokid.ORDER_ATOMIC];
};


Blockly.Robokid.text_join = function() {
  // Create a string made up of any number of elements of any type.
  //Should we allow joining by '-' or ',' or any other characters?
  var code;
  if (this.itemCount_ == 0) {
    return ['\'\'', Blockly.Robokid.ORDER_ATOMIC];
  } else if (this.itemCount_ == 1) {
    var argument0 = Blockly.Robokid.valueToCode(this, 'ADD0',
        Blockly.Robokid.ORDER_NONE) || '\'\'';
    code = 'str(' + argument0 + ')';
    return [code, Blockly.Robokid.ORDER_FUNCTION_CALL];
  } else if (this.itemCount_ == 2) {
    var argument0 = Blockly.Robokid.valueToCode(this, 'ADD0',
        Blockly.Robokid.ORDER_NONE) || '\'\'';
    var argument1 = Blockly.Robokid.valueToCode(this, 'ADD1',
        Blockly.Robokid.ORDER_NONE) || '\'\'';
    var code = 'str(' + argument0 + ') + str(' + argument1 + ')';
    return [code, Blockly.Robokid.ORDER_UNARY_SIGN];
  } else {
    var code = [];
    for (var n = 0; n < this.itemCount_; n++) {
      code[n] = Blockly.Robokid.valueToCode(this, 'ADD' + n,
          Blockly.Robokid.ORDER_NONE) || '\'\'';
    }
    var tempVar = Blockly.Robokid.variableDB_.getDistinctName('temp_value',
        Blockly.Variables.NAME_TYPE);
    code = '\'\'.join([str(' + tempVar + ') for ' + tempVar + ' in [' + code.join(', ') + ']])';
    return [code, Blockly.Robokid.ORDER_FUNCTION_CALL];
  }
};

Blockly.Robokid.text_length = function() {
  // String length.
  var argument0 = Blockly.Robokid.valueToCode(this, 'VALUE',
      Blockly.Robokid.ORDER_NONE) || '\'\'';
  return ['len(' + argument0 + ')', Blockly.Robokid.ORDER_FUNCTION_CALL];
};

Blockly.Robokid.text_isEmpty = function() {
  // Is the string null?
  var argument0 = Blockly.Robokid.valueToCode(this, 'VALUE',
      Blockly.Robokid.ORDER_NONE) || '\'\'';
  var code = 'not len(' + argument0 + ')';
  return [code, Blockly.Robokid.ORDER_LOGICAL_NOT];
};

Blockly.Robokid.text_endString = function() {
  // Return a leading or trailing substring.
  // Do we need to prevent 'List index out of range' ERROR by checking
  // if argument 0 > len(argument1)? Or will ALL error be handled systematically?
  var first = this.getTitleValue('END') == 'FIRST';
  var argument0 = Blockly.Robokid.valueToCode(this, 'NUM',
      Blockly.Robokid.ORDER_NONE) || '1';
  var argument1 = Blockly.Robokid.valueToCode(this, 'TEXT',
      Blockly.Robokid.ORDER_MEMBER) || '\'\'';
  var code = argument1 + '[' +
      (first ? ':' + argument0 : '-' + argument0 + ':') + ']';
  return [code, Blockly.Robokid.ORDER_MEMBER];
};

Blockly.Robokid.text_indexOf = function() {
  // Search the text for a substring.
  // Should we allow for non-case sensitive???
  var operator = this.getTitleValue('END') == 'FIRST' ? 'find' : 'rfind';
  var argument0 = Blockly.Robokid.valueToCode(this, 'FIND',
      Blockly.Robokid.ORDER_NONE) || '\'\'';
  var argument1 = Blockly.Robokid.valueToCode(this, 'VALUE',
      Blockly.Robokid.ORDER_MEMBER) || '\'\'';
  var code = argument1 + '.' + operator + '(' + argument0 + ') + 1';
  return [code, Blockly.Robokid.ORDER_MEMBER];
};

Blockly.Robokid.text_charAt = function() {
  // Get letter at index.
  var argument0 = Blockly.Robokid.valueToCode(this, 'AT',
      Blockly.Robokid.ORDER_NONE) || '1';
  var argument1 = Blockly.Robokid.valueToCode(this, 'VALUE',
      Blockly.Robokid.ORDER_MEMBER) || '[]';
  // Blockly uses one-based indicies.
  if (argument0.match(/^\d+$/)) {
    // If the index is a naked number, decrement it right now.
    // Except not allowing negative index by constraining at 0.
    argument0 = Math.max(0, parseInt(argument0, 10) - 1);
  } else {
    // If the index is dynamic, decrement it in code.
    argument0 += ' - 1';
  }
  var code = argument1 + '[' + argument0 + ']';
  return [code, Blockly.Robokid.ORDER_MEMBER];
};

Blockly.Robokid.text_changeCase = function() {
  // Change capitalization.
  var mode = this.getTitleValue('CASE');
  var operator = Blockly.Robokid.text_changeCase.OPERATORS[mode];
  var argument0 = Blockly.Robokid.valueToCode(this, 'TEXT',
      Blockly.Robokid.ORDER_MEMBER) || '\'\'';
  var code = argument0 + operator;
  return [code, Blockly.Robokid.ORDER_MEMBER];
};

Blockly.Robokid.text_changeCase.OPERATORS = {
  UPPERCASE: '.upper()',
  LOWERCASE: '.lower()',
  TITLECASE: '.title()'
};

Blockly.Robokid.text_trim = function() {
  // Trim spaces.
  var mode = this.getTitleValue('MODE');
  var operator = Blockly.Robokid.text_trim.OPERATORS[mode];
  var argument0 = Blockly.Robokid.valueToCode(this, 'TEXT',
      Blockly.Robokid.ORDER_MEMBER) || '\'\'';
  var code = argument0 + operator;
  return [code, Blockly.Robokid.ORDER_MEMBER];
};

Blockly.Robokid.text_trim.OPERATORS = {
  LEFT: '.lstrip()',
  RIGHT: '.rstrip()',
  BOTH: '.strip()'
};

Blockly.Robokid.text_print = function() {
  // Print statement.
  var argument0 = Blockly.Robokid.valueToCode(this, 'TEXT',
      Blockly.Robokid.ORDER_NONE) || '\'\'';
  return 'print ' + argument0 + '\n';
};

Blockly.Robokid.text_prompt = function() {
  // Prompt function.
  var msg = Blockly.Robokid.quote_(this.getTitleValue('TEXT'));
  var code = 'raw_input(' + msg + ')';
  var toNumber = this.getTitleValue('TYPE') == 'NUMBER';
  if (toNumber) {
    code = 'float(' + code + ')';
  }
  return [code, Blockly.Robokid.ORDER_FUNCTION_CALL];
};

