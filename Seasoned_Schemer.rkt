#lang racket

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

(define two-in-a-row?
  (lambda (lat)
    (cond
      [(null? lat) #f]
      [else (is-first-b? (car lat) (cdr lat))])))

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

(define sum-of-prefixes-b
  (lambda (sonssf tup)
    (cond
      [(null? tup) '()]
      [else (cons (+ sonssf (car tup)) (sum-of-prefixes-b (+ sonssf (car tup)) (cdr tup)))])))

(define sum-of-prefixes
  (lambda (tup)
    (sum-of-prefixes-b 0 tup)))


