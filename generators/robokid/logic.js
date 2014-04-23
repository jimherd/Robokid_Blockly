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
 * @fileoverview Generating Robokid for logic blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

 'use strict';
 
 Blockly.Robokid.logic = {};
 
// Blockly.Robokid = Blockly.Generator.get('Robokid');

 Blockly.Robokid['controls_if'] = function(block) {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.Robokid.valueToCode(block, 'IF' + n,
      Blockly.Robokid.ORDER_NONE) || 'false';
  var branch = Blockly.Robokid.statementToCode(block, 'DO' + n);
  var code = 'if ' + argument + ' {\n' + branch + '}';
  for (n = 1; n <= block.elseifCount_; n++) {
    argument = Blockly.Robokid.valueToCode(block, 'IF' + n,
        Blockly.Robokid.ORDER_NONE) || 'false';
    branch = Blockly.Robokid.statementToCode(block, 'DO' + n);
    code += ' else if (' + argument + ') {\n' + branch + '}';
  }
  if (block.elseCount_) {
    branch = Blockly.Robokid.statementToCode(block, 'ELSE');
    code += ' else {\n' + branch + '}';
  }
  return code + ';\n';
};


Blockly.Robokid['logic_compare'] = function(block) {
  // Comparison operator.
  var OPERATORS = {
    'EQ': '==',
    'NEQ': '!=',
    'LT': '<',
    'LTE': '<=',
    'GT': '>',
    'GTE': '>='
  };
  var operator = OPERATORS[block.getTitleValue('OP')];
  var order = Blockly.Robokid.ORDER_RELATIONAL;
  var argument0 = Blockly.Robokid.valueToCode(block, 'A', order) || '0';
  var argument1 = Blockly.Robokid.valueToCode(block, 'B', order) || '0';
  var code = argument0 + operator + argument1;
  return [code, order];
};

Blockly.Robokid['logic_operation'] = function(block) {
  // Operations 'and', 'or'.
  var operator = (block.getTitleValue('OP') == 'AND') ? 'and' : 'or';
  var order = (operator == 'and') ? Blockly.Robokid.ORDER_LOGICAL_AND :
      Blockly.Robokid.ORDER_LOGICAL_OR;
  var argument0 = Blockly.Robokid.valueToCode(block, 'A', order);
  var argument1 = Blockly.Robokid.valueToCode(block, 'B', order);
  if (!argument0 && !argument1) {
    // If there are no arguments, then the return value is false.
    argument0 = 'false';
    argument1 = 'false';
  } else {
    // Single missing arguments have no effect on the return value.
	var defaultArgument = (operator == '&&') ? 'true' : 'false';
	if (!argument0) {
      argument0 = defaultArgument;
	}
	if (!argument1) {
      argument1 = defaultArgument;
	}
  }
  var code = argument0 +  operator + argument1;
  return [code, order];
};

Blockly.Robokid['logic_negate'] = function(block) {
  // Negation.
  var argument0 = Blockly.Robokid.valueToCode(block, 'BOOL',
      Blockly.Robokid.ORDER_LOGICAL_NOT) || 'TRUE';
  var code = 'not ' + argument0;
  return [code, Blockly.Robokid.ORDER_LOGICAL_NOT];
};

Blockly.Robokid['logic_boolean'] = function(block) {
  // Boolean values true and false.
  var code = (block.getTitleValue('BOOL') == 'TRUE') ? 'True' : 'False';
  return [code, Blockly.Robokid.ORDER_ATOMIC];
};
