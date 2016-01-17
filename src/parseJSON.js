// this is what you would do if you were one to do things the easy way:
// var parseJSON = JSON.parse;

// but you're not, so you'll write it from scratch:
var parseJSON = function(json) {
  var at = 0;
  var ch = json.charAt(at);
  var escapes = {
    '"':  '"',
    '\\': '\\',
    '/':  '/',
    b:    'b',
    f:    '\f',
    n:    '\n',
    r:    '\r',
    t:    '\t'
  }

  function nextCharacter(c) {
    if (c && c != ch)
      throw new SyntaxError;
    at++;
    ch = json.charAt(at);
    return ch;
  }

  function skipWhitespace() {
    while (ch && ch <= ' ') {
      nextCharacter();
    }
  }

  function parseNumber() {
    var number, string = ''
    if (ch === '-') {
      string += '-';
      nextCharacter();
    }
    while (ch >= 0 && ch <= 9) {
      string += ch;
      nextCharacter();
    }
    if (ch === '.') {
      string += '.';
      while (nextCharacter() && ch >= 0 && ch <= 9) {
        string += ch;
      }
    }
    number = +string;
    return number;
  }

  function parseString() {
    var string = '';
    while (nextCharacter()) {
      if (ch === '"' && json.charAt(at - 1) != '\\') {
        nextCharacter();
        return string;
      }
      // Handle escape characters
      if (ch === '\\') {
        nextCharacter();
        if (ch in escapes)
          string += escapes[ch];
      }
      else {
         string += ch;
      }
    }
  }

  function parseArray() {
    var array = [];
    nextCharacter();
    skipWhitespace();
    if (ch === ']') {
        nextCharacter();
        return array;
    }
    while (ch) {
      array.push(parseValue());
      skipWhitespace();
      if (ch === ']') {
        nextCharacter();
        return array;
      }
      nextCharacter(',');
    }
  }

  function parseObject() {
    var key, object = {};
    nextCharacter();
    skipWhitespace();
    if (ch === '}') {
      nextCharacter();
      return object;
    }
    while (ch) {
      key = parseValue();
      skipWhitespace();
      nextCharacter(':');
      object[key] = parseValue();
      skipWhitespace();
      if (ch === '}') {
        nextCharacter();
        return object;
      }
      nextCharacter();
    }
  }

  function parseCommand() {
    switch (ch) {
      case 't':
        nextCharacter('t')
        nextCharacter('r');
        nextCharacter('u');
        nextCharacter('e');
        return true;
      case 'f':
        nextCharacter('f');
        nextCharacter('a');
        nextCharacter('l');
        nextCharacter('s');
        nextCharacter('e');
        return false;
      case 'n':
        nextCharacter('n')
        nextCharacter('u');
        nextCharacter('l');
        nextCharacter('l');
        return null;
    }
  }

  function parseValue() {
    skipWhitespace();
    switch (ch) {
      case '-':
        return parseNumber();
      case '"':
        return parseString();
      case '[':
        return parseArray();
      case '{':
        return parseObject();
      default:
        return ch >= '0' && ch <= '9' ? parseNumber() : parseCommand();
    }
  }

  return parseValue();
};