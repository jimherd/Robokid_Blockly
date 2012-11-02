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
 
Blockly.Robokid = Blockly.Generator.get('Robokid');


Blockly.Robokid.LEDS_set = function() {
  // leds command for 4 LEDs on the Robokid robot
  // Todo : posible use of an array rather than individual variables
  
  var LED_A_value = Blockly.Robokid.valueToCode(this, 'LED_A_mode',
      Blockly.Robokid.ORDER_NONE) || '0';
    switch (LED_A_value) {
		case 'off':
			LED_A_value = '0';
			break;
		case 'on':
			LED_A_value = '1';
			break;
		case 'flash':
			LED_A_value = '2';
			break;
		case 'nochange':
			LED_A_value = '3';
			break;
  }
  var LED_B_value = Blockly.Robokid.valueToCode(this, 'LED_B_mode',
      Blockly.Robokid.ORDER_NONE) || '0';
    switch (LED_B_value) {
		case 'off':
			LED_B_value = '0';
			break;
		case 'on':
			LED_B_value = '1';
			break;
		case 'flash':
			LED_B_value = '2';
			break;
		case 'nochange':
			LED_B_value = '3';
			break;
  }
  var LED_C_value = Blockly.Robokid.valueToCode(this, 'LED_C_mode',
      Blockly.Robokid.ORDER_NONE) || '0';
    switch (LED_C_value) {
		case 'off':
			LED_C_value = '0';
			break;
		case 'on':
			LED_C_value = '1';
			break;
		case 'flash':
			LED_C_value = '2';
			break;
		case 'nochange':
			LED_C_value = '3';
			break;
  }
  var LED_D_value = Blockly.Robokid.valueToCode(this, 'LED_D_mode',
      Blockly.Robokid.ORDER_NONE) || '0';
    switch (LED_D_value) {
		case 'off':
			LED_D_value = '0';
			break;
		case 'on':
			LED_D_value = '1';
			break;
		case 'flash':
			LED_D_value = '2';
			break;
		case 'nochange':
			LED_D_value = '3';
			break;
  }
  
  var code = 'leds ' + LED_A_value  + ' ' + LED_B_value + ' ' + LED_C_value + 
			' ' + LED_D_value +';\n';

	return code;
};


Blockly.Robokid.set_speed = function() {
  // 
  var argument0 = Blockly.Robokid.valueToCode(this, 'Motor_L',
      Blockly.Robokid.ORDER_ASSIGNMENT) || '0';
	if (argument0 > 100) {
		argument0 = '0';
	}
	var argument1 = Blockly.Robokid.valueToCode(this, 'Motor_R',
      Blockly.Robokid.ORDER_ASSIGNMENT) || '0';
	  
	var code;
	code = 'speed ' + argument0 + ' ' + argument1 + ';\n';
	return code;
};

Blockly.Robokid.motors = function() {
  // 
	var left_mode = Blockly.Robokid.valueToCode(this, 'left_motor',
         Blockly.Robokid.ORDER_NONE) || '0';
    switch (left_mode) {
		case 'off':
			left_mode = '0';
			break;
		case 'forward':
			left_mode = '1';
			break;
		case 'backward':
			left_mode = '2';
			break;
  }
  	var right_mode = Blockly.Robokid.valueToCode(this, 'right_motor',
         Blockly.Robokid.ORDER_NONE) || '0';
      switch (right_mode) {
		case 'off':
			right_mode = '0';
			break;
		case 'forward':
			right_mode = '1';
			break;
		case 'backward':
			right_mode = '2';
			break;
  }
   return 'motors ' + left_mode  + ' ' + right_mode +';\n';
};

Blockly.Robokid.read_sensor = function() {
  // 
  var code = (this.getTitleValue('SENSOR'));
  
  return ['Read', 0];
};

Blockly.Robokid.comment = function() {
  // Simple code comment which does not generate any code
  var code = (this.getTitleText('TEXT'));
  return '# ' + code + ';\n';
};

Blockly.Robokid.ubasic_for = function() {
  // For loop.
  var variable0 = Blockly.Robokid.variableDB_.getName(
      this.getInputVariable('VAR'), Blockly.Variables.NAME_TYPE);
  var argument0 = Blockly.Robokid.valueToCode(this, 'FROM',
      Blockly.Robokid.ORDER_ASSIGNMENT) || '0';
  var argument1 = Blockly.Robokid.valueToCode(this, 'TO',
      Blockly.Robokid.ORDER_ASSIGNMENT) || '0';
  var branch0 = Blockly.Robokid.statementToCode(this, 'DO');
  var code;
  if (argument1.match(/^\w+$/)) {
    code = 'for ' + variable0 + '=' + argument0 + ' to ' + argument1 + 
        ' {\n' + branch0 + '};' + '\n';
  } else {
    // The end value appears to be more complicated than a simple variable.
    // Cache it to a variable to prevent repeated look-ups.
    var endVar = Blockly.Robokid.variableDB_.getDistinctName(
        variable0 + '_end', Blockly.Variables.NAME_TYPE);
    code = 'var ' + endVar + ' = ' + argument1 + ';\n' +
        'for ' + variable0 + ' = ' + argument0 + ' to ' +
              variable0 + ' <= ' + endVar + '; ' +
              variable0 + '++) {\n' +
        branch0 + '}\n';
  }
  return code;
};



