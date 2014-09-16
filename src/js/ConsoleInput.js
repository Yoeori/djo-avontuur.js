var ConsoleInput = function(ConsoleInstance, callback) {
  this.consoleInstance = ConsoleInstance;
  this.callback = callback;
  this.currentText = "";
  this.keyboardHandlerId = Keyboard.registerKeyPressHandler(function(key) {

  });

  Keyboard.shouldPreventDefault = true;

}
ConsoleInput.prototype = {

  init : function() {

    var ConsoleInputInstance = this;

    this.underScoreInterval = setInterval(function() {
      if(ConsoleInputInstance.currentText.endsWith("_"))
        ConsoleInputInstance.currentText = ConsoleInputInstance.currentText.substr(0, ConsoleInputInstance.currentText.length-1);
      else
        ConsoleInputInstance.currentText += "_";
      ConsoleInputInstance.update();
    }, 500);

    this.keyboardHandlerId = Keyboard.registerKeyPressHandler(function(key) {
      ConsoleInputInstance.onKey(key);
    });
  },

  update : function() {
    this.consoleInstance.onUpdateInputLine(this.currentText);
  },

  onKey : function(key) {

    if(this.currentText.endsWith("_")) {
      this.currentText = this.currentText.substr(0, this.currentText.length-1);
      shouldAddUnderscore = true;
    } else {
      shouldAddUnderscore = false;

    }
    if(key == "backspace") {
      this.currentText = this.currentText.substring(0, this.currentText.length-1);
    } else if(key == "enter") {
      this.update();

      this.kill();
      return;
    } else {
      this.currentText += key;
    }

    if(shouldAddUnderscore == true)
      this.currentText += "_";

    this.update();
  },

  kill : function() {
    Keyboard.unregisterKeyPressHandler(this.keyboardHandlerId);
    Keyboard.shouldPreventDefault = false;
    clearInterval(this.underScoreInterval);
    this.consoleInstance.onInputEnd();
    this.callback(this.currentText);
  }

}
