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

'use strict';

goog.provide('Blockly.Robokid.control');

goog.require('Blockly.Robokid');
 
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
      this.getTitleValue('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Robokid.valueToCode(this, 'FROM',
      Blockly.Robokid.ORDER_NONE) || 'false';
  var argument1 = Blockly.Robokid.valueToCode(this, 'TO',
      Blockly.Robokid.ORDER_NONE) || 'false';
  var branch0 = Blockly.Robokid.statementToCode(this, 'DO');
  var code;
  if (argument0.match(/^-?\d+(\.\d+)?$/) &&
      argument1.match(/^-?\d+(\.\d+)?$/)) {
    // Both arguments are simple numbers.
    var up = parseFloat(argument0) <= parseFloat(argument1);
    code = 'for ' + variable0 + '=' + argument0  +
       ' to ' + argument1 + ' {\n' + branch0 + '};\n';
  } else {
    code = '';
    // Cache non-trivial values to variables to prevent repeated look-ups.
    var startVar = argument0;
    if (!argument0.match(/^\w+$/) && !argument0.match(/^-?\d+(\.\d+)?$/)) {
      var startVar = Blockly.Robokid.variableDB_.getDistinctName(
          variable0 + '_start', Blockly.Variables.NAME_TYPE);
      code += 'var ' + startVar + ' = ' + argument0 + ';\n';
    }
    var endVar = argument1;
    if (!argument1.match(/^\w+$/) && !argument1.match(/^-?\d+(\.\d+)?$/)) {
      var endVar = Blockly.Robokid.variableDB_.getDistinctName(
          variable0 + '_end', Blockly.Variables.NAME_TYPE);
      code += 'var ' + endVar + ' = ' + argument1 + ';\n';
    }
    code += 'for ' + variable0 + '=' + startVar + ';\n' +
        '    (' + startVar + ' <= ' + endVar + ') ? ' +
        variable0 + ' <= ' + endVar + ' : ' +
        variable0 + ' >= ' + endVar + ';\n' +
        '    ' + variable0 +
        ' += (' + startVar + ' <= ' + endVar + ') ? 1 : -1) {\n' +
        branch0 + '}\n';
  }
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
