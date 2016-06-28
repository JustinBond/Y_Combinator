var debug,
    atom,
    car,
    cdr,
    cons,
    isNull,
    eq,
    lat,
    member,
    member2,
    member3,
    rember,
    rember2,
    firsts,
    firsts2,
    insertR,
    insertL,
    subst,
    subst2,
    multirember,
    multiinsertR,
    multiinsertL,
    multisubst,
    zero,
    add1,
    sub1,
    number,
    plus,
    minus,
    addtup,
    multiply,
    tupplus,
    gt,
    lt,
    divide,
    exp,
    neq,
    length,
    pick,
    rempick,
    no_nums,
    all_nums,
    foo;

debug = false;

/*****************************************************************************
 * Primitive functions
*****************************************************************************/

// returns true if s is a string or number
atom = function (s) {
    if (typeof s === 'number' || typeof s === 'string') {
        return true;
    }
    return false;
};

// returns the first element of list l
car = function (l) {
    var m = l.slice(0);
    return m.shift();
};

// returns list l except for the first element
cdr = function (l) {
    var m = l.slice(0);
    m.shift();
    return m;
};

// returns list l with s added to the front of the array
cons = function (s, l) {
    l.unshift(s);
    return l;
};

// returns true if list l is zero length
isNull = function (l) {
    return l.length === 0;
};

// string equals
eq = function (a, b) {
    return a === b;
};

/*****************************************************************************
 * Recursive functions
*****************************************************************************/


// lat: list of atoms
// Returns true if every element of l is an atom
// Returns true if isNull. So technically, nll (not list of lists).
//

lat = function (l) {
    return (
        isNull(l) ? true :
        atom(car(l)) ? lat(cdr(l)) :
        false
    );
};

// returns true if atom a is a member of lat l
member = function (a, l) {
    return (
        isNull(l) ? false :
        eq(a, car(l)) ? true :
        member(a, cdr(l))
    );
};

// This is how The Little Schemer did it
member2 = function (a, l) {
    return (
        isNull(l) ? false :
        ((a === car(l)) || member(a, cdr(l)))
    );
};

// member using boolean operators rather than cond (AKA ternary)
member3= function (a, l) {
    return (
        !isNull(l)
        && ((a === car(l)) || member(a, cdr(l)))
    );

};

// returns lat l with first occurance of atom a removed       
rember = function (a, l) {
    return (
        isNull(l) ? [] :
        a === car(l) ? cdr(l) :
        cons(car(l), rember(a, cdr(l)))
    );
};

// rember using boolean operators rather than cond (AKA ternary)
rember2 = function (a, l) {
    return (isNull(l) && [])
           || (a === car(l) && cdr(l))
           || (cons(car(l), rember(a, cdr(l))));
};


// takes a null list or list of lists and returns a list of the first item
// in each sub-list
firsts = function (l) {
    return (
        isNull(l) ? [] :
        cons(car(car(l)), firsts(cdr(l)))
    );
};

// using booleans rather than cond (AKA ternary)
firsts2 = function (l) {
    return (isNull(l) && [])
           || cons(car(car(l)), firsts(cdr(l)));
};

// inserts new atom n to the right of the first occurance of old atom o in list l
insertR = function (n, o, l) {
    return (
        isNull(l) ? [] :
        o === car(l) ? cons(car(l), cons(n, cdr(l))) :
        cons(car(l), insertR(n, o, cdr(l)))
    );
};


// inserts new atom n to the left of the first occurance of old atom o in list l
insertL = function (n, o, l) {
    return (
        isNull(l) ? [] :
        o === car(l) ? cons(n, l) :
        cons(car(l), insertL(n, o, cdr(l)))
    );
};

// substitutes new atom n for the first occurance of old atom o in list l
subst = function (n, o, l) {
    return (
        isNull(l) ? [] :
        o === car(l) ? cons(n, cdr(l)) :
        cons(car(l), subst(n, o, cdr(l)))
    );
};

// substitutes new atom n for the first occurance of old atom o1 or o2 in list l
subst2 = function (n, o1, o2, l) {
    return (
        isNull(l) ? [] :
        (o1 === car(l) || o2 === car(l)) ? cons(n, cdr(l)) :
        cons(car(l), subst2(n, o1, o2, cdr(l)))
    );
};

