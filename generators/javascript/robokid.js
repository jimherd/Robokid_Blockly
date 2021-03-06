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

Blockly.JavaScript = Blockly.Generator.get('JavaScript');

Blockly.JavaScript.LEDS_set = function() {
  // 
  return 'LEDS_set' + '\n';
};

Blockly.JavaScript.motors_set = function() {
  // 
  return 'motors_set' + '\n';
};

Blockly.JavaScript.read_sensor = function() {
  // Boolean values true and false.
 var code = (this.getTitleValue('SENSOR'));
  
  return ['Read',0];
};

Blockly.JavaScript.comment = function() {
  // Simple code comment which does not generate any code
  return 'Comment' + '\n';
};


