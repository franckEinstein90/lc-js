const Token = require('./token');


const Lexer = (function(){
    let _input = undefined, 
      _index = undefined,
      _token = undefined,
      _nextStr() = function(){},
      _nextToken() = function(){};
 

    return {
       set(programText) : function(){
        _input = programText;
        _index = 0;
        } 

    };
})();


class Lexer {
  constructor(input) {
    this._input = input;
    this._index = 0;
    this._token = undefined;
    this._nextToken();
  }

  /**
   * Return the next char of the input or '\0' if we've reached the end
   */
  _nextStr() {
    if (this._index >= this._input.length) {
      return '\0';
    }
    if (/^l\./.test(...)){str = "l"; tokLength = 1;}
    else if (/^\./.test(...)){str = "."; tokLength = 1;}
    else if (/^\(/.test(...)){str = "("; tokLength = 1;}
    else if (/^\)/.test(...)){str = ")"; tokLength = 1;}
    else if (/^[a-z]+/.test(...)){str = ...; tokLength = ...;}
     
    this._index += tokenLength;
    return str;
  }

  /**
   * Set this._token based on the remaining of the input
   *
   * This method is meant to be private, it doesn't return a token, just sets
   * up the state for the helper functions.
   */
  _nextToken() {
      c = this._nextStr();
      this._token = Token._match(c);
      
      case '\0':
        this._token = new Token(Token.EOF);
        break;

      default:
        if (/[a-z]/.test(c)) {
          let str = '';
          do {
            str += c;
            c = this._nextChar();
          } while (/[a-zA-Z]/.test(c));

          // put back the last char which is not part of the identifier
          this._index--;
//assign(Token.LCID(str));
          this._token = new Token(Token.LCID, str);
        } else {
          this.fail();
        }
    }
  }

  /**
   * Assert that the next token has the given type, return it, and skip to the
   * next token.
   */
  token(type) {
    if (!type) {
      return this._token;
    }

    const token = this._token;
    this.match(type);
    return token;
  }

  /**
   * Throw an unexpected token error - ideally this would print the source
   * location
   */
  fail() {
    throw new Error(`Unexpected token at offset ${this._index}`);
  }

  /**
   * Returns a boolean indicating whether the next token has the given type.
   */
  next(type) {
    return this._token.type == type;
  }

  /**
   * Assert that the next token has the given type and skip it.
   */
  match(type) {
    if (this.next(type)) {
      this._nextToken();
      return;
    }
    console.error(`${this._index}: Invalid token: Expected '${type}' found '${this.token().type}'`);
    throw new Error('Parse Error');
  }

  /**
   * Same as `next`, but skips the token if it matches the expected type.
   */
  skip(type) {
    if (this.next(type)) {
      this._nextToken();
      return true;
    }
    return false;
  }
}

module.exports = Lexer;
