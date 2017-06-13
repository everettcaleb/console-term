const ESCAPE = '\x1b',
  DIRECTION_CODES = {
    up: 'A',
    down: 'B',
    left: 'D',
    right: 'C'
  },
  COLOR_CODES = {
    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,
    gray: 90,
    grey: 90
  },
  BGCOLOR_CODES = {
    black: 40,
    red: 41,
    green: 42,
    yellow: 43,
    blue: 44,
    magenta: 45,
    cyan: 46,
    white: 47
  },
  STYLE_CODES = {
    bold: 1,
    dim: 2,
    italic: 3,
    underline: 4,
    inverted: 7,
    invisible: 8,
    strikethrough: 9
  };

class ConsoleTerminal {
  constructor(stdout, stderr) {
    if(!stderr) {
      if(stdout) {
        stderr = stdout;
      }
      this.stderr = stderr || process.stderr;
    }
    this.stdout = stdout || process.stdout;
    this.console = new console.Console(this.stdout, this.stderr);
  }

  clear() {
    this.sendEscape('[2J');
    this.setCursorPos(0, 0);
    return this;
  }

  clearLine() {
    this.sendEscape('[2K');
    return this;
  }

  clearUp() {
    this.sendEscape('[1J');
    return this;
  }

  clearDown() {
    this.sendEscape('[0J');
    return this;
  }

  clearRight() {
    this.sendEscape('[0K');
    return this;
  }

  clearLeft() {
    this.sendEscape('[1K');
    return this;
  }

  resetStyle() {
    this.sendEscape('[0m');
    return this;
  }

  setColor(color) {
    let c = COLOR_CODES[color];
    if(c) {
      this.sendEscape(`[0;${c}m`);
    }
    return this;
  }

  setStyle(style) {
    let c = STYLE_CODES[style];
    if(c) {
      this.sendEscape(`[;${c}m`);
    }
    return this;
  }

  setBackgroundColor(color) {
    let c = BGCOLOR_CODES[color];
    if(c) {
      this.sendEscape(`[0;${c}m`);
    }
    return this;
  }

  setCursorPos(x, y) {
    x = x || 0;
    y = y || 0;
    this.sendEscape(`[${y};${x}H`);
    return this;
  }

  moveCursor(c, direction) {
    c = c || 0;
    if(direction) {
      direction = DIRECTION_CODES[direction];
      this.sendEscape(`[${c}${direction}`);
    }
    return this;
  }

  moveCursorUp(c) {
    this.moveCursor(c, 'up');
    return this;
  }

  moveCursorDown(c) {
    this.moveCursor(c, 'down');
    return this;
  }

  moveCursorLeft(c) {
    this.moveCursor(c, 'left');
    return this;
  }

  moveCursorRight(c) {
    this.moveCursor(c, 'right');
    return this;
  }

  sendEscape(str) {
    this.print(`${ESCAPE}${str}`);
    return this;
  }

  print(str) {
    this.stdout.write(str);
    return this;
  }

  printHuge(str) {
    this.sendEscape('#3');
    this.print(str + '\n');
    this.sendEscape('#4');
    this.print(str + '\n');
    return this;
  }

  printWide(str) {
    this.sendEscape('#6');
    this.print(str + '\n');
    return this;
  }
}

// Bind console functions
for(let f in console) {
  if(f == 'Console') continue;
  ConsoleTerminal.prototype[f] = function() {
    this.console[f].apply(this.console, arguments);
    return this;
  };
}

module.exports = Object.assign(
  new ConsoleTerminal(),
  { ConsoleTerminal }
);
