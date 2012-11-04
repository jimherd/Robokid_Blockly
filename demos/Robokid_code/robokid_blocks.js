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
		this.setColour(210);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setTooltip('Define state of the four LEDs on Robokid');
		this.setInputsInline(true);

		var LED_dropdown_A = new Blockly.FieldDropdown([['off','off'], ['on','on'], ['flash','flash'], ['nochange','nochange']]);	
		var LED_dropdown_B = new Blockly.FieldDropdown([['off','off'], ['on','on'], ['flash','flash'], ['nochange','nochange']]);
		var LED_dropdown_C = new Blockly.FieldDropdown([['off','off'], ['on','on'], ['flash','flash'], ['nochange','nochange']]);
		var LED_dropdown_D = new Blockly.FieldDropdown([['off','off'], ['on','on'], ['flash','flash'], ['nochange','nochange']]);
		
		this.appendDummyInput()
			.appendTitle("LEDS ");			
		this.appendDummyInput()	
			.appendTitle('LED_A:')
			.appendTitle(LED_dropdown_A, 'LED_A_mode');
		this.appendDummyInput()	
			.appendTitle('LED_B:')
			.appendTitle(LED_dropdown_B, 'LED_B_mode');
		this.appendDummyInput()	
			.appendTitle('LED_C:')
			.appendTitle(LED_dropdown_C, 'LED_C_mode');
		this.appendDummyInput()	
			.appendTitle('LED_D:')
			.appendTitle(LED_dropdown_D, 'LED_D_mode');
	}
 };
 
  Blockly.Language.set_speed = {
	category: Blockly.LANG_CATEGORY_ROBOKID,
	helpUrl: Blockly.LANG_ROBOKID_MOTORS_SET_HELPURL,
	init: function() {
		this.setColour(210);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setInputsInline(true);
		this.setTooltip('Set power on each of the two motors as a % of full power');
		
		this.appendDummyInput()
			.appendTitle("Set Speed ");
		this.appendValueInput('Motor_L')
			.setCheck(Number)
			.appendTitle("Left %");
		this.appendValueInput('Motor_R')
			.setCheck(Number)
			.appendTitle("Right %");		
	}
};

  Blockly.Language.motors = {
	category: Blockly.LANG_CATEGORY_ROBOKID,
	helpUrl: Blockly.LANG_ROBOKID_MOTORS_SET_HELPURL,
	init: function() {
		this.setColour(210);
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setInputsInline(true);	
		this.setTooltip('Command motors to go or stop');
		
		var left_motor = new Blockly.FieldDropdown([['off','off'], ['forward','forward'], ['backward','backward']]);		
		var right_motor = new Blockly.FieldDropdown([['off','off'], ['forward','forward'], ['backward','backward']]);
		
		this.appendDummyInput()
			.appendTitle("Motors ");	

		this.appendDummyInput()	
			.appendTitle('Left Motor:')
			.appendTitle(left_motor, 'left_motor');
		this.appendDummyInput()	
			.appendTitle('Right Motor:')
			.appendTitle(right_motor, 'right_motor');		
	}
};

Blockly.Language.read_sensor = {
  // get data from one of the analogue sensors on the robot
  category: Blockly.LANG_CATEGORY_ROBOKID,
  helpUrl: Blockly.LANG_ROBOKID_READ_SENSOR_HELPURL,
  init: function() {
    this.setColour(210);
    this.setOutput(true, Boolean);
    this.setTooltip('Read value from one of the robots 13 sensors');
	
    var dropdown = new Blockly.FieldDropdown(this.SENSORS);
	this.appendDummyInput()	
		.appendTitle(dropdown, 'SENSOR');
  }
};
	
Blockly.Language.read_sensor.SENSORS =
    [[Blockly.LANG_SENSOR_BATTERY_VOLTS, '0'],
     [Blockly.LANG_SENSOR_POT_3, '1'],
     [Blockly.LANG_SENSOR_POT_2, '2'],
     [Blockly.LANG_SENSOR_POT_1, '3'],
     [Blockly.LANG_SENSOR_PAD_SWL, '4'],
     [Blockly.LANG_SENSOR_PAD_SWR, '5'],	
     [Blockly.LANG_SENSOR_LINE_SENSOR_L, '6'],
     [Blockly.LANG_SENSOR_LINE_SENSOR_R, '7'],	 
     [Blockly.LANG_SENSOR_FRONT_SENSOR_L, '8'],	 
     [Blockly.LANG_SENSOR_FRONT_SENSOR_C, '9'],
     [Blockly.LANG_SENSOR_FRONT_SENSOR_R, '10'],
     [Blockly.LANG_SENSOR_WHEEL_SENSOR_L, '11'],	
     [Blockly.LANG_SENSOR_WHEEL_SENSOR_R, '12'],	
     [Blockly.LANG_SENSOR_REAR_SENSOR, '13']		 
	 ];

Blockly.Language.comment = {
  // Allow user to input a comment block
  category: Blockly.LANG_CATEGORY_ROBOKID,
  helpUrl: Blockly.LANG_ROBOKID_READ_SENSOR_HELPURL,
  init: function() {
    this.setColour(210);
	this.setPreviousStatement(true);
	this.setNextStatement(true);
    this.setTooltip('Comment for the code :: does not generate Robokid code');
	
	var textInput = new Blockly.FieldTextInput('Comment here');
	this.appendDummyInput()	
		.appendTitle('\u201C')
		.appendTitle(textInput, 'TEXT')
		.appendTitle('\u201D');
  }
};

Blockly.Language.text = {
  // Allow user to input a comment block
  category: Blockly.LANG_CATEGORY_ROBOKID,
  helpUrl: Blockly.LANG_ROBOKID_READ_SENSOR_HELPURL,
  init: function() {
    this.setColour(210);
	this.setPreviousStatement(true);
	this.setNextStatement(true);
    this.setTooltip('Ouput a string to the robot display');
	
	var textInput = new Blockly.FieldTextInput('Text here');
	this.appendDummyInput()	
		.appendTitle('\u201C')
		.appendTitle(textInput, 'TEXT')
		.appendTitle('\u201D');
  }
};

Blockly.Language.wait = {
  // Allow user to input a comment block
  category: Blockly.LANG_CATEGORY_ROBOKID,
//  helpUrl: Blockly.LANG_ROBOKID_READ_SENSOR_HELPURL,
  init: function() {
    this.setColour(210);
	this.setNextStatement(true);
	this.setPreviousStatement(true);
	this.setInputsInline(true);		
    this.setTooltip('wait a number of tenths of a second');
	
	this.appendValueInput('TIME')
		.setCheck(Number)
		.appendTitle("Wait (in units of 0.1sec)");
  }
};
