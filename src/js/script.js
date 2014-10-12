/*
 _    _ ______ _______   _____       _  ____        __      ______  _   _ _______ _    _ _    _ _____
| |  | |  ____|__   __| |  __ \     | |/ __ \      /\ \    / / __ \| \ | |__   __| |  | | |  | |  __ \
| |__| | |__     | |    | |  | |    | | |  | |    /  \ \  / / |  | |  \| |  | |  | |  | | |  | | |__) |
|  __  |  __|    | |    | |  | |_   | | |  | |   / /\ \ \/ /| |  | | . ` |  | |  | |  | | |  | |  _  /
| |  | | |____   | |    | |__| | |__| | |__| |  / ____ \  / | |__| | |\  |  | |  | |__| | |__| | | \ \
|_|  |_|______|  |_|    |_____/ \____/ \____/  /_/    \_\/   \____/|_| \_|  |_|   \____/ \____/|_|  \_\

In webvorm! (In de lokale tong ook wel 'HTML5' genoemd)
*/

var Adventure = {

  name : "",
  age : 0,

  start : function() {
    var self = this;

    this.name = "";
    this.age = 0;
    this.terminal = new Console(document.getElementById("console"));
    this.terminal.empty();

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
	  	 this.terminal.writeLine("Omdat het ik jouw toetsenbord niet kan openen moet\nje het helaas zonder dit fantastische avontuur doen.");
	  	 return;
   	}

    this.terminal.writeLinesOnDelay(0.1, [
      " _    _ ______ _______   _____       _  ____        __      ______  _   _ _______ _    _ _    _ _____",
      "| |  | |  ____|__   __| |  __ \\     | |/ __ \\      /\\ \\    / / __ \\| \\ | |__   __| |  | | |  | |  __ \\ ",
      "| |__| | |__     | |    | |  | |    | | |  | |    /  \\ \\  / / |  | |  \\| |  | |  | |  | | |  | | |__) |",
      "|  __  |  __|    | |    | |  | |_   | | |  | |   / /\\ \\ \\/ /| |  | | . ` |  | |  | |  | | |  | |  _  / ",
      "| |  | | |____   | |    | |__| | |__| | |__| |  / ____ \\  / | |__| | |\\  |  | |  | |__| | |__| | | \\ \\ ",
      "|_|  |_|______|  |_|    |_____/ \\____/ \\____/  /_/    \\_\\/   \\____/|_| \\_|  |_|   \\____/ \\____/|_|  \\_\\ "
    ], function() {
      self.askNameQuestion();
    });

  },

  askNameQuestion : function() {
    var self = this;

    self.terminal.writeLinesOnDelay(1, [
      "",
      "Hallo speler, wat is jouw naam? "
    ], function() {
      self.askForName();
    });

  },

  askForName : function() {
    var self = this;

    this.terminal.createInputOnLastLine(function(name) {
      self.terminal.writeLine("Hallo, " + name);
      self.name = name;
      setTimeout(function() {
        self.askForAge();
      }, 1 * 1000);
    });
  },

  askForAge : function() {
    var self = this;

    this.terminal.writeLine("Hoe oud ben je? ");
    this.terminal.createInputOnLastLine(function(age) {
      self.handleAge(age);
    });
  },

  handleAge : function(age) {
    var self = this;

    if(age == parseInt(age)) {
      if(age > 10 && age < 18) {
        self.terminal.writeLine("Jij hebt de perfecte leeftijd voor DJO!");
      } else if(age < 11) {
        self.terminal.writeLine("Over " + (11 - parseInt(age)) + " jaar kan jij ook naar DJO!");
      } else {
        self.terminal.writeLinesOnDelay(1, [
          "Misschien ken je een jonger persoon die djo leuk zou vinden.",
          "Of je kan eens een kijkje nemen bij Bitlair!"
        ], function() {
          self.startGame();
        });
        return;
      }
      self.startGame();
    } else {
      self.terminal.writeLine("Voer je leeftijd aub in cijfers in.");
      setTimeout(function() {
        self.askForAge();
      }, 1 * 1000);
    }
  },

  startGame : function() {
    var self = this;

    this.terminal.writeLinesOnDelay(1, [
      "",
      "-----HET SPEL BEGINT-----\n",
      "Je bevindt je op de DJO LAN-Party",
      "Je kijkt om je heen",
    ], function() {
      setTimeout(function() {
        self.startFirstStoryLine();
      }, 1 * 1000);
    });
  },

  startFirstStoryLine : function() {
    var self = this;

    this.terminal.writeLine("Waar kijk je naar? Computers, Yoeri of Eten? ");
    this.terminal.createInputOnLastLine(function(lookingAt) {

      if(lookingAt.match(/computers/i)) {
        self.storyLineComputersStart();
      } else if(lookingAt.match(/yoeri/i)) {
        self.storyLineYoeriStart();
      } else if(lookingAt.match(/eten/i)) {
        self.storyLineEtenStart();
      } else if(lookingAt.match(/keiharde porno/i)) {
        self.storyLinePornoStart();
      } else {
        self.terminal.writeLine("Dat is geen optie!");
        self.startFirstStoryLine();
      }

    });

  },

  /*
  Storyline: Computers
  */
  storyLineComputersStart : function() {
  	this.terminal.writeLine("Goeie keuze!");
	   this.gameOver();
  },

  /*
  Storyline: Yoeri
  */
  storyLineYoeriStart : function() {
  	var self = this;

    if(this.name.match(/yoeri/i)) {
	    this.terminal.writeLine("Je kan niet naar jezelf kijken.");
      setTimeout(function() {
		    self.terminal.writeLine("Je besluit de LAN-Party te verlaten.");
        self.gameOver();
      }, 1 * 1000);
      return;
    }

    this.terminal.writeLinesOnDelay(0.1, [
      "Slecht idee!",
      "Je ziet Yoeri slapen op zijn toetsenbord"
    ], function() {
      setTimeout(function() {
      self.terminal.writeLine("Wat doe je? Wakker maken of weglopen? ");
			self.terminal.createInputOnLastLine(function(input) {
			    if(input.match(/weglopen/i)) {
			      self.terminal.writeLine("Je besluit iets beters te gaan doen");
			      self.gameOver();
			    } else if(input.match(/wakker maken/i)) {
			      self.terminal.writeLine("Implementeer Verhaallijn hier");
			      self.gameOver();
			    }
  			});
  		}, 1 * 1000);
    });
  },

  /*
  Storyline: Eten
  */
  storyLineEtenStart : function() {
    var self = this;

	  this.terminal.writeLine("Het is Chinees, zoals elke LAN-Party");
    setTimeout(function() {
      self.storyLineEtenQuestionOne();
    }, 1 * 1000);

  },

  storyLineEtenQuestionOne : function() {
    var self = this;

    this.terminal.writeLine("Er is Bami, Foe yong hai en Nasi wat pak je? ");
    this.terminal.createInputOnLastLine(function(eten) {
      if(eten.match(/bami/i) || eten.match(/foe yong hai/i) || eten.match(/nasi/i)) {
        self.terminal.writeLine("Misschien moet je eerst een bord pakken.");
        self.storyLineEtenQuestionOne();
      } else if(eten.match(/bord/i) || eten.match(/een bord/i)) {
        self.storyLineEtenQuestionTwo();
      } else {
        self.terminal.writeLine("Probeer wat anders!");
        self.storyLineEtenQuestionOne();
      }
    });
  },

  storyLineEtenQuestionTwo : function() {
    var self = this;

    this.terminal.writeLine("Okee, wat schep je op? ");
    this.terminal.createInputOnLastLine(function(eten) {
      if(eten.match(/bami/i) || eten.match(/foe yong hai/i) || eten.match(/nasi/i)) {
        self.terminal.writeLine("Eet smakelijk!");
        self.gameOver();
      } else {
        self.terminal.writeLine("Probeer wat anders!");
        self.storyLineEtenQuestionTwo();
      }
    });
  },

  /*
  Storyline Keiharde Porno
  */
  storyLinePornoStart : function() {
    var self = this;

    this.terminal.writeLine("Misschien moet je eerst naar een computer kijken voordat je dat doet.");
    setTimeout(function() {
      self.startFirstStoryLine();
    }, 1 * 1000);
  },

  gameOver : function() {
    var self = this;

    setTimeout(function() {
      self.terminal.empty();
      self.terminal.writeLinesOnDelay(0.1, [
        "  ▄████  ▄▄▄       ███▄ ▄███▓▓█████     ▒█████   ██▒   █▓▓█████  ██▀███  ",
        " ██▒ ▀█▒▒████▄    ▓██▒▀█▀ ██▒▓█   ▀    ▒██▒  ██▒▓██░   █▒▓█   ▀ ▓██ ▒ ██▒",
        "▒██░▄▄▄░▒██  ▀█▄  ▓██    ▓██░▒███      ▒██░  ██▒ ▓██  █▒░▒███   ▓██ ░▄█ ▒",
        "░▓█  ██▓░██▄▄▄▄██ ▒██    ▒██ ▒▓█  ▄    ▒██   ██░  ▒██ █░░▒▓█  ▄ ▒██▀▀█▄  ",
        "░▒▓███▀▒ ▓█   ▓██▒▒██▒   ░██▒░▒████▒   ░ ████▓▒░   ▒▀█░  ░▒████▒░██▓ ▒██▒",
        " ░▒   ▒  ▒▒   ▓▒█░░ ▒░   ░  ░░░ ▒░ ░   ░ ▒░▒░▒░    ░  ░  ░░ ▒░ ░░ ▒▓ ░▒▓░",
        "  ░   ░   ▒   ▒▒ ░░  ░      ░ ░ ░  ░     ░ ▒ ▒░    ░ ░░   ░ ░  ░  ░▒ ░ ▒░",
        "░ ░   ░   ░   ▒   ░      ░      ░      ░ ░ ░ ▒       ░░     ░     ░░   ░ ",
        "      ░       ░  ░       ░      ░  ░       ░ ░        ░     ░  ░   ░     ",
        "                                                     ░                   "
      ], function() {
        setTimeout(function() {
          self.terminal.writeLine("Dit is het spel tot nu toe! Over 3 seconden start het vanzelf opnieuw!");
          setTimeout(function() {
            self.terminal.empty();
            self.start();
          }, 3 * 1000)
        }, 1 * 1000);
      });


    }, 2 * 1000);
  }






};

window.onload = function() {
  Adventure.start();
};
