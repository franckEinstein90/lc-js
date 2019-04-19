const Lexer = (function(){
    let input = undefined, 
      index = undefined,
      token = undefined,
      nextStr = function(){},
      nextToken = function(){};
 

    return {
      lex : function(tokenArray){
        return tokenArray.map(x=>"<tok>"+x+"</tok>").join('');
      }
    };
})();


const Tokenizer = (function() {
    return {
        tokenize: function(programChunks) {
            return "<Program>" + Lexer.lex(programChunks) + "</Program>";
        },
        preProcessed: function(programText) {
            //1. separate make sure every '.' is surrounded by spaces
            let pre1 = programText.replace(/[()\.]/gi, x => " " + x + " ");
            return pre1.trim().split(/\s+/);
            //removes all spaces
            //returns an array of separated symbols
            
        },
        processProgramText: function(programText) {
            let preProcessedProgram = Tokenizer.preProcessed(programText),
                tokenized = Tokenizer.tokenize(preProcessedProgram);
            return tokenized;
        }
    };
})();




$(document).ready(function() {

    let appManager = (function(){
        let _modeOriginal = true, 
         programText = "", 
         tokenized = "";  
        return {
            modeOriginal : function(){
                return _modeOriginal;
            },
            save : function(){
                if(_modeOriginal){
                    programText = $("#inputProgram").val();
                }
                else{
                    tokenized = $("#inputProgram").val();
                }
            },
            restoreOriginal : function(){
                   $("#inputProgram").val(programText);
                   _modeOriginal = true;
 
            },
            tokenize : function(){
               tokenized = Tokenizer.processProgramText(programText);
            },
            switchMode : function(){
               if(_modeOriginal){
                   $("#inputProgram").val(tokenized);
                   _modeOriginal = false;
               }
               else{
                  appManager.restoreOriginal();
               }
            }
            
        };
    })();

    $("#btnTokenize").click(function() {
        if(appManager.modeOriginal()) {
            appManager.save();
            appManager.tokenize();
            appManager.switchMode();
        }
    });
    $("#btnOriginal").click(function() {
        if(appManager.modeOriginal()) {
            appManager.restoreOriginal();
        }
        else{
            appManager.switchMode();
        }
    });
});
