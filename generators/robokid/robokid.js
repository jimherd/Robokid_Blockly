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
 * @fileoverview Generating Robokid for control blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

'use strict';

// Blockly.Robokid.robokid = {};

goog.provide('Blockly.Robokid.robokid');

goog.require('Blockly.Robokid');
 
// Blockly.Robokid = Blockly.Generator.get('Robokid');

Blockly.Robokid['LEDS_set'] = function(block) {
  // leds command for 4 LEDs on the Robokid robot
  // Todo : posible use of an array rather than individual variables
  
  var LED_A_value, LED_B_value, LED_C_value, LED_D_value;  
  
    switch (block.getTitleValue('LED_A_mode')) {
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

    switch (block.getTitleValue('LED_B_mode')) {
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

    switch (block.getTitleValue('LED_C_mode')) {
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

    switch (block.getTitleValue('LED_D_mode')) {
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

Blockly.Robokid['set_speed'] = function(block) {
  // 
  var argument0 = Blockly.Robokid.valueToCode(block, 'Motor_L',
      Blockly.Robokid.ORDER_NONE) || '0';
	if (argument0 > 100) {
		argument0 = '100';
	}
	if (argument0 < 0) {
		argument0 = '0';
	}	
	var argument1 = Blockly.Robokid.valueToCode(block, 'Motor_R',
      Blockly.Robokid.ORDER_NONE) || '0';
	if (argument1 > 100) {
		argument1 = '100';
	}
	if (argument1 < 0) {
		argument1 = '0';
	}		  
	var code = 'speed ' + argument0 + ' ' + argument1 + ';\n';
	return code;
};

Blockly.Robokid['motors'] = function(block) {
  // 
	var left_mode, right_mode;
    switch (block.getTitleValue('left_motor')) {
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

      switch (block.getTitleValue('right_motor')) {
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

Blockly.Robokid['comment'] = function(block) {
  // Simple code comment which does not generate any code
  var code = (block.getTitleValue('TEXT'));
  return '# ' + code + ';\n';
};

Blockly.Robokid['wait'] = function(block) {
  // 
  var argument0 = Blockly.Robokid.valueToCode(block, 'TIME',
      Blockly.Robokid.ORDER_NONE) || '0';
	if (argument0 > 255) {
		argument0 = '255';
	}
	var units = argument0 % 10;
	var tens = (argument0 - units)/10;
	var code;
	code = 'wait ' + argument0 + ';  # delay of ' + tens + '.' + units + ' seconds\n';
	return code;
};

Blockly.Robokid['display'] = function(block) {
  // Simple code comment which does not generate any code
  var code = (block.getTitleValue('TEXT'));
  return 'display \'' + code + '\';\n';
};

Blockly.Robokid['read_sensor'] = function(block) {
  // Read a sensor and assign to a variable
  var code = (block.getTitleValue('SENSOR'));
  var variable = (block.getTitleValue('VAR'));
  if (!variable.match(/^[a-z]$/)) {
      variable = 'ERROR: variable should be a single letter';
//	  promptName('test', '');
  } 
  return 'sense ' + code + ' ' + variable + ';\n';
};

Blockly.Robokid['read_sysvar'] = function(block) {
//Blockly.Robokid.read_sysvar = function() {
  // Read a sensor and assign to a variable
  var code = (block.getTitleValue('SYSVAR'));
  var variable = (block.getTitleValue('VAR'));
  if (!variable.match(/^[a-z]$/)) {
      variable = 'ERROR: variable should be a single letter';
//	  promptName('test', '');
  } 
  return 'read ' + code + ' ' + variable + ';\n';
};

Blockly.Robokid['print'] = function(block) {
//Blockly.Robokid.print = function() {
  // Create a string made up of any number of elements of any type.
  var code;
  if (block.itemCount_ == 0) {
//    return ['# empty print\n', Blockly.Robokid.ORDER_ATOMIC];
		return '# empty print\n';
  } else if (block.itemCount_ == 1) {
    var argument0 = Blockly.Robokid.valueToCode(block, 'ADD0',
        Blockly.Robokid.ORDER_UNARY_POSTFIX) || ' ';
    code = 'print ' +  argument0 + ';\n';
//    return [code, Blockly.Robokid.ORDER_UNARY_POSTFIX];
	return code;
  } else {
    code = [];
    code[0] = 'print ' + (Blockly.Robokid.valueToCode(block, 'ADD0',
        Blockly.Robokid.ORDER_NONE) || ' ');
    for (var n = 1; n < block.itemCount_; n++) {
      code[n] = ',' + (Blockly.Robokid.valueToCode(block, 'ADD' + n,
          Blockly.Robokid.ORDER_NONE) || ' ');
    }
	code[block.itemCount_] = ';\n';
    code = code.join('');
//    return [code, Blockly.Robokid.ORDER_UNARY_POSTFIX];
	return code;
  }
};

Blockly.Robokid['calibrate'] = function(block) {
//Blockly.Robokid.calibrate = function() {
  // Execute calibrate function
  return 'cal;' + ' # read notes about calibrate before using\n';
};

Blockly.Robokid['play_note'] = function(block) {
//Blockly.Robokid.play_note = function() {
  // Read a sensor and assign to a variable
  var code = (block.getTitleValue('NOTE'));
  var argument0 = Blockly.Robokid.valueToCode(block, 'duration',
      Blockly.Robokid.ORDER_NONE) || '0';
	  return 'note ' + code + ' ' + argument0 + ';\n';
};

Blockly.Robokid['codeline'] = function(block) {
//Blockly.Robokid.codeline = function() {
  // Simple code comment which does not generate any code
  var code = (block.getTitleValue('TEXT'));
  return code + ';\n';
};