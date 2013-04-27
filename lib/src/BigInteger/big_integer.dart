library big_integer;

import 'dart:math' as Math;

const int AllBits = 4294967295;
const int HiBitSet = 2147483648;
const int DataSizeOf = 4;
const int DataSizeBits = 32;

class DigitsArray {
  List<int> data;
  int get count => data.length;
  int dataUsed;
  bool get isZero => dataUsed == 0 || (dataUsed == 1 && data[0] == 0);
  bool get isNegative => (data[data.length - 1] & HiBitSet) == HiBitSet;

  DigitsArray(int size) {
    Allocate(size, 0);
  }

  DigitsArray.withUsed(int size, int used) {
    Allocate(size, used);
  }

  DigitsArray.fromList(List<int> copyFrom) {
    Allocate(copyFrom.length);
    CopyFrom(copyFrom, 0, 0, copyFrom.length);
    ResetDataUsed();
  }

  DigitsArray.fromDigitsArray(DigitsArray copyFrom) {
    Allocate(copyFrom.count, copyFrom.dataUsed);
    for (int i = 0; i < copyFrom.count; i++) {
      copyFrom.data[i] = data[i];
    }
  }


  void Allocate(int size, [int used = 0]) {
    data = new List(size + 1);
    for (int i = 0; i < size+1; i++) {
      data[i] = 0;
    }
    dataUsed = used;
  }

  void CopyFrom(List<int> source, int sourceOffset, int offset, int length) {
    // TODO: offset is never used
    for (int i = 0; i < length; i++) {
      data[i] = source[sourceOffset + i];
    }
  }

  void CopyTo(List<int> array, int offset, int length) {
    for (int i = 0; i < length; i++) {
      array[i] = data[offset + i];
    }
  }

  int operator [](int index) {
    if (index < dataUsed) {
      return data[index];
    } else {
      return this.isNegative ? AllBits : 0;
    }
  }

  operator []=(int index, int value) {
    data[index] = value;
  }


  ResetDataUsed() {
    dataUsed = data.length;
    if (isNegative)
    {
      while (dataUsed > 1 && data[dataUsed - 1] == AllBits)
      {
        --dataUsed;
      }
      dataUsed++;
    }
    else
    {
      while (dataUsed > 1 && data[dataUsed - 1] == 0)
      {
        --dataUsed;
      }
      if (dataUsed == 0)
      {
        dataUsed = 1;
      }
    }
  }


  int ShiftRight(int shiftCount) {
    return ShiftRight_Static(data, shiftCount);
  }

  static int ShiftRight_Static(List<int> buffer, int shiftCount) {
    // TODO: Rename or place into self contained function

    int shiftAmount = DataSizeBits;
    int invShift = 0;
    int bufLen = buffer.length;

    while (bufLen > 1 && buffer[bufLen - 1] == 0)
    {
      bufLen--;
    }

    for (int count = shiftCount; count > 0; count -= shiftAmount)
    {
      if (count < shiftAmount)
      {
        shiftAmount = count;
        invShift = DataSizeBits - shiftAmount;
      }

      int carry = 0;
      for (int i = bufLen - 1; i >= 0; i--)
      {
        int val = buffer[i] >> shiftAmount;
        val |= carry;
        carry = (buffer[i] << invShift) & HiBitSet;
        buffer[i] = val;
      }
    }

    while (bufLen > 1 && buffer[bufLen - 1] == 0)
    {
      bufLen--;
    }

    return bufLen;
  }

  int ShiftLeft(int shiftCount) {
    return ShiftLeft_Static(data, shiftCount);
  }

  static int ShiftLeft_Static(List<int> buffer, int shiftCount) {
    // TODO: Rename or place into self contained function
    int shiftAmount = DataSizeBits;
    int bufLen = buffer.length;

    while (bufLen > 1 && buffer[bufLen - 1] == 0)
    {
      bufLen--;
    }

    for (int count = shiftCount; count > 0; count -= shiftAmount)
    {
      if (count < shiftAmount)
      {
        shiftAmount = count;
      }

      int carry = 0;
      for (int i = 0; i < bufLen; i++)
      {
        int val = buffer[i] << shiftAmount;
        val |= carry;

        buffer[i] = val & AllBits;
        carry = val >> DataSizeBits;
      }

      if (carry != 0)
      {
        if (bufLen + 1 <= buffer.length)
        {
          buffer[bufLen] = carry;
          bufLen++;
          carry = 0;
        }
        else
        {
          throw "OverflowException";
        }
      }
    }
    return bufLen;
  }

