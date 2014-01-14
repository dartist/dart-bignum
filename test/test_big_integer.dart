import 'package:unittest/unittest.dart';
import 'package:bignum/src/BigInteger/big_integer.dart';

class TestBigInteger {
  testDigitsArray() {
    group('DigitsArray', () {
      test("DigitsArray(size)", () {
        DigitsArray da = new DigitsArray(10);
        expect(11, equals(da.data.length), reason: "data not constructed properly");
        expect(11, equals(da.count), reason:"data not constructed properly");
        expect(true, equals(da.isZero), reason:"Not zero");
        expect(false, equals(da.isNegative), reason:"Not positive");
      });

      test("DigitsArray.withUsed(size,used)", () {
        DigitsArray da = new DigitsArray.withUsed(10, 10);
        expect(11, equals(da.data.length), reason:"data not constructed properly");
        expect(11, equals(da.count), reason:"data not constructed properly");
        expect(10, equals(da.dataUsed), reason:"data not constructed properly");

        expect(false, equals(da.isNegative), reason:"Not positive");
      });

      test("DigitsArray.fromList(copyFrom)", () {
        DigitsArray da = new DigitsArray.withUsed(10, 10);
        expect(11, equals(da.data.length), reason:"data not constructed properly");
        expect(11, equals(da.count), reason:"data not constructed properly");
        expect(10, equals(da.dataUsed), reason:"data not constructed properly");

        expect(false, equals(da.isNegative), reason:"Not positive");

        for (int i = 0; i < 11; i++) {
          da[i] = i;
        }

        for (int i = 0; i < 10; i++) {
          expect(i, equals(da[i]), reason:"data did not set properly");
        }

        DigitsArray da2 = new DigitsArray.fromList(da.data);

        for (int i = 0; i < 10; i++) {
          expect(i, equals(da2[i]), reason:"data did not set properly");
        }

        expect(false, equals(da.isNegative), reason:"Not positive");
      });

      test("DigitsArray.ShiftLeft", () {
        DigitsArray da = new DigitsArray.withUsed(10, 10);
        for (int i = 0; i < 10; i++)
        {
          da[i] = 1;
        }

        for (int i =0; i < 31; i ++) {
          da.ShiftLeft(1);
          expect(da[1], equals(2<<i), reason:"int shifted out of range");
        }
      });

      test("DigitsArray.ShiftRight", () {
        DigitsArray da = new DigitsArray.withUsed(10, 10);
        for (int i = 0; i < 10; i++)
        {
          da[i] = 1;
        }

        var l = [2147483648,1073741824,536870912,268435456,134217728,67108864,33554432,16777216,8388608,4194304,2097152,1048576,524288,262144,131072,65536,32768,16384,8192,4096,2048,1024,512,256,128,64,32,16,8,4,2,1];

        for (int i =0; i < 32; i ++) {
          da.ShiftRight(1);
          expect(l[i], equals(da[1]), reason:"Did not equal expect right shift result");
        }

        da.ShiftRight(1);
        expect(l[0], equals(da[1]), reason:"Did not equal expect right shift result");

      });
    });
  }

  testBigInteger() {
    group("", () {
      test("", () {
        BigInteger bi1 = new BigInteger.fromInt(1);
        BigInteger bi2 = new BigInteger.fromInt(1);
        BigInteger bi3 = bi1 + bi2;
        //print("bi1 = ${bi1.m_digits.data}");
        //print("bi2 = ${bi2.m_digits.data}");
        //print("bi3 = ${bi3.m_digits.data}");

        bi1 = new BigInteger.fromInt(1);
        bi2 = new BigInteger.fromInt(1);
        bi3 = bi1 + bi2;
        for (int i =0; i<10000; i++) {
          bi3+=bi3;
          //print("bi3 = ${bi3.m_digits.data}");
        }
      });

// * is not implemented yet.
//      test("", () {
//        BigInteger bi1 = new BigInteger.fromString("1");
//        BigInteger bi2 = new BigInteger.fromString("1");
//        BigInteger bi3 = bi1 + bi2;
//        print("bi1 = ${bi1.m_digits.data}");
//        print("bi2 = ${bi2.m_digits.data}");
//        print("bi3 = ${bi3.m_digits.data}");
//      });
    });
  }

  void main() {
    testDigitsArray();
    testBigInteger();
  }
}

void main() {
  new TestBigInteger().main();
}