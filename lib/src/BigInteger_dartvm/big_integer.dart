part of bignum;

/*
 * Copyright (c) 2003-2005  Tom Wu
 * Copyright (c) 2012 Adam Singer (adam@solvr.io)
 * All Rights Reserved.
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS-IS" AND WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS, IMPLIED OR OTHERWISE, INCLUDING WITHOUT LIMITATION, ANY
 * WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE.
 *
 * IN NO EVENT SHALL TOM WU BE LIABLE FOR ANY SPECIAL, INCIDENTAL,
 * INDIRECT OR CONSEQUENTIAL DAMAGES OF ANY KIND, OR ANY DAMAGES WHATSOEVER
 * RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER OR NOT ADVISED OF
 * THE POSSIBILITY OF DAMAGE, AND ON ANY THEORY OF LIABILITY, ARISING OUT
 * OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
 *
 * In addition, the following condition applies:
 *
 * All redistributions must retain an intact copy of this copyright notice
 * and disclaimer.
 */

/**
 * Basic dart [BigIntegerDartvm] class. Implementation works across
 * dart and dart2js.
 */
class BigIntegerDartvm implements BigInteger {

  /** Create a new [BigIntegerDartvm] */
  /** return [BigIntegerDartvm] initialized to [i] */
  static BigIntegerDartvm nbv(int i) {
    return new BigIntegerDartvm(i);
  }

  static BigIntegerDartvm get ZERO => nbv(0);
  static BigIntegerDartvm get ONE => nbv(1);
  static BigIntegerDartvm get TWO => nbv(2);
  static BigIntegerDartvm get THREE => nbv(3);

  // Basic dart BN library - subset useful for RSA encryption.

  /** [List] of low primes */
  static const List<int> _lowprimes = const [
    2,
    3,
    5,
    7,
    11,
    13,
    17,
    19,
    23,
    29,
    31,
    37,
    41,
    43,
    47,
    53,
    59,
    61,
    67,
    71,
    73,
    79,
    83,
    89,
    97,
    101,
    103,
    107,
    109,
    113,
    127,
    131,
    137,
    139,
    149,
    151,
    157,
    163,
    167,
    173,
    179,
    181,
    191,
    193,
    197,
    199,
    211,
    223,
    227,
    229,
    233,
    239,
    241,
    251,
    257,
    263,
    269,
    271,
    277,
    281,
    283,
    293,
    307,
    311,
    313,
    317,
    331,
    337,
    347,
    349,
    353,
    359,
    367,
    373,
    379,
    383,
    389,
    397,
    401,
    409,
    419,
    421,
    431,
    433,
    439,
    443,
    449,
    457,
    461,
    463,
    467,
    479,
    487,
    491,
    499,
    503,
    509
  ];
  static final int _lplim = (1 << 26) ~/ _lowprimes[_lowprimes.length - 1];

  int data;

  static const BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
  static final Map BI_RC = () {
    // Digit conversions
    Map rslt = new Map();
    int rr, vv;
    rr = "0".codeUnitAt(0);
    for (vv = 0; vv <= 9; ++vv) rslt[rr++] = vv;
    rr = "a".codeUnitAt(0);
    for (vv = 10; vv < 36; ++vv) rslt[rr++] = vv;
    rr = "A".codeUnitAt(0);
    for (vv = 10; vv < 36; ++vv) rslt[rr++] = vv;
    return rslt;
  }();

  /**
   * Constructor of [BigIntegerDartvm]
   *
   * Constructor can be called in mutiple ways
   *
   * 1) Passing byte array [List]
   *    var x = new BigInteger([0x5]);
   *    x.toString() == "5";
   *
   * 2) Passing [int]
   *    int i = 5;
   *    var x = new BigInteger(i);
   *    x.toString() == "5";
   *
   * 3) Passing [num]
   *    num i = 5;
   *    var x = new BigInteger(i);
   *    x.toString() == "5";
   *
   * 4) Passing [double]
   *    double i = 5.0;
   *    var x = new BigInteger(i);
   *    x.toString() == "5";
   *
   * 5) Passing [String] with optional base [int]
   *    String s = "5";
   *    var x = new BigInteger(s);
   *    x.toString() == "5";
   *
   *    String s = "beef";
   *    var x = new BigInteger(s);
   *    x.toString() == "beef";
   */
  static int cc = 0;
  BigIntegerDartvm([a, b, c]) {
    if (a != null) {
      if (a is int) {
        data = a;
      } else if (a is num) {
        data = a.toInt();
      } else if (a is List) {
        this.fromByteArray(a);
      } else {
        this.fromString(a, b);
      }
    }
  }