  int ShiftLeftWithoutOverflow(int shiftCount) {
    List<int> temporary = new List<int>.from(data);
    int shiftAmount = DataSizeBits;

    for (int count = shiftCount; count > 0; count -= shiftAmount)
    {
      if (count < shiftAmount)
      {
        shiftAmount = count;
      }

      int carry = 0;
      for (int i = 0; i < temporary.length; i++)
      {
        int val = temporary[i] << shiftAmount;
        val |= carry;

        temporary[i] = val & AllBits;
        carry = val >> DataSizeBits;
      }

      if (carry != 0)
      {
        temporary.add(0);
        temporary[temporary.length - 1] = carry;
      }
    }

    data = new List<int>(temporary.length);
    data.addAll(temporary);
    return data.length;
  }

}

// TODO: fixup naming convention to be dartlike
class BigInteger {
  DigitsArray m_digits;

  // Constructors
  BigInteger() {
    m_digits = new DigitsArray.withUsed(1, 1);
  }
  BigInteger.fromInt(int number) {
    m_digits = new DigitsArray.withUsed(8 ~/ DataSizeOf + 1, 0);
    while (number != 0 && m_digits.dataUsed < m_digits.count)
    {
      m_digits[m_digits.dataUsed] = number & AllBits;
      number >>= DataSizeBits;
      m_digits.dataUsed++;
    }
    m_digits.ResetDataUsed();
  }

  BigInteger.fromList(List<int> array) {
    _ConstructFrom(array, 0, array.length);
  }

  BigInteger.fromListWithLength(List<int> array, int length) {
    _ConstructFrom(array, 0, length);
  }

  BigInteger.fromListWithOffset(List<int> array, int offset, int length) {
    _ConstructFrom(array, offset, length);
  }

  BigInteger.fromString(String digits, [int radix = 10]) {
    _Construct(digits, radix);
  }

  BigInteger.fromDigitsArray(DigitsArray digits) {
    digits.ResetDataUsed();
    this.m_digits = digits;
  }

  _ConstructFrom(List<int> array, int offset, int length){
    if (array == null)
    {
      throw "array is null";
    }
    if (offset > array.length || length > array.length)
    {
      throw "Argument out of range offset";
    }
    if (length > array.length || (offset + length) > array.length)
    {
      throw "Argument out of range length";
    }

    int estSize = length ~/ 4;
    int leftOver = length & 3;
    if (leftOver != 0)
    {
      ++estSize;
    }

    m_digits = new DigitsArray.withUsed(estSize + 1, 0); // alloc one extra since we can't init -'s from here.

    // TODO: we might need to AND off or assert() any addtional bits generated from this.
    for (int i = offset + length - 1, j = 0; (i - offset) >= 3; i -= 4, j++)
    {
      m_digits[j] = ((array[i - 3] << 24) + (array[i - 2] << 16) + (array[i - 1] <<  8) + array[i]);
      m_digits.dataUsed++;
    }

    int accumulator = 0;
    for (int i = leftOver; i > 0; i--)
    {
      int digit = array[offset + leftOver - i];
      digit = (digit << ((i - 1) * 8));
      accumulator |= digit;
    }
    m_digits[m_digits.dataUsed] = accumulator;

    m_digits.ResetDataUsed();

  }

  void _Construct(String digits, int radix) {
    if (digits == null)
    {
      throw "Argument Null digits";
    }

    BigInteger multiplier = new BigInteger.fromInt(1);
    BigInteger result = new BigInteger();
    digits = digits.toUpperCase().trim();

    int nDigits = (digits[0] == '-' ? 1 : 0);

    for (int idx = digits.length - 1; idx >= nDigits ; idx--)
    {
      int d = (digits[idx]).codeUnitAt(0);
      if (d >= '0'.codeUnitAt(0) && d <= '9'.codeUnitAt(0))
      {
        d -= '0'.codeUnitAt(0);
      }
      else if (d >= 'A'.codeUnitAt(0) && d <= 'Z'.codeUnitAt(0))
      {
        d = (d - 'A'.codeUnitAt(0)) + 10;
      }
      else
      {
        throw "Argument out of range digits";
      }

      if (d >= radix)
      {
        throw "Argument out of range digits";
      }
      result += (multiplier * new BigInteger.fromInt(d));
      multiplier *= new BigInteger.fromInt(radix);
    }

    if (digits[0] == '-')
    {
      result = -result;
    }

    this.m_digits = result.m_digits;
  }

  // Properties
  bool get IsNegative => this.m_digits.isNegative;
  bool get IsZero => this.m_digits.isZero;

