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
		this.appendTitle('LEDS');
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.appendTitle('LED_A:');
		var LED_dropdown_A = new Blockly.FieldDropdown([['off','off'], ['on','on'], ['flash','flash'], ['nochange','nochange']]);
		this.appendTitle(LED_dropdown_A, 'LED_A_mode');
		this.appendTitle('LED_B:');
		var LED_dropdown_B = new Blockly.FieldDropdown([['off','off'], ['on','on'], ['flash','flash'], ['nochange','nochange']]);
		this.appendTitle(LED_dropdown_B, 'LED_B_mode');
		this.appendTitle('LED_C:');
		var LED_dropdown_C = new Blockly.FieldDropdown([['off','off'], ['on','on'], ['flash','flash'], ['nochange','nochange']]);
		this.appendTitle(LED_dropdown_C, 'LED_C_mode');
		this.appendTitle('LED_D:');
		var LED_dropdown_D = new Blockly.FieldDropdown([['off','off'], ['on','on'], ['flash','flash'], ['nochange','nochange']]);
		this.appendTitle(LED_dropdown_D, 'LED_D_mode');
		this.setTooltip('Define state of the four LEDs on Robokid');
	}
 };
 
  Blockly.Language.set_speed = {
	category: Blockly.LANG_CATEGORY_ROBOKID,
	helpUrl: Blockly.LANG_ROBOKID_MOTORS_SET_HELPURL,
	init: function() {
		this.setColour(210);
		this.appendTitle('Set speed');
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setInputsInline(true);
		this.appendInput('Left %', Blockly.INPUT_VALUE, 'MOTOR_LEFT', null);
		this.appendInput('Right %', Blockly.INPUT_VALUE, 'MOTOR_RIGHT', null);
		this.setTooltip('Set power on each of the two motors as a % of full power');
	}
};

  Blockly.Language.motors = {
	category: Blockly.LANG_CATEGORY_ROBOKID,
	helpUrl: Blockly.LANG_ROBOKID_MOTORS_SET_HELPURL,
	init: function() {
		this.setColour(210);
		this.appendTitle('Motors');
		this.setPreviousStatement(true);
		this.setNextStatement(true);
		this.setInputsInline(true);	
		this.appendTitle('Left motor :');		
		var left_motor = new Blockly.FieldDropdown([['off','off'], ['forward','forward'], ['backward','backward']]);
		this.appendTitle(left_motor, 'left_motor');
		this.appendTitle('Right motor :');	
		var right_motor = new Blockly.FieldDropdown([['off','off'], ['forward','forward'], ['backward','backward']]);
		this.appendTitle(right_motor, 'right_motor');
		this.setTooltip('Command motors to go or stop');
	}
};

Blockly.Language.read_sensor = {
  // get data from one of the analogue sensors on the robot
  category: Blockly.LANG_CATEGORY_ROBOKID,
  helpUrl: Blockly.LANG_ROBOKID_READ_SENSOR_HELPURL,
  init: function() {
    this.setColour(210);
    this.setOutput(true, Boolean);
    var dropdown = new Blockly.FieldDropdown(this.SENSORS);
    this.appendTitle(dropdown, 'SENSOR');
    this.setTooltip('Read value from one of the robots 13 sensors');
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
    this.appendTitle('Comment');
	this.setPreviousStatement(true);
	this.setNextStatement(true);
	this.appendTitle('\u201C');
    this.appendTitle(new Blockly.FieldTextInput('Comment here'), 'TEXT');
    this.appendTitle('\u201D');
    this.setTooltip('Comment for the code :: does not generate Robokid code');
  }
};

Blockly.Language.ubasic_for = {
  // For loop.
  category: Blockly.LANG_CATEGORY_ROBOKID,
  helpUrl: Blockly.LANG_CONTROLS_FOR_HELPURL,
  init: function() {
    this.setColour(210);
    this.appendTitle(Blockly.LANG_CONTROLS_FOR_TITLE_COUNT);
    this.appendInput(Blockly.LANG_CONTROLS_FOR_INPUT_WITH, Blockly.LOCAL_VARIABLE, 'VAR').setText(Blockly.LANG_CONTROLS_FOR_INPUT_VAR);
    this.appendInput(Blockly.LANG_CONTROLS_FOR_INPUT_FROM, Blockly.INPUT_VALUE, 'FROM', Number);
    this.appendInput(Blockly.LANG_CONTROLS_FOR_INPUT_TO, Blockly.INPUT_VALUE, 'TO', Number);
    this.appendInput(Blockly.LANG_CONTROLS_FOR_INPUT_DO, Blockly.NEXT_STATEMENT, 'DO');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.LANG_CONTROLS_FOR_TOOLTIP_1.replace('%1',
          thisBlock.getInputVariable('VAR'));
    });
  },
  getVars: function() {
    return [this.getInputVariable('VAR')];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getInputVariable('VAR'))) {
      this.setInputVariable('VAR', newName);
    }
  }
};
 