  factory BigIntegerDartvm.fromBytes(int signum, List<int> magnitude) {
    BigIntegerDartvm self = new BigIntegerDartvm();
    if (signum != 0) {
      self.fromByteArray(magnitude, true);
    } else {
      self.fromByteArray(magnitude, false);
    }
    if (signum < 0) {
      self.data = -self.data;
    }

    return self;
  }

  _int2char(n) {
    return BI_RM[n];
  }

  _intAt(s, i) {
    var c = BI_RC[s.codeUnitAt(i)];
    return (c == null) ? -1 : c;
  }

  /** copy [this] to [r] */
  void copyTo(BigIntegerDartvm r) {
    r.data = data;
  }

  /** set from integer value [x], -[BI_DV] <= [x] < [BI_DV] */
  void fromInt(int x) {
    data = x;
  }

  /** set from string [s] and radix [b] */
  void fromString(String s, int b) {
    data = int.parse(s, radix: b, onError: (str) => 0);
  }
  void fromByteArray(List s, [bool fixsign = false]) {
    if (s == null || s.length == 0) {
      data = 0;
      return;
    }
    bool neg = false;
    if (!fixsign && s[0] & 0xFF > 0x7F) {
      neg = true;
    }
    if (neg) {
      int v = 0;
      for (int byte in s) {
        v = (v << 8) | (~((byte & 0xFF) - 256));
      }
      data = ~v;
    } else {
      int v = 0;
      for (int byte in s) {
        v = (v << 8) | (byte & 0xFF);
      }
      data = v;
    }
  }

  /** return string representation in given radix [b] */
  String toString([int b = 10]) {
    // NOTE: overriding toString like this is probably bad.
    return data.toRadixString(b);
  }

  /** -this */
  negate_op() {
    return new BigIntegerDartvm(-data);
  }

  /** |this| */
  BigIntegerDartvm abs() {
    return (data < 0) ? this.negate_op() : this.clone();
  }

  /** return + if [this] > [a], - if [this] < [a], 0 if equal **/
  int compareTo(a) {
    if (a is num) {
      return data.compareTo(a);
    }
    if (a is BigIntegerDartvm) {
      return data.compareTo(a.data);
    }
    return 0;
  }

  /** returns bit length of the integer [x] */
  int nbits(x) {
    var r = 1,
        t;

    if (x is num) x = x.toInt();

    if ((t = x >> 16) != 0) {
      x = t;
      r += 16;
    }
    if ((t = x >> 8) != 0) {
      x = t;
      r += 8;
    }
    if ((t = x >> 4) != 0) {
      x = t;
      r += 4;
    }
    if ((t = x >> 2) != 0) {
      x = t;
      r += 2;
    }
    if ((t = x >> 1) != 0) {
      x = t;
      r += 1;
    }
    return r;
  }

  /** return the number of bits in [this] */
  int bitLength() {
    return data.bitLength;
  }

  /** r = this << n */
  void lShiftTo(int n, r) {
    r.data = data << n;
  }

  /** r = this >> n */
  void rShiftTo(int n, r) {
    r.data = data >> n;
  }

  /** r = this - a */
  void subTo(a, r) {
    r.data = data - a.data;
  }

  /**
   * r = this * a, r != this,a (HAC 14.12)
   * [this] should be the larger one if appropriate.
   */
  void multiplyTo(a, r) {
    r.data = data * a.data;
  }

  /** r = this^2, r != this (HAC 14.16) */
  void squareTo(r) {
    r.data = data * data;
  }

  /**
   * divide this by m, quotient and remainder to q, r (HAC 14.20)
   * r != q, this != m.  q or r may be null.
   */
  divRemTo(BigIntegerDartvm m, BigIntegerDartvm q, BigIntegerDartvm r) {
    q.data = data ~/ m.data;
    r.data = data % m.data;
  }

