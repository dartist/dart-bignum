//#import('package:unittest/unittest.dart');
#import('../packages/unittest/unittest.dart');
#source('../BigInteger_v8/big_integer.dart');

class TestBigIntegerV8 {
  
  testBigInteger() {
    group("BigInteger v8", () {
      test("Construct BigInteger", () {
        // 0xabcd1234 modulo 0xbeef = 0xB60C
        var x = new BigInteger("abcd1234", 16);
        var y = new BigInteger("beef", 16);
        var z = x.mod(y);
        
        //0xabcd1234 * 0xbeef = 802297f6968c
        var zz = x.multiply(y);
        
        print(x.toString(16));
        print(y.toString(16));
        print(z.toString(16));
        print(zz.toString(16));
        });
      });
    }
  

  void main() {
    testBigInteger();
  }
}

void main() {
  new TestBigIntegerV8().main();
}
