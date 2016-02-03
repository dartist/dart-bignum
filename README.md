dart-bignum
=========== 

Getting Started
---------------
Create a Dart project and add a **pubspec.yaml** file to it

#### pub.dartlang.org

```
dependencies:
  bignum: any
```

#### git

```
dependencies:
  bignum:
    git: git://github.com/Dartist/dart-bignum.git
```

and run **pub install** to install **bignum** (including its dependencies). Now add import

```
import 'package:bignum/bignum.dart';
```

### Example

#### Code 

```
import 'package:bignum/bignum.dart';
void main() {
  BigInteger x = new BigInteger("12341234123412341234");
  BigInteger y = new BigInteger("100");
  var z = x * y * x;
  print("base 10: z = ${z.toString()}");
  print("base 16: z = ${z.toString(16)}");
  print("base 2: z = ${z.toString(2)}");
}
```

#### Output
 
```
base 10: z = 15230605968887717854389148085725664275600
base 16: z = 2cc23c02bae6a6051a5ce673189c3a6c90
base 2: z = 10110011000010001111000000001010111010111001101010011000000101000110100101110011100110011100110001100010011100001110100110110010010000
```

### Sample
[Tobase](example/Tobase/tobase.html). The sample currently has known issues with bitwise operators. 

### Caveats
Currently few known bugs exist while compiling from dart2js. One is working with bitwise operators, the internal implementation of shift operators with dart2js does not handle the same way as the VM. Most of this code was ported from v8 [benchmark suite](http://goo.gl/jTEfH). [Tom Wu](http://www-cs-students.stanford.edu/~tjw/jsbn/) is to thank for the core javascript implementation and the v8 team for optimizations on different javascript virtual machines. 

### Bugs & Testing
Please feel free to add [issues](https://github.com/financeCoding/dart-bignum/issues) on github issue tracker, we would like to provide a solid library for the community to use. 

### References

* [BigInteger C#](http://biginteger.codeplex.com/)
* [BigInteger Java](http://developer.classpath.org/doc/java/math/BigInteger-source.html)
* [LibTomMath](http://libtom.org/?page=features&newsitems=5&whatfile=ltm)
* [javascript-bignum](https://github.com/jtobey/javascript-bignum)
* [BigInt.js](http://www.leemon.com/crypto/BigInt.js)
* [MAPM](http://www.tc.umn.edu/~ringx004/mapm-main.html)
* [crypto.js](http://code.google.com/p/v8/source/browse/branches/bleeding_edge/benchmarks/crypto.js)