  /** this mod a */
  mod(a) {
    return new BigIntegerDartvm(data % a.data);
  }

  /** true iff [this] is even */
  isEven() {
    return data.isEven;
  }

  /** true iff [this] is off */
  isOdd() {
    return data.isOdd;
  }

  /** this^e, e < 2^32, doing sqr and mul with "r" (HAC 14.79) */
  BigIntegerDartvm exp(int e, z) {
    if (e > 0xffffffff || e < 1) return BigIntegerDartvm.ONE;
    return new BigIntegerDartvm(Mathx.pow(data, e));
  }

  /**  this^e % m, 0 <= e < 2^32 */
  BigIntegerDartvm modPowInt(int e, BigIntegerDartvm m) {
    return new BigIntegerDartvm(data.modPow(e, m.data));
  }

  /** clone */
  clone() {
    return new BigIntegerDartvm(this.data);
  }

  /** return value as integer */
  int intValue() {
    return data;
  }

  /** return value as byte */
  byteValue() {
    return data & 0xff;
  }

  /** return value as short (assumes DB>=16) */
  shortValue() {
    return data & 0xffff;
  }

  /** 0 if this == 0, 1 if this > 0 */
  int signum() {
    return data.sign;
  }

  /** convert to radix string , http://dartbug.com/461 num only supports up to radix 16 */
  String toRadix([int b = 10]) {
    return data.toRadixString(b);
  }

  /** convert from radix string */
  void fromRadix(s, b) {
    data = int.parse(s, radix: b, onError: (str) => 0);
  }

  /**
   * convert to bigendian byte array [List]
   */
  List<int> toByteArray() {
    String str;
    bool neg = false;
    if (data < 0) {
      str = (~data).toRadixString(16);
      neg = true;
    } else {
      str = data.toRadixString(16);
    }
    int p = 0;
    int len = str.length;

    int blen = (len + 1) ~/ 2;
    int boff = 0;
    List bytes;
    if (neg) {
      if (len & 1 == 1) {
        p = -1;
      }
      int byte0 = ~int.parse(str.substring(0, p + 2), radix: 16);
      if (byte0 < -128) byte0 += 256;
      if (byte0 >= 0) {
        boff = 1;
        bytes = new List<int>(blen + 1);
        bytes[0] = -1;
        bytes[1] = byte0;
      } else {
        bytes = new List<int>(blen);
        bytes[0] = byte0;
      }
      for (int i = 1; i < blen; ++i) {
        int byte = ~int.parse(str.substring(p + (i << 1), p + (i << 1) + 2),
            radix: 16);
        if (byte < -128) byte += 256;
        bytes[i + boff] = byte;
      }
    } else {
      if (len & 1 == 1) {
        p = -1;
      }
      int byte0 = int.parse(str.substring(0, p + 2), radix: 16);
      if (byte0 > 127) byte0 -= 256;
      if (byte0 < 0) {
        boff = 1;
        bytes = new List<int>(blen + 1);
        bytes[0] = 0;
        bytes[1] = byte0;
      } else {
        bytes = new List<int>(blen);
        bytes[0] = byte0;
      }
      for (int i = 1; i < blen; ++i) {
        int byte =
            int.parse(str.substring(p + (i << 1), p + (i << 1) + 2), radix: 16);
        if (byte > 127) byte -= 256;
        bytes[i + boff] = byte;
      }
    }
    return bytes;
  }

  bool equals(BigIntegerDartvm a) {
    return this.compareTo(a) == 0 ? true : false;
  }

  BigIntegerDartvm min(BigIntegerDartvm a) {
    return (this.compareTo(a) < 0) ? this : a;
  }

  BigIntegerDartvm max(BigIntegerDartvm a) {
    return (this.compareTo(a) > 0) ? this : a;
  }

  void bitwiseTo(BigIntegerDartvm a, Function op, BigIntegerDartvm r) {
    r.data = op(data, a.data);
  }

