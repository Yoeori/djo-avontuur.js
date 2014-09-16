/**
  * This uses https://github.com/bpeacock/key-to-charCode converted to non JQuery (Copyright 2013, Brian Peacock, MIT)
  * Handles keyboard events etc
  * @author Yoeri Otten
  *
  */
var Keyboard = {

  handlers : [],
  shouldPreventDefault : false,

  getCharFromKey : function(e) {
    /*** Convert to Char Code ***/
    var code = e.which;

    //Ignore Shift Key events & arrows
    var ignoredCodes = {
        16: true,
        37: true,
        38: true,
        39: true,
        40: true,
        20: true,
        17: true,
        18: true,
        91: true
    };

    if(ignoredCodes[code] === true) {
        return false;
    }

    //These are special cases that don't fit the ASCII mapping
    var exceptions = {
        186: 59, // ;
        187: 61, // =
        188: 44, // ,
        189: 45, // -
        190: 46, // .
        191: 47, // /
        192: 96, // `
        219: 91, // [
        220: 92, // \
        221: 93, // ]
        222: 39, // '
        //numeric keypad
        96: '0'.charCodeAt(0),
        97: '1'.charCodeAt(0),
        98: '2'.charCodeAt(0),
        99: '3'.charCodeAt(0),
        100: '4'.charCodeAt(0),
        101: '5'.charCodeAt(0),
        102: '6'.charCodeAt(0),
        103: '7'.charCodeAt(0),
        104: '8'.charCodeAt(0),
        105: '9'.charCodeAt(0)
    };

    if(exceptions[code] !== undefined) {
        code = exceptions[code];
    }

    var ch = String.fromCharCode(code);

    /*** Handle Shift ***/
    if(e.shiftKey) {
        var special = {
            1: '!',
            2: '@',
            3: '#',
            4: '$',
            5: '%',
            6: '^',
            7: '&',
            8: '*',
            9: '(',
            0: ')',
            ',': '<',
            '.': '>',
            '/': '?',
            ';': ':',
            "'": '"',
            '[': '{',
            ']': '}',
            '\\': '|',
            '`': '~',
            '-': '_',
            '=': '+'
        };

        if(special[ch] !== undefined) {
            ch = special[ch];
        }
    } else {
        ch = ch.toLowerCase();
    }

    return ch.charCodeAt(0);
  },

  onKeyPress : function(e) {
    key = this.getCharFromKey(e);
    value = "";

    var specialkeys = {
      8 : "backspace",
      13 : "enter"
    };
    

    if(this.shouldPreventDefault && (e.which < 112 || e.which > 123)) {
      e.preventDefault();
    }

    if(typeof specialkeys[key] !== "undefined") {
      value = specialkeys[key];
    } else {
      value = String.fromCharCode(key);
    }
    for(handler in this.handlers) {
      this.handlers[handler](value);
    }
  },

  registerKeyPressHandler : function(handler) {
   this.handlers.push(handler);
   return this.handlers.length-1;
  },

  unregisterKeyPressHandler : function(id) {
    if(typeof this.handlers[id] !== "undefined")
      this.handlers.splice(id, 1);
  }


};

document.documentElement.onkeydown = function(e) {
  Keyboard.onKeyPress(window.event ? window.event : e);
}