// returns lat l with all occurances of atom a removed       
multirember = function (a, l) {
    return (
        isNull(l) ? [] :
        a === car(l) ? multirember(a, cdr(l)) :
        cons(car(l), multirember(a, cdr(l)))
    );
};

// inserts new atom n to the right of the all occurance of old atom o in list l
multiinsertR = function (n, o, l) {
    return (
        isNull(l) ? [] :
        o === car(l) ? cons(o, multiinsertR(n, o, cons(n, cdr(l)))) :
        cons(car(l), multiinsertR(n, o, cdr(l)))
    );
};

// inserts new atom n to the left of the first occurance of old atom o in list l
multiinsertL = function (n, o, l) {
    return (
        isNull(l) ? [] :
        o === car(l) ? cons(n, cons(o, multiinsertL(n, o, cdr(l)))) :
        cons(car(l), multiinsertL(n, o, cdr(l)))
    );
};

// substitutes new atom n for the first occurance of old atom o in list l
multisubst = function (n, o, l) {
    return (
        isNull(l) ? [] :
        o === car(l) ? cons(n, multisubst(n, o, cdr(l))) :
        cons(car(l), multisubst(n, o, cdr(l)))
    );
};

/*****************************************************************************
 * Primitive numeric functions
*****************************************************************************/
// returns true of number n is 0
zero = function (n) {
    return n === 0;
};

// adds 1 to n
add1 = function (n) {
    return n + 1;
};

// subtracts 1 from n
sub1 = function (n) {
    return n - 1;
};

// returns true if atom a is of type number
number = function (a) {
    if (typeof a === 'number') {
        return true;
    }
    return false;
};
/*****************************************************************************
 * Recursive numeric functions
*****************************************************************************/
// add
plus = function (n, m) {
    return (
        zero(n) ? m :
        plus(sub1(n), add1(m))
    );
};

// subtract
minus = function (n, m) {
    return (
        zero(m) ? n :
        minus(sub1(n), sub1(m))
    );
};

// adds the elements in a list
addtup = function (l) {
    return (
        isNull(l) ? 0 :
        plus(car(l), addtup(cdr(l)))
    );
};

// multiplies n and m
multiply = function (n, m) {
    return (
        zero(m) ? 0 :
        plus(n, multiply(n, sub1(m)))
    );
};

// returns a list with the sum of the numbers in lists t and u
tupplus = function (t, u) {
    return (
        isNull(t) ? u :
        isNull(u) ? t :
        cons(plus(car(t), car(u)), tupplus(cdr(t), cdr(u)))
    );
};

// greater than
gt = function (n, m) {
    return (
        zero(n) ? false :
        zero(m) ? true :
        gt(sub1(n), sub1(m))
    );
};

// less than
lt = function (n, m) {
    return (
        zero(m) ? false :
        zero(n) ? true :
        lt(sub1(n), sub1(m))
    );
};

// numeric equals
neq = function (n, m) {
    return (
        zero(n) && zero(m) ? true :
        zero(n) || zero(m) ? false :
        neq(sub1(n), sub1(m))
    );
};

// returns n to the power of m 
exp = function (n, m) {
    return (
        zero(m) ? 1 :
        multiply(n, exp(n, sub1(m)))
    );
};

// divide n by m
// n must be evenly divisible by m
divide = function (n, m) {
    return (
        lt(n, m) ? 0 :
        add1(divide(minus(n, m), m))
    );
};

// returns the number of elements in a lat
length = function (l) {
    return (
        isNull(l) ? 0 :
        add1(length(cdr(l)))
    );
};

// returns element number n from lat l
pick = function (n, l) {
    return (
        neq(n, 1) ? car(l) :
        pick(sub1(n), cdr(l))
    );
};

// returns lat l minus element number n
rempick = function (n, l) {
    return (
        isNull(l) ? [] :
        neq(n, 1) ? rempick(sub1(n), cdr(l)) :
        cons(car(l), rempick(sub1(n), cdr(l)))
    );
};

// returns the non-numbers in a lat
no_nums = function (l) {
    return (
        isNull(l) ? [] :
        number(car(l)) ? no_nums(cdr(l)) :
        cons(car(l), no_nums(cdr(l)))
    );
};

// returns the numbers in a lat
all_nums = function (l) {
    return (
        isNull(l) ? [] :
        number(car(l)) ? cons(car(l), all_nums(cdr(l))) :
        all_nums(cdr(l))
    );
};
