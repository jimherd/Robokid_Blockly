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
 * @fileoverview Robokid robot blocks for Blockly.
 * @author j.t.herd@hw.ac.uk (Jim Herd)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

if (!Blockly.Language) Blockly.Language = {};

 Blockly.Language.LEDS_set = {
	category: Blockly.LANG_CATEGORY_ROBOKID,
	helpUrl: Blockly.LANG_ROBOKID_LEDS_SET_HELPURL,
	init: function() {
		this.setColour(5);
		this.appendTitle('LEDS');
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendTitle('LED_A:');
		var LED_dropdown_A = new Blockly.FieldDropdown([['on','on'], ['off','off'], ['nochange','nochange']]);
		this.appendTitle(LED_dropdown_A, 'LED_A_mode');
		this.appendTitle('LED_B:');
		var LED_dropdown_B = new Blockly.FieldDropdown([['on','on'], ['off','off'], ['nochange','nochange']]);
		this.appendTitle(LED_dropdown_B, 'LED_B_mode');
		this.appendTitle('LED_C:');
		var LED_dropdown_C = new Blockly.FieldDropdown([['on','on'], ['off','off'], ['nochange','nochange']]);
		this.appendTitle(LED_dropdown_C, 'LED_B_mode');
		this.appendTitle('LED_D:');
		var LED_dropdown_D = new Blockly.FieldDropdown([['on','on'], ['off','off'], ['nochange','nochange']]);
		this.appendTitle(LED_dropdown_D, 'LED_B_mode');
	}
 };
 
  Blockly.Language.motors_set = {
	category: Blockly.LANG_CATEGORY_ROBOKID,
	helpUrl: Blockly.LANG_ROBOKID_MOTORS_SET_HELPURL,
	init: function() {
		this.setColour(5);
		this.appendTitle('Motors');
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setInputsInline(true);
		this.appendInput('Left %', Blockly.INPUT_VALUE, 'Motor_left', null);
		this.appendInput('Right %', Blockly.INPUT_VALUE, 'Motot_right', null);
	}
};
 
// Blockly.Language.logic_compare = {
  // // Comparison operator.
  // category: Blockly.LANG_CATEGORY_LOGIC,
  // helpUrl: Blockly.LANG_LOGIC_COMPARE_HELPURL,
  // init: function() {
    // this.setColour(120);
    // this.setOutput(true, Boolean);
    // this.appendInput('', Blockly.INPUT_VALUE, 'A', null);
    // var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    // this.appendInput([dropdown, 'OP'], Blockly.INPUT_VALUE, 'B', null);
    // this.setInputsInline(true);
    // // Assign 'this' to a variable for use in the tooltip closure below.
    // var thisBlock = this;
    // this.setTooltip(function() {
      // var op = thisBlock.getTitleValue('OP');
      // return Blockly.Language.logic_compare.TOOLTIPS[op];
    // });
  // }
// };

// Blockly.Language.logic_compare.OPERATORS =
    // [['=', 'EQ'],
     // ['\u2260', 'NEQ'],
     // ['<', 'LT'],
     // ['\u2264', 'LTE'],
     // ['>', 'GT'],
     // ['\u2265', 'GTE']];

// Blockly.Language.logic_compare.TOOLTIPS = {
  // EQ: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_EQ,
  // NEQ: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_NEQ,
  // LT: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LT,
  // LTE: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_LTE,
  // GT: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GT,
  // GTE: Blockly.LANG_LOGIC_COMPARE_TOOLTIP_GTE
// };

// Blockly.Language.logic_operation = {
  // // Logical operations: 'and', 'or'.
  // category: Blockly.LANG_CATEGORY_LOGIC,
  // helpUrl: Blockly.LANG_LOGIC_OPERATION_HELPURL,
  // init: function() {
    // this.setColour(120);
    // this.setOutput(true, Boolean);
    // this.appendInput('', Blockly.INPUT_VALUE, 'A', Boolean);
    // var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    // this.appendInput([dropdown, 'OP'], Blockly.INPUT_VALUE, 'B', Boolean);
    // this.setInputsInline(true);
    // // Assign 'this' to a variable for use in the tooltip closure below.
    // var thisBlock = this;
    // this.setTooltip(function() {
      // var op = thisBlock.getTitleValue('OP');
      // return Blockly.Language.logic_operation.TOOLTIPS[op];
    // });
  // }
// };

// Blockly.Language.logic_operation.OPERATORS = [[Blockly.LANG_LOGIC_OPERATION_AND, 'AND'], [Blockly.LANG_LOGIC_OPERATION_OR, 'OR']];

// Blockly.Language.logic_operation.TOOLTIPS = {
  // AND: Blockly.LANG_LOGIC_OPERATION_TOOLTIP_AND,
  // OR: Blockly.LANG_LOGIC_OPERATION_TOOLTIP_OR
// };

// Blockly.Language.logic_negate = {
  // // Negation.
  // category: Blockly.LANG_CATEGORY_LOGIC,
  // helpUrl: Blockly.LANG_LOGIC_NEGATE_HELPURL,
  // init: function() {
    // this.setColour(120);
    // this.setOutput(true, Boolean);
    // this.appendInput(Blockly.LANG_LOGIC_NEGATE_INPUT_NOT, Blockly.INPUT_VALUE, 'BOOL', Boolean);
    // this.setTooltip(Blockly.LANG_LOGIC_NEGATE_TOOLTIP_1);
  // }
// };

// Blockly.Language.logic_boolean = {
  // // Boolean data type: true and false.
  // category: Blockly.LANG_CATEGORY_LOGIC,
  // helpUrl: Blockly.LANG_LOGIC_BOOLEAN_HELPURL,
  // init: function() {
    // this.setColour(120);
    // this.setOutput(true, Boolean);
    // var dropdown = new Blockly.FieldDropdown(this.OPERATORS);
    // this.appendTitle(dropdown, 'BOOL');
    // this.setTooltip(Blockly.LANG_LOGIC_BOOLEAN_TOOLTIP_1);
  // }
// };

// Blockly.Language.logic_boolean.OPERATORS =
    // [[Blockly.LANG_LOGIC_BOOLEAN_TRUE, 'TRUE'],
     // [Blockly.LANG_LOGIC_BOOLEAN_FALSE, 'FALSE']];
