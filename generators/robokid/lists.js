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
 * @fileoverview Generating Robokid for list blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

Blockly.Robokid = Blockly.Generator.get('Robokid');

Blockly.Robokid.lists_create_empty = function(block) {
  // Create an empty list.
  return ['[]', Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Robokid.lists_create_with = function(block) {
  // Create a list with any number of elements of any type.
  var code = new Array(block.itemCount_);
  for (var n = 0; n < block.itemCount_; n++) {
    code[n] = Blockly.Robokid.valueToCode(block, 'ADD' + n,
        Blockly.JavaScript.ORDER_NONE) || 'None';
  }
  code = '[' + code.join(', ') + ']';
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

Blockly.Robokid.lists_repeat = function(block) {
  // Create a list with one element repeated.
  var argument0 = Blockly.Robokid.valueToCode(block, 'ITEM',
      Blockly.JavaScript.ORDER_NONE) || 'None';
  var argument1 = Blockly.Robokid.valueToCode(block, 'NUM',
      Blockly.JavaScript.ORDER_MULTIPLICATIVE) || '0';
  var code = '[' + argument0 + '] * ' + argument1;
  return [code, Blockly.JavaScript.ORDER_MULTIPLICATIVE];
};

Blockly.Robokid.lists_length = function(block) {
  // Testing the length of a list is the same as for a string.
  return Blockly.Robokid.text_length.call(block);
};

Blockly.Robokid.lists_isEmpty = function(block) {
  // Testing a list for being empty is the same as for a string.
  return Blockly.Robokid.text_isEmpty.call(block);
};

Blockly.Robokid.lists_indexOf = function(block) {
  // Searching a list for a value is the same as search for a substring.
  return Blockly.Robokid.text_indexOf.call(block);
};

Blockly.Robokid.lists_getIndex = function(block) {
  // Indexing into a list is the same as indexing into a string.
  return Blockly.Robokid.text_charAt.call(block);
};

Blockly.Robokid.lists_setIndex = function(block) {
  // Set element at index.
  var argument0 = Blockly.Robokid.valueToCode(block, 'AT',
      Blockly.Robokid.ORDER_NONE) || '1';
  var argument1 = Blockly.Robokid.valueToCode(block, 'LIST',
      Blockly.Robokid.ORDER_MEMBER) || '[]';
  var argument2 = Blockly.Robokid.valueToCode(block, 'TO',
      Blockly.Robokid.ORDER_NONE) || 'None';
  // Blockly uses one-based indicies.
  if (argument0.match(/^\d+$/)) {
    // If the index is a naked number, decrement it right now.
    // Except we don't allow negative index like in Robokid.
    argument0 = Math.max(0, parseInt(argument0, 10) - 1);
  } else {
    // If the index is dynamic, decrement it in code.
    argument0 += ' - 1';
  }
  var code = argument1 + '[' + argument0 + '] = ' + argument2 + '\n';
  return code;
};