  // Arithmetic operations.
  BigInteger operator +(BigInteger other) {
    int size = Math.max(this.m_digits.dataUsed, other.m_digits.dataUsed);

    DigitsArray da = new DigitsArray(size + 1);

    int carry = 0;
    for (int i = 0; i < da.count; i++) {
      int sum = this.m_digits[i] + other.m_digits[i] + carry;
      carry = sum >> DataSizeBits;
      da[i] = sum & AllBits;
    }

    return new BigInteger.fromDigitsArray(da);
  }

  BigInteger operator -(BigInteger other) { throw "Not Implemented"; }
  BigInteger operator *(BigInteger other) { throw "Not Implemented"; }
  BigInteger operator %(BigInteger other) { throw "Not Implemented"; }
  BigInteger operator /(BigInteger other) { throw "Not Implemented"; }
  // Truncating division.
  BigInteger operator ~/(BigInteger other) { throw "Not Implemented"; }
  // The unary '-' operator.
  BigInteger operator -() { throw "Not Implemented"; }
  BigInteger remainder(BigInteger other) { throw "Not Implemented"; }

  // Relational operations.
  bool operator <(BigInteger other) { throw "Not Implemented"; }
  bool operator <=(BigInteger other) { throw "Not Implemented"; }
  bool operator >(BigInteger other) { throw "Not Implemented"; }
  bool operator >=(BigInteger other) { throw "Not Implemented"; }

  // Bit-operations.
  BigInteger operator &(BigInteger other) { throw "Not Implemented"; }
  BigInteger operator |(BigInteger other) { throw "Not Implemented"; }
  BigInteger operator ^(BigInteger other) { throw "Not Implemented"; }
  BigInteger operator ~() { throw "Not Implemented"; }
  BigInteger operator <<(int shiftAmount) { throw "Not Implemented"; }
  BigInteger operator >>(int shiftAmount) { throw "Not Implemented"; }

//  BigInteger operator ++() { throw "Not Implemented" };
//  BigInteger operator --() { throw "Not Implemented" };

  static BigInteger Add(BigInteger leftSide, BigInteger rightSide) { throw "Not Implemented"; }
  static BigInteger Increment(BigInteger leftSide) { throw "Not Implemented"; }
  static BigInteger Subtract(BigInteger leftSide, BigInteger rightSide) { throw "Not Implemented"; }
  static BigInteger Decrement(BigInteger leftSide) { throw "Not Implemented"; }
  static BigInteger Negate() { throw "Not Implemented"; }
  static BigInteger Abs(BigInteger leftSide) { throw "Not Implemented"; }
  static BigInteger Multiply(BigInteger leftSide, BigInteger rightSide) { throw "Not Implemented"; }
  static BigInteger Divide(BigInteger leftSide, BigInteger rightSide) { throw "Not Implemented"; }
  static BigInteger DivideWithRemainder(BigInteger leftSide, BigInteger rightSide, BigInteger quotient, BigInteger remainder) { throw "Not Implemented"; }
  static BigInteger MultiDivide(BigInteger leftSide, BigInteger rightSide, BigInteger quotient, BigInteger remainder) { throw "Not Implemented"; }
  static BigInteger SingleDivide(BigInteger leftSide, BigInteger rightSide, BigInteger quotient, BigInteger remainder) { throw "Not Implemented"; }
  static BigInteger Modulus(BigInteger leftSide, BigInteger rightSide) { throw "Not Implemented"; }
  static BigInteger BitwiseAnd(BigInteger leftSide, BigInteger rightSide) { throw "Not Implemented"; }
  static BigInteger BitwiseOr(BigInteger leftSide, BigInteger rightSide) { throw "Not Implemented"; }
  static BigInteger Xor(BigInteger leftSide, BigInteger rightSide) { throw "Not Implemented"; }
  static BigInteger OnesComplement(BigInteger leftSide) { throw "Not Implemented"; }
  static BigInteger LeftShift(BigInteger leftSide, int shiftCount) { throw "Not Implemented"; }
  static BigInteger RightShift(BigInteger leftSide, int shiftCount) { throw "Not Implemented"; }


  // TODO: find dart class to inherit for compareTo
  int CompareTo(BigInteger value) { throw "Not Implemented"; }
  int Compare(BigInteger leftSide, BigInteger rightSide) { throw "Not Implemented"; }

  // NOTE: does dart implement equals? I think not.

  String toString() { throw "Not Implemented"; }
  String toHexString() { throw "Not Implemented"; }
  String toRadixString(int radix) {
    if (radix < 2 || radix > 36)
    {
      throw "Argument out of range radix";
    }

    if (IsZero)
    {
      return "0";
    }

    throw "Not Implemented";
  }

  static int toInt() { throw "Not Implemented"; }
  static double toDouble() { throw "Not Implemented"; }
  static num toNum() { throw "Not Implemented"; }


}
