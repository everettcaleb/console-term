# Console Terminal Extensions
Alternate `terminal` object to replace Node's default `console`. Adds colors, styles, cursor control, and clearing support.

## To Install

    npm i --save console-term

## Usage
If you only want to use it like the global `console`, it works the same way so it's a drop-in replacement.

    const terminal = require('console-term');
    terminal.log('Hello, world!');

You can also create instances of it tied to streams (it defaults to `process.stdout` and `process.stderr`), like this:

    const { ConsoleTerminal } = require('console-term'),
      fs = require('fs'),
      terminal = new ConsoleTerminal(fs.createWriteStream('out.log'), fs.createWriteStream('err.log'));

Keep in mind that any operation that prints an escape sequence will continue to do so regardless of what stream is attached. You can chain functions together like this:

    const terminal = require('console-term');
    terminal.clear()
      .setColor('red')
      .setStyle('bold')
      .log('This is a message in red printed using console.log!')
      .log('This is another log message chained to it!')
      .resetStyle();

## Functions
All the standard `Console` functions are available as well as the ones documented below.

### Clearing
- `clear()`: Clears the entire screen and puts the cursor at 0,0
- `clearLine()`: Clears the current line and puts the cursor at the first column
- `clearUp()`: Clears lines above the current line
- `clearDown()`: Clears lines below the current line
- `clearRight()`: Clears the current line right of the cursor
- `clearLeft()`: Clears the current line left of the cursor

### Styling
- `resetStyle()`: Resets the current formatting, colors, etc.
- `setColor(color)`: Sets the current foreground color, see [Colors](#Colors) below
- `setBackgroundColor(color)`: Sets the current background color
- `setStyle(style)`: Sets the current display style, see [Styles](#Styles)

### Cursor
- `setCursorPos(x, y)`: Sets the current cursor position from top-left
- `moveCursor(c, direction)`: Moves the cursor the specified spaces in the specified direction, see [Directions](#Directions)
- `moveCursorUp(c)`: Moves the cursor up the specified number of lines
- `moveCursorDown(c)`: Moves the cursor down the specified number of lines
- `moveCursorLeft(c)`: Moves the cursor left the specified number of columns
- `moveCursorRight(c)`: Moves the cursor right the specified number of columns

### Printing
- `print(str)`: Prints a string (no added newline)
- `printHuge(str)`: Prints a string double height (newline added)
- `printWide(str)`: Prints a string double width

### Meta
- `sendEscape(str)`: Prints the `\033` escape sequence followed by the specified string

## Reference
Below are reference lists for colors, styles, etc.

### Colors
- black
- red
- green
- yellow
- blue
- magenta
- cyan
- white
- gray (or grey, only supported for foreground colors)

### Styles
- bold
- dim
- italic
- underline
- inverted
- invisible
- strikethrough

### Directions
- up
- down
- left
- right
