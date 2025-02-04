# The Y Combinator

This repository contains all the problems in the wonderful book *The Little Schemer*, which teaches recursion in Scheme (Lisp) and builds up to creating the Y Combinator. Except that I did it in Javascript instead of Lisp.

Be warned that this is not idiomatic Javascript! 

Instead it is attempting to emulate LISP as closely as possible. That means:

* There are no statements at all, only expression. Expressions evaluate to a value, statements do not.
* Everything is in a block in the return expression, because in Lisp functions themselves are expression.
* It makes heavy use of chained ternary operators (yikes!), because unlike if and switch, the ternary operator is an expression, not a statement.
