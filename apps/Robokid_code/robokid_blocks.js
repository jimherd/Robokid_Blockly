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
		.appendTitle('Comment : ')
		.appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
        'media/quote0.png', 12, 12))
        .appendTitle(new Blockly.FieldTextInput(''), 'TEXT')
        .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
        'media/quote1.png', 12, 12));
  }
};

Blockly.Language.display = {
  // show string on 2-character display on the robot
  category: Blockly.LANG_CATEGORY_ROBOKID,
  helpUrl: Blockly.LANG_ROBOKID_READ_SENSOR_HELPURL,
  init: function() {
    this.setColour(210);
	this.setPreviousStatement(true);
	this.setNextStatement(true);
    this.setTooltip('Ouput a string to the robot display');
	
	var textInput = new Blockly.FieldTextInput('Text here');
	this.appendDummyInput()	
		.appendTitle('Display : ')
        .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
        'media/quote0.png', 12, 12))
        .appendTitle(new Blockly.FieldTextInput(''), 'TEXT')
        .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
        'media/quote1.png', 12, 12));
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
		.appendTitle("Wait ");
	this.appendDummyInput()
		.appendTitle(" \u00D7 0.1 sec ");
  }
};

Blockly.Language.read_sensor = {
  // Read a sensor and load into a variable
  category: Blockly.LANG_CATEGORY_ROBOKID,
//  helpUrl: Blockly.LANG_MATH_CHANGE_HELPURL,
  init: function() {
    this.setColour(210);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
	
	this.appendDummyInput()
		.appendTitle("Read sensor : ");
	var dropdown = new Blockly.FieldDropdown(this.SENSORS);
	this.appendDummyInput()	
		.appendTitle(dropdown, 'SENSOR');
	this.appendDummyInput()
		.appendTitle(" into variable ");
	this.appendDummyInput() 
        .appendTitle(new Blockly.FieldVariable(
        Blockly.LANG_MATH_CHANGE_TITLE_ITEM), 'VAR')

    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.LANG_MATH_CHANGE_TOOLTIP_1.replace('%1',
          thisBlock.getTitleValue('VAR'));
    });
  },
  getVars: function() {
	var variable = this.getTitleValue('VAR');
    return [variable];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
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

Blockly.Language.read_sysvar = {
  // Read an internal system variable
  category: Blockly.LANG_CATEGORY_ROBOKID,
//  helpUrl: Blockly.LANG_MATH_CHANGE_HELPURL,
  init: function() {
    this.setColour(210);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
	
	this.appendDummyInput()
		.appendTitle("Read system variable : ");
	var dropdown = new Blockly.FieldDropdown(this.SYSVARS);
	this.appendDummyInput()	
		.appendTitle(dropdown, 'SYSVAR');
	this.appendDummyInput()
		.appendTitle(" into variable ");
	this.appendDummyInput() 
        .appendTitle(new Blockly.FieldVariable(
        Blockly.LANG_MATH_CHANGE_TITLE_ITEM), 'VAR')

    // Assign 'this' to a variable for use in the tooltip closure below.
    var thisBlock = this;
    this.setTooltip(function() {
      return Blockly.LANG_MATH_CHANGE_TOOLTIP_1.replace('%1',
          thisBlock.getTitleValue('VAR'));
    });
  },
  getVars: function() {
	var variable = this.getTitleValue('VAR');
    return [variable];
  },
  renameVar: function(oldName, newName) {
    if (Blockly.Names.equals(oldName, this.getTitleValue('VAR'))) {
      this.setTitleValue(newName, 'VAR');
    }
  }
};
	 
Blockly.Language.read_sysvar.SYSVARS =
    [[Blockly.LANG_SYSVAR_TIMER_TICK, '0'],
	 ];

Blockly.Language.print = {
  // Create a string made up of any number of elements of any type.
  category: Blockly.LANG_CATEGORY_ROBOKID,
  helpUrl: Blockly.LANG_TEXT_JOIN_HELPURL,
  init: function() {
    this.setColour(210);
	this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.appendValueInput('ADD0')
        .appendTitle('Print to USB connection ');
    this.appendValueInput('ADD1');
    this.setMutator(new Blockly.Mutator(['print_create_join_item']));
    this.setTooltip(Blockly.LANG_TEXT_JOIN_TOOLTIP_1);
    this.itemCount_ = 2;
  },
  mutationToDom: function() {
    var container = document.createElement('mutation');
    container.setAttribute('items', this.itemCount_);
    return container;
  },
  domToMutation: function(xmlElement) {
    for (var x = 0; x < this.itemCount_; x++) {
      this.removeInput('ADD' + x);
    }
    this.itemCount_ = window.parseInt(xmlElement.getAttribute('items'), 10);
    for (var x = 0; x < this.itemCount_; x++) {
      var input = this.appendValueInput('ADD' + x);
      if (x == 0) {
        input.appendTitle('Print to USB connection ');
      }
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
          'media/quote0.png', 12, 12))
          .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
          'media/quote1.png', 12, 12));
    }
  },
  decompose: function(workspace) {
    var containerBlock = new Blockly.Block(workspace,
                                           'print_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var x = 0; x < this.itemCount_; x++) {
      var itemBlock = new Blockly.Block(workspace, 'print_create_join_item');
      itemBlock.initSvg();
      connection.connect(itemBlock.previousConnection);
      connection = itemBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Disconnect all input blocks and remove all inputs.
    if (this.itemCount_ == 0) {
      this.removeInput('EMPTY');
    } else {
      for (var x = this.itemCount_ - 1; x >= 0; x--) {
        this.removeInput('ADD' + x);
      }
    }
    this.itemCount_ = 0;
    // Rebuild the block's inputs.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    while (itemBlock) {
      var input = this.appendValueInput('ADD' + this.itemCount_);
      if (this.itemCount_ == 0) {
        input.appendTitle('Print to USB connection ');
      }
      // Reconnect any child blocks.
      if (itemBlock.valueConnection_) {
        input.connection.connect(itemBlock.valueConnection_);
      }
      this.itemCount_++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
    if (this.itemCount_ == 0) {
      this.appendDummyInput('EMPTY')
          .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
          'media/quote0.png', 12, 12))
          .appendTitle(new Blockly.FieldImage(Blockly.pathToBlockly +
          'media/quote1.png', 12, 12));
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var itemBlock = containerBlock.getInputTargetBlock('STACK');
    var x = 0;
    while (itemBlock) {
      var input = this.getInput('ADD' + x);
      itemBlock.valueConnection_ = input && input.connection.targetConnection;
      x++;
      itemBlock = itemBlock.nextConnection &&
          itemBlock.nextConnection.targetBlock();
    }
  }
};

