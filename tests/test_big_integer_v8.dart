//#import('package:unittest/unittest.dart');
#import('dart:math', prefix:"Mathx");
#import('../fixnum/fixnum.dart', prefix:"Fixnum");
#import('../packages/unittest/unittest.dart');
#source('../BigInteger_v8/big_integer.dart');
#source('data/powpowpow.dart');

bool TEST_EXTRA_LARGE = false;
run_sequence(t) {
  if (TEST_EXTRA_LARGE) {
    for (int i = 0; i < 100; i++) {
      t();
    }
  } else {
    t();
  }
}

class TestBigIntegerV8 {
  
  testBigInteger() {
    group("BigInteger v8", () {
      test("construct BigInteger int", (){
        var x = new BigInteger(5);
        expect(x.toString(10), equals("5"));
        expect(x.intValue(), equals(5));
        x = new BigInteger(0x10);
        expect(x.toString(16), equals("10"));
        expect(x.intValue(), equals(16));
        x = new BigInteger(0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff);
        expect(x.toString(16), equals("fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"));
      });
      
      test("construct BigInteger num", (){
        num n = 5;
        var x = new BigInteger(n);
        expect(x.toString(10), equals("${n}"));
        expect(x.intValue(), equals(5));
        n = 0x10;
        x = new BigInteger(n);
        expect(x.toString(16), equals("10"));
        expect(x.intValue(), equals(16));
        n = 0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff;
        x = new BigInteger(n);
        expect(x.toString(16), equals("fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"));
      });
      
      test("construct BigInteger double", (){
        double n = 5.0;
        var x = new BigInteger(n);
        expect(x.toString(10), equals("5"));
        expect(x.intValue(), equals(5));        
      });
      
      test("construct BigInteger base 10 String", () {
        var x = new BigInteger("5", 10);
        expect(x.toString(10), equals("5"));
        expect(x.toRadix(10), equals("5"));
        expect(x.toString(), equals("5"));
      });
      
      test("construct BigInteger base 16 to multi base String", () {
        if (TEST_EXTRA_LARGE) {
          var ppp = new BigInteger(powpowpow_base_16, 16);
          expect(ppp.toString(16), equals(powpowpow_base_16));
          expect(ppp.toString(10), equals(powpowpow_base_10));
          expect(ppp.toString(2), equals(powpowpow_base_2));
        }
      });
      
      test("construct BigInteger base 16", () {
        // 0xabcd1234 modulo 0xbeef = 0xB60C
        var x = new BigInteger("abcd1234", 16);
        var y = new BigInteger("beef", 16);
        var z = x.mod(y);
        
        //0xabcd1234 * 0xbeef = 802297f6968c
        var zz = x.multiply(y);
        
        expect(x.toString(16), equals("abcd1234"));
        expect(y.toString(16), equals("beef"));
        expect(z.toString(16), equals("b60c"));
        expect(zz.toString(16), equals("802297f6968c"));
        expect(zz.toRadix(16), equals("802297f6968c"));

        });
      
        test("Test by encrypt/decrypt", () {
          var nValue="a5261939975948bb7a58dffe5ff54e65f0498f9175f5a09288810b8975871e99af3b5dd94057b0fc07535f5f97444504fa35169d461d0d30cf0192e307727c065168c788771c561a9400fb49175e9e6aa4e23fe11af69e9412dd23b0cb6684c4c2429bce139e848ab26d0829073351f4acd36074eafd036a5eb83359d2a698d3";
          var eValue="10001";
          var dValue="8e9912f6d3645894e8d38cb58c0db81ff516cf4c7e5a14c7f1eddb1459d2cded4d8d293fc97aee6aefb861859c8b6a3d1dfe710463e1f9ddc72048c09751971c4a580aa51eb523357a3cc48d31cfad1d4a165066ed92d4748fb6571211da5cb14bc11b6e2df7c1a559e6d5ac1cd5c94703a22891464fba23d0d965086277a161";
          var pValue="d090ce58a92c75233a6486cb0a9209bf3583b64f540c76f5294bb97d285eed33aec220bde14b2417951178ac152ceab6da7090905b478195498b352048f15e7d";
          var qValue="cab575dc652bb66df15a0359609d51d1db184750c00c6698b90ef3465c99655103edbf0d54c56aec0ce3c4d22592338092a126a0cc49f65a4a30d222b411e58f";
          var dmp1Value="1a24bca8e273df2f0e47c199bbf678604e7df7215480c77c8db39f49b000ce2cf7500038acfff5433b7d582a01f1826e6f4d42e1c57f5e1fef7b12aabc59fd25";
          var dmq1Value="3d06982efbbe47339e1f6d36b1216b8a741d410b0c662f54f7118b27b9a4ec9d914337eb39841d8666f3034408cf94f5b62f11c402fc994fe15a05493150d9fd";
          var coeffValue="3a3e731acd8960b7ff9eb81a7ff93bd1cfa74cbd56987db58b4594fb09c09084db1734c8143f98b602b981aaa9243ca28deb69b5b280ee8dcee0fd2625e53250";
          var encrypted;

          var TEXT =  "The quick brown fox jumped over the extremely lazy frog! " 
                      "Now is the time for all good men to come to the party.";

          encrypt() {
            var RSA = new RSAKey();
            RSA.setPublic(nValue, eValue);
            RSA.setPrivateEx(nValue, eValue, dValue, pValue, qValue, dmp1Value, dmq1Value, coeffValue);
            encrypted = RSA.encrypt(TEXT);
          };

          decrypt() {
            var RSA = new RSAKey();
            RSA.setPublic(nValue, eValue);
            RSA.setPrivateEx(nValue, eValue, dValue, pValue, qValue, dmp1Value, dmq1Value, coeffValue);
            var decrypted = RSA.decrypt(encrypted);
            if (decrypted != TEXT) {
              print("decrypted: ${decrypted}");
              print("TEXT: ${TEXT}");
              throw "Crypto operation failed";
            }
          };
          
          encrypt();
          decrypt(); 
        });
        
        test("pow", () {
          // TODO: bug with recursive call to toRadix and toString
          //print(yy.toString());
          
          BigInteger yy = new BigInteger("3", 16);
          var iii = yy.pow(3);
          expect(yy.toString(16), equals("3"));
          expect(iii.toString(16), equals("1b"));
          
          
          var sw = new Stopwatch.start();
          //print(new BigInteger("100", 16).pow(100).pow(100).toString(16));
          //print(new BigInteger("100", 16).pow(100).toString(16));
          sw.stop();
          //print(sw.elapsedInMs());
        });
        
        
        test("arithmetic 1", () {
          Mathx.Random rnd = new Mathx.Random();
          t() {
            BigInteger x = new BigInteger(rnd.nextInt(100000000).toRadixString(16), 16);
            BigInteger y = new BigInteger(rnd.nextInt(100000000).toRadixString(16), 16);
            BigInteger z = x.divide(y);
            z = z.multiply(y);
            z = z.add(x.remainder(y));
            z = z.subtract(x);
            expect(z.equals(BigInteger.ZERO), equals(true));
          };
          
          run_sequence(t);
        });
        
        test("arithmetic 2", () {
          Mathx.Random rnd = new Mathx.Random();
          t() {
            BigInteger x = new BigInteger(rnd.nextInt(100000000).toRadixString(16), 16);
            BigInteger y = new BigInteger(rnd.nextInt(100000000).toRadixString(16), 16);
            var z = x.divideAndRemainder(y);
            z[0] = z[0].multiply(y);
            z[0] = z[0].add(z[1]);
            z[0] = z[0].subtract(x);
            expect(z[0].equals(BigInteger.ZERO), equals(true));
          };
          
          run_sequence(t);
        });
        
        test("arithmetic 3", () {
          Mathx.Random rnd = new Mathx.Random();
          t() {
            BigInteger x = new BigInteger(powpowpow_base_16, 16);
            BigInteger y = new BigInteger("${powpowpow_base_16}" "${rnd.nextInt(100000000).toRadixString(16)}", 16);
            var z = x.divideAndRemainder(y);
            z[0] = z[0].multiply(y);
            z[0] = z[0].add(z[1]);
            z[0] = z[0].subtract(x);
            expect(z[0].equals(BigInteger.ZERO), equals(true));
          };
          
          run_sequence(t);
        });
        
        test("bitCount", () {
          Mathx.Random rnd = new Mathx.Random();
          t() {
            int x = rnd.nextInt(100000000);
            BigInteger bx = new BigInteger(x.toString(), 10);
            int bit = (x < 0 ? 0 : 1);
            int tmp = x, bitCount = 0;
            for (int j = 0; j < 32; j++) {
              bitCount += ((tmp & 1) == bit ? 1 : 0);
              tmp >>= 1;
            }
            
            expect(bx.bitCount(),  equals(bitCount));
          };
          
          run_sequence(t);
        });
        
        test("bitLength", () {
          Mathx.Random rnd = new Mathx.Random();
          t() {
            int x = rnd.nextInt(100000000);
            BigInteger bx = new BigInteger(x.toString(), 10);
            int signBit = (x < 0 ? 0x80000000 : 0);
            int tmp = x, bitLength, j;
            for (j = 0; j < 32 && (tmp & 0x80000000) == signBit; j++) {
              tmp <<= 1;
            }
            
            bitLength = 32 - j;
            
            expect(bx.bitLength(),  equals(bitLength));
          };
          run_sequence(t);
        });
        
        test("bit ops", () {});
        test("bitwise", () {});
        test("shift", () {});
        test("divideAndRemainder", () {});
        test("stringConv", () {});
        test("byteArrayConv", () {});
        test("modInv", () {});
        test("modExp", () {});
        test("modExp2", () {});
        test("prime", () {});
      });
    }
  
  void main() {
    testBigInteger();
  }
  

}

void main() {
  new TestBigIntegerV8().main();
}
