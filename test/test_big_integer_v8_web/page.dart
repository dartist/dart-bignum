library test_big_integer_v8;

import "dart:html";
import 'package:bignum/bignum.dart';
import 'package:unittest/unittest.dart';
part '../data/powpowpow.dart';

appendText([s=""]) {
  query("#container").children.add(new Element.html("<div>$s<br></div>"));
}

void main() {
  var fail = new BigInteger("5", 10);

  expect(fail.toString(10), equals("5"));
  expect(fail.toRadix(10), equals("5"));
  expect(fail.toString(), equals("5"));

  var ppp = new BigInteger(powpowpow_base_16, 16);
  var ppp_str = ppp.toString(16);
  expect(ppp_str, equals(powpowpow_base_16));
  appendText(ppp_str);

  // 0xabcd1234 modulo 0xbeef = 0xB60C
  var x = new BigInteger("abcd1234", 16);
  var y = new BigInteger("beef", 16);
  var z = x.mod(y);

  //0xabcd1234 * 0xbeef = 802297f6968c
  var zz = x.multiply(y);

  appendText(x.toString(16));
  appendText(y.toString(16));
  appendText(z.toString(16));
  appendText(zz.toString(16));

  appendText(zz.toRadix(16));
  //assert(zz.toString(16) == zz.toRadix(16));
  expect(zz.toString(16), equals(zz.toRadix(16)));
  int i =0;
  while(i<100) {
    appendText();
    zz = x.multiply(zz);
    appendText(zz.toString(16));
    //assert(zz.toString(16) == zz.toRadix(16));
    expect(zz.toString(16), equals(zz.toRadix(16)));
    i++;
  }

//  var sw = new Stopwatch.start();
//  appendText(new BigInteger("100", 16).pow(100).pow(100).toString(16));
//  sw.stop();
//  appendText(sw.elapsedInMs());



}