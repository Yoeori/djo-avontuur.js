//Handles-the-on-screen-console.
var Console = function(element) {
  this.element = element;
  this.lines = [];
  this.disableWriting = false;
  this.currentConsoleInput = false;
  this.currentConsoleLine = "";
  this.skipDelay = false;
}
Console.prototype = {

  writeLine : function(line) {
    if(!this.disableWriting) {
      if(!this.element.innerHTML.endsWith("\n"))
        this.element.innerHTML += "\n";
      this.element.innerHTML += line + "\n";
    }
  },

  writeLinesOnDelay : function(delay, lines, callback) {
    if(lines.length > 0) {
      this.writeLine(lines[0]);
      lines.splice(0, 1);

      if(lines.length === 0) {
        if(typeof callback === "function")
          callback();
      } else {
        _this = this;
        setTimeout(function() {
          _this.writeLinesOnDelay(delay, lines, callback)
        }, this.skipDelay ? 0 : delay*1000);
      }
    }
    return;
  },

  write : function(text) {
    if(!this.disableWriting)
      this.element.innerHTML += text;
  },

  empty : function() {
    if(!this.disableWriting)
      this.element.innerHTML = "";
  },

  createInputOnLastLine : function(callback) {
    if(this.element.innerHTML.endsWith("\n"))
      this.element.innerHTML = this.element.innerHTML.substring(0, this.element.innerHTML.length-1);
    
    SplittedLines = this.element.innerHTML.split("\n");
    this.currentConsoleLine = SplittedLines[SplittedLines.length-1];
    this.currentConsoleInput = new ConsoleInput(this, callback);
    this.currentConsoleInput.init();
  },
  
  onUpdateInputLine : function(text) {
    if(this.currentConsoleInput !== false) {
      SplittedLines = this.element.innerHTML.split("\n");
      SplittedLines[SplittedLines.length-1] = this.currentConsoleLine + text;
      this.element.innerHTML = SplittedLines.join("\n");
    } else {
      console.log("tried updating input line even tough there is no input line..");
    }
  },
  
  onInputEnd : function() {
    this.currentConsoleInput = false;
    this.currentConsoleLine = "";
  }

};
