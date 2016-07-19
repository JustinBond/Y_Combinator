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
    eqan,
    occur,
    one,
    rempick2,
    remberstar,
    insertRstar,
    insertLstar,
    occurstar,
    subststar,
    leftmost,
    eqlist,
    numbered,
    memberstar,
    value2,
    value,
    set,
    all_nums,
    first_sub_exp,
    second_sub_exp,
    operator,
    first,
    second,
    makeset,
    makeset2,
    subset,
    eqset,
    does_intersect,
    intersect,
    union,
    intersectall,
    a_pair,
    third,
    build,
    revrel,
    one_to_one,
    fun,
    equal,
    rember_f,
    insertL_f,
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
    print("l is: " + l);
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
        eq(a, car(l)) || member(a, cdr(l))
    );
};

// returns lat l with first occurance of atom a removed       
rember = function (a, l) {
    return (
        isNull(l) ? [] :
        eq(a, car(l)) ? cdr(l) :
        cons(car(l), rember(a, cdr(l)))
    );
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
        eq(o, car(l)) ? cons(car(l), cons(n, cdr(l))) :
        cons(car(l), insertR(n, o, cdr(l)))
    );
};


// inserts new atom n to the left of the first occurance of old atom o in list l
insertL = function (n, o, l) {
    return (
        isNull(l) ? [] :
        eq(o, car(l)) ? cons(n, l) :
        cons(car(l), insertL(n, o, cdr(l)))
    );
};

// substitutes new atom n for the first occurance of old atom o in list l
subst = function (n, o, l) {
    return (
        isNull(l) ? [] :
        eq(o, car(l)) ? cons(n, cdr(l)) :
        cons(car(l), subst(n, o, cdr(l)))
    );
};

// substitutes new atom n for the first occurance of old atom o1 or o2 in list l
subst2 = function (n, o1, o2, l) {
    return (
        isNull(l) ? [] :
        eq(o1, car(l)) || eq(o2, car(l)) ? cons(n, cdr(l)) :
        cons(car(l), subst2(n, o1, o2, cdr(l)))
    );
};

// returns lat l with all occurances of atom a removed       
multirember = function (a, l) {
    return (
        isNull(l) ? [] :
        eq(a, car(l)) ? multirember(a, cdr(l)) :
        cons(car(l), multirember(a, cdr(l)))
    );
};

// inserts new atom n to the right of the all occurance of old atom o in list l
multiinsertR = function (n, o, l) {
    return (
        isNull(l) ? [] :
        eq(o, car(l)) ? cons(o, multiinsertR(n, o, cons(n, cdr(l)))) :
        cons(car(l), multiinsertR(n, o, cdr(l)))
    );
};

// inserts new atom n to the left of the first occurance of old atom o in list l
multiinsertL = function (n, o, l) {
    return (
        isNull(l) ? [] :
        eq(o, car(l)) ? cons(n, cons(o, multiinsertL(n, o, cdr(l)))) :
        cons(car(l), multiinsertL(n, o, cdr(l)))
    );
};

