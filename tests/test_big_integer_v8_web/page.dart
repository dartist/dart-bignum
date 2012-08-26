#import("dart:html");

#source('../../BigInteger_v8/big_integer.dart');

class Page {
  
}

void main() {
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
  int i =0;
  while(i<100) {
    print("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
    zz = x.multiply(zz);
    print(zz.toString(16));
    i++;
  }
}