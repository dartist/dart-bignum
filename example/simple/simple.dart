import 'package:bignum/bignum.dart';

void main() {
  BigInteger x = new BigInteger("12341234123412341234");
  BigInteger y = new BigInteger("100");
  var z = x * y * x;
  print("base 10: z = ${z.toString()}");
  print("base 16: z = ${z.toString(16)}");
  print("base 2: z = ${z.toString(2)}");
}