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
 * @fileoverview Helper functions for generating Robokid for blocks.
 * @author fraser@google.com (Neil Fraser)
 * Due to the frequency of long strings, the 80-column wrap rule need not apply
 * to language files.
 */

Blockly.Robokid = Blockly.Generator.get('Robokid');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
 
 if (!Blockly.Robokid.RESERVED_WORDS_) {
  Blockly.Dart.RESERVED_WORDS_ = '';
}

Blockly.Robokid.RESERVED_WORDS_ +=
    // import keyword
    // print ','.join(keyword.kwlist)
    // http://docs.Python.org/reference/lexical_analysis.html#keywords
    'and,as,assert,break,class,continue,def,del,elif,else,except,exec,finally,for,from,global,if,import,in,is,lambda,not,or,pass,print,raise,return,try,while,with,yield,' +
    //http://docs.Python.org/library/constants.html
    'True,False,None,NotImplemented,Ellipsis,__debug__,quit,exit,copyright,license,credits,' +
    // http://docs.Python.org/library/functions.html
    'abs,divmod,input,open,staticmethod,all,enumerate,int,ord,str,any,eval,isinstance,pow,sum,basestring,execfile,issubclass,print,super,bin,file,iter,property,tuple,bool,filter,len,range,type,bytearray,float,list,raw_input,unichr,callable,format,locals,reduce,unicode,chr,frozenset,long,reload,vars,classmethod,getattr,map,repr,xrange,cmp,globals,max,reversed,zip,compile,hasattr,memoryview,round,__import__,complex,hash,min,set,apply,delattr,help,next,setattr,buffer,dict,hex,object,slice,coerce,dir,id,oct,sorted,intern';

/**
 * Order of operation ENUMs.
 * http://docs.Robokid.org/reference/expressions.html#summary
 */
Blockly.Robokid.ORDER_ATOMIC = 0;            // 0 "" ...
Blockly.Robokid.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
Blockly.Robokid.ORDER_STRING_CONVERSION = 1; // `expression...`
Blockly.Robokid.ORDER_MEMBER = 2;            // . []
Blockly.Robokid.ORDER_FUNCTION_CALL = 2;     // ()
Blockly.Robokid.ORDER_EXPONENTIATION = 3;    // **
Blockly.Robokid.ORDER_UNARY_SIGN = 4;        // + -
Blockly.Robokid.ORDER_BITWISE_NOT = 4;       // ~
Blockly.Robokid.ORDER_MULTIPLICATIVE = 5;    // * / // %
Blockly.Robokid.ORDER_ADDITIVE = 6;          // + -
Blockly.Robokid.ORDER_BITWISE_SHIFT = 7;     // << >>
Blockly.Robokid.ORDER_BITWISE_AND = 8;       // &
Blockly.Robokid.ORDER_BITWISE_XOR = 9;       // ^
Blockly.Robokid.ORDER_BITWISE_OR = 10;       // |
Blockly.Robokid.ORDER_RELATIONAL = 11;       // in, not in, is, is not, <, <=, >, >=, <>, !=, ==
Blockly.Robokid.ORDER_LOGICAL_NOT = 12;      // not
Blockly.Robokid.ORDER_LOGICAL_AND = 13;      // and
Blockly.Robokid.ORDER_LOGICAL_OR = 14;       // or
Blockly.Robokid.ORDER_CONDITIONAL = 15;      // if else
Blockly.Robokid.ORDER_LAMBDA = 16;           // lambda
Blockly.Robokid.ORDER_NONE = 99;             // (...)

/**
 * Initialise the database of variable names.
 */
Blockly.Robokid.init = function() {
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Robokid.definitions_ = {};

  if (Blockly.Variables) {
    if (!Blockly.Robokid.variableDB_) {
      Blockly.Robokid.variableDB_ =
          new Blockly.Names(Blockly.Robokid.RESERVED_WORDS_.split(','));
    } else {
      Blockly.Robokid.variableDB_.reset();
    }

    var defvars = [];
    var variables = Blockly.Variables.allVariables();
    for (var x = 0; x < variables.length; x++) {
      defvars[x] = Blockly.Robokid.variableDB_.getDistinctName(variables[x],
          Blockly.Variables.NAME_TYPE) + ' = None';
    }
    Blockly.Robokid.definitions_['variables'] = defvars.join('\n');
  }
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Robokid.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var definitions = [];
  for (var name in Blockly.Robokid.definitions_) {
    definitions.push(Blockly.Robokid.definitions_[name]);
  }
  return definitions.join('\n') + '\n\n' + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Robokid.scrubNakedValue = function(line) {
  return line + '\n';
};

/**
 * Encode a string as a properly escaped Robokid string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Robokid string.
 * @private
 */
Blockly.Robokid.quote_ = function(string) {
  // TODO: This is a quick hack.  Replace with goog.string.quote
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n')
                 .replace(/\%/g, '\\%')
                 .replace(/'/g, '\\\'');
  return '\'' + string + '\'';
};

/**
 * Common tasks for generating Robokid from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Robokid code created for this block.
 * @return {string} Robokid code with comments and subsequent blocks added.
 * @private
 */
Blockly.Robokid.scrub_ = function(block, code) {
  if (code === null) {
    // Block has handled code generation itself.
    return '';
  }
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    if (comment) {
      commentCode += Blockly.Generator.prefixLines(comment, '# ') + '\n';
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var x = 0; x < block.inputList.length; x++) {
      if (block.inputList[x].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[x].targetBlock();
        if (childBlock) {
          var comment = Blockly.Generator.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Generator.prefixLines(comment, '# ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = this.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

Blockly.Robokid.get_label = function() {

}
