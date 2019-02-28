# Reading LISP 1.5 Programmer's Manual

[LISP 1.5 Programmer's Manual](http://www.softwarepreservation.org/projects/LISP/book/LISP%201.5%20Programmers%20Manual.pdf)

# Chapter 1

## Backus notation
  `::=` meaning assignment
  `<`   opening symbol
  `>`   closing symbol
  `|`   logical or
  `...` meaning repeat or none at all (depending where, this isn't a part of Backus)

``````backus
<S-expression> ::= <atomic symbol> | (<S-expression> . <S-expression>)
``````

### The Data Language

``````
<LETTER>        ::= A | B | C | ... | Z
<number>        ::= 0 | 1 | 2 | ... | 9
<atomic-symbol> ::= <LETTER> <atom part>
<atom part>     ::= <empty> | <LETTER> <atom part> | <number> <atom part>

<S-expression> ::= <atomic-symbol> |
                   (S-expression> . <S-expression>) |
                   (S-expression> ... <S-expression>)
``````

### The Meta-Language

```
<letter>     ::= a | b | c | ... | z
<identifier> ::= <letter> <id part>
<id part>    ::= <empty> | <letter> <id part> | <number> <id part>

<form>       ::= <constant> | 
                 <variable> | 
                 <function>[<argument>; ...;<argument>] |
                 [<form> -> <form>; ...;<form> ->form>]
<constant>   ::= <S-expression>
<variable>   ::= <identifier>
<argument>   ::= <form>

<function>   ::= <identifier> | 
                 λ[<var list>;<form>] |
                 label[<identifier>;<function>]
<var list>   ::= [<variable>; ...;<variable]
```


## Lisp in itself

```lisp
evalquote[fn;x] = apply[fn;x;NIL]

where

  apply[fn;x;a] = [
    atom[fn] -> [
      eq[fn;CAR]  -> caar[x];
      eq[fn;CDR]  -> cdar[x];
      eq[fn;CONS] -> cons[car[x];cadr[x]];
      eq[fn;ATOM] -> atom[car[x]];
      eq[fn;EQ]   -> eq[car[x];cadr[x]];
      T           -> apply[eval[fn;a];x;a]
    ];
    eq[car[fn];LAMBDA] -> eval[caddr[fn];pairlis[cadr[fn];x;a]];
    eq[car[fn];LABEL] -> apply[caddr[fn];x;cons[cons[cadr[fn];caddr[fn]];a]]
  ]

  eval[e;a] = [
    atom[e]      -> cdr[assoc[e;a]];
    atom[car[e]] -> [
      eq[car[e],QUOTE] -> cadr[e];
      eq[car[e];COND] -> evcon[cdr[e];a];
      T -> apply[car[e];evlis[cdr[e];a];a]
    ];
    T            -> apply[car[e];evlis[cdr[e];a];a]
  ]

  evcon[c;a] = [
    eval[caar[c];a] -> eval[cadar[c];a];
    T               -> evcon[cdr[c];a]
  ]

  evlis[m;a] = [
    null[m] -> NIL;
    T       -> cons[eval[car[m];a];evlis[cdr[m];a]]
  ]

  pairlis[x;y;a] = [
    null[x] -> a;
    T       -> cons[cons[car[x];car[y]];pairlis[cdr[x];cdr[y];a]]
  ]

  assoc[x;a] = [
    equal[caar[a];x] -> car[a];
    T                -> assoc[x;cdr[a]]
  ]

  equal[x;y] = [
    atom[x]              -> [
      atom[y] -> eq[x;y];
      T       -> F
    ];
    equal[car[x];car[y]] -> equal[cdr[x];cdr[y]];
    T                    -> F
  ]

  subst[x;y;z] = [
    equal[y;z] -> x;
    atom[z]    -> z;
    T          -> cons[subst[x;y;car[z]];subst[x;y;cdr[z]]]
  ]

  append[x;y] = [
    null[x] -> y;
    T       -> cons[car[x];append[cdr[x];y]]
  ]

  member[x;y] = [
    null[y]         -> F;
    equal[x;car[y]] -> T;
    T               -> member[x;cdr[y]]
  ]

  sublis[a;y] = [
    atom[y] -> sub2[a;y];
    T       -> cons[sublis[a;car[y]];sublis[a;cdr[y]]]
  ]

  sub2[a;z] = [
    null[a]       -> z;
    eq[caar[a];z] -> cdar[a];
    T             -> sub2[cdr[a];z]
  ]
  
```

