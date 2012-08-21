const int AllBits = 4294967295;
const int HiBitSet = 2147483648;
const int DataSizeOf = 4;
const int DataSizeBits = 32;

class DigitsArray {
  List<int> data;
  int get count() => data.length;
  int dataUsed;
  bool get isZero() => dataUsed == 0 || (dataUsed == 1 && data[0] == 0); 
  bool get isNegative() => (data[data.length - 1] & HiBitSet) == HiBitSet;
  
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

class BigInteger {
  
  
  
}
