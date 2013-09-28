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
 * @fileoverview Generating Robokid for procedure blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

Blockly.Robokid = Blockly.Generator.get('Robokid');

Blockly.Robokid.procedures_defreturn = function(block) {
  // Define a procedure with a return value.
  var funcName = Blockly.Robokid.variableDB_.getName(block.getTitleText('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var branch = Blockly.Robokid.statementToCode(block, 'STACK');
  var returnValue = Blockly.Robokid.valueToCode(block, 'RETURN',
      Blockly.Robokid.ORDER_NONE) || '';
  if (returnValue) {
    returnValue = '  return ' + returnValue + ';\n';
  }
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Robokid.variableDB_.getName(block.arguments_[x],
        Blockly.Variables.NAME_TYPE);
  }
  var code = 'function ' + funcName + '(' + args.join(', ') + ') {\n' +
      branch + returnValue + '}\n';
  code = Blockly.Robokid.scrub_(block, code);
  Blockly.Robokid.definitions_[funcName] = code;
  return null;
};

// Defining a procedure without a return value uses the same generator as
// a procedure with a return value.
Blockly.Robokid.procedures_defnoreturn =
    Blockly.Robokid.procedures_defreturn;

Blockly.Robokid.procedures_callreturn = function(block) {
  // Call a procedure with a return value.
  var funcName = Blockly.Robokid.variableDB_.getName(block.getTitleText('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Robokid.valueToCode(block, 'ARG' + x,
        Blockly.Robokid.ORDER_COMMA) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ')';
  return [code, Blockly.Robokid.ORDER_FUNCTION_CALL];
};

Blockly.Robokid.procedures_callnoreturn = function(block) {
  // Call a procedure with no return value.
  var funcName = Blockly.Robokid.variableDB_.getName(block.getTitleText('NAME'),
      Blockly.Procedures.NAME_TYPE);
  var args = [];
  for (var x = 0; x < block.arguments_.length; x++) {
    args[x] = Blockly.Robokid.valueToCode(block, 'ARG' + x,
        Blockly.Robokid.ORDER_COMMA) || 'null';
  }
  var code = funcName + '(' + args.join(', ') + ');\n';
  return code;
};

