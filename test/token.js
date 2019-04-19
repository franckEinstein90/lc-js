const expect = require('chai').expect;
const Token = require('../src/token').Token;

describe('Token._match', function(){
    it('Creates new tokens depending on the string passed as argument', function(){
        let token = Token._match("l");
        expect(token instanceof Token.LAMBDA).to.be.true;
    });
});

describe('Token.LCID', function(){
    it('creates a token from a string of lower case characters', function(){
        let token = Token._match("lfds");
        expect(token instanceof Token.LCID).to.be.true;
        expect(token.info).to.be.equal("lfds");
    });
});




