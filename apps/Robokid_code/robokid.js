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
 * @fileoverview JavaScript for Blockly code demo (langaue-neutral).
 * @author fraser@google.com (Neil Fraser)
 */

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
  } else if (content.id == 'content_xml') {
    var xmlTextarea = document.getElementById('textarea_xml');
    var xmlDom = Blockly.Xml.workspaceToDom(Blockly.mainWorkspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);
    xmlTextarea.value = xmlText;
    xmlTextarea.focus();
/*  } else if (content.id == 'content_javascript') {
    content.innerHTML = Blockly.Generator.workspaceToCode('JavaScript');
  } else if (content.id == 'content_dart') {
    content.innerHTML = Blockly.Generator.workspaceToCode('Dart');
  } else if (content.id == 'content_python') {
    content.innerHTML = Blockly.Generator.workspaceToCode('Python');  */
  } else if (content.id == 'content_robokid') {
    content.innerHTML = Blockly.Generator.workspaceToCode('Robokid');
  }
};

/**
 * Initialize Blockly.  Called on page load.
 * @param {!Blockly} blockly Instance of Blockly from iframe.
 */
Code.init = function(blockly) {
  window.Blockly = blockly;

  // Add to reserved word list: Local variables in execution evironment (runJS)
  // and the infinite loop detection function.
  Blockly.Robokid.addReservedWords('code,timeouts,checkTimeout');

  // Make the 'Blocks' tab line up with the toolbox.
  if (Blockly.Toolbox) {
    window.setTimeout(function() {
        document.getElementById('tab_blocks').style.minWidth =
            (Blockly.Toolbox.width - 38) + 'px';
            // Account for the 19 pixel margin and on each side.
    }, 1);
  }

  if ('BlocklyStorage' in window) {
    // An href with #key trigers an AJAX call to retrieve saved blocks.
    if (window.location.hash.length > 1) {
      BlocklyStorage.retrieveXml(window.location.hash.substring(1));
    } else {
      // Restore saved blocks in a separate thread so that subsequent
      // initialization is not affected from a failed load.
      window.setTimeout(BlocklyStorage.restoreBlocks, 0);
    }
    // Hook a save function onto unload.
    BlocklyStorage.backupOnUnload();
  } else {
    document.getElementById('linkButton').className = 'disabled';
  };

//  tabClick('tab_' + selected);
  
  Code.selected  = 'robokid';
//  auto_save_and_restore_blocks();
  Code.setDisplay();
};

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

/**
 * Discard all blocks from the workspace.
 */
Code.discard = function() {
  var count = Blockly.mainWorkspace.getAllBlocks().length;
  if (count < 2 ||
      window.confirm(BlocklyApps.getMsg('Code_discard').replace('%1', count))) {
    Blockly.mainWorkspace.clear();
    window.location.hash = '';
  }
};

