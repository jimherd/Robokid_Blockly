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
 * @fileoverview Generating Robokid for variable blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

'use strict';

Blockly.Robokid.variables = {};
 
// Blockly.Robokid = Blockly.Generator.get('Robokid');

Blockly.Robokid.variables_get = function(block) {
  // Variable getter.
  var code = Blockly.Robokid.variableDB_.getName(block.getTitleValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return [code, Blockly.Robokid.ORDER_ATOMIC];
};

Blockly.Robokid.variables_set = function(block) {
  // Variable setter.
  var argument0 = Blockly.Robokid.valueToCode(block, 'VALUE',
      Blockly.Robokid.ORDER_NONE) || '0';
  var varName = Blockly.Robokid.variableDB_.getName(block.getTitleValue('VAR'),
      Blockly.Variables.NAME_TYPE);
  return varName + '=' + argument0 + ';\n';
};
