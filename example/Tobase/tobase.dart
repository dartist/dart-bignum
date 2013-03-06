import 'dart:html';
import 'dart:math' as Mathx;
import 'package:bignum/bignum.dart';

InputElement number1Input;
InputElement number2Input;
InputElement baseInput;
ButtonElement buttonElement;

void main() {

  // Required only once when compiling from dart2js.
  // Based on a known bug with dart2js http://dartbug.com/4799
  // BigInteger.InitDart2js();

  number1Input = query('#number1');
  number2Input = query('#number2');
  baseInput = query('#base');
  buttonElement = query('#calc');

  DivElement conatiner = query('#container');
  var text = query('#text');

  buttonElement.onClick.listen((_)=>calculateWithBigInteger());

  BigInteger n1 = new BigInteger(5);
  BigInteger n2 = new BigInteger(5);
  var result = n1.add(n2);
  var str = result.toString(10);
  print(str);
  query('#text').innerHtml = str;
}

calculateWithBigInteger() {
  query('#text').innerHtml = "";
//  try {
    query('#text').innerHtml = "calculating with bignum";
    int base = int.parse(baseInput.value).toInt();
    String n1 = number1Input.value;
    String n2 = number2Input.value;

    BigInteger b1 = new BigInteger(n1.toString(), base);
    BigInteger b2 = new BigInteger(n2.toString(), base);
//
//    BigInteger b1 = new BigInteger("5", 10);
//    BigInteger b2 = new BigInteger("10", 10);
//    print("b1.array = ${b1.array}");
//    print("b1.s = ${b1.s}");
//    print("b1.t = ${b1.t}");
//    print("b1.signum() = ${b1.signum()}");
//
//    print("b2.array = ${b2.array}");
//    print("b2.s = ${b2.s}");
//    print("b2.t = ${b2.t}");
//    print("b2.signum() = ${b2.signum()}");
//
//    BigInteger z = b1 - b2;
//    print("z.array = ${z.array}");
//    print("z.s = ${z.s}");
//    print("z.t = ${z.t}");
//    print("z.signum() = ${z.signum()}");
    StringBuffer sb = new StringBuffer();

    sb.write("${b1 + b2} = ${b1} + ${b2}<br>");
    sb.write("${b1 - b2} = ${b1} - ${b2}<br>");
    sb.write("${b1 * b2} = ${b1} * ${b2}<br>");
    if (b2 != BigInteger.ZERO) {
      sb.write("${b1 % b2} = ${b1} % ${b2}<br>");
      sb.write("${b1 / b2} = ${b1} / ${b2}<br>");
    }

    sb.write("${-b1} = -${b1}<br>");
    sb.write("${b1 < b2} = ${b1} < ${b2}<br>");
    sb.write("${b1 <= b2} = ${b1} <= ${b2}<br>");
    sb.write("${b1 > b2} = ${b1} > ${b2}<br>");
    sb.write("${b1 >= b2} = ${b1} >= ${b2}<br>");
    sb.write("${b1 == b2} = ${b1} == ${b2}<br>");
    sb.write("${b1 & b2} = ${b1} & ${b2}<br>");
    sb.write("${b1 | b2} = ${b1} | ${b2}<br>");
    sb.write("${b1 ^ b2} = ${b1} ^ ${b2}<br>");
    sb.write("${~b1} = ~${b1}<br>");
    sb.write("${b1 << 5} = ${b1} << 5<br>");
    sb.write("${b1 >> 5} = ${b1} >> 5<br>");
    query('#text').innerHtml = sb.toString();

//  } catch (ex) {
//    query('#text').innerHTML = "Not able to calculate ${ex}";
//  }
}
