#import("dart:html");
#import('dart:math', prefix:"Mathx");
#import('../../../../lib.dart');
// #import('package:dart-bignum/lib.dart');
appendText([s=""]) {
  query("#container").elements.add(new Element.html("<div>$s<br></div>"));
}

void main() {
  try {
    //Uncomment this and everything works.
    // BigInteger.InitDart2js();
    
    // 0xabcd1234 modulo 0xbeef = 0xB60C
    var x = new BigInteger("abcd1234", 16);
    var y = new BigInteger("beef", 16);
    var z = x % y;
    appendText(z);
    z = x.remainder(y);
    appendText(z);
    
  } catch (ex) {
    appendText(ex);
  }
}
