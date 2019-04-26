start = toplevel
toplevel = Command ";" toplevel*  
Command = Term

Type = ArrowType
AType = UCID
ArrowType = AType ">" ArrowType /
	AType
    
Term = AppTerm /
	LAMBDA LCID ":" Type "." Term
    
AppTerm = ATerm  
	
ATerm = "(" Term ")" / floatv / intv 
    / LCID

LAMBDA = "\\"
LCID = [a-z]+
UCID = [A-Z]+
floatv = integer "." integer
intv =  integer
integer = digits:[0-9]+ {return parseInt(digits.join(""),10);}
