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
	category: 'Robokid',
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
		this.appendTitle(LED_dropdown_C, 'LED_C_mode');
		this.appendTitle('LED_D:');
		var LED_dropdown_D = new Blockly.FieldDropdown([['on','on'], ['off','off'], ['nochange','nochange']]);
		this.appendTitle(LED_dropdown_D, 'LED_D_mode');
	}
 };
 
  Blockly.Language.motors_set = {
	category: 'Robokid',
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
 