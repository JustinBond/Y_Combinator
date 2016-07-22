#lang racket

(define atom?
  (lambda (x)
    (and (not (pair? x)) (not (null? x)))))

(define add1
  (lambda (n)
    (+ n 1)))

(define sub1
  (lambda (n)
    (- n 1)))

(define is-first
  (lambda (a lat)
    (cond
      [(null? lat) #f]
       [else (eq? a (car lat))])))

(define two-in-a-row
  (lambda (lat)
    (cond
      [(null? lat) #f]
      [(is-first (car lat) (cdr lat)) #t]
      [else (two-in-a-row (cdr lat))])))


