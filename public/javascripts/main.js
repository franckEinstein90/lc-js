/*FranckEinstein
 * you can build on a bit of something
 */
/* 1: split on ';'
/* 2: tokenizer identifies separators in program text:

              .   :  )  (  other

 * and inserts spaces around them. 
 *
 * Finally, it separates each of the parts that it identified on a 
 * split across the space char  */

const Tokenizer = (function() {
    let tagTokens = function(tokens){
        return tokens.map(x=>`<TOK>${x}</TOK>`).join('');
    },
    tagLine = function (tokens, lineNo){
        return `<LINE ${lineNo}> ${tagTokens(tokens)} </LINE>`;
    };
    return {
        tokenize: function(tokenArray) {
            let lines = tokenArray.map(tagLine);
            //let lines = tokenArray.map(x => "<TOK>" + x + "</TOK>").join('');
            return `<PROG>\n${lines.join("\n")}\n</PROG>\n`;
        },
        preProcess: function(programText) {
            let programLines = programText.split(/\s*\;\s*/g);
                pre2 = programLines.map(command => command.replace(/[().:-]/gi, x => " " + x + " ")),
                preProcessed = pre2.map(x=>x.trim().split(/\s+/)); 
            return preProcessed; 

        },
        processProgramText: function(programText) {
            let preProcessedProgram = Tokenizer.preProcess(programText),
                tokenized = Tokenizer.tokenize(preProcessedProgram);
            return tokenized;
        }
    }
})();




$(document).ready(function() {

   let appManager = (function() {
        let _modeOriginal = true,
            programText = "",
            tokenized = "";
        return {
            modeOriginal: function() {
                return _modeOriginal;
            },
            save: function() {
                if (_modeOriginal) {
                    programText = progEditor.getValue(); 
                } else {
                    tokenized = progEditor.getValue();
                }
            },
            restoreOriginal: function() {
                progEditor.setValue(programText);
                _modeOriginal = true;

            },
            tokenize: function() {
                tokenized = Tokenizer.processProgramText(programText);
            },
            switchMode: function() {
                if (_modeOriginal) {
                    progEditor.setValue(tokenized);
                    _modeOriginal = false;
                } else {
                    appManager.restoreOriginal();
                }
            }

        };
    })();


  let progEditor = ace.edit("editor1");
   progEditor.setTheme("ace/theme/monokai");
   progEditor.getSession().setMode("ace/mode/javascript");
   progEditor.setKeyboardHandler("ace/keyboard/vim");

  let lex = new Lexer,
   editor2 = ace.edit("editor2");

  editor2.setTheme("ace/theme/monokai");
    $("#btnSubmitCode").click(function() {
         var input = progEditor.getValue();
                    lex.input(input);
                    var current_token = lex.token();
                    var out_str = "";
                    while (current_token) {
                        out_str += current_token.name + "\n" ;
                        current_token = lex.token();
                    }
                    editor2.setValue(out_str);
           });
 
});
/*   let appManager = (function() {
 *
        let _modeOriginal = true,
            programText = "",
            tokenized = "";
        return {
            modeOriginal: function() {
                return _modeOriginal;
            },
            save: function() {
                if (_modeOriginal) {
                    programText = progEditor.getValue(); 
                } else {
                    tokenized = progEditor.getValue();
                }
            },
            restoreOriginal: function() {
                progEditor.setValue(programText);
                _modeOriginal = true;

            },
            tokenize: function() {
                tokenized = Tokenizer.processProgramText(programText);
            },
            switchMode: function() {
                if (_modeOriginal) {
                    progEditor.setValue(tokenized);
                    _modeOriginal = false;
                } else {
                    appManager.restoreOriginal();
                }
            }

        };
    })();

    $("#btnTokenize").click(function() {
        if (appManager.modeOriginal()) {
            appManager.save();
            appManager.tokenize();
            appManager.switchMode();
        }
    });
    $("#btnOriginal").click(function() {
        if (appManager.modeOriginal()) {
            appManager.restoreOriginal();
        } else {
            appManager.switchMode();
        }
    });
});*/
