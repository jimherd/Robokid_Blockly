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
 * @fileoverview Generating Robokid for logic blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

 'use strict';
 
 Blockly.Robokid.logic = {};
 
// Blockly.Robokid = Blockly.Generator.get('Robokid');

 Blockly.Robokid.controls_if = function() {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.Robokid.valueToCode(this, 'IF' + n,
      Blockly.Robokid.ORDER_NONE) || 'false';
  var branch = Blockly.Robokid.statementToCode(this, 'DO' + n);
  var code = 'if ' + argument + ' {\n' + branch + '}';
  for (n = 1; n <= this.elseifCount_; n++) {
    argument = Blockly.Robokid.valueToCode(this, 'IF' + n,
        Blockly.Robokid.ORDER_NONE) || 'false';
    branch = Blockly.Robokid.statementToCode(this, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (this.elseCount_) {
    branch = Blockly.Robokid.statementToCode(this, 'ELSE');
    code += ' else {\n' + branch + '}';
  }
  return code + ';\n';
};


Blockly.Robokid.logic_compare = function() {
  // Comparison operator.
  var mode = this.getTitleValue('OP');
  var operator = Blockly.Robokid.logic_compare.OPERATORS[mode];
  var order = Blockly.Robokid.ORDER_RELATIONAL;
  var argument0 = Blockly.Robokid.valueToCode(this, 'A', order) || '0';
  var argument1 = Blockly.Robokid.valueToCode(this, 'B', order) || '0';
  var code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.Robokid.logic_compare.OPERATORS = {
  EQ: '=',
  NEQ: '!=',
  LT: '<',
  LTE: '<=',
  GT: '>',
  GTE: '>='
};

Blockly.Robokid.logic_operation = function() {
  // Operations 'and', 'or'.
  var operator = (this.getTitleValue('OP') == 'AND') ? 'and' : 'or';
  var order = (operator == 'and') ? Blockly.Robokid.ORDER_LOGICAL_AND :
      Blockly.Robokid.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Robokid.valueToCode(this, 'A', order) || 'False';
  var argument1 = Blockly.Robokid.valueToCode(this, 'B', order) || 'False';
  var code = argument0 +  operator + argument1;
  return [code, order];
};

Blockly.Robokid.logic_negate = function() {
  // Negation.
  var argument0 = Blockly.Robokid.valueToCode(this, 'BOOL',
      Blockly.Robokid.ORDER_LOGICAL_NOT) || 'False';
  var code = 'not ' + argument0;
  return [code, Blockly.Robokid.ORDER_LOGICAL_NOT];
};

Blockly.Robokid.logic_boolean = function() {
  // Boolean values true and false.
  var code = (this.getTitleValue('BOOL') == 'TRUE') ? 'True' : 'False';
  return [code, Blockly.Robokid.ORDER_ATOMIC];
};
