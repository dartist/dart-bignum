import '../../lib/src/big_integer_dartvm.dart';
import '../../lib/src/big_integer_v8.dart';

main(){
  List tests = [0,1, -1, 0x7f,-0x7f,128,-128,129,-129,0xff,-0xff,0x7fff,-0x7fff,0xffff,-0xffff,];
  
  for (int i = -70000; i < 70000; i+=111) {
    BigIntegerV8 v1 = new BigIntegerV8(i);
    List t1 = v1.toByteArray();
    BigIntegerDartvm v2 = new BigIntegerDartvm(i);
    List t2 = v2.toByteArray();
    if (t1.toString() != t2.toString()) {
      print(i);
      print(t1);
      print(t2);
      print(i.toRadixString(16));
    }
    BigIntegerDartvm v3 = new BigIntegerDartvm(t2);
    if (v3 != v2) {
      print(i);
      print(t2);
      print(v3);
    }
  }
//  BigInteger a = new BigInteger(100);
//  BigInteger a1 = new BigInteger(740);
//  BigInteger b = new BigInteger(7);
//  BigInteger c = new BigInteger(-30);
//  print(a*b);
//  print(a-b);
//  print(b/a);
//  print(a<<2);
//  print(b>>1);
//  print(a.gcd(a1));
}