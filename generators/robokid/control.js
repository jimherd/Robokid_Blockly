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
 * @fileoverview Generating Robokid for control blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

Blockly.Robokid = Blockly.Generator.get('Robokid');

Blockly.Robokid.controls_if = function() {
  // If/elseif/else condition.
  var n = 0;
  var argument = Blockly.Robokid.valueToCode(this, 'IF' + n,
      Blockly.Robokid.ORDER_NONE) || 'False';
  var branch = Blockly.Robokid.statementToCode(this, 'DO' + n) || '  pass\n';
  var code = 'if ' + argument + ':\n' + branch;
  for (n = 1; n <= this.elseifCount_; n++) {
    argument = Blockly.Robokid.valueToCode(this, 'IF' + n,
        Blockly.Robokid.ORDER_NONE) || 'False';
    branch = Blockly.Robokid.statementToCode(this, 'DO' + n) || '  pass\n';
    code += 'elif ' + argument + ':\n' + branch;
  }
  if (this.elseCount_) {
    branch = Blockly.Robokid.statementToCode(this, 'ELSE') || '  pass\n';
    code += 'else:\n' + branch;
  }
  return code + '\n';
};

Blockly.Robokid.controls_whileUntil = function() {
  // Do while/until loop.
  var until = this.getTitleValue('MODE') == 'UNTIL';
  var argument0 = Blockly.Robokid.valueToCode(this, 'BOOL',
      until ? Blockly.Robokid.ORDER_LOGICAL_NOT :
      Blockly.Robokid.ORDER_NONE) || 'False';
  var branch0 = Blockly.Robokid.statementToCode(this, 'DO') || '  pass\n';
  if (this.getTitleValue('MODE') == 'UNTIL') {
    if (!argument0.match(/^\w+$/)) {
      argument0 = '(' + argument0 + ')';
    }
    argument0 = 'not ' + argument0;
  }
  return 'while ' + argument0 + ':\n' + branch0 + '\n';
};

Blockly.Robokid.controls_for = function() {
  // For loop.
  var variable0 = Blockly.Robokid.variableDB_.getName(
      this.getInputVariable('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Robokid.valueToCode(this, 'FROM',
      Blockly.Robokid.ORDER_NONE) || '0';
  // If starting index is 0, omit it.
  argument0 = (parseInt(argument0, 10) === 0) ? '' : argument0 + ', ';
  var argument1 = Blockly.Robokid.valueToCode(this, 'TO',
      Blockly.Robokid.ORDER_ADDITIVE) || '0';
  if (argument1.match(/^\d+$/)) {
    // If the index is a naked number, increment it right now.
    argument1 = parseInt(argument1, 10) + 1;
  } else {
    // If the index is dynamic, increment it in code.
    argument1 += ' + 1';
  }
  var branch0 = Blockly.Robokid.statementToCode(this, 'DO') || '  pass\n';
  var code = 'for ' + variable0 + ' in range(' + argument0 +
      argument1 + '):\n' + branch0 + '\n';
  return code;
};

Blockly.Robokid.controls_forEach = function() {
  // For each loop.
  var variable0 = Blockly.Robokid.variableDB_.getName(
      this.getInputVariable('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Robokid.valueToCode(this, 'LIST',
      Blockly.Robokid.ORDER_RELATIONAL) || '[]';
  var branch0 = Blockly.Robokid.statementToCode(this, 'DO') || '  pass\n';
  var code = 'for ' + variable0 + ' in ' + argument0 + ':\n' + branch0 + '\n';
  return code;
};

Blockly.Robokid.controls_flow_statements = function() {
  // Flow statements: continue, break.
  switch (this.getTitleValue('FLOW')) {
    case 'BREAK':
      return 'break\n';
    case 'CONTINUE':
      return 'continue\n';
  }
  throw 'Unknown flow statement.';
};