  /** this & a */
  op_and(x, y) {
    return x & y;
  }
  and(a) {
    return new BigIntegerDartvm(data & a.data);
  }

  /** this | a */
  op_or(x, y) {
    return x | y;
  }

  or(a) {
    return new BigIntegerDartvm(data | a.data);
  }

  /** this ^ a */
  op_xor(x, y) {
    return x ^ y;
  }
  xor(a) {
    return new BigIntegerDartvm(data ^ a.data);
  }

  /** this & ~a */
  op_andnot(x, y) {
    return x & ~y;
  }
  andNot(a) {
    return new BigIntegerDartvm(data & ~a.data);
  }

  /** ~this */
  not() {
    return new BigIntegerDartvm(~data);
  }

  /** this << n */
  shiftLeft(int n) {
    return new BigIntegerDartvm(data << n);
  }

  /** this >> n */
  shiftRight(int n) {
    return new BigIntegerDartvm(data >> n);
  }

  /** return index of lowest 1-bit in x, x < 2^31 */
  int lbit(int x) {
    if (x == 0) return -1;
    int r = 0;
    while ((x & 0xffffffff) == 0) {
      x >>= 32;
      r += 32;
    }
    if ((x & 0xffff) == 0) {
      x >>= 16;
      r += 16;
    }
    if ((x & 0xff) == 0) {
      x >>= 8;
      r += 8;
    }
    if ((x & 0xf) == 0) {
      x >>= 4;
      r += 4;
    }
    if ((x & 3) == 0) {
      x >>= 2;
      r += 2;
    }
    if ((x & 1) == 0) ++r;
    return r;
  }

  /** returns index of lowest 1-bit (or -1 if none) */
  getLowestSetBit() {
    return lbit(data);
  }

  int get lowestSetBit => getLowestSetBit();

  /** return number of 1 bits in x */
  cbit(int x) {
    var r = 0;
    while (x != 0) {
      x &= x - 1;
      ++r;
    }
    return r;
  }

  /** return number of set bits */
  bitCount() {
    //TODO, optimize this
    return cbit(data);
  }

  /** true iff nth bit is set */
  testBit(n) {
    return ((data & (1 << n)) != 0);
  }

  /** this | (1<<n) */
  setBit(n) {
    return new BigIntegerDartvm(data | (1 << n));
  }

  /** this & ~(1<<n) */
  clearBit(n) {
    return new BigIntegerDartvm(data & ~(1 << n));
  }

  /** this ^ (1<<n) */
  flipBit(n) {
    return new BigIntegerDartvm(data ^ (1 << n));
  }

  /** r = this + a */
  addTo(a, r) {
    r.data = data + a.data;
  }

  /** this + a */
  BigIntegerDartvm add(a) {
    return new BigIntegerDartvm(data + a.data);
  }

  /** this - a */
  BigIntegerDartvm subtract(a) {
    return new BigIntegerDartvm(data - a.data);
  }

  /** this * a */
  BigIntegerDartvm multiply(a) {
    return new BigIntegerDartvm(data * a.data);
  }

  /** this / a */
  BigIntegerDartvm divide(a) {
    return new BigIntegerDartvm(data ~/ a.data);
  }

  /** this % a */
  BigIntegerDartvm remainder(BigIntegerDartvm a) {
    return new BigIntegerDartvm(data.remainder(a.data));
  }

  /** [this/a, this%a] returns Map<BigInteger>
   * [0] = this/a
   * [1] = this%a
   */
  Map<int, BigIntegerDartvm> divideAndRemainder(a) {
    //return new Array(q,r);
    Map ret_m = new Map();
    ret_m[0] = divide(a);
    ret_m[1] = remainder(a);
    return ret_m;
  }

  /** this *= n, this >= 0, 1 < n < [BI_DV] */
  dMultiply(n) {
    data *= n;
  }
  dAddOffset(n, w) {
    if (w == 0) {
      data += n;
    } else {
      throw 'dAddOffset($n,$w) not implemented';
    }
  }
  /** this^e */
  BigIntegerDartvm pow(int e) {
    return this.exp(e, new NullExp());
  }

  /** this^e % m (HAC 14.85) */
  modPow(BigIntegerDartvm e, BigIntegerDartvm m) {
    return new BigIntegerDartvm(data.modPow(e.data, m.data));
  }

