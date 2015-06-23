library bignum;
import 'dart:math' as Mathx;
import 'dart:typed_data';

part 'src/BigInteger_v8/big_integer.dart';
part 'src/BigInteger_dartvm/big_integer.dart';

abstract class BigInteger {
  static bool useJsBigint = (){
    if (0.0 is int) {
      return true;
    }
    try {
      // make sure the sdk support modInverse
      return 3.modInverse(7) == -1;
    }catch(err) {
      return true;
    }
    return false;
  }();
  static BigInteger get ZERO {
    if (useJsBigint) {
      return BigIntegerV8.nbv(0);
    } else {
      return BigIntegerDartvm.nbv(0);
    }
  }
  static BigInteger get ONE {
    if (useJsBigint) {
      return BigIntegerV8.nbv(1);
    } else {
      return BigIntegerDartvm.nbv(1);
    }
  }
  static BigInteger get TWO {
    if (useJsBigint) {
      return BigIntegerV8.nbv(2);
    } else {
      return BigIntegerDartvm.nbv(2);
    }
  }
  static BigInteger get THREE {
    if (useJsBigint) {
      return BigIntegerV8.nbv(3);
    } else {
      return BigIntegerDartvm.nbv(3);
    }
  }
  factory BigInteger([a,b,c]) {
    if (useJsBigint) {
      return new BigIntegerV8(a,b,c);
    } else {
      return new BigIntegerDartvm(a,b,c);
    }
  }
  factory BigInteger.fromBytes( int signum, List<int> magnitude ) {
    if (useJsBigint) {
      return new BigIntegerV8.fromBytes(signum, magnitude);
    } else {
      return new BigIntegerDartvm.fromBytes(signum, magnitude);
    }
  }
   BigInteger operator %( other);

   BigInteger operator &( other);

   BigInteger operator *( other);

   BigInteger operator +( other);

   BigInteger operator -();

   BigInteger operator -( other);

   BigInteger operator /( other);

   bool operator <( other);

   BigInteger operator <<(int shiftAmount);

   bool operator <=( other);

   bool operator >( other);

   bool operator >=( other);

   BigInteger operator >>(int shiftAmount);

   BigInteger operator ^( other);

   BigInteger abs();

   BigInteger add(a);

   void bitwiseTo(a, Function op, r);
   
   addTo(a, r);

   and(a);

   andNot(a);

   bitCount();

   int bitLength();

   byteValue();

   cbit(x);

   clearBit(n);

   clone();

   int compareTo(a);

   void copyTo( r);

   dMultiply(n);
   dAddOffset(n,w);
   
   divRemTo( m, q,  r);

   BigInteger divide(a);

   Map<int, BigInteger> divideAndRemainder(a);

   bool equals( a);

   BigInteger exp(int e, z);

   flipBit(n);

   void fromInt(int x);

   void fromRadix(s, b);

   void fromString(s, int b);

   gcd(a);

   getLowestSetBit();

   int intValue();

   isEven();

   isOdd();

   bool isProbablePrime(int t);

   void lShiftTo(n, r);

   lbit(x);

   // TODO: implement lowestSetBit
   int get lowestSetBit;

   BigInteger max( a);

   bool millerRabin(t);

   BigInteger min( a);

   mod(a);

   int modInt(int n);

   BigInteger modInverse( m);

   modPow( e,  m);

   BigInteger modPowInt(int e,  m);

   BigInteger multiply(a);

   void multiplyTo(a, r);

   int nbits(x);

   negate_op();

   not();

   op_and(x, y);

   op_andnot(x, y);

   op_or(x, y);

   op_xor(x, y);

   or(a);

   BigInteger pow(int e);

   void rShiftTo(int n, r);

   BigInteger remainder( a);

   setBit(n);

   shiftLeft(int n);

   shiftRight(int n);

   shortValue();

   int signum();

   void squareTo(r);

   void subTo(a, r);

   BigInteger subtract(a);


   testBit(n);

   List<int> toByteArray();

   String toRadix([int b = 10]);

   String toString([int b]);

   xor(a);

   BigInteger operator |( other);

   BigInteger operator ~();

   BigInteger operator ~/( other);
}