Blockly.Language.print_container = {
  // Container.
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_TEXT_CREATE_JOIN_TITLE_JOIN);
    this.appendStatementInput('STACK');
    this.setTooltip(Blockly.LANG_TEXT_CREATE_JOIN_TOOLTIP_1);
    this.contextMenu = false;
  }
};

Blockly.Language.print_create_join_item = {
  // Add items.
  init: function() {
    this.setColour(210);
    this.appendDummyInput()
        .appendTitle(Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TITLE_ITEM);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip(Blockly.LANG_TEXT_CREATE_JOIN_ITEM_TOOLTIP);
    this.contextMenu = false;
  }
};

Blockly.Language.calibrate = {
  // Allow user to input a comment block
  category: Blockly.LANG_CATEGORY_ROBOKID,
//  helpUrl: Blockly.LANG_ROBOKID_READ_SENSOR_HELPURL,
  init: function() {
    this.setColour(210);
	this.setNextStatement(true);
	this.setPreviousStatement(true);
//	this.setInputsInline(true);		
    this.setTooltip('wait a number of tenths of a second');
	this.appendDummyInput()
		.appendTitle("Calibrate the robot movement");
  }
};

Blockly.Language.play_note = {
  // play a tone for a period of time
  category: Blockly.LANG_CATEGORY_ROBOKID,
//  helpUrl: Blockly.LANG_MATH_CHANGE_HELPURL,
  init: function() {
    this.setColour(210);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
	this.setInputsInline(true);
	this.setTooltip('Pick note and set duration in units of 1 millisecond');
	
	this.appendDummyInput()
		.appendTitle("Play note : ");
	var dropdown = new Blockly.FieldDropdown(this.NOTES);
	this.appendDummyInput()	
		.appendTitle(dropdown, 'NOTE');
	this.appendValueInput('duration')
		.setCheck(Number)
		.appendTitle(' for ');
	this.appendDummyInput()
		.appendTitle(" milliseconds");
  }
};

Blockly.Language.play_note.NOTES =
    [[Blockly.LANG_NOTE_C, '0'],
     [Blockly.LANG_NOTE_CS, '1'],
     [Blockly.LANG_NOTE_D, '2'],
     [Blockly.LANG_NOTE_DS, '3'],
     [Blockly.LANG_NOTE_E, '4'],
     [Blockly.LANG_NOTE_F, '5'],
     [Blockly.LANG_NOTE_FS, '6'],
     [Blockly.LANG_NOTE_G, '7'],
     [Blockly.LANG_NOTE_GS, '8'],
     [Blockly.LANG_NOTE_A, '9'], 
     [Blockly.LANG_NOTE_AS, '10'],
     [Blockly.LANG_NOTE_B, '11'],
     [Blockly.LANG_NOTE_s, '12']  
	];

