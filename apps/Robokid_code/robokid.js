/**
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * http://blockly.googlecode.com/
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
 * @fileoverview JavaScript for Blockly code demo (language-neutral).
 * @author fraser@google.com (Neil Fraser)
 */
 
// Supported languages.
BlocklyApps.LANGUAGES = ['en'];
BlocklyApps.LANG = BlocklyApps.getLang();

document.write('<script type="text/javascript" src="generated/' +
               BlocklyApps.LANG + '.js"></script>\n');
/**
 * Create a namespace for the application.
 */
var Code = {};
 
/**
 * List of tab names.
 * @private
 */
// var TABS_ = ['blocks', 'javascript', 'dart', 'python', 'xml'];
Code.TABS_ = ['blocks', 'robokid'];

Code.selected = 'blocks';

Code.setDisplay = function() {
    var canvas = Blockly.mainWorkspace.getCanvas();
    canvas.addEventListener('blocklyWorkspaceChange', Code.renderContent, false);
	Code.selected = 'robokid';
	document.getElementById('content_robokid').style.display = 'block';
	Code.renderContent();
};

/**
 * Switch the visible pane when a tab is clicked.
 * @param {string} id ID of tab clicked.
 */
Code.tabClick = function(id) {
/*
  // If the XML tab was open, save and render the content.
  if (document.getElementById('tab_xml').className == 'tabon') {
    var xmlTextarea = document.getElementById('textarea_xml');
    var xmlText = xmlTextarea.value;
    var xmlDom = null;
    try {
      xmlDom = Blockly.Xml.textToDom(xmlText);
    } catch (e) {
      var q =
          window.confirm(MSG_BAD_XML.replace('%1', e));
      if (!q) {
        // Leave the user on the XML tab.
        return;
      }
    }
    if (xmlDom) {
      Blockly.mainWorkspace.clear();
      Blockly.Xml.domToWorkspace(Blockly.mainWorkspace, xmlDom);
    }
  }

  // Deselect all tabs and hide all panes.
  for (var x in Code.TABS_) {
    var name = Code.TABS_[x];
    document.getElementById('tab_' + name).className = 'taboff';
    document.getElementById('content_' + name).style.display = 'none';
  }

  // Select the active tab.
  Code.selected = id.replace('tab_', '');
  document.getElementById(id).className = 'tabon';
  // Show the selected pane.
  var content = document.getElementById('content_' + Code.selected);
  Code.content.style.display = 'block';
  renderContent();   */
};

/**
 * Populate the currently selected pane with content generated from the blocks.
 */
Code.renderContent = function() {
  var content = document.getElementById('content_' + Code.selected);
  // Initialize the pane.
  if (content.id == 'content_blocks') {
    // If the workspace was changed by the XML tab, Firefox will have performed
    // an incomplete rendering due to Blockly being invisible.  Rerender.
    Blockly.mainWorkspace.renderBlocks();
  } else if (content.id == 'content_robokid') {
    code = Blockly.Robokid.workspaceToCode();
    content.innerHTML = '';
    content.appendChild(document.createTextNode(code));
	// get character count of code
 	var c_count = document.getElementById('chr_count');
	c_count.textContent = '';
	c_count.textContent = code.length; 	
	// count number of lines
	var l_count = document.getElementById('line_count');
	nos_chars = code.length;
	nos_lines = 0;
	for (var i=0 ; i < nos_chars ; i++) {
		if (code.charAt(i) =='\n') {
			nos_lines++;
		}
	}
	l_count.textContent = '';
	l_count.textContent = nos_lines; 		
	if (typeof prettyPrintOne == 'function') {
      code = content.innerHTML;
      code = prettyPrintOne(code, 'c');
      content.innerHTML = code;
    }
  }
};

/**
 * Initialize Blockly.  Called on page load.
 * @param {!Blockly} blockly Instance of Blockly from iframe.
 */
function init(blockly) {
  window.Blockly = blockly;

  BlocklyApps.init();
  
  // Add to reserved word list: Local variables in execution environment (runJS)
  // and the infinite loop detection function.
  Blockly.Robokid.addReservedWords('code,timeouts,checkTimeout');

  // Make the 'Blocks' tab line up with the toolbox.
  if (Blockly.Toolbox.width) {
    document.getElementById('tab_blocks').style.minWidth =
     (Blockly.Toolbox.width - 38) + 'px';
    // Account for the 19 pixel margin and on each side.
  }

    BlocklyApps.loadBlocks('');

  if ('BlocklyStorage' in window) {
    // Hook a save function onto unload.
    BlocklyStorage.backupOnUnload();
  }
  
// Lazy-load the syntax-highlighting.
  window.setTimeout(BlocklyApps.importPrettify, 1);
  
  Code.selected  = 'robokid';
  Code.setDisplay();
}

/**
 * Execute the user's code.
 * Just a quick and dirty eval.  Catch infinite loops.
 */
Code.runJS = function() {
  Blockly.JavaScript.INFINITE_LOOP_TRAP = '  checkTimeout();\n';
  var timeouts = 0;
  var checkTimeout = function() {
    if (timeouts++ > 1000000) {
      throw MSG_TIMEOUT;
    }
  };
  var code = Blockly.Generator.workspaceToCode('JavaScript');
  Blockly.JavaScript.INFINITE_LOOP_TRAP = null;
  try {
    eval(code);
  } catch (e) {
    alert(MSG_BAD_CODE.replace('%1', e));
  }
};

/* window.addEventListener('load', Code.init);  */

/**
 * Discard all blocks from the workspace.
 */ 
Code.discard = function() {
  var count = Blockly.mainWorkspace.getAllBlocks().length;
  if (count < 2 ||
      window.confirm('Delete all ' + count + ' blocks?')) {
    Blockly.mainWorkspace.clear();
    window.location.hash = '';
  }
};

Code.highlight = function() {

  var content = document.getElementById('content_robokid');

  code = Blockly.Robokid.workspaceToCode();
  content.innerHTML = '';
  content.appendChild(document.createTextNode(code));

  code = content.innerHTML;
  content.innerHTML = code;
};
