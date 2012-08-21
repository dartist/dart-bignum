#import('file:///C:/dart_bleeding/dart/dart-sdk/lib/unittest/unittest.dart');
#source('../BigInteger/big_integer.dart');

class TestBigInteger {
  void main() {
    group('DigitsArray', () {
      test("Constructor (size)", () {
        DigitsArray da = new DigitsArray(10);
        Expect.equals(11, da.data.length, "data not constructed properly");
        Expect.equals(11, da.count, "data not constructed properly");
        Expect.equals(true, da.isZero, "Not zero");
        Expect.equals(false, da.isNegative, "Not positive");
      });
      
      test(".withUsed(size,used)", () {
        DigitsArray da = new DigitsArray.withUsed(10, 10);
        Expect.equals(11, da.data.length, "data not constructed properly");
        Expect.equals(11, da.count, "data not constructed properly");
        Expect.equals(10, da.dataUsed, "data not constructed properly");
        
        Expect.equals(false, da.isNegative, "Not positive");
      });
      
      test(".fromList(copyFrom)", () {
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
      
      test("ShiftLeft", () {
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
      
      test("ShiftRight", () {
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
}

void main() {
  new TestBigInteger().main();
}