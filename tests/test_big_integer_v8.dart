#import('package:unittest/unittest.dart');
#import('dart:math', prefix:"Mathx");
#import('../lib.dart');
//#import('../packages/unittest/unittest.dart');

#source('data/powpowpow.dart');

bool TEST_EXTRA_LARGE = false;
bool TEST_PRIMES_HARD = false;
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
    group("BigInteger dart", () {
      test("construct BigInteger from byte list", (){
        expect(new BigInteger([0x1]).toString(16), equals("1"));
        expect(new BigInteger([0x1, 0]).toString(), equals(Mathx.pow(2, 8).toInt().toString()));
        expect(new BigInteger([0x1, 0, 0]).toString(), equals(Mathx.pow(2, 16).toInt().toString()));
        expect(new BigInteger([0x1, 0, 0, 0]).toString(), equals(Mathx.pow(2, 24).toInt().toString()));
      });
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
        
        test("bit ops", () {
          Mathx.Random rnd = new Mathx.Random();
          t() {
            BigInteger x = new BigInteger(rnd.nextInt(100000000).toString(), 10);
            BigInteger y;
            /* Test setBit and clearBit (and testBit) */
            if (x.signum() < 0) {
              y = new BigInteger(-1);
              for (int j = 0; j < x.bitLength(); j++) {
                if (! x.testBit(j)) {
                  y = y.clearBit(j);
                }
              }
            } else {
              y = BigInteger.ZERO;
              for (int j = 0; j < x.bitLength(); j++) {
                if (x.testBit(j)) {
                  y = y.setBit(j);
                }
              }
            }
            
            expect(x.equals(y), equals(true));
            
            /* Test flipBit (and testBit) */
            y = new BigInteger(x.signum() < 0 ? -1 : 0);
            for (int j = 0; j < x.bitLength(); j++) {
              var b1 = x.signum() < 0;
              var b2 = x.testBit(j);              
//              if (b1 == true && b2 != true) {
//                y = y.flipBit(j);
//              } else if (b2 == true && b1 != true) {
//                y = y.flipBit(j);
//              }
              // xor
              if (((x.signum() < 0 ? 1 : 0) ^ (x.testBit(j) ? 1 : 0)) == 1) {
                y = y.flipBit(j);
              }
            }
            
            expect(x.equals(y), equals(true));
            
            x = new BigInteger(rnd.nextInt(100000000).toString(), 10);
            int k = x.getLowestSetBit();
            if (x.signum() == 0) {
              expect(k, equals(-1));
            } else {
              BigInteger z = x.and(x.negate());
              int j;
              for (j = 0; j < z.bitLength() && !z.testBit(j); j++);
              
              expect(k, equals(j));
            }
          };
          
          run_sequence(t);
        });
        
        test("bitwise", () {
          Mathx.Random rnd = new Mathx.Random();
          t() {
            /* Test idenity x^y == x|y &~ x&y */
            BigInteger x = new BigInteger(rnd.nextInt(100000000).toRadixString(16), 16);
            BigInteger y = new BigInteger(rnd.nextInt(100000000).toRadixString(16), 16);
            BigInteger z = x.xor(y);
            BigInteger w = x.or(y).andNot(x.and(y));
            expect(z.equals(w), equals(true));
            
            /* Test idenity x &~ y == ~(~x | y) */
            x = new BigInteger(rnd.nextInt(100000000).toRadixString(16), 16);
            y = new BigInteger(rnd.nextInt(100000000).toRadixString(16), 16);
            z = x.andNot(y);
            w = x.not().or(y).not();
            expect(z.equals(w), equals(true));
            
          };
          run_sequence(t);
        });
        
        test("shift", () {
          Mathx.Random rnd = new Mathx.Random();
          t() {
            
            BigInteger x = new BigInteger(rnd.nextInt(100000000).toRadixString(16), 16);
            //x = x.negate();
            int n = (rnd.nextInt(100000000) % 200).abs();
            var s1 = x.shiftLeft(n).equals(x.multiply(new BigInteger(2).pow(n)));
            expect(s1, equals(true));
            
            var y = x.divideAndRemainder(new BigInteger(2).pow(n));
            BigInteger z = (x.signum() < 0 && y[1].signum() != 0
                ? y[0].subtract(BigInteger.ONE)
                : y[0]);
            
            BigInteger b = x.shiftRight(n);
            expect(b.equals(z), equals(true));
            
            var s2 = x.shiftLeft(n).shiftRight(n).equals(x);
            expect(s2, equals(true));
          };
          
          run_sequence(t);
        });
        
        test("divideAndRemainder", () {
          Mathx.Random rnd = new Mathx.Random();
          t() {
            // TODO: make this better
            BigInteger x = new BigInteger("4", 16);
            
            BigInteger z = x.divide(new BigInteger(2));
            var y = x.divideAndRemainder(x);
            expect(y[0].equals(BigInteger.ONE), equals(true));
            expect(y[1].equals(BigInteger.ZERO), equals(true));
            
            y = x.divideAndRemainder(z);
            expect(y[0].equals(new BigInteger(2)), equals(true));
          };
          
          run_sequence(t);
        });
        
        test("stringConv", () {
          Mathx.Random rnd = new Mathx.Random();
          t() {
            List<int> byte_array = new List<int>(rnd.nextInt(100));
            for (int i = 0; i < byte_array.length; i++) {
              byte_array[i] = rnd.nextInt(255);
            }
            
            String s = new String.fromCharCodes(byte_array);
           
            BigInteger x = new BigInteger(s);
            // TODO: http://code.google.com/p/dart/issues/detail?id=461
            //for (int radix = 2; radix < 37; radix++) {
            for (int radix = 2; radix < 16; radix++) {
              String result = x.toString(radix);
              BigInteger test = new BigInteger(result, radix);
              expect(test.toString(), x.toString());
            }
          };
          
          run_sequence(t);
        });
        
        test("byteArrayConv", () {
          Mathx.Random rnd = new Mathx.Random();
          t() {
            BigInteger x = new BigInteger(rnd.nextInt(100000000).toRadixString(16), 16);
            //BigInteger x = new BigInteger(8449183.toRadixString(16), 16);
            if (x.equals(BigInteger.ZERO)) {
              x = x.add(BigInteger.ONE);
            }
            
            BigInteger y = new BigInteger(x.toByteArray());
//            print(x.toString());
//            print(y.toString());
            expect(x.toString(), equals(y.toString()));
          };
          
          run_sequence(t);
        });
        
        test("modInv", () {
          Mathx.Random rnd = new Mathx.Random();
          t() {
            
            BigInteger x = new BigInteger(rnd.nextInt(100000000).toRadixString(16), 16);
            if (x.isEven()) {
              x = x.add(BigInteger.ONE);
            }
            
            BigInteger m = new BigInteger(2);
            
            BigInteger inv = x.modInverse(m);
            BigInteger prod = inv.multiply(x).remainder(m);
            if (prod.signum() == -1) {
              prod = prod.add(m);
            }
            
//            print("x = $x");
//            print("m = $m");
//            print("inv = $inv");
//            print("prod = $prod");
            
            expect(prod.toString(), "1");
          };
          
          run_sequence(t);
        });
        
        test("modExp", () {
          Mathx.Random rnd = new Mathx.Random();
          t() {
            BigInteger m = new BigInteger(rnd.nextInt(100000000).toRadixString(16), 16);
            
            if (m.equals(BigInteger.ONE)) {
              m = m.add(BigInteger.ONE);
            }
            
            BigInteger base = new BigInteger(rnd.nextInt(100000000).toRadixString(16), 16);
            BigInteger exp = new BigInteger(8);
            
            BigInteger z = base.modPow(exp, m);
            BigInteger w = base.pow(exp.intValue()).mod(m);
            expect(z.equals(w), equals(true));
          };
          
          run_sequence(t);
        });
        
        
        test("prime", () {
          p() {
            List mersenne_powers = [
                                    521, 607, 1279, 2203, 2281, 3217, 4253, 4423, 9689, 9941, 11213, 19937,
                                    21701, 23209, 44497, 86243, 110503, 132049, 216091, 756839, 859433,
                                    1257787, 1398269, 2976221, 3021377, 6972593, 13466917 ];
  
            List carmichaels = [
                               561,1105,1729,2465,2821,6601,8911,10585,15841,29341,41041,46657,52633,
                               62745,63973,75361,101101,115921,126217,162401,172081,188461,252601,
                               278545,294409,314821,334153,340561,399001,410041,449065,488881,512461,
                               225593397919 ];
            List java_failed_primes = [
                               "120000000000000000000000000000000019",
                               "633825300114114700748351603131",
                               "1461501637330902918203684832716283019651637554291",
                               "779626057591079617852292862756047675913380626199",
                               "857591696176672809403750477631580323575362410491",
                               "910409242326391377348778281801166102059139832131",
                               "929857869954035706722619989283358182285540127919",
                               "961301750640481375785983980066592002055764391999",
                               "1267617700951005189537696547196156120148404630231",
                               "1326015641149969955786344600146607663033642528339" ];
          
            BigInteger p1;
            
            // Test some known Mersenne primes (2^n)-1
            // The array holds the exponents, not the numbers being tested
            if (TEST_EXTRA_LARGE) {
              mersenne_powers.forEach((mp) {
                p1 = new BigInteger(2);
                p1 = p1.pow(mp);
                p1 = p1.subtract(BigInteger.ONE);
                expect(p1.isProbablePrime(100), equals(true));
              });
              
              // Test some primes that have failed on java
              java_failed_primes.forEach((jp) {
                p1 = new BigInteger(jp);
                expect(p1.isProbablePrime(100), equals(true));
              });
              
              // Test some known Carmichael numbers.
              carmichaels.forEach((cm) {
                p1 = new BigInteger(cm);
                expect(p1.isProbablePrime(100), equals(true));
              });
            } else {
  
              p1 = new BigInteger(2);
              p1 = p1.pow(mersenne_powers[0]);
              p1 = p1.subtract(BigInteger.ONE);
              
              expect(p1.isProbablePrime(100), equals(true), reason: "mersenne powers [${mersenne_powers[0]}] is not reported prime", verbose: true);
              
              p1 = new BigInteger(java_failed_primes[0]);
              
              expect(p1.isProbablePrime(100), equals(true), reason: "java failed primes [${java_failed_primes[0]}] is not reported prime", verbose: true);
              
              p1 = new BigInteger(carmichaels[0]);
              
              expect(p1.isProbablePrime(100), equals(true), reason: "mersenne powers [${mersenne_powers[0]}] is not reported prime", verbose: true);
            }
            
          };
          
          if (TEST_PRIMES_HARD) {
            p();
          } else {
            var lowprimes = [2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509];
            lowprimes.forEach((lp) {
              var p1 = new BigInteger(lp);
              expect(p1.isProbablePrime(100), equals(true));
            });
          }
        });
        
        test("operator +", () {
          var x = new BigInteger(10);
          var y = new BigInteger(20);
          var z = x + y;
          expect(z.toString(), equals("30"));
        });
        
        test("operator -", () {
          var x = new BigInteger(10);
          var y = new BigInteger(20);
          var z = x - y;
          expect(z.toString(), equals("-10"));
        });
        
        test("operator *", () {
          var x = new BigInteger(10);
          var y = new BigInteger(20);
          var z = x * y;
          expect(z.toString(), equals("200"));
        });
        
        test("operator %", () {
          var x = new BigInteger(10);
          var y = new BigInteger(20);
          var z = x % y;
          expect(z.toString(), equals("10"));
        });
        
        test("operator /", () {
          var x = new BigInteger(10);
          var y = new BigInteger(20);
          var z = x / y;
          expect(z.toString(), equals("0"));
          z = y / x;
          expect(z.toString(), equals("2"));
        });
        
        test("operator ~/", () {
          
        });
        
        test("operator unary -", () {
          var x = new BigInteger(10);
          var z = -x;
          expect(z.toString(), equals("-10"));
        });
        
        test("operator <", () {
          var x = new BigInteger(10);
          var y = new BigInteger(20);
          var z = x < y;
          expect(z, equals(true));
          z = y < x;
          expect(z, equals(false));
          y = new BigInteger(10);
          z = x < y;
          expect(z, equals(false));
        });
        
        test("operator <=", () {
          var x = new BigInteger(10);
          var y = new BigInteger(20);
          var z = x <= y;
          expect(z, equals(true));
          z = y <= x;
          expect(z, equals(false));
          x = new BigInteger(20);
          z = y <= x;
          expect(z, equals(true));
        });
        
        test("operator >", () {
          var x = new BigInteger(20);
          var y = new BigInteger(10);
          var z = x > y;
          expect(z, equals(true));
          z = y > x;
          expect(z, equals(false));
          y = new BigInteger(20);
          z = x > y;
          expect(z, equals(false));
        });
        
        test("operator >=", () {
          var x = new BigInteger(20);
          var y = new BigInteger(10);
          var z = x >= y;
          expect(z, equals(true));
          z = y >= x;
          expect(z, equals(false));
          y = new BigInteger(20);
          z = x >= y;
          expect(z, equals(true));
        });
        
        test("operator ==", () {
          var x = new BigInteger(20);
          var y = new BigInteger(20);
          var z = x == y;
          expect(z, equals(true));
          y = new BigInteger(30);
          z = y == x;
          expect(z, equals(false));
          y = new BigInteger(10);
          z = y == x;
          expect(z, equals(false));
        });
        
        test("operator &", () {
          var x = new BigInteger(10);
          var y = new BigInteger(20);
          var z = x & y;
          expect(z.toString(), equals("0"));
          y = new BigInteger(10);
          z = x & y;
          expect(z.toString(), equals("10"));
        });
        
        test("operator |", () {
          var x = new BigInteger(10);
          var y = new BigInteger(20);
          var z = x | y;
          expect(z.toString(), equals("30"));
          y = new BigInteger(10);
          z = x | y;
          expect(z.toString(), equals("10"));
        });
        
        test("operator ^", () {
          var x = new BigInteger("1001", 2);
          var y = new BigInteger("0110", 2);
          var z = x ^ y;
          expect(z.toString(2), equals("1111"));
          
          x = new BigInteger("0110", 2);
          y = new BigInteger("0110", 2);
          z = x ^ y;
          expect(z.toString(2), equals("0"));
        });
        
        test("operator ~", () {
          var x = new BigInteger("1001", 2);
          var z = ~x;
          expect(z.toString(2), equals("-1010"));
          
          x = new BigInteger("1111", 2);
          z = ~x;
          expect(z.toString(2), equals("-10000"));
          
          x = new BigInteger("1101", 2);
          z = ~x;
          expect(z.toString(2), equals("-1110"));
          
          x = new BigInteger(25);
          z = ~x;
          expect(z.toString(), equals("-26"));
        });
        
        test("operator <<", () {
          var x = new BigInteger("1001", 2);
          var z = x << 2;
          expect(z.toString(2), equals("100100"));
        });
        
        test("operator >>", () {
          var x = new BigInteger("1001", 2);
          var z = x >> 2;
          expect(z.toString(2), equals("10"));
        });
      });
    
    group("sign test", () {
      test("-5 from int constructor", () {
        BigInteger x = new BigInteger(-5);
        expect(x.toString(), equals("-5"));
      });
      
      test("-5 from String constructor", () {
        BigInteger x = new BigInteger("-5");
        expect(x.toString(), equals("-5"));
      });
      
      test("-5 from String constructor base 16", () {
        BigInteger x = new BigInteger("-5", 16);
        expect(x.toString(), equals("-5"));
      });
      
      test("-5 + (-5)", () {
        BigInteger x = new BigInteger("-5");
        BigInteger y = new BigInteger("-5");
        BigInteger z = x + y;
        expect(z.toString(), equals("-10"));
      });
      
      test("-5 + (-5)", () {
        BigInteger x = new BigInteger("-5");
        BigInteger y = new BigInteger("-5");
        BigInteger z = x + y;
        expect(z.toString(), equals("-10"));
      });
      
      test("-5 + 5", () {
        BigInteger x = new BigInteger("-5");
        BigInteger y = new BigInteger("5");
        BigInteger z = x + y;
        expect(z.toString(), equals("0"));
      });
      
      test("-5", () {
        BigInteger x = new BigInteger("-5");
        expect(x.toString(), equals("-5"));
      });
      
      test("-5 - (-5)", () {
        BigInteger x = new BigInteger("-5");
        BigInteger y = new BigInteger("-5");
        BigInteger z = x - y;
        expect(z.toString(), equals("0"));
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
