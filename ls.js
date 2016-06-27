var debug,
    atom,
    car,
    cdr,
    cons,
    isNull,
    lat,
    member,
    rember;

debug = false;

// returns true if s is a string or number
atom = function (s) {
    if (typeof s === 'number' || typeof s === 'string') {
        return true;
    }
    return false;
};

// returns the first element of list l
car = function (l) {
    m = l.slice(0);
    return m.shift();
};

// returns list l except for the first element
cdr = function (l) {
    debug && print("cdr: l is " + l);
    m = l.slice(0);
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
}

// lat: list of atoms
// Returns true if every element of l is an atom
// Returns true if isNull. So technically, nll (not list of lists).
//
lat = function (l) {
    return isNull(l) 
           || (atom(car(l)) && lat(cdr(l)));
};

// returns true if atom a is a member of lat l
member = function (a, l) {
    debug && print("ls is " + l);
    return ! isNull(l)
           && ((a === car(l)) || member(a, cdr(l)));

};

// returns lat l with first occurance of atom a removed       
rember = function (a, l) {
    return (isNull(l) && []) 
           || (a === car(l) && cdr(l))
           || (cons(car(l), rember(a, cdr(l)))) 
};
