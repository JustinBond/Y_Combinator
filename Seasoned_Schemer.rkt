#lang racket

; defining a few variables for testing
(define a '(1 2 3 4 5 6))
(define b '(4 2 4 3 7 7 1 4))

; prerequisites for the Little Schemer series
(define atom?
  (lambda (x)
    (and (not (pair? x)) (not (null? x)))))

(define add1
  (lambda (n)
    (+ n 1)))

(define sub1
  (lambda (n)
    (- n 1)))
; end of prerequisites

(define is-first?
  (lambda (a lat)
    (cond
      [(null? lat) #f]
       [else (eq? a (car lat))])))

; true if lat l has two of the same atoms in a row
(define two-in-a-row?
  (lambda (l)
    (cond
      [(null? l) #f]
      [else (is-first-b? (car l) (cdr l))])))

(define is-first-b?
  (lambda (a lat)
    (cond
      [(null? lat) #f]
      [(eq? a (car lat)) #t]
      [else (two-in-a-row? (cdr lat))])))

(define two-in-a-row-b?
  (lambda (a lat)
    (cond
      [(null? lat) #f]
      [(eq? a (car lat)) #t]
      [else (two-in-a-row-b? (car lat) (cdr lat))])))

(define two-in-a-row-c?
  (lambda (lat)
    (cond
      [(null? lat) #f]
      [(null? (cdr lat)) #f]
      [(eq? (car lat) (car (cdr lat))) #t]
      [else (two-in-a-row-c? (cdr lat))])))

; creates a series which is the sum of the prefixes up to that point
(define sum-of-prefixes-b
  (lambda (sonssf tup)
    (cond
      [(null? tup) '()]
      [else (cons (+ sonssf (car tup)) (sum-of-prefixes-b (+ sonssf (car tup)) (cdr tup)))])))

(define sum-of-prefixes
  (lambda (tup)
    (sum-of-prefixes-b 0 tup)))

(define neq?
  (lambda (a b)
    (not (eq? a b))))

(define one?
  (lambda (n)
    (eq? 1 n)))

; pick the nth element in list l
(define pick
  (lambda (n l)
    (cond
      [(one? n) (car l)]
      [else (pick (sub1 n) (cdr l))])))

; Scramble: assemble lat by picking elements based on the reversed prefix order
(define scramble-b
  (lambda (tup rev-pre)
    (cond
      [(null? tup) '()]
      [else (cons
             (pick (car tup) (cons (car tup) rev-pre))
             (scramble-b (cdr tup) (cons (car tup) rev-pre)))])))

(define scramble
  (lambda (tup)
    (scramble-b tup '())))

; Chapter 12