"use strict";

export class Keyboard {
  /*
  Manages keyboard inputs.
  */
  constructor() {
    /*
    Provides an interface for all keys.
    */
    const keys = [
      {
          key: "Backspace",
          keyCode: 8
      },
      {
          key: "Tab",
          keyCode: 9
      },
      {
          key: "Enter",
          keyCode: 13
      },
      {
          key: "Shift",
          keyCode: 16
      },
      {
          key: "Control",
          keyCode: 17
      },
      {
          key: "Alt",
          keyCode: 18
      },
      {
          key: " ",
          keyCode: 32
      },
      {
          key: "ArrowLeft",
          keyCode: 37
      },
      {
          key: "ArrowUp",
          keyCode: 38
      },
      {
          key: "ArrowRight",
          keyCode: 39
      },
      {
          key: "ArrowDown",
          keyCode: 40
      },
      {
          key: "0",
          keyCode: 48
      },
      {
          key: "1",
          keyCode: 49
      },
      {
          key: "2",
          keyCode: 50
      },
      {
          key: "3",
          keyCode: 51
      },
      {
          key: "4",
          keyCode: 52
      },
      {
          key: "5",
          keyCode: 53
      },
      {
          key: "6",
          keyCode: 54
      },
      {
          key: "7",
          keyCode: 55
      },
      {
          key: "8",
          keyCode: 56
      },
      {
          key: "9",
          keyCode: 57
      },
      {
          key: "a",
          keyCode: 65
      },
      {
          key: "b",
          keyCode: 66
      },
      {
          key: "c",
          keyCode: 67
      },
      {
          key: "d",
          keyCode: 68
      },
      {
          key: "e",
          keyCode: 69
      },
      {
          key: "f",
          keyCode: 70
      },
      {
          key: "g",
          keyCode: 71
      },
      {
          key: "h",
          keyCode: 72
      },
      {
          key: "i",
          keyCode: 73
      },
      {
          key: "j",
          keyCode: 74
      },
      {
          key: "k",
          keyCode: 75
      },
      {
          key: "l",
          keyCode: 76
      },
      {
          key: "m",
          keyCode: 77
      },
      {
          key: "n",
          keyCode: 78
      },
      {
          key: "o",
          keyCode: 79
      },
      {
          key: "p",
          keyCode: 80
      },
      {
          key: "q",
          keyCode: 81
      },
      {
          key: "r",
          keyCode: 82
      },
      {
          key: "s",
          keyCode: 83
      },
      {
          key: "t",
          keyCode: 84
      },
      {
          key: "u",
          keyCode: 85
      },
      {
          key: "v",
          keyCode: 86
      },
      {
          key: "w",
          keyCode: 87
      },
      {
          key: "x",
          keyCode: 88
      },
      {
          key: "y",
          keyCode: 89
      },
      {
          key: "z",
          keyCode: 90
      },
      {
          key: "+",
          keyCode: 187
      },
      {
          key: ",",
          keyCode: 188
      },
      {
          key: "-",
          keyCode: 189
      },
      {
          key: ".",
          keyCode: 190
      },
      {
          key: "ç",
          keyCode: 191
      },
      {
          key: "ñ",
          keyCode: 192
      },
      {
          key: "Dead",
          keyCode: 219
      },
      {
          key: "º",
          keyCode: 220
      },
      {
          key: "¡",
          keyCode: 221
      },
      {
          key: "Dead",
          keyCode: 222
      },
      {
          key: "AltGraph",
          keyCode: 225
      }
    ];
    for(const key of keys) {
      this[key.key] = {
        down: false,
        up: true
      };
      this[key.keyCode] = this[key.key];
      this.keysDown = 0;
    }  
  }

  keydown(event) {
    if(this[event.key].up) {
      this[event.key].down = true;
      this[event.key].up = false;
      this.keysDown += 1;
    }
  }

  keyup(event) {
    if(this[event.key].down) {
      this[event.key].down = false;
      this[event.key].up = true;
      this.keysDown -= 1;
    }
  }
};
