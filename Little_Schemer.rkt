#lang racket

; defining some variables for testing
(define a '(3 4 9 5 4 2 5 7))


; returns true if x is an atom
(define atom?
  (lambda (x)
    (and (not (pair? x)) (not (null? x)))))

(define add1
  (lambda (n)
    (+ n 1)))

(define sub1
  (lambda (n)
    (- n 1)))

; returns true if l is a lat
(define lat?
  (lambda (l)
    (cond
      [(null? l) #t]
      [(atom? (car l)) (lat? (cdr l))]
      [else #f])))

; returns #t if atom a is a member of lat l
(define member
  (lambda (a l)
    (cond
      [(null? l) #f]
      [(eq? a (car l)) #t]
      [else (member a (cdr l))])))

; returns lat l with the first instance of atom a removed
(define rember
  (lambda (a l)
    (cond
      [(null? l) '()]
      [(eq? a (car l)) (cdr l)]
      [else (cons (car l) (rember a (cdr l)))])))

; returns the first element from a list of lists, or null list if null
(define firsts
  (lambda (l)
    (cond
      [(null? l) '()]
      [else (cons (car (car l)) (firsts (cdr l)))])))

