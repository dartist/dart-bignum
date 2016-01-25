

library bignum.null_exp;

class NullExp {
  NullExp();
  convert(x) { return x; }
  revert(x) { return x; }
  mulTo(x,y,r) { x.multiplyTo(y,r); }
  sqrTo(x,r) { x.squareTo(r); }
}