Blockly.Blocks['player_move_up'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("MOVE UP");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
this.setTooltip("");
this.setHelpUrl("");
  }
};

Blockly.Blocks['player_move_left'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("MOVE LEFT");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
this.setTooltip("");
this.setHelpUrl("");
  }
};

Blockly.Blocks['player_move_right'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("MOVE RIGHT");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
this.setTooltip("");
this.setHelpUrl("");
  }
};

Blockly.Blocks['player_move_down'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("MOVE DOWN");
    this.setInputsInline(false);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(210);
this.setTooltip("");
this.setHelpUrl("");
  }
};

Blockly.JavaScript['player_move_up'] = function(block) {
  var code = 'player.moveUp();\n';
  return code;
};

Blockly.JavaScript['player_move_left'] = function(block) {
  var code = 'player.moveLeft();\n';
  return code;
};

Blockly.JavaScript['player_move_down'] = function(block) {
  var code = 'player.moveDown();\n';
  return code;
};

Blockly.JavaScript['player_move_right'] = function(block) {
  var code = 'player.moveRight();\n';
  return code;
};
