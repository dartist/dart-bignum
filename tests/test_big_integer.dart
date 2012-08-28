#import('package:unittest/unittest.dart');
//#import('../packages/unittest/unittest.dart');
#source('../lib/BigInteger/big_integer.dart');

class TestBigInteger {
  testDigitsArray() {
    group('DigitsArray', () {
      test("DigitsArray(size)", () {
        DigitsArray da = new DigitsArray(10);
        Expect.equals(11, da.data.length, "data not constructed properly");
        Expect.equals(11, da.count, "data not constructed properly");
        Expect.equals(true, da.isZero, "Not zero");
        Expect.equals(false, da.isNegative, "Not positive");
      });
      
      test("DigitsArray.withUsed(size,used)", () {
        DigitsArray da = new DigitsArray.withUsed(10, 10);
        Expect.equals(11, da.data.length, "data not constructed properly");
        Expect.equals(11, da.count, "data not constructed properly");
        Expect.equals(10, da.dataUsed, "data not constructed properly");
        
        Expect.equals(false, da.isNegative, "Not positive");
      });
      
      test("DigitsArray.fromList(copyFrom)", () {
        DigitsArray da = new DigitsArray.withUsed(10, 10);
        Expect.equals(11, da.data.length, "data not constructed properly");
        Expect.equals(11, da.count, "data not constructed properly");
        Expect.equals(10, da.dataUsed, "data not constructed properly");
       
        Expect.equals(false, da.isNegative, "Not positive");
        
        for (int i = 0; i < 11; i++) {
          da[i] = i;
        }
        
        for (int i = 0; i < 10; i++) {
          Expect.equals(i, da[i], "data did not set properly");
        }
        
        DigitsArray da2 = new DigitsArray.fromList(da.data);
        
        for (int i = 0; i < 10; i++) {
          Expect.equals(i, da2[i], "data did not set properly");
        }
        
        Expect.equals(false, da.isNegative, "Not positive");
      });
      
      test("DigitsArray.ShiftLeft", () {
        DigitsArray da = new DigitsArray.withUsed(10, 10);
        for (int i = 0; i < 10; i++)
        {
          da[i] = 1;
        }
        
        for (int i =0; i < 31; i ++) {
          da.ShiftLeft(1);
          Expect.equals(da[1], 2<<i, "int shifted out of range");
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
          Expect.equals(l[i], da[1], "Did not equal expect right shift result");
        }
        
        da.ShiftRight(1);
        Expect.equals(l[0], da[1], "Did not equal expect right shift result");
        
      });
    });
  }
  
  testBigInteger() {
    group("", () {
      test("", () {
        BigInteger bi1 = new BigInteger.fromInt(1);
        BigInteger bi2 = new BigInteger.fromInt(1);
        BigInteger bi3 = bi1 + bi2;
        print("bi1 = ${bi1.m_digits.data}");
        print("bi2 = ${bi2.m_digits.data}");
        print("bi3 = ${bi3.m_digits.data}");
        
        bi1 = new BigInteger.fromInt(1);
        bi2 = new BigInteger.fromInt(1);
        bi3 = bi1 + bi2;
        for (int i =0; i<10000; i++) {
          bi3+=bi3;
          print("bi3 = ${bi3.m_digits.data}");
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