  /** gcd(this,a) (HAC 14.54) */
  gcd(v) {
    return new BigIntegerDartvm(data.gcd(v.data));
  }

  /** this % n, n < 2^26 */
  int modInt(int n) {
    return data % n;
  }

  /** 1/this % m (HAC 14.61) */
  BigIntegerDartvm modInverse(BigIntegerDartvm m) {
    return new BigIntegerDartvm(data.modInverse(m.data));
  }

  _adjust(val, m) => (signum() < 0) ? (m - val) : val;

  /** test primality with certainty >= 1-.5^t */
  bool isProbablePrime(int t) {
    var i,
        x = this.abs();
    if (data <= _lowprimes[_lowprimes.length - 1]) {
      for (i = 0;
          i < _lowprimes.length;
          ++i) if (data == _lowprimes[i]) return true;
      return false;
    }
    if (x.isEven()) return false;
    i = 1;
    while (i < _lowprimes.length) {
      var m = _lowprimes[i],
          j = i + 1;
      while (j < _lowprimes.length && m < _lplim) m *= _lowprimes[j++];
      m = x.modInt(m);
      while (i < j) if (m % _lowprimes[i++] == 0) return false;
    }
    return x.millerRabin(t);
  }

  /** true if probably prime (HAC 4.24, Miller-Rabin) */
  bool millerRabin(t) {
    var n1 = this.subtract(BigIntegerDartvm.ONE);
    var k = n1.getLowestSetBit();
    if (k <= 0) return false;
    var r = n1.shiftRight(k);
    t = (t + 1) >> 1;
    if (t > _lowprimes.length) t = _lowprimes.length;
    var a = new BigIntegerDartvm();
    for (var i = 0; i < t; ++i) {
      a.fromInt(_lowprimes[i]);
      var y = a.modPow(r, this);
      if (y.compareTo(BigIntegerDartvm.ONE) != 0 && y.compareTo(n1) != 0) {
        var j = 1;
        while (j++ < k && y.compareTo(n1) != 0) {
          y = y.modPowInt(2, this);
          if (y.compareTo(BigIntegerDartvm.ONE) == 0) return false;
        }
        if (y.compareTo(n1) != 0) return false;
      }
    }
    return true;
  }

  // Arithmetic operations.
  BigIntegerDartvm operator +(BigIntegerDartvm other) => add(other);
  BigIntegerDartvm operator -(BigIntegerDartvm other) => subtract(other);
  BigIntegerDartvm operator *(BigIntegerDartvm other) => multiply(other);
  BigIntegerDartvm operator %(BigIntegerDartvm other) => mod(other);
  BigIntegerDartvm operator /(BigIntegerDartvm other) => divide(other);

  // Truncating division.
  BigIntegerDartvm operator ~/(BigIntegerDartvm other) => divide(other);

  // The unary '-' operator.
  BigIntegerDartvm operator -() => this.negate_op();

  // NOTE: This is implemented above.
  //BigInteger remainder(BigInteger other) { throw "Not Implemented"; }

  // Relational operations.
  bool operator <(BigIntegerDartvm other) =>
      compareTo(other) < 0 ? true : false;
  bool operator <=(BigIntegerDartvm other) =>
      compareTo(other) <= 0 ? true : false;
  bool operator >(BigIntegerDartvm other) =>
      compareTo(other) > 0 ? true : false;
  bool operator >=(BigIntegerDartvm other) =>
      compareTo(other) >= 0 ? true : false;
  bool operator ==(other) => compareTo(other) == 0 ? true : false;

  // Bit-operations.
  BigIntegerDartvm operator &(BigIntegerDartvm other) => and(other);
  BigIntegerDartvm operator |(BigIntegerDartvm other) => or(other);
  BigIntegerDartvm operator ^(BigIntegerDartvm other) => xor(other);
  BigIntegerDartvm operator ~() => not();
  BigIntegerDartvm operator <<(int shiftAmount) => shiftLeft(shiftAmount);
  BigIntegerDartvm operator >>(int shiftAmount) => shiftRight(shiftAmount);
}
