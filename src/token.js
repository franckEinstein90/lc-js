
const Token = (function(){
    let tok = function(info){this.info = info};
    return {
        EOF     : function (info){tok.call(this, info)},
        LAMBDA  : function (info){tok.call(this, info)},
        RPAREN  : function (info){tok.call(this, info)},
        LPAREN  : function (info){tok.call(this, info)},
        LCID    : function (info){tok.call(this, info)},
        DOT     : function (info){tok.call(this, info)},

        _match  : function (str) {
            if      (/^l$/.test(str))       {return new Token.LAMBDA}
            else if (/^\.$/.test(str))      {return new Token.DOT}
            else if (/^\($/.test(str))      {return new Token.LPAREN}
            else if (/^\)$/.test(str))      {return new Token.RPAREN}
            else if (/^[a-z]+$/.test(str))  {return new Token.LCID(str)}
        }
    }
})();

const Tokenizer = (function() {
    return {
        tokenize: function(tokenArray) {
            let tagged = tokenArray.map(x=>"<tok>"+x+"</tok>").join('');
            return "<Program>" + tagged + "</Program>";
        },
        preProcess: function(programText) {
            //1. separate symbols by surrounding by spaces
            let pre1 = programText.replace(/[()\.\:]/gi, x => " " + x + " ");
            
            //returns an array of symbols
            return pre1.trim().split(/\s+/);
        },
        process: function(programText) {
            let preProcessedProgram = Tokenizer.preProcess(programText),
                tokenized = Tokenizer.tokenize(preProcessedProgram);
            return tokenized;
        }
    };
})();



module.exports = {Token, Tokenizer};