// substitutes new atom n for the first occurance of old atom o in list l
multisubst = function (n, o, l) {
    return (
        isNull(l) ? [] :
        eq(o, car(l)) ? cons(n, multisubst(n, o, cdr(l))) :
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

// returns true if atoms a1 and a2 are the same
eqan = function (a1, a2) {
    return (
        number(a1) && number(a2) ? neq(a1, a2) :
        number(a1) || number(a2) ? false :
        eq(a1, a2)
    );
};

// returns the number of times atom a occurs in lat l
occur = function (a, l) {
    return (
        isNull(l) ? 0 :
        eqan(a, car(l)) ? add1(occur(a, cdr(l))) :
        occur(a, cdr(l))
    );
};

// returns true if number n is 1, otherwise returns false
one = function (n) {
    return (
        neq(n, 1)
    );
};

rempick2 = function (n, l) {
    return (
        isNull(l) ? [] :
        one(n) ? rempick2(sub1(n), cdr(l)) :
        cons(car(l), rempick2(sub1(n), cdr(l)))
    );
};

// Chapter 5

// returns lat l with all occurances of atom a removed       
// * descends into sublists
remberstar = function (a, l) {
    return (
        isNull(l) ? [] :
        atom(car(l)) ? (
            eq(a, car(l)) ? remberstar(a, cdr(l)) :
            cons(car(l), remberstar(a, cdr(l)))
        ) :
        cons(remberstar(a, car(l)), remberstar(a, cdr(l)))
    );
};
// inserts new atom n to the right of the all occurance of old atom o in list l
// * descends into sublists
insertRstar = function (n, o, l) {
    return (
        isNull(l) ? [] :
        atom(car(l)) ? (
            eq(o, car(l)) ? cons(o, multiinsertR(n, o, cons(n, cdr(l)))) :
            cons(car(l), multiinsertR(n, o, cdr(l)))
        ) :
        cons(insertRstar(n, o, car(l)), insertRstar(n, o, cdr(l)))
    );
};

// returns the number of times atom a occurs in lat l
// * descends into sublists
occurstar = function (a, l) {
    return (
        isNull(l) ? 0 :
        atom(car(l)) ? (
            eqan(a, car(l)) ? add1(occurstar(a, cdr(l))) :
            occurstar(a, cdr(l))
        ) :
        plus(occurstar(a, car(l)), occurstar(a, cdr(l)))
    );
};

// substitutes new atom n for the first occurance of old atom o in list l
// * descends into sublists
subststar = function (n, o, l) {
    return (
        isNull(l) ? [] :
        atom(car(l)) ? (
            eq(o, car(l)) ? cons(n, subststar(n, o, cdr(l))) :
            cons(car(l), subststar(n, o, cdr(l)))
        ) :
        cons(subststar(n, o, car(l)), subststar(n, o, cdr(l)))
    );
};

// inserts new atom n to the left of the first occurance of old atom o in list l
// * descends into sublists
insertLstar = function (n, o, l) {
    return (
        isNull(l) ? [] :
        atom(car(l)) ? (
            eq(o, car(l)) ? cons(n, cons(o, insertLstar(n, o, cdr(l)))) :
            cons(car(l), insertLstar(n, o, cdr(l)))
        ) :
        cons(insertLstar(n, o, car(l)), insertLstar(n, o, cdr(l)))
    );
};

// returns true if atom a is a member of lat l
memberstar = function (a, l) {
    return (
        isNull(l) ? false :
        atom(car(l)) ? (
            eq(a, car(l)) ? true :
            member(a, cdr(l))
        ) :
        member(a, car(l)) || member(a, cdr(l))
    );
};

// returns true if atom a is a member of lat l
leftmost = function (l) {
    return (
        isNull(l) ? [] :
        atom(car(l)) ? car(l) :
        leftmost(car(l))
    );
};

// returns true if lists of s-expressions l1 and l2 are equal
eqlist = function (l1, l2) {
    return (
        isNull(l1) && isNull(l2) ? true :
        isNull(l1) || isNull(l2) ? false :
        atom(car(l1)) && atom(car(l2)) ? (
            eqan(car(l1), car(l2)) ? eqlist(cdr(l1), cdr(l2)) :
            false
        ) :
        atom(car(l1)) || atom(car(l2)) ? false :
        eqlist(car(l1), car(l2)) && eqlist(cdr(l1), cdr(l2))
    );
};

// returns true if s-expressions s1 and s2 are the same
equal = function (s1, s2) {
    return (
        (atom(s1) && atom(s2)) ? eqan(s1, s2) :
        (atom(s1) || atom(s2)) ? false :
        eqlist(s1, s2)
    );
};

// simplification of the original eqlist using equal
eqlist = function (l1, l2) {
    return (
        isNull(l1) && isNull(l2) ? true :
        isNull(l1) || isNull(l2) ? false :
        (equal(car(l1), car(l2)) && eqlist(cdr(l1), cdr(l2)))
    );
};

// inserts new s-expression n to the left of the first occurance of old 
// s-expression o in list l
insertL = function (n, o, l) {
    return (
        isNull(l) ? [] :
        equal(o, car(l)) ? cons(n, l) :
        cons(car(l), insertL(n, o, cdr(l)))
    );
};

// rewriting rember using equal
rember = function (s, l) {
    return (
        isNull(l) ? [] :
        equal(car(l), s) ? cdr(l) :
        cons(car(l), rember(s, cdr(l)))
    );
};


// Chapter 6

// returns true if representation of arithmetic expression contains only
// numbers in addition to +, x, and ^
numbered = function (aexp) {
    return (
        atom(aexp) ? number(aexp) :
        eq(car(cdr(aexp)), '+') ? numbered(car(aexp)) && numbered(car(cdr(cdr(aexp)))) :
        eq(car(cdr(aexp)), 'x') ? numbered(car(aexp)) && numbered(car(cdr(cdr(aexp)))) :
        eq(car(cdr(aexp)), '^') && (numbered(car(aexp)) && numbered(car(cdr(cdr(aexp)))))
    );
};

// returns the value of the arithmetic expression in the format of [2,'+',2]
value2 = function (nexp) {
    return (
        atom(nexp) ? nexp :
        eq(car(cdr(nexp)), '+') ? plus(value2(car(nexp)), value2(car(cdr(cdr(nexp))))) :
        eq(car(cdr(nexp)), 'x') ? multiply(value2(car(nexp)), value2(car(cdr(cdr(nexp))))) :
        eq(car(cdr(nexp)), '^') && exp(value2(car(nexp)), value2(car(cdr(cdr(nexp)))))
    );
};

// returns the first sub expression of an arithmetic expression in the format of ['+',2,2]
first_sub_exp = function (aexp) {
    return (
        car(cdr(aexp))
    );
};

// returns the second sub expression of an arithmetic expression in the format of ['+',2,2]
second_sub_exp = function (aexp) {
    return (
        car(cdr(cdr(aexp)))
    );
};
// returns the operator of an arithmetic expression in the format of ['+',2,2]
operator = function (aexp) {
    return (
        car(aexp)
    );
};

// returns the value of the arithmetic expression in the format of [2,'+',2]
value = function (nexp) {
    return (
        atom(nexp) ? nexp :
        eq(operator(nexp), '+') ? plus(value(first_sub_exp(nexp)), value(second_sub_exp(nexp))) :
        eq(operator(nexp), 'x') ? multiply(value(first_sub_exp(nexp)), value(second_sub_exp(nexp))) :
        eq(operator(nexp), '^') && exp(value(first_sub_exp(nexp)), value(second_sub_exp(nexp)))
    );
};

// returns true if no member of lat l occurs more than once
set = function (l) {
    return (
        isNull(l) ? true :
        member(car(l),cdr(l)) ? false :
        set(cdr(l))
    );
};

// returns a set by removing extra occurances of lat l's members
makeset = function (l) {
    return (
        isNull(l) ? [] :
        set(l) ? l :
        member(car(l), cdr(l)) ? makeset(cdr(l)) :
        cons(car(l), makeset(cdr(l)))
    );
};

// returns a set by removing extra occurances of lat l's members, using multirember
makeset2 = function (l) {
    return (
        isNull(l) ? [] :
        set(l) ? l :
        cons(car(l), makeset(multirember(car(l), cdr(l))))
    );
};

// returns true if s1 is a subset of s2
subset = function (s1, s2) {
    return (
        isNull(s1) ? true :
        member(car(s1), s2) ? subset(cdr(s1), s2) :
        false
    ); 
};

// returns true if s1 and s2 are the same
eqset = function (s1, s2) {
    return (
        subset(s1, s2) && subset(s2, s1)
    );
};

// returns true if s1 intersects s2
does_intersect = function (s1, s2) {
    return (
        isNull(s1) ? false :
        member(car(s1), s2) ? true :
        does_intersect(cdr(s1), s2)
    );
};

// returns the intersections of sets s1 and s2
intersect = function (s1, s2) {
    return (
        isNull(s1) ? [] :
        member(car(s1), s2) ? cons(car(s1), intersect(cdr(s1), s2)) :
        intersect(cdr(s1), s2)
    );
};
// returns the unions of sets s1 and s2
union = function (s1, s2) {
    return (
        isNull(s1) ? [] :
        member(car(s1), s2) ? union(cdr(s1), s2) :
        cons(car(s1), union(cdr(s1), s2))
    );
};

intersectall = function (lset) {
    return (
        isNull(cdr(lset)) ? car(lset) :
        intersect(car(lset), intersectall(cdr(lset)))
    );
};

// returns true if x is a list of two s-expressions
a_pair = function (x) {
    return (
        atom(x) ? false :
        isNull(x) ? false :
        isNull(cdr(x)) ? false :
        isNull(cdr(cdr(x))) ? true :
        false
    
    );
};

// returns the first of a pair
first = function (p) {
    return (
        car(p)
    );
};

// returns the second of a pair
second = function (p) {
    return (
        car(cdr(p))
    );
};

// returns the third in a list
third = function (l) {
    return (
        car(cdr(cdr(l)))
    );
};

// returns the first from a relation
firsts = function(rel) {
    return (
        isNull(rel) ? [] :
        cons(first(car(rel)), firsts(cdr(rel)))
    );
};

// builds a pair
build = function (s1, s2) {
    return (
        cons(s1, cons(s2, []))
    );
};
// returns true of rel is a finite function (a list of pairs such that
// no first element is the same)
fun = function (rel) {
    return (
        set(firsts(rel))
    );
};

// reverses a relation
revrel = function (rel) {
    return (
        isNull(rel) ? [] :
        cons(build(second(car(rel)), first(car(rel))), revrel(cdr(rel)))
    );
};

// returns true if a function is one-to-one
one_to_one = function (f) {
    return (
        fun(revrel(f))
    );
};

// Chapter 8

// creates member functions based on the function test
rember_f = function (test) {
    return function (a, l) {
        return (
            isNull(l) ? [] :
            test(car(l), a) ? cdr(l) :
            cons(car(l), rember_f(test)(a, cdr(l)))
        );
    };
};

// inserts new atom n to the left of the first occurance of old atom o in list l
// based on equality function test
insertL_f = function (test) {
    return function (n, o, l) {
        return (
            isNull(l) ? [] :
            test(o, car(l)) ? cons(n, l) :
            cons(car(l), insertL_f(test)(n, o, cdr(l)))
        );
    };
};

// cons's new element n to the left of old element o on list l
seqL = function (n, o, l) {
    return (
        cons(n, cons(o,l))
    );
};
//
// cons's new element n to the right of old element o on list l
seqR = function (n, o, l) {
    return (
        cons(o, cons(n,l))
    );
};

// replaces first instance of element o with element n
seqS = function (n, o, l) {
    return (
        cons(n,l)
    );
};

// inserts new atom n to the left or right the first occurance of old atom o in list l
// function seq
seq_f = function (seq) {
    return function (n, o, l) {
        return (
            isNull(l) ? [] :
            eq(o, car(l)) ? seq(n, o, l) :
            cons(car(l), seq_f(seq)(n, o, cdr(l)))
        );
    };
};

// redefining insertL, insertR, subst
insertL = seq_f(seqL);
insertR = seq_f(seqR);
subst = seq_f(seqS);

atom_to_function = function (op) {
    return (
        eq('+', op) ? plus :
        eq('*', op) ? multiply :
        exp 
    );
};

// simplifying value
value = function (nexp) {
    return (
        atom(nexp) ? nexp :
        atom_to_function(operator(nexp))(value(first_sub_exp(nexp)), value(second_sub_exp(nexp)))
    );
};

// returns lat l with all occurances of atom a removed       
multirember_f = function (test) {
    return function (a, l) {
        return (
            isNull(l) ? [] :
            test(a, car(l)) ? multirember_f(test)(a, cdr(l)) :
            cons(car(l), multirember_f(test)(a, cdr(l)))
        );
    };
};

multirember_co = function (a, l, col) {
    return (
        isNull(l) ? [] :
        eq(a, car(l)) ? multirember_co(a, cdr(l), function (notseen, seen) {
            col(notseen, cons(car(l), seen))
        }) :
        multirember_co(a, cdr(l), function (notseen, seen) {
            col(cons(car(l), notseen), seen)
       })
    );
}

// Chapter 9
//
// This is the chapter that culminates with building the Y Combinator
//
// Our entry into the Y Combinator is this challenge: how would you write a function that
// returns the length of a list if you can't actually name that function? 
//
// Here is the normal way to do it:
length = function(l) {
    return (
        isNull(l) ? 0 :
        add1(length(cdr(l)))
    )
}

// But see how length calls itself to continue the recursion? Since we're not allowed to do that, we'll need
// to figure out another way.

// Eternity. A function that never returns. (I'm having it return undefined)
// 
// Eternity plays an important role in this exercise - when you "run out of recursions" you'll hit eternity. 
// So our ultimate goal is to build a length function that never "hits eternity."
eternity = function (l) {
    return (
        undefined
    );
};

// length0: anonymous function that calculates length of null list
// * Note: I gave it a name so I could test it, but I'm not actually using that name to recurse
// * Give length0 a list with one element and it will "hit eternity" and fail.
// * Note how length0 is exactly like length above, except that we called eternity instead of length
length0 = function (l) {
    return (
        isNull(l) ? 0 :
        add1(eternity(cdr(l)))
    );
};

// length1: anonymous function that calculates length of null list or list of 1 item
//
// length1 is exactly the same as length0 except that we replaced eternity with the function
// definition of length 0. We could make a length2 by swapping out length1's eternity with the
// funciton definition of length0. We could make length3 by ...
length1 = function (l) {
    return (
        isNull(l) ? 0 :
        add1((function (l) {
            return (
                isNull(l) ? 0 :
                add1(eternity(cdr(l)))
            );
        })(cdr(l)))
    );
};

// length0_maker - function that returns length0
// 
// The secret of length1 was swapping in the function definition of length0 in place of eternity.
// That's exactly what the length0_maker function does: we call the argument to length0_maker instead
// of eternity.
length0_maker = function (length) {return (
    function (l) {return (
        isNull(l) ? 0 :
        add1(length(cdr(l)))
    );}
);};

// Our game of not using function definitions technically prohibits us from doing this, but it helps to
// think about what we've accomplished with length0_maker.

length0 = length0_maker(eternity);
length1 = length0_maker(length0_maker(eternity));
length2 = length0_maker(length0_maker(length0_maker(eternity)))


// length1 - calculates the length of null lists or lists of length 1
//
// It's a lot harder when you can't name your functions, but the idea is the same: we're composing calls to
// length0_maker
length1 = 
(function (length) {return (
    function (l) {return (
        isNull(l) ? 0 :
        add1(length(cdr(l)))
    );}
);})(
(function (length) {return (
    function (l) {return (
        isNull(l) ? 0 :
        add1(length(cdr(l)))
    );}
);})(eternity))

// The next layer of abstraction lets us pass in length0_maker as an argument. That gives us two big advantages:
// 1. We only have to write it out once
// 2. And more important, we now have a name for length0_maker - the name of the function argument. (We'll 
// call it mk_length). So now we can simply call mk_length.
length0 =
(function (mk_length) {return (
    (mk_length(eternity))
)})(
function (length) {return (
    function (l) {return (
        isNull(l) ? 0 :
        add1(length(cdr(l)))
    );}
)})

length1 =
(function (mk_length) {return (
    (mk_length(mk_length(eternity)))
)})(
function (length) {return (
    function (l) {return (
        isNull(l) ? 0 :
        add1(length(cdr(l)))
    );}
)})

length2 =
(function (mk_length) {return (
    (mk_length(mk_length(mk_length(eternity))))
)})(
function (length) {return (
    function (l) {return (
        isNull(l) ? 0 :
        add1(length(cdr(l)))
    );}
)})

// Now the hard work is paying off - it's fairly easy to build a length function
// using the techniques we've developed
length =
(function (mk_length) {return (
    mk_length(mk_length)
)})(
    function (mk_length) {return (
        function (l) {return (
            isNull(l) ? 0 :
            add1(mk_length(mk_length)(cdr(l)))
        );}
    )}
)

// A more sophisticated variant that allows us to name length
length =
(function (mk_length) {return (
    mk_length(mk_length)
)})(
    function (mk_length) {return (
        function (l) {return (
            isNull(l) ? 0 :
            add1((function(x) {return (
                mk_length(mk_length)(x)
            )})(cdr(l)))
        );}
    )}
)

// There is only one problem with our length function - it would be cool to 
// separate the mk-length functionality from the length function itself
//
// We'll do that by passing the length function to the mk_length function as an
// argument.

length_almost_y = (function (le) {return (
    (function (mk_length) {return (
        mk_length(mk_length)
    )})(
        function (mk_length) {return (
            le(function (x) {return (
                mk_length(mk_length)(x)
            )})
        )}
    )
)})(
    function (length) {return (
        function (l) {return (
            isNull(l) ? 0 :
            add1(length(cdr(l)))
        );}
    )}
)

// Guess what the Y Combinator is? It's the mk-length part of the function above.
Y = function (le) {return (
    (function (f) {return (
        f(f)
    )})(
        function (f) {return (
            le(function (x) {return (
                    f(f)(x)
                )}
            )
        )}
    )
)};

mk_length = function (length) {return (
    function (l) {return (
        isNull(l) ? 0 :
        add1(length(cdr(l)))
    );}
)}

// Now use the Y combinator to create length
length = Y(mk_length)

