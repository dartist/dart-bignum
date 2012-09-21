function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$$.ExceptionImplementation = {"":
 ["_msg"],
 super: "Object",
 toString$0: function() {
  var t1 = this._msg;
  return t1 == null ? 'Exception' : 'Exception: ' + $.S(t1);
}
};

$$.HashMapImplementation = {"":
 ["_keys", "_values", "_loadLimit", "_numberOfEntries", "_numberOfDeleted"],
 super: "Object",
 _probeForAdding$1: function(key) {
  var t1 = $.hashCode(key);
  if (t1 !== (t1 | 0))
    return this._probeForAdding$1$bailout(1, key, t1, 0, 0, 0);
  var t3 = $.get$length(this._keys);
  if (t3 !== (t3 | 0))
    return this._probeForAdding$1$bailout(2, key, t1, t3, 0, 0);
  var hash = (t1 & t3 - 1) >>> 0;
  for (var numberOfProbes = 1, insertionIndex = -1; true;) {
    t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this._probeForAdding$1$bailout(3, key, hash, numberOfProbes, insertionIndex, t1);
    if (hash < 0 || hash >= t1.length)
      throw $.ioore(hash);
    var existingKey = t1[hash];
    if (existingKey == null) {
      if (insertionIndex < 0)
        return hash;
      return insertionIndex;
    } else if ($.eqB(existingKey, key))
      return hash;
    else if (insertionIndex < 0 && $.CTC12 === existingKey)
      insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0))
      return this._probeForAdding$1$bailout(4, numberOfProbes0, key, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      t1 = env1;
      break;
    case 2:
      key = env0;
      t1 = env1;
      t3 = env2;
      break;
    case 3:
      key = env0;
      hash = env1;
      numberOfProbes = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 4:
      numberOfProbes0 = env0;
      key = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.hashCode(key);
    case 1:
      state = 0;
      var t3 = $.get$length(this._keys);
    case 2:
      state = 0;
      var hash = $.and(t1, $.sub(t3, 1));
      var numberOfProbes = 1;
      var insertionIndex = -1;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!true)
                break L0;
              t1 = this._keys;
            case 3:
              state = 0;
              var existingKey = $.index(t1, hash);
              if (existingKey == null) {
                if ($.ltB(insertionIndex, 0))
                  return hash;
                return insertionIndex;
              } else if ($.eqB(existingKey, key))
                return hash;
              else if ($.ltB(insertionIndex, 0) && $.CTC12 === existingKey)
                insertionIndex = hash;
              var numberOfProbes0 = numberOfProbes + 1;
              hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
            case 4:
              state = 0;
              numberOfProbes = numberOfProbes0;
          }
  }
},
 _probeForLookup$1: function(key) {
  var hash = $.and($.hashCode(key), $.sub($.get$length(this._keys), 1));
  if (hash !== (hash | 0))
    return this._probeForLookup$1$bailout(1, key, hash);
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForLookup$1$bailout: function(state, key, hash) {
  for (var numberOfProbes = 1; true;) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey == null)
      return -1;
    if ($.eqB(existingKey, key))
      return hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    numberOfProbes = numberOfProbes0;
  }
},
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree))
    this._grow$1($.get$length(this._keys));
},
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number')
    return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.tdiv($.mul(newCapacity, 3), 4);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListImplementation_List(newCapacity);
  var t4 = $.ListImplementation_List(newCapacity);
  $.setRuntimeTypeInfo(t4, {E: 'V'});
  this._values = t4;
  for (var i = 0; i < capacity; ++i) {
    if (i < 0 || i >= oldKeys.length)
      throw $.ioore(i);
    var key = oldKeys[i];
    if (key == null || key === $.CTC12)
      continue;
    if (i < 0 || i >= oldValues.length)
      throw $.ioore(i);
    var value = oldValues[i];
    var newIndex = this._probeForAdding$1(key);
    $.indexSet(this._keys, newIndex, key);
    $.indexSet(this._values, newIndex, value);
  }
  this._numberOfDeleted = 0;
},
 _grow$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var newCapacity = env0;
      capacity = env1;
      break;
    case 2:
      newCapacity = env0;
      oldKeys = env1;
      capacity = env2;
      break;
    case 3:
      newCapacity = env0;
      oldKeys = env1;
      oldValues = env2;
      capacity = env3;
      break;
  }
  switch (state) {
    case 0:
      var capacity = $.get$length(this._keys);
    case 1:
      state = 0;
      this._loadLimit = $.tdiv($.mul(newCapacity, 3), 4);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListImplementation_List(newCapacity);
      var t4 = $.ListImplementation_List(newCapacity);
      $.setRuntimeTypeInfo(t4, {E: 'V'});
      this._values = t4;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC12)
          continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
  }
},
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.clear$0$bailout(1, length$);
  for (var i = 0; i < length$; ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 clear$0$bailout: function(state, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    $.indexSet(this._keys, i, null);
    $.indexSet(this._values, i, null);
  }
},
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t1 = this._keys;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.operator$indexSet$2$bailout(1, key, value, index, t1);
  if (index !== (index | 0))
    throw $.iae(index);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  if (!(t1[index] == null)) {
    if (index < 0 || index >= t1.length)
      throw $.ioore(index);
    var t2 = t1[index] === $.CTC12;
    t1 = t2;
  } else
    t1 = true;
  if (t1) {
    t1 = this._numberOfEntries;
    if (typeof t1 !== 'number')
      return this.operator$indexSet$2$bailout(3, key, value, t1, index);
    this._numberOfEntries = t1 + 1;
  }
  t1 = this._keys;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(4, key, value, t1, index);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  t1[index] = key;
  t1 = this._values;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(5, value, t1, index, 0);
  if (index < 0 || index >= t1.length)
    throw $.ioore(index);
  t1[index] = value;
},
 operator$indexSet$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var key = env0;
      var value = env1;
      index = env2;
      t1 = env3;
      break;
    case 2:
      key = env0;
      value = env1;
      index = env2;
      t1 = env3;
      break;
    case 3:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 4:
      key = env0;
      value = env1;
      t1 = env2;
      index = env3;
      break;
    case 5:
      value = env0;
      t1 = env1;
      index = env2;
      break;
  }
  switch (state) {
    case 0:
      this._ensureCapacity$0();
      var index = this._probeForAdding$1(key);
      var t1 = this._keys;
    case 1:
      state = 0;
    case 2:
      if (state === 2 || state === 0 && !($.index(t1, index) == null))
        switch (state) {
          case 0:
            t1 = this._keys;
          case 2:
            state = 0;
            var t3 = $.index(t1, index) === $.CTC12;
            t1 = t3;
        }
      else
        t1 = true;
    case 3:
      if (state === 3 || state === 0 && t1)
        switch (state) {
          case 0:
            t1 = this._numberOfEntries;
          case 3:
            state = 0;
            this._numberOfEntries = $.add(t1, 1);
        }
      t1 = this._keys;
    case 4:
      state = 0;
      $.indexSet(t1, index, key);
      t1 = this._values;
    case 5:
      state = 0;
      $.indexSet(t1, index, value);
  }
},
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0))
    return;
  return $.index(this._values, index);
},
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
},
 get$length: function() {
  return this._numberOfEntries;
},
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC12))
      f.call$2(key, $.index(this._values, i));
  }
},
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC12))
      f.call$2(key, $.index(this._values, i));
  }
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = 6;
  this._keys = $.ListImplementation_List(8);
  var t1 = $.ListImplementation_List(8);
  $.setRuntimeTypeInfo(t1, {E: 'V'});
  this._values = t1;
},
 is$Map: function() { return true; }
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.JSSyntaxRegExp = {"":
 ["_ignoreCase", "_multiLine", "_pattern"],
 super: "Object",
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m == null)
    return;
  var matchStart = $.regExpMatchStart(m);
  var t1 = $.get$length($.index(m, 0));
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var matchEnd = matchStart + t1;
  return $._MatchImplementation$(this.get$pattern(), str, matchStart, matchEnd, m);
},
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
},
 get$pattern: function() {
  return this._pattern;
},
 get$multiLine: function() {
  return this._multiLine;
},
 get$ignoreCase: function() {
  return this._ignoreCase;
},
 is$RegExp: true
};

$$.StringBufferImpl = {"":
 ["_buffer", "_lib_length"],
 super: "Object",
 get$length: function() {
  return this._lib_length;
},
 isEmpty$0: function() {
  return this._lib_length === 0;
},
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true)
    return this;
  $.add$1(this._buffer, str);
  var t1 = this._lib_length;
  if (typeof t1 !== 'number')
    return this.add$1$bailout(1, str, t1);
  var t3 = $.get$length(str);
  if (typeof t3 !== 'number')
    return this.add$1$bailout(2, t1, t3);
  this._lib_length = t1 + t3;
  return this;
},
 add$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      str = env0;
      t1 = env1;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var str = $.toString(obj);
      if (str == null || $.isEmpty(str) === true)
        return this;
      $.add$1(this._buffer, str);
      var t1 = this._lib_length;
    case 1:
      state = 0;
      var t3 = $.get$length(str);
    case 2:
      state = 0;
      this._lib_length = $.add(t1, t3);
      return this;
  }
},
 addAll$1: function(objects) {
  for (var t1 = $.iterator(objects); t1.hasNext$0() === true;)
    this.add$1(t1.next$0());
  return this;
},
 clear$0: function() {
  var t1 = $.ListImplementation_List(null);
  $.setRuntimeTypeInfo(t1, {E: 'String'});
  this._buffer = t1;
  this._lib_length = 0;
  return this;
},
 toString$0: function() {
  if ($.get$length(this._buffer) === 0)
    return '';
  if ($.get$length(this._buffer) === 1)
    return $.index(this._buffer, 0);
  var result = $.stringJoinUnchecked($.StringImplementation__toJsStringArray(this._buffer), '');
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
},
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
}
};

$$._MatchImplementation = {"":
 ["pattern", "str", "_start", "_end", "_groups"],
 super: "Object",
 group$1: function(index) {
  return $.index(this._groups, index);
},
 operator$index$1: function(index) {
  return this.group$1(index);
}
};

$$.IndexOutOfRangeException = {"":
 ["_value"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
}
};

$$.IllegalAccessException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Attempt to modify an immutable object';
}
};

$$.NoSuchMethodException = {"":
 ["_receiver", "_functionName", "_arguments", "_existingArgumentNames"],
 super: "Object",
 toString$0: function() {
  var sb = $.StringBufferImpl$('');
  var t1 = this._arguments;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(1, t1, sb);
  var i = 0;
  for (; i < t1.length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  t1 = this._existingArgumentNames;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.toString$0$bailout(2, sb, t1);
  var actualParameters = sb.toString$0();
  sb = $.StringBufferImpl$('');
  for (i = 0; i < t1.length; ++i) {
    if (i > 0)
      sb.add$1(', ');
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    sb.add$1(t1[i]);
  }
  var formalParameters = sb.toString$0();
  t1 = this._functionName;
  return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
},
 toString$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      sb = env1;
      break;
    case 2:
      sb = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var sb = $.StringBufferImpl$('');
      var t1 = this._arguments;
    case 1:
      state = 0;
      var i = 0;
      for (; $.ltB(i, $.get$length(t1)); ++i) {
        if (i > 0)
          sb.add$1(', ');
        sb.add$1($.index(t1, i));
      }
      t1 = this._existingArgumentNames;
    case 2:
      state = 0;
      if (t1 == null)
        return 'NoSuchMethodException : method not found: \'' + $.S(this._functionName) + '\'\n' + 'Receiver: ' + $.S(this._receiver) + '\n' + 'Arguments: [' + $.S(sb) + ']';
      else {
        var actualParameters = sb.toString$0();
        sb = $.StringBufferImpl$('');
        for (i = 0; $.ltB(i, $.get$length(t1)); ++i) {
          if (i > 0)
            sb.add$1(', ');
          sb.add$1($.index(t1, i));
        }
        var formalParameters = sb.toString$0();
        t1 = this._functionName;
        return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.S(t1) + '\'\nReceiver: ' + $.S(this._receiver) + '\n' + 'Tried calling: ' + $.S(t1) + '(' + $.S(actualParameters) + ')\n' + 'Found: ' + $.S(t1) + '(' + $.S(formalParameters) + ')';
      }
  }
}
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
}
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
}
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
}
};

$$.FormatException = {"":
 ["message"],
 super: "Object",
 toString$0: function() {
  return 'FormatException: ' + $.S(this.message);
}
};

$$.NullPointerException = {"":
 ["functionName", "arguments"],
 super: "Object",
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null)
    return this.get$exceptionName();
  else
    return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
},
 get$exceptionName: function() {
  return 'NullPointerException';
}
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
}
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
}
};

$$.NotImplementedException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  var t1 = this._message;
  return !(t1 == null) ? 'NotImplementedException: ' + $.S(t1) : 'NotImplementedException';
}
};

$$.IllegalJSRegExpException = {"":
 ["_lib0_pattern", "_errmsg"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._lib0_pattern) + '\' \'' + $.S(this._errmsg) + '\'';
}
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.ObjectImplementation_toStringImpl(this);
},
 operator$eq$1: function(other) {
  return this === other;
}
};

$$.ListIterator = {"":
 ["i", "list"],
 super: "Object",
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1);
  return t1 < this.list.length;
},
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, this.list.length);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.NoMoreElementsException$());
  var value = this.list[this.i];
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.next$0$bailout(1, t1, value);
  this.i = t1 + 1;
  return value;
},
 next$0$bailout: function(state, t1, value) {
  this.i = $.add(t1, 1);
  return value;
}
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
}
};

$$.ConstantMap = {"":
 ["length?", "_jsObject", "_lib1_keys"],
 super: "Object",
 containsKey$1: function(key) {
  if ($.eqB(key, '__proto__'))
    return false;
  return $.jsHasOwnProperty(this._jsObject, key);
},
 operator$index$1: function(key) {
  if (this.containsKey$1(key) !== true)
    return;
  return this._jsObject[key];
},
 forEach$1: function(f) {
  $.forEach(this._lib1_keys, new $.ConstantMap_forEach_anon(this, f));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 _throwImmutable$0: function() {
  throw $.captureStackTrace($.CTC17);
},
 operator$indexSet$2: function(key, val) {
  return this._throwImmutable$0();
},
 clear$0: function() {
  return this._throwImmutable$0();
},
 is$Map: function() { return true; }
};

$$.MetaInfo = {"":
 ["_tag?", "_tags", "_set?"],
 super: "Object"
};

$$._Default = {"":
 [],
 super: "Object"
};

$$.FilteredElementList = {"":
 ["_node", "_childNodes"],
 super: "Object",
 get$_filtered: function() {
  return $.ListImplementation_List$from($.filter(this._childNodes, new $.FilteredElementList__filtered_anon()));
},
 get$first: function() {
  for (var t1 = $.iterator(this._childNodes); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (typeof t2 === 'object' && t2 !== null && t2.is$Element())
      return t2;
  }
  return;
},
 first$0: function() { return this.get$first().call$0(); },
 forEach$1: function(f) {
  $.forEach(this.get$_filtered(), f);
},
 operator$indexSet$2: function(index, value) {
  this.operator$index$1(index).replaceWith$1(value);
},
 set$length: function(newLength) {
  var len = $.get$length(this);
  if ($.geB(newLength, len))
    return;
  else if ($.ltB(newLength, 0))
    throw $.captureStackTrace($.CTC20);
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
},
 add$1: function(value) {
  $.add$1(this._childNodes, value);
},
 get$add: function() { return new $.BoundClosure(this, 'add$1'); },
 addAll$1: function(collection) {
  $.forEach(collection, this.get$add());
},
 removeRange$2: function(start, rangeLength) {
  $.forEach($.getRange(this.get$_filtered(), start, rangeLength), new $.FilteredElementList_removeRange_anon());
},
 clear$0: function() {
  $.clear(this._childNodes);
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    result.remove$0();
  return result;
},
 filter$1: function(f) {
  return $.filter(this.get$_filtered(), f);
},
 isEmpty$0: function() {
  return $.isEmpty(this.get$_filtered());
},
 get$length: function() {
  return $.get$length(this.get$_filtered());
},
 operator$index$1: function(index) {
  return $.index(this.get$_filtered(), index);
},
 iterator$0: function() {
  return $.iterator(this.get$_filtered());
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this.get$_filtered(), start, rangeLength);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this.get$_filtered(), element, start);
},
 last$0: function() {
  return $.last(this.get$_filtered());
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ChildrenElementList = {"":
 ["_element", "_childElements"],
 super: "Object",
 _toList$0: function() {
  var t1 = this._childElements;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this._toList$0$bailout(1, t1);
  var output = $.ListImplementation_List(t1.length);
  for (var len = t1.length, i = 0; i < len; ++i) {
    if (i < 0 || i >= t1.length)
      throw $.ioore(i);
    var t2 = t1[i];
    if (i < 0 || i >= output.length)
      throw $.ioore(i);
    output[i] = t2;
  }
  return output;
},
 _toList$0$bailout: function(state, t1) {
  var output = $.ListImplementation_List($.get$length(t1));
  for (var len = $.get$length(t1), i = 0; $.ltB(i, len); ++i) {
    var t2 = $.index(t1, i);
    if (i < 0 || i >= output.length)
      throw $.ioore(i);
    output[i] = t2;
  }
  return output;
},
 get$first: function() {
  return this._element.get$$$dom_firstElementChild();
},
 first$0: function() { return this.get$first().call$0(); },
 forEach$1: function(f) {
  for (var t1 = $.iterator(this._childElements); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
},
 filter$1: function(f) {
  var output = [];
  this.forEach$1(new $._ChildrenElementList_filter_anon(f, output));
  return $._FrozenElementList$_wrap(output);
},
 isEmpty$0: function() {
  return this._element.get$$$dom_firstElementChild() == null;
},
 get$length: function() {
  return $.get$length(this._childElements);
},
 operator$index$1: function(index) {
  return $.index(this._childElements, index);
},
 operator$indexSet$2: function(index, value) {
  this._element.$dom_replaceChild$2(value, $.index(this._childElements, index));
},
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC19);
},
 add$1: function(value) {
  this._element.$dom_appendChild$1(value);
  return value;
},
 iterator$0: function() {
  return $.iterator(this._toList$0());
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._element; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($._Lists_getRange(this, start, rangeLength, []));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 clear$0: function() {
  this._element.set$text('');
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._element.$dom_removeChild$1(result);
  return result;
},
 last$0: function() {
  return this._element.get$$$dom_lastElementChild();
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementList = {"":
 ["_nodeList"],
 super: "Object",
 get$first: function() {
  return $.index(this._nodeList, 0);
},
 first$0: function() { return this.get$first().call$0(); },
 forEach$1: function(f) {
  for (var t1 = $.iterator(this); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
},
 filter$1: function(f) {
  var out = $._ElementList$([]);
  for (var t1 = $.iterator(this); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      out.add$1(t2);
  }
  return out;
},
 isEmpty$0: function() {
  return $.isEmpty(this._nodeList);
},
 get$length: function() {
  return $.get$length(this._nodeList);
},
 operator$index$1: function(index) {
  return $.index(this._nodeList, index);
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC19);
},
 set$length: function(newLength) {
  $.set$length(this._nodeList, newLength);
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC19);
},
 iterator$0: function() {
  return $._FrozenElementListIterator$(this);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC19);
},
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap($.getRange(this._nodeList, start, rangeLength));
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._nodeList, element, start);
},
 clear$0: function() {
  throw $.captureStackTrace($.CTC19);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC19);
},
 last$0: function() {
  return $.last(this._nodeList);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FrozenElementListIterator = {"":
 ["_list", "_index"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC11);
  var t1 = this._list;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._index;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._index = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC11);
      var t1 = this._list;
    case 1:
      state = 0;
      var t3 = this._index;
    case 2:
      state = 0;
      this._index = $.add(t3, 1);
      return $.index(t1, t3);
  }
},
 hasNext$0: function() {
  var t1 = this._index;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = $.get$length(this._list);
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 < t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._index;
    case 1:
      state = 0;
      var t3 = $.get$length(this._list);
    case 2:
      state = 0;
      return $.lt(t1, t3);
  }
}
};

$$._ElementList = {"":
 ["_list"],
 super: "_ListWrapper",
 filter$1: function(f) {
  return $._ElementList$($._ListWrapper.prototype.filter$1.call(this, f));
},
 getRange$2: function(start, rangeLength) {
  return $._ElementList$($._ListWrapper.prototype.getRange$2.call(this, start, rangeLength));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ChildNodeListLazy = {"":
 ["_this"],
 super: "Object",
 get$first: function() {
  return this._this.firstChild;
},
 first$0: function() { return this.get$first().call$0(); },
 last$0: function() {
  return this._this.lastChild;
},
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._this; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._this.$dom_removeChild$1(result);
  return result;
},
 clear$0: function() {
  this._this.set$text('');
},
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
},
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
},
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._ListWrapper = {"":
 [],
 super: "Object",
 iterator$0: function() {
  return $.iterator(this._list);
},
 forEach$1: function(f) {
  return $.forEach(this._list, f);
},
 filter$1: function(f) {
  return $.filter(this._list, f);
},
 isEmpty$0: function() {
  return $.isEmpty(this._list);
},
 get$length: function() {
  return $.get$length(this._list);
},
 operator$index$1: function(index) {
  return $.index(this._list, index);
},
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._list, index, value);
},
 set$length: function(newLength) {
  $.set$length(this._list, newLength);
},
 add$1: function(value) {
  return $.add$1(this._list, value);
},
 addAll$1: function(collection) {
  return $.addAll(this._list, collection);
},
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._list, element, start);
},
 clear$0: function() {
  return $.clear(this._list);
},
 removeLast$0: function() {
  return $.removeLast(this._list);
},
 last$0: function() {
  return $.last(this._list);
},
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._list, start, rangeLength);
},
 get$first: function() {
  return $.index(this._list, 0);
},
 first$0: function() { return this.get$first().call$0(); },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._NodeListWrapper = {"":
 ["_list"],
 super: "_ListWrapper",
 filter$1: function(f) {
  return $._NodeListWrapper$($.filter(this._list, f));
},
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($.getRange(this._list, start, rangeLength));
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
};

$$._FixedSizeListIterator = {"":
 ["_length", "_array", "_pos"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._length;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t1, t3);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = this._length;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
}
};

$$._VariableSizeListIterator = {"":
 [],
 super: "Object",
 hasNext$0: function() {
  var t1 = $.get$length(this._array);
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.hasNext$0$bailout(2, t3, t1);
  return t1 > t3;
},
 hasNext$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t3 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var t1 = $.get$length(this._array);
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      return $.gt(t1, t3);
  }
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC11);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._pos = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  if (t3 < 0 || t3 >= t1.length)
    throw $.ioore(t3);
  return t1[t3];
},
 next$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      t1 = env0;
      break;
    case 2:
      t1 = env0;
      t3 = env1;
      break;
  }
  switch (state) {
    case 0:
      if (this.hasNext$0() !== true)
        throw $.captureStackTrace($.CTC11);
      var t1 = this._array;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t3, 1);
      return $.index(t1, t3);
  }
}
};

$$.BigInteger = {"":
 ["_lowprimes", "_lplim", "canary", "_j_lm", "array?", "am", "BI_RM", "BI_RC", "t=", "s="],
 super: "Object",
 am$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.am.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 am$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.am.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 _am3$6: function(i, x, w, j, c, n) {
  if (typeof i !== 'number')
    return this._am3$6$bailout(1, i, x, w, j, c, n, 0, 0);
  if (typeof j !== 'number')
    return this._am3$6$bailout(1, i, x, w, j, c, n, 0, 0);
  if (c !== (c | 0))
    return this._am3$6$bailout(1, i, x, w, j, c, n, 0, 0);
  if (typeof n !== 'number')
    return this._am3$6$bailout(1, i, x, w, j, c, n, 0, 0);
  var this_array = this.array;
  var w_array = w.get$array();
  if (typeof w_array !== 'object' || w_array === null || (w_array.constructor !== Array || !!w_array.immutable$list) && !w_array.is$JavaScriptIndexingBehavior())
    return this._am3$6$bailout(2, i, x, j, c, n, this_array, w_array, 0);
  var xl = $.and($.toInt(x), 16383);
  if (xl !== (xl | 0))
    return this._am3$6$bailout(3, i, x, j, c, n, this_array, w_array, xl);
  var xh = $.shr($.toInt(x), 14);
  if (xh !== (xh | 0))
    return this._am3$6$bailout(4, i, xh, j, n, this_array, c, w_array, xl);
  for (; --n, n >= 0;) {
    var l = $.and(this_array.operator$index$1(i), 16383);
    var i0 = i + 1;
    var h = $.shr(this_array.operator$index$1(i), 14);
    if (typeof l !== 'number')
      throw $.iae(l);
    var t1 = xh * l;
    var t2 = $.mul(h, xl);
    if (typeof t2 !== 'number')
      throw $.iae(t2);
    var m = t1 + t2;
    t2 = xl * l + ((m & 16383) << 14 >>> 0);
    if (j !== (j | 0))
      throw $.iae(j);
    if (j < 0 || j >= w_array.length)
      throw $.ioore(j);
    t1 = w_array[j];
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    var l0 = t2 + t1 + c;
    var t3 = $.shr(l0, 28) + $.shr(m, 14);
    if (typeof h !== 'number')
      throw $.iae(h);
    c = t3 + xh * h;
    var j0 = j + 1;
    t3 = l0 & 268435455;
    if (j < 0 || j >= w_array.length)
      throw $.ioore(j);
    w_array[j] = t3;
    j = j0;
    i = i0;
  }
  return c;
},
 _am3$6$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      var i = env0;
      var x = env1;
      var w = env2;
      var j = env3;
      var c = env4;
      var n = env5;
      break;
    case 2:
      i = env0;
      x = env1;
      j = env2;
      c = env3;
      n = env4;
      this_array = env5;
      w_array = env6;
      break;
    case 3:
      i = env0;
      x = env1;
      j = env2;
      c = env3;
      n = env4;
      this_array = env5;
      w_array = env6;
      xl = env7;
      break;
    case 4:
      i = env0;
      xh = env1;
      j = env2;
      n = env3;
      this_array = env4;
      c = env5;
      w_array = env6;
      xl = env7;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var this_array = this.array;
      var w_array = w.get$array();
    case 2:
      state = 0;
      var xl = $.and($.toInt(x), 16383);
    case 3:
      state = 0;
      var xh = $.shr($.toInt(x), 14);
    case 4:
      state = 0;
      for (; n = $.sub(n, 1), $.geB(n, 0);) {
        var l = $.and($.index(this_array, i), 16383);
        var i0 = $.add(i, 1);
        var h = $.shr($.index(this_array, i), 14);
        var m = $.add($.mul(xh, l), $.mul(h, xl));
        var l0 = $.add($.add($.add($.mul(xl, l), $.shl($.and(m, 16383), 14)), $.index(w_array, j)), c);
        c = $.add($.add($.shr(l0, 28), $.shr(m, 14)), $.mul(xh, h));
        var j0 = $.add(j, 1);
        $.indexSet(w_array, j, $.and(l0, 268435455));
        j = j0;
        i = i0;
      }
      return c;
  }
},
 get$_am3: function() { return new $.BoundClosure0(this, '_am3$6'); },
 _setupEngine$2: function(fn, bits) {
  this.am = fn;
  $.BigInteger_dbits = bits;
  $.BigInteger_BI_DB = $.BigInteger_dbits;
  var t1 = $.BigInteger_dbits;
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  $.BigInteger_BI_DM = $.shl(1, t1) - 1;
  var t2 = $.BigInteger_dbits;
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  $.BigInteger_BI_DV = $.shl(1, t2);
  $.BigInteger_BI_FP = 52;
  $.BigInteger_BI_FV = $.pow(2, $.BigInteger_BI_FP);
  $.BigInteger_BI_F1 = $.sub($.BigInteger_BI_FP, $.BigInteger_dbits);
  var t3 = $.BigInteger_dbits;
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  t3 = 2 * t3;
  var t4 = $.BigInteger_BI_FP;
  if (typeof t4 !== 'number')
    throw $.iae(t4);
  $.BigInteger_BI_F2 = t3 - t4;
},
 _setupDigitConversions$0: function() {
  this.BI_RM = '0123456789abcdefghijklmnopqrstuvwxyz';
  this.BI_RC = $.HashMapImplementation$();
  var rr = $.charCodeAt('0', 0);
  if (typeof rr !== 'number')
    return this._setupDigitConversions$0$bailout(1, rr);
  for (var vv = 0; vv <= 9; ++vv) {
    var t1 = this.BI_RC;
    var rr0 = rr + 1;
    t1.operator$indexSet$2(rr, vv);
    rr = rr0;
  }
  rr = $.charCodeAt('a', 0);
  if (typeof rr !== 'number')
    return this._setupDigitConversions$0$bailout(2, rr);
  for (vv = 10; vv < 36; ++vv) {
    t1 = this.BI_RC;
    rr0 = rr + 1;
    t1.operator$indexSet$2(rr, vv);
    rr = rr0;
  }
  rr = $.charCodeAt('A', 0);
  if (typeof rr !== 'number')
    return this._setupDigitConversions$0$bailout(3, rr);
  for (vv = 10; vv < 36; ++vv) {
    t1 = this.BI_RC;
    rr0 = rr + 1;
    t1.operator$indexSet$2(rr, vv);
    rr = rr0;
  }
},
 _setupDigitConversions$0$bailout: function(state, env0) {
  switch (state) {
    case 1:
      rr = env0;
      break;
    case 2:
      rr = env0;
      break;
    case 3:
      rr = env0;
      break;
  }
  switch (state) {
    case 0:
      this.BI_RM = '0123456789abcdefghijklmnopqrstuvwxyz';
      this.BI_RC = $.HashMapImplementation$();
      var rr = $.charCodeAt('0', 0);
    case 1:
      state = 0;
      for (var vv = 0; vv <= 9; ++vv) {
        var t1 = this.BI_RC;
        var rr0 = $.add(rr, 1);
        $.indexSet(t1, rr, vv);
        rr = rr0;
      }
      rr = $.charCodeAt('a', 0);
    case 2:
      state = 0;
      for (vv = 10; vv < 36; ++vv) {
        t1 = this.BI_RC;
        rr0 = $.add(rr, 1);
        $.indexSet(t1, rr, vv);
        rr = rr0;
      }
      rr = $.charCodeAt('A', 0);
    case 3:
      state = 0;
      for (vv = 10; vv < 36; ++vv) {
        t1 = this.BI_RC;
        rr0 = $.add(rr, 1);
        $.indexSet(t1, rr, vv);
        rr = rr0;
      }
  }
},
 _int2char$1: function(n) {
  var t1 = this.BI_RM;
  if (n !== (n | 0))
    throw $.iae(n);
  if (n < 0 || n >= t1.length)
    throw $.ioore(n);
  return t1[n];
},
 _intAt$2: function(s, i) {
  var c = this.BI_RC.operator$index$1($.charCodeAt(s, i));
  if (typeof c !== 'number')
    return this._intAt$2$bailout(1, c);
  var t1 = c;
  return t1;
},
 _intAt$2$bailout: function(state, c) {
  return c == null ? -1 : c;
},
 copyTo$1: function(r) {
  var this_array = this.array;
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.copyTo$1$bailout(1, this_array, r, r_array, 0);
  var i = $.sub(this.t, 1);
  if (typeof i !== 'number')
    return this.copyTo$1$bailout(2, this_array, r, i, r_array);
  for (; i >= 0; --i) {
    var t1 = this_array.operator$index$1(i);
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= r_array.length)
      throw $.ioore(i);
    r_array[i] = t1;
  }
  r.set$t(this.t);
  r.set$s(this.s);
},
 copyTo$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      this_array = env0;
      var r = env1;
      r_array = env2;
      break;
    case 2:
      this_array = env0;
      r = env1;
      i = env2;
      r_array = env3;
      break;
  }
  switch (state) {
    case 0:
      var this_array = this.array;
      var r_array = r.get$array();
    case 1:
      state = 0;
      var i = $.sub(this.t, 1);
    case 2:
      state = 0;
      for (; $.geB(i, 0); i = $.sub(i, 1))
        $.indexSet(r_array, i, $.index(this_array, i));
      r.set$t(this.t);
      r.set$s(this.s);
  }
},
 fromInt$1: function(x) {
  var this_array = this.array;
  this.t = 1;
  this.s = $.ltB(x, 0) ? -1 : 0;
  if ($.gtB(x, 0))
    $.indexSet(this_array, 0, x);
  else if ($.ltB(x, -1))
    $.indexSet(this_array, 0, $.add(x, $.BigInteger_BI_DV));
  else
    this.t = 0;
},
 fromString$2: function(s, b) {
  if (typeof s !== 'string' && (typeof s !== 'object' || s === null || s.constructor !== Array && !s.is$JavaScriptIndexingBehavior()))
    return this.fromString$2$bailout(1, s, b);
  var this_array = this.array;
  if ($.eqB(b, 16))
    var k = 4;
  else if ($.eqB(b, 8))
    k = 3;
  else if ($.eqB(b, 256))
    k = 8;
  else if ($.eqB(b, 2))
    k = 1;
  else if ($.eqB(b, 32))
    k = 5;
  else {
    if ($.eqB(b, 4))
      ;
    else {
      this.fromRadix$2(s, b);
      return;
    }
    k = 2;
  }
  this.t = 0;
  this.s = 0;
  var i = s.length;
  for (var t1 = k === 8, sh = 0, mi = false; --i, i >= 0;) {
    if (t1) {
      if (i < 0 || i >= s.length)
        throw $.ioore(i);
      var x = $.and(s[i], 255);
    } else
      x = this._intAt$2(s, i);
    if ($.ltB(x, 0)) {
      if (i < 0 || i >= s.length)
        throw $.ioore(i);
      if ($.eqB(s[i], '-'))
        mi = true;
      continue;
    }
    if (sh === 0) {
      var t2 = this.t;
      this.t = $.add(t2, 1);
      this_array.operator$indexSet$2(t2, x);
    } else {
      t2 = $.gtB(sh + k, $.BigInteger_BI_DB);
      var t3 = this.t;
      if (t2) {
        t2 = $.sub(t3, 1);
        t3 = $.sub($.BigInteger_BI_DB, sh);
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        var t4 = $.shl($.and(x, $.shl(1, t3) - 1), sh);
        this_array.operator$indexSet$2(t2, $.or(this_array.operator$index$1(t2), t4));
        t2 = this.t;
        this.t = $.add(t2, 1);
        this_array.operator$indexSet$2(t2, $.shr(x, $.sub($.BigInteger_BI_DB, sh)));
      } else {
        t2 = $.sub(t3, 1);
        t3 = $.shl(x, sh);
        this_array.operator$indexSet$2(t2, $.or(this_array.operator$index$1(t2), t3));
      }
    }
    sh += k;
    if ($.geB(sh, $.BigInteger_BI_DB)) {
      t2 = $.BigInteger_BI_DB;
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      sh -= t2;
    }
    mi = false;
  }
  if (t1) {
    if (0 >= s.length)
      throw $.ioore(0);
    t1 = !$.eqB($.and(s[0], 128), 0);
  } else
    t1 = false;
  if (t1) {
    this.s = -1;
    if (sh > 0) {
      t1 = $.sub(this.t, 1);
      t2 = $.sub($.BigInteger_BI_DB, sh);
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      t3 = $.shl($.shl(1, t2) - 1, sh);
      this_array.operator$indexSet$2(t1, $.or(this_array.operator$index$1(t1), t3));
    }
  }
  this.clamp$0();
  if (mi)
    $.BigInteger_ZERO().subTo$2(this, this);
},
 fromString$2$bailout: function(state, s, b) {
  var this_array = this.array;
  if ($.eqB(b, 16))
    var k = 4;
  else if ($.eqB(b, 8))
    k = 3;
  else if ($.eqB(b, 256))
    k = 8;
  else if ($.eqB(b, 2))
    k = 1;
  else if ($.eqB(b, 32))
    k = 5;
  else {
    if ($.eqB(b, 4))
      ;
    else {
      this.fromRadix$2(s, b);
      return;
    }
    k = 2;
  }
  this.t = 0;
  this.s = 0;
  var i = $.get$length(s);
  for (var t1 = k === 8, sh = 0, mi = false; i = $.sub(i, 1), $.geB(i, 0);) {
    var x = t1 ? $.and($.index(s, i), 255) : this._intAt$2(s, i);
    if ($.ltB(x, 0)) {
      if ($.eqB($.index(s, i), '-'))
        mi = true;
      continue;
    }
    if (sh === 0) {
      var t2 = this.t;
      this.t = $.add(t2, 1);
      $.indexSet(this_array, t2, x);
    } else {
      t2 = $.gtB(sh + k, $.BigInteger_BI_DB);
      var t3 = this.t;
      if (t2) {
        t2 = $.sub(t3, 1);
        t3 = $.sub($.BigInteger_BI_DB, sh);
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        var t4 = $.shl($.and(x, $.shl(1, t3) - 1), sh);
        $.indexSet(this_array, t2, $.or($.index(this_array, t2), t4));
        t2 = this.t;
        this.t = $.add(t2, 1);
        $.indexSet(this_array, t2, $.shr(x, $.sub($.BigInteger_BI_DB, sh)));
      } else {
        t2 = $.sub(t3, 1);
        t3 = $.shl(x, sh);
        $.indexSet(this_array, t2, $.or($.index(this_array, t2), t3));
      }
    }
    sh += k;
    if ($.geB(sh, $.BigInteger_BI_DB)) {
      t2 = $.BigInteger_BI_DB;
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      sh -= t2;
    }
    mi = false;
  }
  if (t1 && !$.eqB($.and($.index(s, 0), 128), 0)) {
    this.s = -1;
    if (sh > 0) {
      t1 = $.sub(this.t, 1);
      t2 = $.sub($.BigInteger_BI_DB, sh);
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      t3 = $.shl($.shl(1, t2) - 1, sh);
      $.indexSet(this_array, t1, $.or($.index(this_array, t1), t3));
    }
  }
  this.clamp$0();
  if (mi)
    $.BigInteger_ZERO().subTo$2(this, this);
},
 toString$1: function(b) {
  var this_array = this.array;
  if ($.ltB(this.s, 0))
    return '-' + $.S(this.negate$0().toString$1(b));
  if ($.eqB(b, 16))
    var k = 4;
  else if ($.eqB(b, 8))
    k = 3;
  else if ($.eqB(b, 2))
    k = 1;
  else if ($.eqB(b, 32))
    k = 5;
  else {
    if ($.eqB(b, 4))
      ;
    else
      return this.toRadix$1(b);
    k = 2;
  }
  var km = $.shl(1, k) - 1;
  var i = this.t;
  var p = $.sub($.BigInteger_BI_DB, $.mod($.mul(i, $.BigInteger_BI_DB), k));
  if (p !== (p | 0))
    return this.toString$1$bailout(1, this_array, i, p, km, k, 0, 0, 0);
  var i0 = $.sub(i, 1);
  if (i0 !== (i0 | 0))
    return this.toString$1$bailout(2, i, p, k, i0, this_array, km, 0, 0);
  if ($.gtB(i, 0)) {
    if ($.ltB(p, $.BigInteger_BI_DB)) {
      var d = $.shr(this_array.operator$index$1(i0), p);
      var t1 = $.gtB(d, 0);
    } else {
      d = null;
      t1 = false;
    }
    if (t1) {
      var r = this._int2char$1(d);
      var m = true;
    } else {
      r = '';
      m = false;
    }
    if (typeof r !== 'string')
      return this.toString$1$bailout(3, p, r, k, m, i0, this_array, km, d);
    for (i = i0; i >= 0;) {
      if (p < k) {
        d = $.shl($.and(this_array.operator$index$1(i), $.shl(1, p) - 1), k - p);
        --i;
        t1 = this_array.operator$index$1(i);
        var t2 = $.sub($.BigInteger_BI_DB, k);
        if (typeof t2 !== 'number')
          throw $.iae(t2);
        p += t2;
        d = $.or(d, $.shr(t1, p));
      } else {
        t1 = $.toInt(this_array.operator$index$1(i));
        t2 = $.toInt(k);
        if (typeof t2 !== 'number')
          throw $.iae(t2);
        p -= t2;
        d = $.and($.shr(t1, $.toInt(p)), $.toInt(km));
        if (p <= 0) {
          t1 = $.BigInteger_BI_DB;
          if (typeof t1 !== 'number')
            throw $.iae(t1);
          p += t1;
          --i;
        }
      }
      if ($.gtB(d, 0))
        m = true;
      if (m)
        r += $.S(this._int2char$1(d));
    }
  } else {
    r = '';
    m = false;
  }
  return m ? r : '0';
},
 toString$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      this_array = env0;
      i = env1;
      p = env2;
      km = env3;
      k = env4;
      break;
    case 2:
      i = env0;
      p = env1;
      k = env2;
      i0 = env3;
      this_array = env4;
      km = env5;
      break;
    case 3:
      p = env0;
      r = env1;
      k = env2;
      m = env3;
      i0 = env4;
      this_array = env5;
      km = env6;
      d = env7;
      break;
  }
  switch (state) {
    case 0:
      var this_array = this.array;
      if ($.ltB(this.s, 0))
        return '-' + $.S(this.negate$0().toString$1(b));
      if ($.eqB(b, 16))
        var k = 4;
      else if ($.eqB(b, 8))
        k = 3;
      else if ($.eqB(b, 2))
        k = 1;
      else if ($.eqB(b, 32))
        k = 5;
      else {
        if ($.eqB(b, 4))
          ;
        else
          return this.toRadix$1(b);
        k = 2;
      }
      var km = $.shl(1, k) - 1;
      var i = this.t;
      var p = $.sub($.BigInteger_BI_DB, $.mod($.mul(i, $.BigInteger_BI_DB), k));
    case 1:
      state = 0;
      var i0 = $.sub(i, 1);
    case 2:
      state = 0;
    case 3:
      if (state === 3 || state === 0 && $.gtB(i, 0))
        switch (state) {
          case 0:
            if ($.ltB(p, $.BigInteger_BI_DB)) {
              var d = $.shr($.index(this_array, i0), p);
              var t1 = $.gtB(d, 0);
            } else {
              d = null;
              t1 = false;
            }
            if (t1) {
              var r = this._int2char$1(d);
              var m = true;
            } else {
              r = '';
              m = false;
            }
          case 3:
            state = 0;
            for (i = i0; $.geB(i, 0);) {
              if ($.ltB(p, k)) {
                t1 = $.index(this_array, i);
                if (typeof p !== 'number')
                  throw $.iae(p);
                d = $.shl($.and(t1, $.shl(1, p) - 1), k - p);
                i = $.sub(i, 1);
                var t2 = $.index(this_array, i);
                var t3 = $.sub($.BigInteger_BI_DB, k);
                if (typeof t3 !== 'number')
                  throw $.iae(t3);
                p += t3;
                d = $.or(d, $.shr(t2, p));
              } else {
                t1 = $.toInt($.index(this_array, i));
                p = $.sub(p, $.toInt(k));
                d = $.and($.shr(t1, $.toInt(p)), $.toInt(km));
                if ($.leB(p, 0)) {
                  p = $.add(p, $.BigInteger_BI_DB);
                  i = $.sub(i, 1);
                }
              }
              if ($.gtB(d, 0))
                m = true;
              if (m)
                r = $.S(r) + $.S(this._int2char$1(d));
            }
        }
      else {
        r = '';
        m = false;
      }
      return m ? r : '0';
  }
},
 toString$0: function() {
  return this.toString$1(null)
},
 negate$0: function() {
  var r = $.BigInteger$(null, null, null);
  $.BigInteger_ZERO().subTo$2(this, r);
  return r;
},
 abs$0: function() {
  return $.ltB(this.s, 0) ? this.negate$0() : this;
},
 compareTo$1: function(a) {
  var this_array = this.array;
  var a_array = a.get$array();
  if (typeof a_array !== 'string' && (typeof a_array !== 'object' || a_array === null || a_array.constructor !== Array && !a_array.is$JavaScriptIndexingBehavior()))
    return this.compareTo$1$bailout(1, this_array, a, a_array, 0);
  var r = $.sub(this.s, a.get$s());
  if (!$.eqB(r, 0))
    return r;
  var i = this.t;
  if (typeof i !== 'number')
    return this.compareTo$1$bailout(2, this_array, a, i, a_array);
  var t2 = a.get$t();
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  r = i - t2;
  if (!(r === 0))
    return r;
  for (; --i, i >= 0;) {
    var t1 = this_array.operator$index$1(i);
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a_array.length)
      throw $.ioore(i);
    r = $.sub(t1, a_array[i]);
    if (!$.eqB(r, 0))
      return r;
  }
  return 0;
},
 compareTo$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      this_array = env0;
      var a = env1;
      a_array = env2;
      break;
    case 2:
      this_array = env0;
      a = env1;
      i = env2;
      a_array = env3;
      break;
  }
  switch (state) {
    case 0:
      var this_array = this.array;
      var a_array = a.get$array();
    case 1:
      state = 0;
      var r = $.sub(this.s, a.get$s());
      if (!$.eqB(r, 0))
        return r;
      var i = this.t;
    case 2:
      state = 0;
      r = $.sub(i, a.get$t());
      if (!$.eqB(r, 0))
        return r;
      for (; i = $.sub(i, 1), $.geB(i, 0);) {
        r = $.sub($.index(this_array, i), $.index(a_array, i));
        if (!$.eqB(r, 0))
          return r;
      }
      return 0;
  }
},
 nbits$1: function(x) {
  if (typeof x === 'number')
    x = $.toInt(x);
  var t = $.shr(x, 16);
  if (!$.eqB(t, 0)) {
    x = t;
    var r = 17;
  } else
    r = 1;
  t = $.shr(x, 8);
  if (!$.eqB(t, 0)) {
    r += 8;
    x = t;
  }
  t = $.shr(x, 4);
  if (!$.eqB(t, 0)) {
    r += 4;
    x = t;
  }
  t = $.shr(x, 2);
  if (!$.eqB(t, 0)) {
    r += 2;
    x = t;
  }
  return !$.eqB($.shr(x, 1), 0) ? r + 1 : r;
},
 dlShiftTo$2: function(n, r) {
  if (typeof n !== 'number')
    return this.dlShiftTo$2$bailout(1, n, r, 0, 0, 0);
  var this_array = this.array;
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.dlShiftTo$2$bailout(2, n, r, r_array, this_array, 0);
  var t1 = this.t;
  if (typeof t1 !== 'number')
    return this.dlShiftTo$2$bailout(3, n, r, t1, r_array, this_array);
  var i = t1 - 1;
  for (; i >= 0; --i) {
    t1 = i + n;
    var t2 = this_array.operator$index$1(i);
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    if (t1 < 0 || t1 >= r_array.length)
      throw $.ioore(t1);
    r_array[t1] = t2;
  }
  for (i = n - 1; i >= 0; --i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= r_array.length)
      throw $.ioore(i);
    r_array[i] = 0;
  }
  t1 = this.t;
  if (typeof t1 !== 'number')
    return this.dlShiftTo$2$bailout(4, n, r, t1, 0, 0);
  r.set$t(t1 + n);
  r.set$s(this.s);
},
 dlShiftTo$2$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var n = env0;
      var r = env1;
      break;
    case 2:
      n = env0;
      r = env1;
      r_array = env2;
      this_array = env3;
      break;
    case 3:
      n = env0;
      r = env1;
      t1 = env2;
      r_array = env3;
      this_array = env4;
      break;
    case 4:
      n = env0;
      r = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var this_array = this.array;
      var r_array = r.get$array();
    case 2:
      state = 0;
      var t1 = this.t;
    case 3:
      state = 0;
      var i = $.sub(t1, 1);
      for (; $.geB(i, 0); i = $.sub(i, 1))
        $.indexSet(r_array, $.add(i, n), $.index(this_array, i));
      for (i = $.sub(n, 1); $.geB(i, 0); i = $.sub(i, 1))
        $.indexSet(r_array, i, 0);
      t1 = this.t;
    case 4:
      state = 0;
      r.set$t($.add(t1, n));
      r.set$s(this.s);
  }
},
 drShiftTo$2: function(n, r) {
  if (typeof n !== 'number')
    return this.drShiftTo$2$bailout(1, n, r, 0, 0);
  var this_array = this.array;
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.drShiftTo$2$bailout(2, n, r, r_array, this_array);
  for (var i = n; $.ltB(i, this.t); ++i) {
    var t1 = i - n;
    var t2 = this_array.operator$index$1(i);
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    if (t1 < 0 || t1 >= r_array.length)
      throw $.ioore(t1);
    r_array[t1] = t2;
  }
  r.set$t($.max($.sub(this.t, n), 0));
  r.set$s(this.s);
},
 drShiftTo$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var n = env0;
      var r = env1;
      break;
    case 2:
      n = env0;
      r = env1;
      r_array = env2;
      this_array = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var this_array = this.array;
      var r_array = r.get$array();
    case 2:
      state = 0;
      for (var i = n; $.ltB(i, this.t); i = $.add(i, 1))
        $.indexSet(r_array, $.sub(i, n), $.index(this_array, i));
      r.set$t($.max($.sub(this.t, n), 0));
      r.set$s(this.s);
  }
},
 lShiftTo$2: function(n, r) {
  var this_array = this.array;
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.lShiftTo$2$bailout(1, n, r, r_array, this_array, 0, 0, 0, 0, 0);
  var bs = $.mod(n, $.BigInteger_BI_DB);
  if (bs !== (bs | 0))
    return this.lShiftTo$2$bailout(2, n, r, bs, r_array, this_array, 0, 0, 0, 0);
  var cbs = $.sub($.BigInteger_BI_DB, bs);
  if (typeof cbs !== 'number')
    throw $.iae(cbs);
  if (cbs !== (cbs | 0))
    return this.lShiftTo$2$bailout(3, n, r, r_array, this_array, bs, cbs, 0, 0, 0);
  var bm = $.shl(1, cbs) - 1;
  var ds = $.tdiv(n, $.BigInteger_BI_DB);
  if (typeof ds !== 'number')
    return this.lShiftTo$2$bailout(4, bm, r, ds, r_array, this_array, bs, cbs, 0, 0);
  var c = $.and($.shl(this.s, bs), $.BigInteger_BI_DM);
  if (c !== (c | 0))
    return this.lShiftTo$2$bailout(5, bm, r, ds, r_array, this_array, bs, c, cbs, 0);
  var i = $.sub(this.t, 1);
  if (typeof i !== 'number')
    return this.lShiftTo$2$bailout(6, bm, r, ds, r_array, this_array, bs, c, cbs, i);
  for (; i >= 0; --i) {
    var t1 = i + ds + 1;
    var t2 = $.or($.shr(this_array.operator$index$1(i), cbs), c);
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    if (t1 < 0 || t1 >= r_array.length)
      throw $.ioore(t1);
    r_array[t1] = t2;
    c = $.shl($.and(this_array.operator$index$1(i), bm), bs);
  }
  for (i = ds - 1; i >= 0; --i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= r_array.length)
      throw $.ioore(i);
    r_array[i] = 0;
  }
  if (ds !== (ds | 0))
    throw $.iae(ds);
  if (ds < 0 || ds >= r_array.length)
    throw $.ioore(ds);
  r_array[ds] = c;
  r.set$t($.add($.add(this.t, ds), 1));
  r.set$s(this.s);
  r.clamp$0();
},
 lShiftTo$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8) {
  switch (state) {
    case 1:
      var n = env0;
      var r = env1;
      r_array = env2;
      this_array = env3;
      break;
    case 2:
      n = env0;
      r = env1;
      bs = env2;
      r_array = env3;
      this_array = env4;
      break;
    case 3:
      n = env0;
      r = env1;
      r_array = env2;
      this_array = env3;
      bs = env4;
      cbs = env5;
      break;
    case 4:
      bm = env0;
      r = env1;
      ds = env2;
      r_array = env3;
      this_array = env4;
      bs = env5;
      cbs = env6;
      break;
    case 5:
      bm = env0;
      r = env1;
      ds = env2;
      r_array = env3;
      this_array = env4;
      bs = env5;
      c = env6;
      cbs = env7;
      break;
    case 6:
      bm = env0;
      r = env1;
      ds = env2;
      r_array = env3;
      this_array = env4;
      bs = env5;
      c = env6;
      cbs = env7;
      i = env8;
      break;
  }
  switch (state) {
    case 0:
      var this_array = this.array;
      var r_array = r.get$array();
    case 1:
      state = 0;
      var bs = $.mod(n, $.BigInteger_BI_DB);
    case 2:
      state = 0;
      var cbs = $.sub($.BigInteger_BI_DB, bs);
      if (typeof cbs !== 'number')
        throw $.iae(cbs);
    case 3:
      state = 0;
      var bm = $.shl(1, cbs) - 1;
      var ds = $.tdiv(n, $.BigInteger_BI_DB);
    case 4:
      state = 0;
      var c = $.and($.shl(this.s, bs), $.BigInteger_BI_DM);
    case 5:
      state = 0;
      var i = $.sub(this.t, 1);
    case 6:
      state = 0;
      for (; $.geB(i, 0); i = $.sub(i, 1)) {
        $.indexSet(r_array, $.add($.add(i, ds), 1), $.or($.shr($.index(this_array, i), cbs), c));
        var c0 = $.shl($.and($.index(this_array, i), bm), bs);
        c = c0;
      }
      for (i = $.sub(ds, 1); $.geB(i, 0); i = $.sub(i, 1))
        $.indexSet(r_array, i, 0);
      $.indexSet(r_array, ds, c);
      r.set$t($.add($.add(this.t, ds), 1));
      r.set$s(this.s);
      r.clamp$0();
  }
},
 rShiftTo$2: function(n, r) {
  var this_array = this.array;
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.rShiftTo$2$bailout(1, n, r, this_array, r_array, 0, 0);
  r.set$s(this.s);
  var ds = $.tdiv(n, $.BigInteger_BI_DB);
  if (typeof ds !== 'number')
    return this.rShiftTo$2$bailout(2, n, r, this_array, ds, r_array, 0);
  if ($.geB(ds, this.t)) {
    r.set$t(0);
    return;
  }
  var bs = $.mod(n, $.BigInteger_BI_DB);
  var cbs = $.sub($.BigInteger_BI_DB, bs);
  if (cbs !== (cbs | 0))
    return this.rShiftTo$2$bailout(3, r, r_array, bs, this_array, ds, cbs);
  if (typeof bs !== 'number')
    throw $.iae(bs);
  if (bs !== (bs | 0))
    return this.rShiftTo$2$bailout(4, r, bs, r_array, this_array, ds, cbs);
  var bm = $.shl(1, bs) - 1;
  var t3 = $.shr(this_array.operator$index$1(ds), bs);
  if (0 >= r_array.length)
    throw $.ioore(0);
  r_array[0] = t3;
  for (var i = ds + 1; $.ltB(i, this.t); ++i) {
    var t1 = i - ds;
    var t2 = t1 - 1;
    t3 = $.shl($.and(this_array.operator$index$1(i), bm), cbs);
    if (t2 !== (t2 | 0))
      throw $.iae(t2);
    if (t2 < 0 || t2 >= r_array.length)
      throw $.ioore(t2);
    t3 = $.or(r_array[t2], t3);
    if (t2 < 0 || t2 >= r_array.length)
      throw $.ioore(t2);
    r_array[t2] = t3;
    t3 = $.shr(this_array.operator$index$1(i), bs);
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    if (t1 < 0 || t1 >= r_array.length)
      throw $.ioore(t1);
    r_array[t1] = t3;
  }
  if (bs > 0) {
    t1 = $.sub($.sub(this.t, ds), 1);
    t2 = $.shl($.and(this.s, bm), cbs);
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    if (t1 < 0 || t1 >= r_array.length)
      throw $.ioore(t1);
    t2 = $.or(r_array[t1], t2);
    if (t1 < 0 || t1 >= r_array.length)
      throw $.ioore(t1);
    r_array[t1] = t2;
  }
  r.set$t($.sub(this.t, ds));
  r.clamp$0();
},
 rShiftTo$2$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var n = env0;
      var r = env1;
      this_array = env2;
      r_array = env3;
      break;
    case 2:
      n = env0;
      r = env1;
      this_array = env2;
      ds = env3;
      r_array = env4;
      break;
    case 3:
      r = env0;
      r_array = env1;
      bs = env2;
      this_array = env3;
      ds = env4;
      cbs = env5;
      break;
    case 4:
      r = env0;
      bs = env1;
      r_array = env2;
      this_array = env3;
      ds = env4;
      cbs = env5;
      break;
  }
  switch (state) {
    case 0:
      var this_array = this.array;
      var r_array = r.get$array();
    case 1:
      state = 0;
      r.set$s(this.s);
      var ds = $.tdiv(n, $.BigInteger_BI_DB);
    case 2:
      state = 0;
      if ($.geB(ds, this.t)) {
        r.set$t(0);
        return;
      }
      var bs = $.mod(n, $.BigInteger_BI_DB);
      var cbs = $.sub($.BigInteger_BI_DB, bs);
    case 3:
      state = 0;
      if (typeof bs !== 'number')
        throw $.iae(bs);
    case 4:
      state = 0;
      var bm = $.shl(1, bs) - 1;
      $.indexSet(r_array, 0, $.shr($.index(this_array, ds), bs));
      for (var i = $.add(ds, 1); $.ltB(i, this.t); i = $.add(i, 1)) {
        var t1 = $.sub($.sub(i, ds), 1);
        var t2 = $.shl($.and($.index(this_array, i), bm), cbs);
        $.indexSet(r_array, t1, $.or($.index(r_array, t1), t2));
        $.indexSet(r_array, $.sub(i, ds), $.shr($.index(this_array, i), bs));
      }
      if (bs > 0) {
        t1 = $.sub($.sub(this.t, ds), 1);
        t2 = $.shl($.and(this.s, bm), cbs);
        $.indexSet(r_array, t1, $.or($.index(r_array, t1), t2));
      }
      r.set$t($.sub(this.t, ds));
      r.clamp$0();
  }
},
 clamp$0: function() {
  var this_array = this.array;
  var c = $.and(this.s, $.BigInteger_BI_DM);
  if (c !== (c | 0))
    return this.clamp$0$bailout(1, this_array, c);
  while (true) {
    if (!($.gtB(this.t, 0) && $.eqB(this_array.operator$index$1($.sub(this.t, 1)), c)))
      break;
    this.t = $.sub(this.t, 1);
  }
},
 clamp$0$bailout: function(state, this_array, c) {
  while (true) {
    if (!($.gtB(this.t, 0) && $.eqB($.index(this_array, $.sub(this.t, 1)), c)))
      break;
    this.t = $.sub(this.t, 1);
  }
},
 subTo$2: function(a, r) {
  var this_array = this.array;
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.subTo$2$bailout(1, a, r, this_array, r_array, 0, 0, 0, 0, 0, 0);
  var a_array = a.get$array();
  if (typeof a_array !== 'string' && (typeof a_array !== 'object' || a_array === null || a_array.constructor !== Array && !a_array.is$JavaScriptIndexingBehavior()))
    return this.subTo$2$bailout(2, a, r, this_array, r_array, a_array, 0, 0, 0, 0, 0);
  var m = $.min(a.get$t(), this.t);
  for (var c = 0, i = 0; i < m;) {
    var t1 = $.toInt(this_array.operator$index$1(i));
    if (typeof t1 !== 'number')
      return this.subTo$2$bailout(3, a, r, t1, c, r_array, i, a_array, this_array, m, 0);
    if (i < 0 || i >= a_array.length)
      throw $.ioore(i);
    var t3 = $.toInt(a_array[i]);
    if (typeof t3 !== 'number')
      return this.subTo$2$bailout(4, a, r, t1, c, r_array, i, t3, this_array, a_array, m);
    var t5 = $.toInt(t1 - t3);
    if (typeof t5 !== 'number')
      throw $.iae(t5);
    if (t5 !== (t5 | 0))
      return this.subTo$2$bailout(5, a, r, this_array, c, r_array, i, t5, a_array, m, 0);
    c += t5;
    var i0 = i + 1;
    t5 = $.BigInteger_BI_DM;
    if (typeof t5 !== 'number')
      throw $.iae(t5);
    if (t5 !== (t5 | 0))
      return this.subTo$2$bailout(6, a, r, this_array, r_array, i, a_array, t5, c, m, i0);
    t5 = (c & t5) >>> 0;
    if (i < 0 || i >= r_array.length)
      throw $.ioore(i);
    r_array[i] = t5;
    t5 = $.BigInteger_BI_DB;
    if (typeof t5 !== 'number')
      throw $.iae(t5);
    if (t5 !== (t5 | 0))
      return this.subTo$2$bailout(7, a, r, this_array, r_array, a_array, c, t5, m, i0, 0);
    c = $.shr(c, t5);
    if (c === 4294967295)
      c = -1;
    i = i0;
  }
  t1 = a.get$t();
  if (typeof t1 !== 'number')
    return this.subTo$2$bailout(8, a, r, this_array, c, r_array, i, a_array, t1, 0, 0);
  t3 = this.t;
  if (typeof t3 !== 'number')
    return this.subTo$2$bailout(9, a, r, this_array, c, r_array, i, a_array, t3, t1, 0);
  if (t1 < t3) {
    t1 = a.get$s();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    if (t1 !== (t1 | 0))
      return this.subTo$2$bailout(10, r, this_array, c, r_array, i, t1, 0, 0, 0, 0);
    c -= t1;
    while (true) {
      t1 = this.t;
      if (typeof t1 !== 'number')
        return this.subTo$2$bailout(11, r, this_array, r_array, t1, c, i, 0, 0, 0, 0);
      if (!(i < t1))
        break;
      t1 = this_array.operator$index$1(i);
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      if (t1 !== (t1 | 0))
        return this.subTo$2$bailout(12, r, this_array, t1, r_array, c, i, 0, 0, 0, 0);
      c += t1;
      i0 = i + 1;
      t1 = $.BigInteger_BI_DM;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      if (t1 !== (t1 | 0))
        return this.subTo$2$bailout(13, r, this_array, r_array, c, t1, i0, i, 0, 0, 0);
      t1 = (c & t1) >>> 0;
      if (i < 0 || i >= r_array.length)
        throw $.ioore(i);
      r_array[i] = t1;
      t1 = $.BigInteger_BI_DB;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      if (t1 !== (t1 | 0))
        return this.subTo$2$bailout(14, r, this_array, r_array, c, i0, t1, 0, 0, 0, 0);
      c = $.shr(c, t1);
      if (c === 4294967295)
        c = -1;
      i = i0;
    }
    t1 = this.s;
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    c += t1;
  } else {
    t1 = this.s;
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    if (t1 !== (t1 | 0))
      return this.subTo$2$bailout(15, a, r, c, i, r_array, a_array, t1, 0, 0, 0);
    c += t1;
    while (true) {
      t1 = a.get$t();
      if (typeof t1 !== 'number')
        return this.subTo$2$bailout(16, a, c, r, i, t1, r_array, a_array, 0, 0, 0);
      if (!(i < t1))
        break;
      if (i < 0 || i >= a_array.length)
        throw $.ioore(i);
      t1 = a_array[i];
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      if (t1 !== (t1 | 0))
        return this.subTo$2$bailout(17, a, c, r, i, r_array, a_array, t1, 0, 0, 0);
      c -= t1;
      i0 = i + 1;
      t1 = $.BigInteger_BI_DM;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      if (t1 !== (t1 | 0))
        return this.subTo$2$bailout(18, a, r, t1, i0, i, r_array, a_array, c, 0, 0);
      t1 = (c & t1) >>> 0;
      if (i < 0 || i >= r_array.length)
        throw $.ioore(i);
      r_array[i] = t1;
      t1 = $.BigInteger_BI_DB;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      if (t1 !== (t1 | 0))
        return this.subTo$2$bailout(19, a, r, i0, r_array, t1, a_array, c, 0, 0, 0);
      c = $.shr(c, t1);
      if (c === 4294967295)
        c = -1;
      i = i0;
    }
    t1 = a.get$s();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    c -= t1;
  }
  r.set$s(c < 0 ? -1 : 0);
  if (c < -1) {
    i0 = i + 1;
    t1 = $.BigInteger_BI_DV;
    if (typeof t1 !== 'number')
      return this.subTo$2$bailout(20, r, c, r_array, i, i0, t1, 0, 0, 0, 0);
    t1 += c;
    if (i < 0 || i >= r_array.length)
      throw $.ioore(i);
    r_array[i] = t1;
    i = i0;
  } else if (c > 0) {
    i0 = i + 1;
    if (i < 0 || i >= r_array.length)
      throw $.ioore(i);
    r_array[i] = c;
    i = i0;
  }
  r.set$t(i);
  r.clamp$0();
},
 subTo$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9) {
  switch (state) {
    case 1:
      var a = env0;
      var r = env1;
      this_array = env2;
      r_array = env3;
      break;
    case 2:
      a = env0;
      r = env1;
      this_array = env2;
      r_array = env3;
      a_array = env4;
      break;
    case 3:
      a = env0;
      r = env1;
      t1 = env2;
      c = env3;
      r_array = env4;
      i = env5;
      a_array = env6;
      this_array = env7;
      m = env8;
      break;
    case 4:
      a = env0;
      r = env1;
      t1 = env2;
      c = env3;
      r_array = env4;
      i = env5;
      t3 = env6;
      this_array = env7;
      a_array = env8;
      m = env9;
      break;
    case 5:
      a = env0;
      r = env1;
      this_array = env2;
      c = env3;
      r_array = env4;
      i = env5;
      t5 = env6;
      a_array = env7;
      m = env8;
      break;
    case 6:
      a = env0;
      r = env1;
      this_array = env2;
      r_array = env3;
      i = env4;
      a_array = env5;
      t5 = env6;
      c = env7;
      m = env8;
      i0 = env9;
      break;
    case 7:
      a = env0;
      r = env1;
      this_array = env2;
      r_array = env3;
      a_array = env4;
      c = env5;
      t8 = env6;
      m = env7;
      i0 = env8;
      break;
    case 8:
      a = env0;
      r = env1;
      this_array = env2;
      c = env3;
      r_array = env4;
      i = env5;
      a_array = env6;
      t1 = env7;
      break;
    case 9:
      a = env0;
      r = env1;
      this_array = env2;
      c = env3;
      r_array = env4;
      i = env5;
      a_array = env6;
      t3 = env7;
      t1 = env8;
      break;
    case 10:
      r = env0;
      this_array = env1;
      c = env2;
      r_array = env3;
      i = env4;
      t1 = env5;
      break;
    case 11:
      r = env0;
      this_array = env1;
      r_array = env2;
      t1 = env3;
      c = env4;
      i = env5;
      break;
    case 12:
      r = env0;
      this_array = env1;
      t1 = env2;
      r_array = env3;
      c = env4;
      i = env5;
      break;
    case 13:
      r = env0;
      this_array = env1;
      r_array = env2;
      c = env3;
      t1 = env4;
      i0 = env5;
      i = env6;
      break;
    case 14:
      r = env0;
      this_array = env1;
      r_array = env2;
      c = env3;
      i0 = env4;
      t4 = env5;
      break;
    case 15:
      a = env0;
      r = env1;
      c = env2;
      i = env3;
      r_array = env4;
      a_array = env5;
      t1 = env6;
      break;
    case 16:
      a = env0;
      c = env1;
      r = env2;
      i = env3;
      t1 = env4;
      r_array = env5;
      a_array = env6;
      break;
    case 17:
      a = env0;
      c = env1;
      r = env2;
      i = env3;
      r_array = env4;
      a_array = env5;
      t1 = env6;
      break;
    case 18:
      a = env0;
      r = env1;
      t1 = env2;
      i0 = env3;
      i = env4;
      r_array = env5;
      a_array = env6;
      c = env7;
      break;
    case 19:
      a = env0;
      r = env1;
      i0 = env2;
      r_array = env3;
      t4 = env4;
      a_array = env5;
      c = env6;
      break;
    case 20:
      r = env0;
      c = env1;
      r_array = env2;
      i = env3;
      i0 = env4;
      t1 = env5;
      break;
  }
  switch (state) {
    case 0:
      var this_array = this.array;
      var r_array = r.get$array();
    case 1:
      state = 0;
      var a_array = a.get$array();
    case 2:
      state = 0;
      var m = $.min(a.get$t(), this.t);
      var c = 0;
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!(i < m))
                break L0;
              var t1 = $.toInt($.index(this_array, i));
            case 3:
              state = 0;
              var t3 = $.toInt($.index(a_array, i));
            case 4:
              state = 0;
              var t5 = $.toInt($.sub(t1, t3));
              if (typeof t5 !== 'number')
                throw $.iae(t5);
            case 5:
              state = 0;
              c += t5;
              var i0 = i + 1;
              t5 = $.BigInteger_BI_DM;
              if (typeof t5 !== 'number')
                throw $.iae(t5);
            case 6:
              state = 0;
              $.indexSet(r_array, i, (c & t5) >>> 0);
              var t8 = $.BigInteger_BI_DB;
              if (typeof t8 !== 'number')
                throw $.iae(t8);
            case 7:
              state = 0;
              c = $.shr(c, t8);
              if (c === 4294967295)
                c = -1;
              i = i0;
          }
      t1 = a.get$t();
    case 8:
      state = 0;
      t3 = this.t;
    case 9:
      state = 0;
    case 10:
    case 11:
    case 12:
    case 13:
    case 14:
    case 15:
    case 16:
    case 17:
    case 18:
    case 19:
      if (state === 14 || state === 13 || state === 12 || state === 11 || state === 10 || state === 0 && $.ltB(t1, t3))
        switch (state) {
          case 0:
            t1 = a.get$s();
            if (typeof t1 !== 'number')
              throw $.iae(t1);
          case 10:
            state = 0;
            c -= t1;
          default:
            L1:
              while (true)
                switch (state) {
                  case 0:
                    t1 = this.t;
                  case 11:
                    state = 0;
                    if (!$.ltB(i, t1))
                      break L1;
                    t1 = $.index(this_array, i);
                    if (typeof t1 !== 'number')
                      throw $.iae(t1);
                  case 12:
                    state = 0;
                    c += t1;
                    i0 = i + 1;
                    t1 = $.BigInteger_BI_DM;
                    if (typeof t1 !== 'number')
                      throw $.iae(t1);
                  case 13:
                    state = 0;
                    $.indexSet(r_array, i, (c & t1) >>> 0);
                    var t4 = $.BigInteger_BI_DB;
                    if (typeof t4 !== 'number')
                      throw $.iae(t4);
                  case 14:
                    state = 0;
                    c = $.shr(c, t4);
                    if (c === 4294967295)
                      c = -1;
                    i = i0;
                }
            t1 = this.s;
            if (typeof t1 !== 'number')
              throw $.iae(t1);
            c += t1;
        }
      else
        switch (state) {
          case 0:
            t1 = this.s;
            if (typeof t1 !== 'number')
              throw $.iae(t1);
          case 15:
            state = 0;
            c += t1;
          default:
            L2:
              while (true)
                switch (state) {
                  case 0:
                    t1 = a.get$t();
                  case 16:
                    state = 0;
                    if (!$.ltB(i, t1))
                      break L2;
                    t1 = $.index(a_array, i);
                    if (typeof t1 !== 'number')
                      throw $.iae(t1);
                  case 17:
                    state = 0;
                    c -= t1;
                    i0 = i + 1;
                    t1 = $.BigInteger_BI_DM;
                    if (typeof t1 !== 'number')
                      throw $.iae(t1);
                  case 18:
                    state = 0;
                    $.indexSet(r_array, i, (c & t1) >>> 0);
                    t4 = $.BigInteger_BI_DB;
                    if (typeof t4 !== 'number')
                      throw $.iae(t4);
                  case 19:
                    state = 0;
                    c = $.shr(c, t4);
                    if (c === 4294967295)
                      c = -1;
                    i = i0;
                }
            t1 = a.get$s();
            if (typeof t1 !== 'number')
              throw $.iae(t1);
            c -= t1;
        }
      r.set$s(c < 0 ? -1 : 0);
    case 20:
      if (state === 20 || state === 0 && c < -1)
        switch (state) {
          case 0:
            i0 = i + 1;
            t1 = $.BigInteger_BI_DV;
          case 20:
            state = 0;
            $.indexSet(r_array, i, $.add(t1, c));
            i = i0;
        }
      else if (c > 0) {
        i0 = i + 1;
        $.indexSet(r_array, i, c);
        i = i0;
      }
      r.set$t(i);
      r.clamp$0();
  }
},
 multiplyTo$2: function(a, r) {
  var r_array = r.array;
  var x = this.abs$0();
  var y = $.abs(a);
  var y_array = y.get$array();
  if (typeof y_array !== 'string' && (typeof y_array !== 'object' || y_array === null || y_array.constructor !== Array && !y_array.is$JavaScriptIndexingBehavior()))
    return this.multiplyTo$2$bailout(1, r_array, x, r, a, y, y_array, 0);
  var i = x.get$t();
  if (typeof i !== 'number')
    return this.multiplyTo$2$bailout(2, r_array, x, r, a, y, y_array, i);
  var t3 = y.get$t();
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  r.t = i + t3;
  for (; --i, i >= 0;)
    r_array.operator$indexSet$2(i, 0);
  for (i = 0; $.ltB(i, y.get$t()); ++i) {
    var t1 = x.get$t();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = i + t1;
    if (i < 0 || i >= y_array.length)
      throw $.ioore(i);
    r_array.operator$indexSet$2(t1, x.am$6(0, y_array[i], r, i, 0, x.get$t()));
  }
  r.s = 0;
  r.clamp$0();
  if (!$.eqB(this.s, a.get$s()))
    $.BigInteger_ZERO().subTo$2(r, r);
},
 multiplyTo$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      r_array = env0;
      x = env1;
      var r = env2;
      var a = env3;
      y = env4;
      y_array = env5;
      break;
    case 2:
      r_array = env0;
      x = env1;
      r = env2;
      a = env3;
      y = env4;
      y_array = env5;
      i = env6;
      break;
  }
  switch (state) {
    case 0:
      var r_array = r.array;
      var x = this.abs$0();
      var y = $.abs(a);
      var y_array = y.get$array();
    case 1:
      state = 0;
      var i = x.get$t();
    case 2:
      state = 0;
      r.t = $.add(i, y.get$t());
      for (; i = $.sub(i, 1), $.geB(i, 0);)
        $.indexSet(r_array, i, 0);
      for (i = 0; $.ltB(i, y.get$t()); ++i) {
        var t1 = x.get$t();
        if (typeof t1 !== 'number')
          throw $.iae(t1);
        $.indexSet(r_array, i + t1, x.am$6(0, $.index(y_array, i), r, i, 0, x.get$t()));
      }
      r.s = 0;
      r.clamp$0();
      if (!$.eqB(this.s, a.get$s()))
        $.BigInteger_ZERO().subTo$2(r, r);
  }
},
 divRemTo$3: function(m, q, r) {
  var pm = $.abs(m);
  var t1 = pm.get$t();
  if (typeof t1 !== 'number')
    return this.divRemTo$3$bailout(1, m, q, r, t1, pm, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (t1 <= 0)
    return;
  var pt = this.abs$0();
  t1 = pt.get$t();
  if (typeof t1 !== 'number')
    return this.divRemTo$3$bailout(2, m, q, r, t1, pt, pm, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t3 = pm.get$t();
  if (typeof t3 !== 'number')
    return this.divRemTo$3$bailout(3, m, q, r, t1, t3, pt, pm, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (t1 < t3) {
    if (!(q == null))
      q.fromInt$1(0);
    if (!(r == null))
      this.copyTo$1(r);
    return;
  }
  if (r == null)
    r = $.BigInteger$(null, null, null);
  var y = $.BigInteger$(null, null, null);
  var ts = this.s;
  if (typeof ts !== 'number')
    return this.divRemTo$3$bailout(4, m, q, pt, pm, r, y, ts, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var ms = m.get$s();
  var pm_array = pm.get$array();
  if (typeof pm_array !== 'string' && (typeof pm_array !== 'object' || pm_array === null || pm_array.constructor !== Array && !pm_array.is$JavaScriptIndexingBehavior()))
    return this.divRemTo$3$bailout(5, q, pt, pm, r, y, ms, pm_array, ts, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  t3 = $.BigInteger_BI_DB;
  if (typeof t3 !== 'number')
    return this.divRemTo$3$bailout(6, t3, q, pm, pt, r, y, ms, pm_array, ts, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t5 = pm.get$t();
  if (typeof t5 !== 'number')
    return this.divRemTo$3$bailout(7, t3, q, t5, pm, pt, r, y, ms, pm_array, ts, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  --t5;
  if (t5 !== (t5 | 0))
    throw $.iae(t5);
  if (t5 < 0 || t5 >= pm_array.length)
    throw $.ioore(t5);
  var t7 = this.nbits$1(pm_array[t5]);
  if (typeof t7 !== 'number')
    return this.divRemTo$3$bailout(8, q, pt, pm, r, y, t7, ms, ts, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var nsh = t3 - t7;
  t1 = nsh > 0;
  if (t1) {
    pm.lShiftTo$2(nsh, y);
    pt.lShiftTo$2(nsh, r);
  } else {
    pm.copyTo$1(y);
    pt.copyTo$1(r);
  }
  var ys = y.t;
  if (typeof ys !== 'number')
    return this.divRemTo$3$bailout(9, ys, q, nsh, r, y, ms, ts, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var y_array = y.array;
  var y0 = y_array.operator$index$1(ys - 1);
  if (typeof y0 !== 'number')
    return this.divRemTo$3$bailout(10, ys, q, y_array, nsh, y0, r, y, ms, ts, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (y0 === 0)
    return;
  var t2 = $.BigInteger_BI_F1;
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  if (t2 !== (t2 | 0))
    return this.divRemTo$3$bailout(11, ys, q, y_array, t2, nsh, y0, r, y, ms, ts, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t4 = y0 * $.shl(1, t2);
  if (ys > 1) {
    t2 = y_array.operator$index$1(ys - 2);
    if (t2 !== (t2 | 0))
      return this.divRemTo$3$bailout(12, ys, q, y_array, t4, nsh, y0, r, y, ms, ts, t2, 0, 0, 0, 0, 0, 0, 0, 0);
    t5 = $.BigInteger_BI_F2;
    if (t5 !== (t5 | 0))
      return this.divRemTo$3$bailout(13, q, t4, nsh, ts, t2, ys, y_array, t5, y0, r, y, ms, 0, 0, 0, 0, 0, 0, 0);
    t5 = $.shr(t2, t5);
    t2 = t5;
  } else
    t2 = 0;
  var yt = t4 + t2;
  t2 = $.BigInteger_BI_FV;
  if (typeof t2 !== 'number')
    return this.divRemTo$3$bailout(14, ys, q, y_array, yt, nsh, t2, y0, y, r, ms, ts, 0, 0, 0, 0, 0, 0, 0, 0);
  var d1 = t2 / yt;
  t2 = $.BigInteger_BI_F1;
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  if (t2 !== (t2 | 0))
    return this.divRemTo$3$bailout(15, q, t2, nsh, ts, ys, y_array, yt, y0, r, y, d1, ms, 0, 0, 0, 0, 0, 0, 0);
  var d2 = $.shl(1, t2) / yt;
  t5 = $.BigInteger_BI_F2;
  if (typeof t5 !== 'number')
    throw $.iae(t5);
  if (t5 !== (t5 | 0))
    return this.divRemTo$3$bailout(16, d1, q, t5, nsh, ts, ys, y_array, y0, r, y, ms, d2, 0, 0, 0, 0, 0, 0, 0);
  var e = $.shl(1, t5);
  var i = r.get$t();
  if (typeof i !== 'number')
    return this.divRemTo$3$bailout(17, q, e, i, nsh, ts, ys, y_array, y0, r, y, d1, ms, d2, 0, 0, 0, 0, 0, 0);
  var j = i - ys;
  t2 = q == null;
  var t = t2 ? $.BigInteger$(null, null, null) : q;
  y.dlShiftTo$2(j, t);
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.divRemTo$3$bailout(18, q, e, i, j, nsh, ts, t, ys, y_array, r_array, t2, y0, r, y, d1, ms, d2, 0, 0);
  t3 = $.compareTo(r, t);
  if (typeof t3 !== 'number')
    return this.divRemTo$3$bailout(19, q, e, i, j, nsh, ts, t, ys, y_array, r_array, t3, t2, y0, r, y, d1, ms, d2, 0);
  if (t3 >= 0) {
    t3 = r.get$t();
    if (typeof t3 !== 'number')
      return this.divRemTo$3$bailout(20, q, e, i, j, nsh, ts, t, ys, y_array, r_array, t2, y0, t3, y, r, d1, ms, d2, 0);
    r.set$t(t3 + 1);
    if (t3 !== (t3 | 0))
      throw $.iae(t3);
    if (t3 < 0 || t3 >= r_array.length)
      throw $.ioore(t3);
    r_array[t3] = 1;
    r.subTo$2(t, r);
  }
  $.BigInteger_ONE().dlShiftTo$2(ys, t);
  t.subTo$2(y, y);
  while (true) {
    t3 = y.t;
    if (typeof t3 !== 'number')
      return this.divRemTo$3$bailout(21, q, e, i, j, t3, nsh, ts, t, ys, y_array, r_array, t2, y0, r, y, d1, ms, d2, 0);
    if (!(t3 < ys))
      break;
    y.t = t3 + 1;
    y_array.operator$indexSet$2(t3, 0);
  }
  for (; --j, j >= 0;) {
    --i;
    if (i !== (i | 0))
      throw $.iae(i);
    t3 = r_array.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    t4 = r_array[i];
    if (typeof t4 !== 'number')
      return this.divRemTo$3$bailout(23, q, e, nsh, j, ts, t, ys, r_array, i, t4, t2, y0, r, d1, y, ms, d2, 0, 0);
    if (t4 === y0) {
      t3 = $.BigInteger_BI_DM;
      if (typeof t3 !== 'number')
        return this.divRemTo$3$bailout(24, q, e, nsh, j, ts, t, ys, r_array, i, t2, r, y0, y, t3, d1, ms, d2, 0, 0);
      var qd = t3;
    } else {
      t4 = r_array[i];
      if (typeof t4 !== 'number')
        return this.divRemTo$3$bailout(25, d2, q, e, nsh, j, ts, t, ys, r_array, i, t2, r, d1, y, y0, ms, t4, 0, 0);
      t4 *= d1;
      var t6 = i - 1;
      if (t6 !== (t6 | 0))
        throw $.iae(t6);
      if (t6 < 0 || t6 >= t3)
        throw $.ioore(t6);
      t6 = r_array[t6];
      if (typeof t6 !== 'number')
        return this.divRemTo$3$bailout(26, t4, e, q, t6, nsh, j, ts, t, ys, r_array, i, t2, r, y0, y, d1, ms, d2, 0);
      var t8 = $.floor(t4 + (t6 + e) * d2);
      if (typeof t8 !== 'number')
        return this.divRemTo$3$bailout(27, q, e, nsh, j, t8, ts, t, ys, r_array, i, t2, r, y0, y, d1, ms, d2, 0, 0);
      qd = t8;
    }
    t3 = y.am$6(0, qd, r, j, 0, ys);
    if (typeof t3 !== 'number')
      return this.divRemTo$3$bailout(28, q, e, nsh, j, qd, t, ys, r_array, t3, ts, i, t2, r, y0, y, d1, ms, d2, 0);
    if (i < 0 || i >= r_array.length)
      throw $.ioore(i);
    t5 = r_array[i];
    if (typeof t5 !== 'number')
      return this.divRemTo$3$bailout(29, q, e, nsh, j, qd, t, ys, r_array, t3, t5, ts, i, t2, r, y0, y, d1, ms, d2);
    t3 = t5 + t3;
    r_array[i] = t3;
    if (t3 < qd) {
      y.dlShiftTo$2(j, t);
      r.subTo$2(t, r);
      while (true) {
        if (i < 0 || i >= r_array.length)
          throw $.ioore(i);
        t3 = r_array[i];
        if (typeof t3 !== 'number')
          return this.divRemTo$3$bailout(30, qd, q, e, nsh, j, ts, t, ys, r_array, i, t2, t3, r, y0, y, d1, ms, d2, 0);
        --qd;
        if (!(t3 < qd))
          break;
        r.subTo$2(t, r);
      }
    }
  }
  if (!t2) {
    r.drShiftTo$2(ys, q);
    if (!(ts === ms))
      $.BigInteger_ZERO().subTo$2(q, q);
  }
  r.set$t(ys);
  r.clamp$0();
  if (t1)
    r.rShiftTo$2(nsh, r);
  if (ts < 0)
    $.BigInteger_ZERO().subTo$2(r, r);
},
 divRemTo$3$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15, env16, env17, env18) {
  switch (state) {
    case 1:
      var m = env0;
      var q = env1;
      var r = env2;
      t1 = env3;
      pm = env4;
      break;
    case 2:
      m = env0;
      q = env1;
      r = env2;
      t1 = env3;
      pt = env4;
      pm = env5;
      break;
    case 3:
      m = env0;
      q = env1;
      r = env2;
      t1 = env3;
      t3 = env4;
      pt = env5;
      pm = env6;
      break;
    case 4:
      m = env0;
      q = env1;
      pt = env2;
      pm = env3;
      r = env4;
      y = env5;
      ts = env6;
      break;
    case 5:
      q = env0;
      pt = env1;
      pm = env2;
      r = env3;
      y = env4;
      ms = env5;
      pm_array = env6;
      ts = env7;
      break;
    case 6:
      t3 = env0;
      q = env1;
      pm = env2;
      pt = env3;
      r = env4;
      y = env5;
      ms = env6;
      pm_array = env7;
      ts = env8;
      break;
    case 7:
      t3 = env0;
      q = env1;
      t5 = env2;
      pm = env3;
      pt = env4;
      r = env5;
      y = env6;
      ms = env7;
      pm_array = env8;
      ts = env9;
      break;
    case 8:
      q = env0;
      pt = env1;
      pm = env2;
      r = env3;
      y = env4;
      t7 = env5;
      ms = env6;
      ts = env7;
      t3 = env8;
      break;
    case 9:
      ys = env0;
      q = env1;
      nsh = env2;
      r = env3;
      y = env4;
      ms = env5;
      ts = env6;
      break;
    case 10:
      ys = env0;
      q = env1;
      y_array = env2;
      nsh = env3;
      y0 = env4;
      r = env5;
      y = env6;
      ms = env7;
      ts = env8;
      break;
    case 11:
      ys = env0;
      q = env1;
      y_array = env2;
      t1 = env3;
      nsh = env4;
      y0 = env5;
      r = env6;
      y = env7;
      ms = env8;
      ts = env9;
      break;
    case 12:
      ys = env0;
      q = env1;
      y_array = env2;
      t3 = env3;
      nsh = env4;
      y0 = env5;
      r = env6;
      y = env7;
      ms = env8;
      ts = env9;
      t1 = env10;
      break;
    case 13:
      q = env0;
      t3 = env1;
      nsh = env2;
      ts = env3;
      t1 = env4;
      ys = env5;
      y_array = env6;
      t4 = env7;
      y0 = env8;
      r = env9;
      y = env10;
      ms = env11;
      break;
    case 14:
      ys = env0;
      q = env1;
      y_array = env2;
      yt = env3;
      nsh = env4;
      t1 = env5;
      y0 = env6;
      y = env7;
      r = env8;
      ms = env9;
      ts = env10;
      break;
    case 15:
      q = env0;
      t1 = env1;
      nsh = env2;
      ts = env3;
      ys = env4;
      y_array = env5;
      yt = env6;
      y0 = env7;
      r = env8;
      y = env9;
      d1 = env10;
      ms = env11;
      break;
    case 16:
      d1 = env0;
      q = env1;
      t1 = env2;
      nsh = env3;
      ts = env4;
      ys = env5;
      y_array = env6;
      y0 = env7;
      r = env8;
      y = env9;
      ms = env10;
      d2 = env11;
      break;
    case 17:
      q = env0;
      e = env1;
      i = env2;
      nsh = env3;
      ts = env4;
      ys = env5;
      y_array = env6;
      y0 = env7;
      r = env8;
      y = env9;
      d1 = env10;
      ms = env11;
      d2 = env12;
      break;
    case 18:
      q = env0;
      e = env1;
      i = env2;
      j = env3;
      nsh = env4;
      ts = env5;
      t = env6;
      ys = env7;
      y_array = env8;
      r_array = env9;
      t1 = env10;
      y0 = env11;
      r = env12;
      y = env13;
      d1 = env14;
      ms = env15;
      d2 = env16;
      break;
    case 19:
      q = env0;
      e = env1;
      i = env2;
      j = env3;
      nsh = env4;
      ts = env5;
      t = env6;
      ys = env7;
      y_array = env8;
      r_array = env9;
      t2 = env10;
      t1 = env11;
      y0 = env12;
      r = env13;
      y = env14;
      d1 = env15;
      ms = env16;
      d2 = env17;
      break;
    case 20:
      q = env0;
      e = env1;
      i = env2;
      j = env3;
      nsh = env4;
      ts = env5;
      t = env6;
      ys = env7;
      y_array = env8;
      r_array = env9;
      t1 = env10;
      y0 = env11;
      t2 = env12;
      y = env13;
      r = env14;
      d1 = env15;
      ms = env16;
      d2 = env17;
      break;
    case 21:
      q = env0;
      e = env1;
      i = env2;
      j = env3;
      t2 = env4;
      nsh = env5;
      ts = env6;
      t = env7;
      ys = env8;
      y_array = env9;
      r_array = env10;
      t1 = env11;
      y0 = env12;
      r = env13;
      y = env14;
      d1 = env15;
      ms = env16;
      d2 = env17;
      break;
    case 22:
      q = env0;
      e = env1;
      i = env2;
      j = env3;
      t2 = env4;
      nsh = env5;
      ts = env6;
      t = env7;
      ys = env8;
      y_array = env9;
      r_array = env10;
      t1 = env11;
      y0 = env12;
      r = env13;
      y = env14;
      d1 = env15;
      ms = env16;
      d2 = env17;
      break;
    case 23:
      q = env0;
      e = env1;
      nsh = env2;
      j = env3;
      ts = env4;
      t = env5;
      ys = env6;
      r_array = env7;
      i = env8;
      t2 = env9;
      t1 = env10;
      y0 = env11;
      r = env12;
      d1 = env13;
      y = env14;
      ms = env15;
      d2 = env16;
      break;
    case 24:
      q = env0;
      e = env1;
      nsh = env2;
      j = env3;
      ts = env4;
      t = env5;
      ys = env6;
      r_array = env7;
      i = env8;
      t1 = env9;
      r = env10;
      y0 = env11;
      y = env12;
      t2 = env13;
      d1 = env14;
      ms = env15;
      d2 = env16;
      break;
    case 25:
      d2 = env0;
      q = env1;
      e = env2;
      nsh = env3;
      j = env4;
      ts = env5;
      t = env6;
      ys = env7;
      r_array = env8;
      i = env9;
      t1 = env10;
      r = env11;
      d1 = env12;
      y = env13;
      y0 = env14;
      ms = env15;
      t2 = env16;
      break;
    case 26:
      t2 = env0;
      e = env1;
      q = env2;
      t4 = env3;
      nsh = env4;
      j = env5;
      ts = env6;
      t = env7;
      ys = env8;
      r_array = env9;
      i = env10;
      t1 = env11;
      r = env12;
      y0 = env13;
      y = env14;
      d1 = env15;
      ms = env16;
      d2 = env17;
      break;
    case 27:
      q = env0;
      e = env1;
      nsh = env2;
      j = env3;
      t6 = env4;
      ts = env5;
      t = env6;
      ys = env7;
      r_array = env8;
      i = env9;
      t1 = env10;
      r = env11;
      y0 = env12;
      y = env13;
      d1 = env14;
      ms = env15;
      d2 = env16;
      break;
    case 28:
      q = env0;
      e = env1;
      nsh = env2;
      j = env3;
      qd = env4;
      t = env5;
      ys = env6;
      r_array = env7;
      t2 = env8;
      ts = env9;
      i = env10;
      t1 = env11;
      r = env12;
      y0 = env13;
      y = env14;
      d1 = env15;
      ms = env16;
      d2 = env17;
      break;
    case 29:
      q = env0;
      e = env1;
      nsh = env2;
      j = env3;
      qd = env4;
      t = env5;
      ys = env6;
      r_array = env7;
      t2 = env8;
      t4 = env9;
      ts = env10;
      i = env11;
      t1 = env12;
      r = env13;
      y0 = env14;
      y = env15;
      d1 = env16;
      ms = env17;
      d2 = env18;
      break;
    case 30:
      qd = env0;
      q = env1;
      e = env2;
      nsh = env3;
      j = env4;
      ts = env5;
      t = env6;
      ys = env7;
      r_array = env8;
      i = env9;
      t1 = env10;
      t2 = env11;
      r = env12;
      y0 = env13;
      y = env14;
      d1 = env15;
      ms = env16;
      d2 = env17;
      break;
  }
  switch (state) {
    case 0:
      var pm = $.abs(m);
      var t1 = pm.get$t();
    case 1:
      state = 0;
      if ($.leB(t1, 0))
        return;
      var pt = this.abs$0();
      t1 = pt.get$t();
    case 2:
      state = 0;
      var t3 = pm.get$t();
    case 3:
      state = 0;
      if ($.ltB(t1, t3)) {
        if (!(q == null))
          q.fromInt$1(0);
        if (!(r == null))
          this.copyTo$1(r);
        return;
      }
      if (r == null)
        r = $.BigInteger$(null, null, null);
      var y = $.BigInteger$(null, null, null);
      var ts = this.s;
    case 4:
      state = 0;
      var ms = m.get$s();
      var pm_array = pm.get$array();
    case 5:
      state = 0;
      t3 = $.BigInteger_BI_DB;
    case 6:
      state = 0;
      var t5 = pm.get$t();
    case 7:
      state = 0;
      var t7 = this.nbits$1($.index(pm_array, $.sub(t5, 1)));
    case 8:
      state = 0;
      var nsh = $.sub(t3, t7);
      if ($.gtB(nsh, 0)) {
        pm.lShiftTo$2(nsh, y);
        pt.lShiftTo$2(nsh, r);
      } else {
        pm.copyTo$1(y);
        pt.copyTo$1(r);
      }
      var ys = y.t;
    case 9:
      state = 0;
      var y_array = y.array;
      var y0 = $.index(y_array, $.sub(ys, 1));
    case 10:
      state = 0;
      if ($.eqB(y0, 0))
        return;
      t1 = $.BigInteger_BI_F1;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
    case 11:
      state = 0;
      t3 = $.mul(y0, $.shl(1, t1));
    default:
      if (state === 13 || state === 12 || state === 0 && $.gtB(ys, 1))
        switch (state) {
          case 0:
            t1 = $.index(y_array, $.sub(ys, 2));
          case 12:
            state = 0;
            var t4 = $.BigInteger_BI_F2;
          case 13:
            state = 0;
            t4 = $.shr(t1, t4);
            t1 = t4;
        }
      else
        t1 = 0;
      var yt = $.add(t3, t1);
      t1 = $.BigInteger_BI_FV;
    case 14:
      state = 0;
      var d1 = $.div(t1, yt);
      t1 = $.BigInteger_BI_F1;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
    case 15:
      state = 0;
      t1 = $.shl(1, t1);
      if (typeof yt !== 'number')
        throw $.iae(yt);
      var d2 = t1 / yt;
      t1 = $.BigInteger_BI_F2;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
    case 16:
      state = 0;
      var e = $.shl(1, t1);
      var i = r.get$t();
    case 17:
      state = 0;
      var j = $.sub(i, ys);
      t1 = q == null;
      var t = t1 ? $.BigInteger$(null, null, null) : q;
      y.dlShiftTo$2(j, t);
      var r_array = r.get$array();
    case 18:
      state = 0;
      var t2 = $.compareTo(r, t);
    case 19:
      state = 0;
    case 20:
      if (state === 20 || state === 0 && $.geB(t2, 0))
        switch (state) {
          case 0:
            t2 = r.get$t();
          case 20:
            state = 0;
            r.set$t($.add(t2, 1));
            $.indexSet(r_array, t2, 1);
            r.subTo$2(t, r);
        }
      $.BigInteger_ONE().dlShiftTo$2(ys, t);
      t.subTo$2(y, y);
    case 21:
    case 22:
      L0:
        while (true)
          switch (state) {
            case 0:
              t2 = y.t;
            case 21:
              state = 0;
              if (!$.ltB(t2, ys))
                break L0;
              t2 = y.t;
            case 22:
              state = 0;
              y.t = $.add(t2, 1);
              $.indexSet(y_array, t2, 0);
          }
    case 23:
    case 24:
    case 25:
    case 26:
    case 27:
    case 28:
    case 29:
    case 30:
      L1:
        while (true)
          switch (state) {
            case 0:
              j = $.sub(j, 1);
              if (!$.geB(j, 0))
                break L1;
              i = $.sub(i, 1);
              t2 = $.index(r_array, i);
            case 23:
              state = 0;
            default:
              if (state === 24 || state === 0 && $.eqB(t2, y0))
                switch (state) {
                  case 0:
                    t2 = $.BigInteger_BI_DM;
                  case 24:
                    state = 0;
                    var qd = t2;
                }
              else
                switch (state) {
                  case 0:
                    t2 = $.index(r_array, i);
                  case 25:
                    state = 0;
                    t2 = $.mul(t2, d1);
                    t4 = $.index(r_array, $.sub(i, 1));
                  case 26:
                    state = 0;
                    var t6 = $.floor($.add(t2, $.mul($.add(t4, e), d2)));
                  case 27:
                    state = 0;
                    qd = t6;
                }
              t2 = y.am$6(0, qd, r, j, 0, ys);
            case 28:
              state = 0;
              t4 = $.index(r_array, i);
            case 29:
              state = 0;
              t2 = $.add(t4, t2);
              $.indexSet(r_array, i, t2);
            case 30:
              if (state === 30 || state === 0 && $.ltB(t2, qd))
                switch (state) {
                  case 0:
                    y.dlShiftTo$2(j, t);
                    r.subTo$2(t, r);
                  case 30:
                    L2:
                      while (true)
                        switch (state) {
                          case 0:
                            t2 = $.index(r_array, i);
                          case 30:
                            state = 0;
                            qd = $.sub(qd, 1);
                            if (!$.ltB(t2, qd))
                              break L2;
                            r.subTo$2(t, r);
                        }
                }
          }
      if (!t1) {
        r.drShiftTo$2(ys, q);
        if (!$.eqB(ts, ms))
          $.BigInteger_ZERO().subTo$2(q, q);
      }
      r.set$t(ys);
      r.clamp$0();
      if ($.gtB(nsh, 0))
        r.rShiftTo$2(nsh, r);
      if ($.ltB(ts, 0))
        $.BigInteger_ZERO().subTo$2(r, r);
  }
},
 mod$1: function(a) {
  var r = $.BigInteger$(null, null, null);
  this.abs$0().divRemTo$3(a, null, r);
  if ($.ltB(this.s, 0) && $.gtB(r.compareTo$1($.BigInteger_ZERO()), 0))
    a.subTo$2(r, r);
  return r;
},
 intValue$0: function() {
  var this_array = this.array;
  var t1 = this.s;
  if (typeof t1 !== 'number')
    return this.intValue$0$bailout(1, this_array, t1, 0);
  if (t1 < 0) {
    t1 = this.t;
    if (typeof t1 !== 'number')
      return this.intValue$0$bailout(2, this_array, t1, 0);
    if (t1 === 1) {
      t1 = this_array.operator$index$1(0);
      if (typeof t1 !== 'number')
        return this.intValue$0$bailout(3, t1, 0, 0);
      var t3 = $.BigInteger_BI_DV;
      if (typeof t3 !== 'number')
        return this.intValue$0$bailout(4, t1, t3, 0);
      return t1 - t3;
    } else if (t1 === 0)
      return -1;
  } else {
    t1 = this.t;
    if (typeof t1 !== 'number')
      return this.intValue$0$bailout(6, t1, this_array, 0);
    if (t1 === 1)
      return this_array.operator$index$1(0);
    else if (t1 === 0)
      return 0;
  }
  t1 = this_array.operator$index$1(1);
  if (t1 !== (t1 | 0))
    return this.intValue$0$bailout(8, t1, this_array, 0);
  t3 = $.BigInteger_BI_DB;
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  if (t3 !== (t3 | 0))
    return this.intValue$0$bailout(9, t1, this_array, t3);
  t1 = (t1 & $.shl(1, 32 - t3) - 1) >>> 0;
  var t5 = $.BigInteger_BI_DB;
  if (t5 !== (t5 | 0))
    return this.intValue$0$bailout(10, t1, t5, this_array);
  t5 = $.shl(t1, t5);
  t1 = this_array.operator$index$1(0);
  if (t1 !== (t1 | 0))
    return this.intValue$0$bailout(11, t5, t1, 0);
  return (t5 | t1) >>> 0;
},
 intValue$0$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      this_array = env0;
      t1 = env1;
      break;
    case 2:
      this_array = env0;
      t1 = env1;
      break;
    case 3:
      t1 = env0;
      break;
    case 4:
      t1 = env0;
      t3 = env1;
      break;
    case 5:
      t1 = env0;
      this_array = env1;
      break;
    case 6:
      t1 = env0;
      this_array = env1;
      break;
    case 7:
      this_array = env0;
      t1 = env1;
      break;
    case 8:
      t1 = env0;
      this_array = env1;
      break;
    case 9:
      t1 = env0;
      this_array = env1;
      t3 = env2;
      break;
    case 10:
      t1 = env0;
      t5 = env1;
      this_array = env2;
      break;
    case 11:
      t5 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
      var this_array = this.array;
      var t1 = this.s;
    case 1:
      state = 0;
    default:
      if (state === 5 || state === 4 || state === 3 || state === 2 || state === 0 && $.ltB(t1, 0))
        switch (state) {
          case 0:
            t1 = this.t;
          case 2:
            state = 0;
          default:
            if (state === 4 || state === 3 || state === 0 && $.eqB(t1, 1))
              switch (state) {
                case 0:
                  t1 = $.index(this_array, 0);
                case 3:
                  state = 0;
                  var t3 = $.BigInteger_BI_DV;
                case 4:
                  state = 0;
                  return $.sub(t1, t3);
              }
            else
              switch (state) {
                case 0:
                  t1 = this.t;
                case 5:
                  state = 0;
                  if ($.eqB(t1, 0))
                    return -1;
              }
        }
      else
        switch (state) {
          case 0:
            t1 = this.t;
          case 6:
            state = 0;
          case 7:
            if (state === 0 && $.eqB(t1, 1))
              return $.index(this_array, 0);
            else
              switch (state) {
                case 0:
                  t1 = this.t;
                case 7:
                  state = 0;
                  if ($.eqB(t1, 0))
                    return 0;
              }
        }
      t1 = $.index(this_array, 1);
    case 8:
      state = 0;
      t3 = $.BigInteger_BI_DB;
      if (typeof t3 !== 'number')
        throw $.iae(t3);
    case 9:
      state = 0;
      t1 = $.and(t1, $.shl(1, 32 - t3) - 1);
      var t5 = $.BigInteger_BI_DB;
    case 10:
      state = 0;
      t5 = $.shl(t1, t5);
      t1 = $.index(this_array, 0);
    case 11:
      state = 0;
      return $.or(t5, t1);
  }
},
 chunkSize$1: function(r) {
  var t1 = $.BigInteger_BI_DB;
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  return $.toInt($.floor(0.6931471805599453 * t1 / $.log(r)));
},
 signum$0: function() {
  var this_array = this.array;
  var t1 = this.s;
  if (typeof t1 !== 'number')
    return this.signum$0$bailout(1, this_array, t1);
  if (t1 < 0)
    return -1;
  else {
    t1 = this.t;
    if (typeof t1 !== 'number')
      return this.signum$0$bailout(2, this_array, t1);
    if (!(t1 <= 0))
      if (t1 === 1) {
        t1 = this_array.operator$index$1(0);
        if (typeof t1 !== 'number')
          return this.signum$0$bailout(4, t1, 0);
        t1 = t1 <= 0;
      } else
        t1 = false;
    else
      t1 = true;
    if (t1)
      return 0;
    else
      return 1;
  }
},
 signum$0$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      this_array = env0;
      t1 = env1;
      break;
    case 2:
      this_array = env0;
      t1 = env1;
      break;
    case 3:
      this_array = env0;
      t1 = env1;
      break;
    case 4:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
      var this_array = this.array;
      var t1 = this.s;
    case 1:
      state = 0;
    default:
      if (state === 0 && $.ltB(t1, 0))
        return -1;
      else
        switch (state) {
          case 0:
            t1 = this.t;
          case 2:
            state = 0;
          default:
            if (state === 4 || state === 3 || state === 0 && !$.leB(t1, 0))
              switch (state) {
                case 0:
                  t1 = this.t;
                case 3:
                  state = 0;
                case 4:
                  if (state === 4 || state === 0 && $.eqB(t1, 1))
                    switch (state) {
                      case 0:
                        t1 = $.index(this_array, 0);
                      case 4:
                        state = 0;
                        t1 = $.leB(t1, 0);
                    }
                  else
                    t1 = false;
              }
            else
              t1 = true;
            if (t1)
              return 0;
            else
              return 1;
        }
  }
},
 toRadix$1: function(b) {
  if (typeof b !== 'number')
    return this.toRadix$1$bailout(1, b);
  if ($.eqB(this.signum$0(), 0) || b < 2 || b > 36)
    return '0';
  var a = $.pow(b, this.chunkSize$1(b));
  var r = $.BigInteger$(null, null, null);
  r.fromInt$1(a);
  var y = $.BigInteger$(null, null, null);
  var z = $.BigInteger$(null, null, null);
  this.divRemTo$3(r, y, z);
  for (var r0 = ''; $.gtB(y.signum$0(), 0);) {
    var t1 = z.intValue$0();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    var r1 = $.S($.substring$1($.toRadixString(a + t1, b), 1)) + r0;
    y.divRemTo$3(r, y, z);
    r0 = r1;
  }
  return $.S($.toRadixString(z.intValue$0(), b)) + r0;
},
 toRadix$1$bailout: function(state, b) {
  if (b == null)
    b = 10;
  if ($.eqB(this.signum$0(), 0) || $.ltB(b, 2) || $.gtB(b, 36))
    return '0';
  var a = $.pow(b, this.chunkSize$1(b));
  var r = $.BigInteger$(null, null, null);
  r.fromInt$1(a);
  var y = $.BigInteger$(null, null, null);
  var z = $.BigInteger$(null, null, null);
  this.divRemTo$3(r, y, z);
  for (var r0 = ''; $.gtB(y.signum$0(), 0);) {
    var t1 = z.intValue$0();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    var r1 = $.S($.substring$1($.toRadixString(a + t1, b), 1)) + r0;
    y.divRemTo$3(r, y, z);
    r0 = r1;
  }
  return $.S($.toRadixString(z.intValue$0(), b)) + r0;
},
 fromRadix$2: function(s, b) {
  if (b !== (b | 0))
    return this.fromRadix$2$bailout(1, s, b, 0);
  this.fromInt$1(0);
  var cs = this.chunkSize$1(b);
  if (typeof cs !== 'number')
    return this.fromRadix$2$bailout(2, s, cs, b);
  var d = $.pow(b, cs);
  for (var w = 0, mi = false, j = 0, i = 0; $.ltB(i, $.get$length(s)); ++i) {
    var x = this._intAt$2(s, i);
    if ($.ltB(x, 0)) {
      if (typeof s === 'string') {
        if (0 >= s.length)
          throw $.ioore(0);
        if ($.eqB(s[0], '-') && $.eqB(this.signum$0(), 0))
          mi = true;
      }
      continue;
    }
    var t1 = b * w;
    if (typeof x !== 'number')
      throw $.iae(x);
    w = t1 + x;
    ++j;
    if (j >= cs) {
      this.dMultiply$1(d);
      this.dAddOffset$2(w, 0);
      w = 0;
      j = 0;
    }
  }
  if (j > 0) {
    this.dMultiply$1($.pow(b, j));
    this.dAddOffset$2(w, 0);
  }
  if (mi)
    $.BigInteger_ZERO().subTo$2(this, this);
},
 fromRadix$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var s = env0;
      var b = env1;
      break;
    case 2:
      s = env0;
      cs = env1;
      b = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      this.fromInt$1(0);
      if (b == null)
        b = 10;
      var cs = this.chunkSize$1(b);
    case 2:
      state = 0;
      var d = $.pow(b, cs);
      for (var w = 0, mi = false, j = 0, i = 0; $.ltB(i, $.get$length(s)); ++i) {
        var x = this._intAt$2(s, i);
        if ($.ltB(x, 0)) {
          if (typeof s === 'string') {
            if (0 >= s.length)
              throw $.ioore(0);
            if ($.eqB(s[0], '-') && $.eqB(this.signum$0(), 0))
              mi = true;
          }
          continue;
        }
        var w0 = $.add($.mul(b, w), x);
        ++j;
        if ($.geB(j, cs)) {
          this.dMultiply$1(d);
          this.dAddOffset$2(w0, 0);
          w = 0;
          j = 0;
        } else
          w = w0;
      }
      if (j > 0) {
        this.dMultiply$1($.pow(b, j));
        this.dAddOffset$2(w, 0);
      }
      if (mi)
        $.BigInteger_ZERO().subTo$2(this, this);
  }
},
 bitwiseTo$3: function(a, op, r) {
  var this_array = this.array;
  var a_array = a.get$array();
  if (typeof a_array !== 'string' && (typeof a_array !== 'object' || a_array === null || a_array.constructor !== Array && !a_array.is$JavaScriptIndexingBehavior()))
    return this.bitwiseTo$3$bailout(1, this_array, op, r, a, a_array, 0, 0);
  var r_array = r.array;
  var m = $.min(a.get$t(), this.t);
  for (var i = 0; i < m; ++i) {
    var t1 = this_array.operator$index$1(i);
    if (i < 0 || i >= a_array.length)
      throw $.ioore(i);
    r_array.operator$indexSet$2(i, op.call$2(t1, a_array[i]));
  }
  if ($.ltB(a.get$t(), this.t)) {
    var f = $.and(a.get$s(), $.BigInteger_BI_DM);
    if (f !== (f | 0))
      return this.bitwiseTo$3$bailout(2, this_array, r_array, op, a, r, f, m);
    for (i = m; $.ltB(i, this.t); ++i)
      r_array.operator$indexSet$2(i, op.call$2(this_array.operator$index$1(i), f));
    r.t = this.t;
  } else {
    f = $.and(this.s, $.BigInteger_BI_DM);
    if (f !== (f | 0))
      return this.bitwiseTo$3$bailout(3, a, r_array, op, r, a_array, m, f);
    for (i = m; $.ltB(i, a.get$t()); ++i) {
      if (i !== (i | 0))
        throw $.iae(i);
      if (i < 0 || i >= a_array.length)
        throw $.ioore(i);
      r_array.operator$indexSet$2(i, op.call$2(f, a_array[i]));
    }
    r.t = a.get$t();
  }
  r.s = op.call$2(this.s, a.get$s());
  r.clamp$0();
},
 bitwiseTo$3$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      this_array = env0;
      var op = env1;
      var r = env2;
      var a = env3;
      a_array = env4;
      break;
    case 2:
      this_array = env0;
      r_array = env1;
      op = env2;
      a = env3;
      r = env4;
      f = env5;
      m = env6;
      break;
    case 3:
      a = env0;
      r_array = env1;
      op = env2;
      r = env3;
      a_array = env4;
      m = env5;
      f = env6;
      break;
  }
  switch (state) {
    case 0:
      var this_array = this.array;
      var a_array = a.get$array();
    case 1:
      state = 0;
      var r_array = r.array;
      var m = $.min(a.get$t(), this.t);
      for (var i = 0; i < m; ++i)
        $.indexSet(r_array, i, op.call$2($.index(this_array, i), $.index(a_array, i)));
    default:
      if (state === 2 || state === 0 && $.ltB(a.get$t(), this.t))
        switch (state) {
          case 0:
            var f = $.and(a.get$s(), $.BigInteger_BI_DM);
          case 2:
            state = 0;
            for (i = m; $.ltB(i, this.t); ++i)
              $.indexSet(r_array, i, op.call$2($.index(this_array, i), f));
            r.t = this.t;
        }
      else
        switch (state) {
          case 0:
            f = $.and(this.s, $.BigInteger_BI_DM);
          case 3:
            state = 0;
            for (i = m; $.ltB(i, a.get$t()); ++i)
              $.indexSet(r_array, i, op.call$2(f, $.index(a_array, i)));
            r.t = a.get$t();
        }
      r.s = op.call$2(this.s, a.get$s());
      r.clamp$0();
  }
},
 op_and$2: function(x, y) {
  return $.and(x, y);
},
 get$op_and: function() { return new $.BoundClosure1(this, 'op_and$2'); },
 and$1: function(a) {
  var r = $.BigInteger$(null, null, null);
  this.bitwiseTo$3(a, this.get$op_and(), r);
  return r;
},
 op_or$2: function(x, y) {
  return $.or(x, y);
},
 get$op_or: function() { return new $.BoundClosure1(this, 'op_or$2'); },
 or$1: function(a) {
  var r = $.BigInteger$(null, null, null);
  this.bitwiseTo$3(a, this.get$op_or(), r);
  return r;
},
 shiftLeft$1: function(n) {
  var r = $.BigInteger$(null, null, null);
  if ($.ltB(n, 0))
    this.rShiftTo$2($.neg(n), r);
  else
    this.lShiftTo$2(n, r);
  return r;
},
 shiftRight$1: function(n) {
  var r = $.BigInteger$(null, null, null);
  if ($.ltB(n, 0))
    this.lShiftTo$2($.neg(n), r);
  else
    this.rShiftTo$2(n, r);
  return r;
},
 addTo$2: function(a, r) {
  var this_array = this.array;
  var a_array = a.get$array();
  if (typeof a_array !== 'string' && (typeof a_array !== 'object' || a_array === null || a_array.constructor !== Array && !a_array.is$JavaScriptIndexingBehavior()))
    return this.addTo$2$bailout(1, a, r, a_array, this_array, 0, 0);
  var r_array = r.array;
  var m = $.min(a.get$t(), this.t);
  for (var c = 0, i = 0; i < m;) {
    var t1 = this_array.operator$index$1(i);
    if (i < 0 || i >= a_array.length)
      throw $.ioore(i);
    t1 = $.add(t1, a_array[i]);
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    c += t1;
    var i0 = i + 1;
    t1 = $.BigInteger_BI_DM;
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    r_array.operator$indexSet$2(i, (c & t1) >>> 0);
    var t2 = $.BigInteger_BI_DB;
    if (typeof t2 !== 'number')
      throw $.iae(t2);
    c = $.shr(c, t2);
    i = i0;
  }
  if ($.ltB(a.get$t(), this.t)) {
    t1 = a.get$s();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    c += t1;
    if (c !== (c | 0))
      return this.addTo$2$bailout(2, c, r, i, this_array, r_array, 0);
    for (; $.ltB(i, this.t);) {
      t1 = this_array.operator$index$1(i);
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      c += t1;
      i0 = i + 1;
      t1 = $.BigInteger_BI_DM;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      r_array.operator$indexSet$2(i, (c & t1) >>> 0);
      t2 = $.BigInteger_BI_DB;
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      c = $.shr(c, t2);
      i = i0;
    }
    t1 = this.s;
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    c += t1;
  } else {
    t1 = this.s;
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    c += t1;
    if (c !== (c | 0))
      return this.addTo$2$bailout(3, a, r, a_array, i, c, r_array);
    for (; $.ltB(i, a.get$t());) {
      if (i < 0 || i >= a_array.length)
        throw $.ioore(i);
      t1 = a_array[i];
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      c += t1;
      i0 = i + 1;
      t1 = $.BigInteger_BI_DM;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      r_array.operator$indexSet$2(i, (c & t1) >>> 0);
      t2 = $.BigInteger_BI_DB;
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      c = $.shr(c, t2);
      i = i0;
    }
    t1 = a.get$s();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    c += t1;
  }
  r.s = c < 0 ? -1 : 0;
  if (c > 0) {
    i0 = i + 1;
    r_array.operator$indexSet$2(i, c);
    i = i0;
  } else if (c < -1) {
    i0 = i + 1;
    r_array.operator$indexSet$2(i, $.add($.BigInteger_BI_DV, c));
    i = i0;
  }
  r.t = i;
  r.clamp$0();
},
 addTo$2$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var a = env0;
      var r = env1;
      a_array = env2;
      this_array = env3;
      break;
    case 2:
      c = env0;
      r = env1;
      i = env2;
      this_array = env3;
      r_array = env4;
      break;
    case 3:
      a = env0;
      r = env1;
      a_array = env2;
      i = env3;
      c = env4;
      r_array = env5;
      break;
  }
  switch (state) {
    case 0:
      var this_array = this.array;
      var a_array = a.get$array();
    case 1:
      state = 0;
      var r_array = r.array;
      var m = $.min(a.get$t(), this.t);
      for (var c = 0, i = 0; i < m;) {
        var t1 = $.add($.index(this_array, i), $.index(a_array, i));
        if (typeof t1 !== 'number')
          throw $.iae(t1);
        c += t1;
        var i0 = i + 1;
        t1 = $.BigInteger_BI_DM;
        if (typeof t1 !== 'number')
          throw $.iae(t1);
        $.indexSet(r_array, i, (c & t1) >>> 0);
        var t2 = $.BigInteger_BI_DB;
        if (typeof t2 !== 'number')
          throw $.iae(t2);
        c = $.shr(c, t2);
        i = i0;
      }
    default:
      if (state === 2 || state === 0 && $.ltB(a.get$t(), this.t))
        switch (state) {
          case 0:
            t1 = a.get$s();
            if (typeof t1 !== 'number')
              throw $.iae(t1);
            c += t1;
          case 2:
            state = 0;
            for (; $.ltB(i, this.t);) {
              t1 = $.index(this_array, i);
              if (typeof t1 !== 'number')
                throw $.iae(t1);
              c += t1;
              i0 = i + 1;
              t1 = $.BigInteger_BI_DM;
              if (typeof t1 !== 'number')
                throw $.iae(t1);
              $.indexSet(r_array, i, (c & t1) >>> 0);
              t2 = $.BigInteger_BI_DB;
              if (typeof t2 !== 'number')
                throw $.iae(t2);
              c = $.shr(c, t2);
              i = i0;
            }
            t1 = this.s;
            if (typeof t1 !== 'number')
              throw $.iae(t1);
            c += t1;
        }
      else
        switch (state) {
          case 0:
            t1 = this.s;
            if (typeof t1 !== 'number')
              throw $.iae(t1);
            c += t1;
          case 3:
            state = 0;
            for (; $.ltB(i, a.get$t());) {
              t1 = $.index(a_array, i);
              if (typeof t1 !== 'number')
                throw $.iae(t1);
              c += t1;
              i0 = i + 1;
              t1 = $.BigInteger_BI_DM;
              if (typeof t1 !== 'number')
                throw $.iae(t1);
              $.indexSet(r_array, i, (c & t1) >>> 0);
              t2 = $.BigInteger_BI_DB;
              if (typeof t2 !== 'number')
                throw $.iae(t2);
              c = $.shr(c, t2);
              i = i0;
            }
            t1 = a.get$s();
            if (typeof t1 !== 'number')
              throw $.iae(t1);
            c += t1;
        }
      r.s = c < 0 ? -1 : 0;
      if (c > 0) {
        i0 = i + 1;
        $.indexSet(r_array, i, c);
        i = i0;
      } else if (c < -1) {
        i0 = i + 1;
        $.indexSet(r_array, i, $.add($.BigInteger_BI_DV, c));
        i = i0;
      }
      r.t = i;
      r.clamp$0();
  }
},
 add$1: function(a) {
  var r = $.BigInteger$(null, null, null);
  this.addTo$2(a, r);
  return r;
},
 subtract$1: function(a) {
  var r = $.BigInteger$(null, null, null);
  this.subTo$2(a, r);
  return r;
},
 multiply$1: function(a) {
  var r = $.BigInteger$(null, null, null);
  this.multiplyTo$2(a, r);
  return r;
},
 divide$1: function(a) {
  var r = $.BigInteger$(null, null, null);
  this.divRemTo$3(a, r, null);
  return r;
},
 remainder$1: function(a) {
  var r = $.BigInteger$(null, null, null);
  this.divRemTo$3(a, null, r);
  return r;
},
 dMultiply$1: function(n) {
  if (typeof n !== 'number')
    return this.dMultiply$1$bailout(1, n);
  var this_array = this.array;
  var t1 = this.t;
  this_array.operator$indexSet$2(t1, this.am$6(0, n - 1, this, 0, 0, t1));
  t1 = this.t;
  if (typeof t1 !== 'number')
    return this.dMultiply$1$bailout(2, t1);
  this.t = t1 + 1;
  this.clamp$0();
},
 dMultiply$1$bailout: function(state, env0) {
  switch (state) {
    case 1:
      var n = env0;
      break;
    case 2:
      t1 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.indexSet(this.array, this.t, this.am$6(0, $.sub(n, 1), this, 0, 0, this.t));
      var t1 = this.t;
    case 2:
      state = 0;
      this.t = $.add(t1, 1);
      this.clamp$0();
  }
},
 dAddOffset$2: function(n, w) {
  if (typeof n !== 'number')
    return this.dAddOffset$2$bailout(1, n, w, 0, 0);
  var this_array = this.array;
  while (true) {
    var t1 = this.t;
    if (typeof t1 !== 'number')
      return this.dAddOffset$2$bailout(2, this_array, w, t1, n);
    if (!(t1 <= w))
      break;
    this.t = t1 + 1;
    this_array.operator$indexSet$2(t1, 0);
  }
  t1 = this_array.operator$index$1(w);
  if (typeof t1 !== 'number')
    return this.dAddOffset$2$bailout(4, this_array, w, t1, n);
  this_array.operator$indexSet$2(w, t1 + n);
  while (true) {
    t1 = this_array.operator$index$1(w);
    if (typeof t1 !== 'number')
      return this.dAddOffset$2$bailout(5, this_array, t1, w, 0);
    var t3 = $.BigInteger_BI_DV;
    if (typeof t3 !== 'number')
      return this.dAddOffset$2$bailout(6, this_array, t1, t3, w);
    if (!(t1 >= t3))
      break;
    t1 = $.BigInteger_BI_DV;
    if (typeof t1 !== 'number')
      return this.dAddOffset$2$bailout(7, this_array, t1, w, 0);
    t3 = this_array.operator$index$1(w);
    if (typeof t3 !== 'number')
      return this.dAddOffset$2$bailout(8, this_array, w, t1, t3);
    this_array.operator$indexSet$2(w, t3 - t1);
    ++w;
    t1 = this.t;
    if (typeof t1 !== 'number')
      return this.dAddOffset$2$bailout(9, this_array, w, t1, 0);
    if (w >= t1) {
      this.t = t1 + 1;
      this_array.operator$indexSet$2(t1, 0);
    }
    t1 = this_array.operator$index$1(w);
    if (typeof t1 !== 'number')
      return this.dAddOffset$2$bailout(11, this_array, w, t1, 0);
    this_array.operator$indexSet$2(w, t1 + 1);
  }
},
 dAddOffset$2$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var n = env0;
      var w = env1;
      break;
    case 2:
      this_array = env0;
      w = env1;
      t1 = env2;
      n = env3;
      break;
    case 3:
      this_array = env0;
      w = env1;
      t1 = env2;
      n = env3;
      break;
    case 4:
      this_array = env0;
      w = env1;
      t1 = env2;
      n = env3;
      break;
    case 5:
      this_array = env0;
      t1 = env1;
      w = env2;
      break;
    case 6:
      this_array = env0;
      t1 = env1;
      t3 = env2;
      w = env3;
      break;
    case 7:
      this_array = env0;
      t1 = env1;
      w = env2;
      break;
    case 8:
      this_array = env0;
      w = env1;
      t1 = env2;
      t3 = env3;
      break;
    case 9:
      this_array = env0;
      w = env1;
      t1 = env2;
      break;
    case 10:
      this_array = env0;
      t1 = env1;
      w = env2;
      break;
    case 11:
      this_array = env0;
      w = env1;
      t1 = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var this_array = this.array;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              var t1 = this.t;
            case 2:
              state = 0;
              if (!$.leB(t1, w))
                break L0;
              t1 = this.t;
            case 3:
              state = 0;
              this.t = $.add(t1, 1);
              $.indexSet(this_array, t1, 0);
          }
      t1 = $.index(this_array, w);
    case 4:
      state = 0;
      $.indexSet(this_array, w, $.add(t1, n));
    case 5:
    case 6:
    case 7:
    case 8:
    case 9:
    case 10:
    case 11:
      L1:
        while (true)
          switch (state) {
            case 0:
              t1 = $.index(this_array, w);
            case 5:
              state = 0;
              var t3 = $.BigInteger_BI_DV;
            case 6:
              state = 0;
              if (!$.geB(t1, t3))
                break L1;
              t1 = $.BigInteger_BI_DV;
            case 7:
              state = 0;
              t3 = $.index(this_array, w);
            case 8:
              state = 0;
              $.indexSet(this_array, w, $.sub(t3, t1));
              ++w;
              t1 = this.t;
            case 9:
              state = 0;
            case 10:
              if (state === 10 || state === 0 && $.geB(w, t1))
                switch (state) {
                  case 0:
                    t1 = this.t;
                  case 10:
                    state = 0;
                    this.t = $.add(t1, 1);
                    $.indexSet(this_array, t1, 0);
                }
              t1 = $.index(this_array, w);
            case 11:
              state = 0;
              $.indexSet(this_array, w, $.add(t1, 1));
          }
  }
},
 operator$add$1: function(other) {
  return this.add$1(other);
},
 operator$sub$1: function(other) {
  return this.subtract$1(other);
},
 operator$mul$1: function(other) {
  return this.multiply$1(other);
},
 operator$mod$1: function(other) {
  return this.remainder$1(other);
},
 operator$div$1: function(other) {
  return this.divide$1(other);
},
 operator$tdiv$1: function(other) {
  throw $.captureStackTrace('Not Implemented');
},
 operator$negate$0: function() {
  return this.negate$0();
},
 operator$lt$1: function(other) {
  return $.ltB(this.compareTo$1(other), 0) && true;
},
 operator$le$1: function(other) {
  return $.leB(this.compareTo$1(other), 0) && true;
},
 operator$gt$1: function(other) {
  return $.gtB(this.compareTo$1(other), 0) && true;
},
 operator$ge$1: function(other) {
  return $.geB(this.compareTo$1(other), 0) && true;
},
 operator$eq$1: function(other) {
  return $.eqB(this.compareTo$1(other), 0) && true;
},
 operator$and$1: function(other) {
  return this.and$1(other);
},
 operator$or$1: function(other) {
  return this.or$1(other);
},
 operator$shl$1: function(shiftAmount) {
  return this.shiftLeft$1(shiftAmount);
},
 operator$shr$1: function(shiftAmount) {
  return this.shiftRight$1(shiftAmount);
},
 BigInteger$3: function(a, b, c) {
  this._lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509];
  this.BI_RC = $.HashMapImplementation$();
  this._j_lm = (this.canary & 16777215) === 15715070;
  this._setupDigitConversions$0();
  var t1 = this._lowprimes;
  var t2 = t1.length - 1;
  if (t2 < 0 || t2 >= t1.length)
    throw $.ioore(t2);
  t2 = t1[t2];
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  this._lplim = $.tdiv(67108864, t2);
  this._setupEngine$2(this.get$_am3(), 28);
  this.array = $.HashMapImplementation$();
  if (!(a == null))
    if (typeof a === 'number' && a === (a | 0))
      this.fromString$2($.toString(a), 10);
    else if (typeof a === 'number' || typeof a === 'number')
      this.fromString$2($.toString($.toInt(a)), 10);
    else if (b == null && !(typeof a === 'string'))
      this.fromString$2(a, 256);
    else
      this.fromString$2(a, b);
}
};

$$._convertDartToNative_PrepareForStructuredClone_findSlot = {"":
 ["copies_3", "values_2"],
 super: "Closure",
 call$1: function(value) {
  var length$ = $.get$length(this.values_2);
  if (typeof length$ !== 'number')
    return this.call$1$bailout(1, value, length$);
  for (var i = 0; i < length$; ++i) {
    var t1 = $.index(this.values_2, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_2, value);
  $.add$1(this.copies_3, null);
  return length$;
},
 call$1$bailout: function(state, value, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var t1 = $.index(this.values_2, i);
    if (t1 == null ? value == null : t1 === value)
      return i;
  }
  $.add$1(this.values_2, value);
  $.add$1(this.copies_3, null);
  return length$;
}
};

$$._convertDartToNative_PrepareForStructuredClone_readSlot = {"":
 ["copies_4"],
 super: "Closure",
 call$1: function(i) {
  return $.index(this.copies_4, i);
}
};

$$._convertDartToNative_PrepareForStructuredClone_writeSlot = {"":
 ["copies_5"],
 super: "Closure",
 call$2: function(i, x) {
  $.indexSet(this.copies_5, i, x);
}
};

$$._convertDartToNative_PrepareForStructuredClone_cleanupSlots = {"":
 [],
 super: "Closure",
 call$0: function() {
}
};

$$._convertDartToNative_PrepareForStructuredClone_walk = {"":
 ["writeSlot_8", "findSlot_7", "readSlot_6"],
 super: "Closure",
 call$1: function(e) {
  var t1 = {};
  if (e == null)
    return e;
  if (typeof e === 'boolean')
    return e;
  if (typeof e === 'number')
    return e;
  if (typeof e === 'string')
    return e;
  if (typeof e === 'object' && e !== null && !!e.is$Date)
    throw $.captureStackTrace($.CTC3);
  if (typeof e === 'object' && e !== null && !!e.is$RegExp)
    throw $.captureStackTrace($.CTC4);
  if (typeof e === 'object' && e !== null && e.is$_FileImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$File())
    throw $.captureStackTrace($.CTC5);
  if (typeof e === 'object' && e !== null && e.is$_BlobImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$Blob())
    throw $.captureStackTrace($.CTC6);
  if (typeof e === 'object' && e !== null && e.is$_FileListImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$FileList())
    throw $.captureStackTrace($.CTC7);
  if (typeof e === 'object' && e !== null && e.is$_ImageDataImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ImageData())
    throw $.captureStackTrace($.CTC7);
  if (typeof e === 'object' && e !== null && e.is$_ArrayBufferImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ArrayBuffer())
    throw $.captureStackTrace($.CTC8);
  if (typeof e === 'object' && e !== null && e.is$_ArrayBufferViewImpl())
    return e;
  if (typeof e === 'object' && e !== null && e.is$ArrayBufferView())
    throw $.captureStackTrace($.CTC9);
  if (typeof e === 'object' && e !== null && e.is$Map()) {
    var slot = this.findSlot_7.call$1(e);
    t1.copy_1 = this.readSlot_6.call$1(slot);
    var t2 = t1.copy_1;
    if (!(t2 == null))
      return t2;
    t1.copy_1 = {};
    this.writeSlot_8.call$2(slot, t1.copy_1);
    e.forEach$1(new $._convertDartToNative_PrepareForStructuredClone_walk_anon(this, t1));
    return t1.copy_1;
  }
  if (typeof e === 'object' && e !== null && (e.constructor === Array || e.is$List())) {
    if (typeof e !== 'object' || e === null || (e.constructor !== Array || !!e.immutable$list) && !e.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(1, e, 0, 0, 0, 0, 0);
    var length$ = e.length;
    slot = this.findSlot_7.call$1(e);
    var copy = this.readSlot_6.call$1(slot);
    if (!(copy == null)) {
      if (true === copy) {
        copy = new Array(length$);
        this.writeSlot_8.call$2(slot, copy);
      }
      return copy;
    }
    if (e instanceof Array && !!!(e.immutable$list)) {
      this.writeSlot_8.call$2(slot, true);
      for (var i = 0; i < length$; ++i) {
        if (i < 0 || i >= e.length)
          throw $.ioore(i);
        var element = e[i];
        var elementCopy = this.call$1(element);
        if (!(elementCopy == null ? element == null : elementCopy === element)) {
          copy = this.readSlot_6.call$1(slot);
          if (true === copy) {
            copy = new Array(length$);
            this.writeSlot_8.call$2(slot, copy);
          }
          if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
            return this.call$1$bailout(2, copy, i, e, length$, elementCopy, slot);
          for (var j = 0; j < i; ++j) {
            if (j < 0 || j >= e.length)
              throw $.ioore(j);
            t1 = e[j];
            if (j < 0 || j >= copy.length)
              throw $.ioore(j);
            copy[j] = t1;
          }
          if (i < 0 || i >= copy.length)
            throw $.ioore(i);
          copy[i] = elementCopy;
          ++i;
          break;
        }
      }
      if (copy == null) {
        this.writeSlot_8.call$2(slot, e);
        copy = e;
      }
    } else {
      copy = new Array(length$);
      this.writeSlot_8.call$2(slot, copy);
      i = 0;
    }
    if (typeof copy !== 'object' || copy === null || (copy.constructor !== Array || !!copy.immutable$list) && !copy.is$JavaScriptIndexingBehavior())
      return this.call$1$bailout(3, e, copy, length$, i, 0, 0);
    for (; i < length$; ++i) {
      if (i < 0 || i >= e.length)
        throw $.ioore(i);
      t1 = this.call$1(e[i]);
      if (i < 0 || i >= copy.length)
        throw $.ioore(i);
      copy[i] = t1;
    }
    return copy;
  }
  throw $.captureStackTrace($.CTC10);
},
 call$1$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var e = env0;
      break;
    case 2:
      copy = env0;
      i = env1;
      e = env2;
      length$ = env3;
      elementCopy = env4;
      slot = env5;
      break;
    case 3:
      e = env0;
      copy = env1;
      length$ = env2;
      i = env3;
      break;
  }
  switch (state) {
    case 0:
      var t1 = {};
      if (e == null)
        return e;
      if (typeof e === 'boolean')
        return e;
      if (typeof e === 'number')
        return e;
      if (typeof e === 'string')
        return e;
      if (typeof e === 'object' && e !== null && !!e.is$Date)
        throw $.captureStackTrace($.CTC3);
      if (typeof e === 'object' && e !== null && !!e.is$RegExp)
        throw $.captureStackTrace($.CTC4);
      if (typeof e === 'object' && e !== null && e.is$_FileImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$File())
        throw $.captureStackTrace($.CTC5);
      if (typeof e === 'object' && e !== null && e.is$_BlobImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$Blob())
        throw $.captureStackTrace($.CTC6);
      if (typeof e === 'object' && e !== null && e.is$_FileListImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$FileList())
        throw $.captureStackTrace($.CTC7);
      if (typeof e === 'object' && e !== null && e.is$_ImageDataImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ImageData())
        throw $.captureStackTrace($.CTC7);
      if (typeof e === 'object' && e !== null && e.is$_ArrayBufferImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ArrayBuffer())
        throw $.captureStackTrace($.CTC8);
      if (typeof e === 'object' && e !== null && e.is$_ArrayBufferViewImpl())
        return e;
      if (typeof e === 'object' && e !== null && e.is$ArrayBufferView())
        throw $.captureStackTrace($.CTC9);
      if (typeof e === 'object' && e !== null && e.is$Map()) {
        var slot = this.findSlot_7.call$1(e);
        t1.copy_1 = this.readSlot_6.call$1(slot);
        var t2 = t1.copy_1;
        if (!(t2 == null))
          return t2;
        t1.copy_1 = {};
        this.writeSlot_8.call$2(slot, t1.copy_1);
        e.forEach$1(new $._convertDartToNative_PrepareForStructuredClone_walk_anon(this, t1));
        return t1.copy_1;
      }
    default:
      if (state === 3 || state === 2 || state === 1 || state === 0 && typeof e === 'object' && e !== null && (e.constructor === Array || e.is$List()))
        switch (state) {
          case 0:
          case 1:
            state = 0;
            var length$ = $.get$length(e);
            slot = this.findSlot_7.call$1(e);
            var copy = this.readSlot_6.call$1(slot);
            if (!(copy == null)) {
              if (true === copy) {
                copy = new Array(length$);
                this.writeSlot_8.call$2(slot, copy);
              }
              return copy;
            }
          case 2:
            if (state === 2 || state === 0 && e instanceof Array && !!!(e.immutable$list))
              switch (state) {
                case 0:
                  this.writeSlot_8.call$2(slot, true);
                  var i = 0;
                case 2:
                  L0:
                    while (true)
                      switch (state) {
                        case 0:
                          if (!$.ltB(i, length$))
                            break L0;
                          var element = $.index(e, i);
                          var elementCopy = this.call$1(element);
                        case 2:
                          if (state === 2 || state === 0 && !(elementCopy == null ? element == null : elementCopy === element))
                            switch (state) {
                              case 0:
                                copy = this.readSlot_6.call$1(slot);
                                if (true === copy) {
                                  copy = new Array(length$);
                                  this.writeSlot_8.call$2(slot, copy);
                                }
                              case 2:
                                state = 0;
                                for (var j = 0; j < i; ++j)
                                  $.indexSet(copy, j, $.index(e, j));
                                $.indexSet(copy, i, elementCopy);
                                ++i;
                                break L0;
                            }
                          ++i;
                      }
                  if (copy == null) {
                    this.writeSlot_8.call$2(slot, e);
                    copy = e;
                  }
              }
            else {
              copy = new Array(length$);
              this.writeSlot_8.call$2(slot, copy);
              i = 0;
            }
          case 3:
            state = 0;
            for (; $.ltB(i, length$); ++i)
              $.indexSet(copy, i, this.call$1($.index(e, i)));
            return copy;
        }
      throw $.captureStackTrace($.CTC10);
  }
}
};

$$._convertDartToNative_PrepareForStructuredClone_walk_anon = {"":
 ["walk_9", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  this.box_0.copy_1[key] = this.walk_9.call$1(value);
}
};

$$.Maps__emitMap_anon = {"":
 ["result_3", "box_0", "visiting_2"],
 super: "Closure",
 call$2: function(k, v) {
  if (this.box_0.first_1 !== true)
    $.add$1(this.result_3, ', ');
  this.box_0.first_1 = false;
  $.Collections__emitObject(k, this.result_3, this.visiting_2);
  $.add$1(this.result_3, ': ');
  $.Collections__emitObject(v, this.result_3, this.visiting_2);
}
};

$$.invokeClosure_anon = {"":
 ["closure_0"],
 super: "Closure",
 call$0: function() {
  return this.closure_0.call$0();
}
};

$$.invokeClosure_anon0 = {"":
 ["closure_2", "arg1_1"],
 super: "Closure",
 call$0: function() {
  return this.closure_2.call$1(this.arg1_1);
}
};

$$.invokeClosure_anon1 = {"":
 ["closure_5", "arg1_4", "arg2_3"],
 super: "Closure",
 call$0: function() {
  return this.closure_5.call$2(this.arg1_4, this.arg2_3);
}
};

$$.ConstantMap_forEach_anon = {"":
 ["this_1", "f_0"],
 super: "Closure",
 call$1: function(key) {
  return this.f_0.call$2(key, $.index(this.this_1, key));
}
};

$$.FilteredElementList__filtered_anon = {"":
 [],
 super: "Closure",
 call$1: function(n) {
  return typeof n === 'object' && n !== null && n.is$Element();
}
};

$$._ChildrenElementList_filter_anon = {"":
 ["f_1", "output_0"],
 super: "Closure",
 call$1: function(element) {
  if (this.f_1.call$1(element) === true)
    $.add$1(this.output_0, element);
}
};

$$.FilteredElementList_removeRange_anon = {"":
 [],
 super: "Closure",
 call$1: function(el) {
  return el.remove$0();
}
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
}
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
call$1: function(p0) { return this.self[this.target](p0); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$6: function(p0, p1, p2, p3, p4, p5) { return this.self[this.target](p0, p1, p2, p3, p4, p5); }
};
$$.BoundClosure1 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$2: function(p0, p1) { return this.self[this.target](p0, p1); }
};
$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a - b : $.sub$slow(a, b);
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a > b;
  return a.operator$gt$1(b);
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a / b;
  return a.operator$div$1(b);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$.addAll = function(receiver, collection) {
  if (!$.isJsArray(receiver))
    return receiver.addAll$1(collection);
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true;)
    $.add$1(receiver, iterator.next$0());
};

$.startsWith = function(receiver, other) {
  $.checkString(other);
  var length$ = other.length;
  if (length$ > receiver.length)
    return false;
  return other == receiver.substring(0, length$);
};

$.getRange = function(receiver, start, length$) {
  if (!$.isJsArray(receiver))
    return receiver.getRange$2(start, length$);
  if (0 === length$)
    return [];
  $.checkNull(start);
  $.checkNull(length$);
  if (!(typeof start === 'number' && start === (start | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(start));
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)))
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var t1 = length$ < 0;
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(length$));
  if (t1)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  return receiver.slice(start, end);
};

$.eqB = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b) === true;
  return a === b;
};

$._Lists_getRange = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if (typeof start !== 'number')
    return $._Lists_getRange$bailout(1, a, start, length$, accumulator);
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if (start < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  if (typeof length$ !== 'number')
    throw $.iae(length$);
  var end = start + length$;
  if (end > a.length)
    throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; i < end; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    accumulator.push(a[i]);
  }
  return accumulator;
};

$.Collections__emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && c !== null && (c.constructor === Array || c.is$List());
  $.add$1(result, isList ? '[' : '{');
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (!first)
      $.add$1(result, ', ');
    $.Collections__emitObject(t2, result, visiting);
    first = false;
  }
  $.add$1(result, isList ? ']' : '}');
  $.removeLast(visiting);
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver)) {
    $.checkNull(newLength);
    if (!(typeof newLength === 'number' && newLength === (newLength | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(newLength));
    if (newLength < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(newLength));
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else
    receiver.set$length(newLength);
  return newLength;
};

$.FilteredElementList$ = function(node) {
  return new $.FilteredElementList(node, node.get$nodes());
};

$._Device_userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null)
    return;
  var function$ = closure.$identity;
  if (!!function$)
    return function$;
  function$ = function() {
    return $.invokeClosure.call$5(closure, $, arity, arguments[0], arguments[1]);
  };
  closure.$identity = function$;
  return function$;
};

$._document = function() {
return document;
};

$.typeNameInChrome = function(obj) {
  var name$ = obj.constructor.name;
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  return name$;
};

$.toRadixString = function(receiver, radix) {
  if (!(typeof receiver === 'number'))
    return receiver.toRadixString$1(radix);
  $.checkNum(radix);
  return receiver.toString(radix);
};

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$.isJsArray = function(value) {
  return !(value == null) && value.constructor === Array;
};

$.clear = function(receiver) {
  if (!$.isJsArray(receiver))
    return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.Primitives_objectTypeName = function(object) {
  var name$ = $.constructorNameFallback(object);
  if ($.eqB(name$, 'Object')) {
    var decompiled = String(object.constructor).match(/^\s*function\s*(\S*)\s*\(/)[1];
    if (typeof decompiled === 'string')
      name$ = decompiled;
  }
  return $.charCodeAt(name$, 0) === 36 ? $.substring$1(name$, 1) : name$;
};

$.remainder = function(a, b) {
  if ($.checkNumbers(a, b))
    return a % b;
  else
    return a.remainder$1(b);
};

$.StringImplementation__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || (strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())
    return $.StringImplementation__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings)) {
    for (var i = 0; i < length$; ++i) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      var string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListImplementation_List(length$);
    for (i = 0; i < length$; ++i) {
      if (i < 0 || i >= strings.length)
        throw $.ioore(i);
      string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i < 0 || i >= array.length)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_pattern, _errmsg);
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(0, list);
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length === 0;
  return receiver.isEmpty$0();
};

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$.query = function(selector) {
  return $._document().query$1(selector);
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.getTypeNameOf(obj);
};

$.buildDynamicMetadata = function(inputTable) {
  var result = [];
  for (var i = 0; i < inputTable.length; ++i) {
    var tag = inputTable[i][0];
    var array = inputTable[i];
    var tags = array[1];
    var set = {};
    var tagNames = tags.split('|');
    for (var j = 0, index = 1; j < tagNames.length; ++j) {
      $.propertySet(set, tagNames[j], true);
      index = j;
      array = tagNames;
    }
    result.push($.MetaInfo$(tag, tags, set));
  }
  return result;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = obj.constructor;
  if (typeof(constructor$) === 'function') {
    var name$ = constructor$.name;
    if (typeof name$ === 'string')
      var t1 = !(name$ === '') && !(name$ === 'Object') && !(name$ === 'Function.prototype');
    else
      t1 = false;
    if (t1)
      return name$;
  }
  var string = Object.prototype.toString.call(obj);
  return string.substring(8, string.length - 1);
};

$.BigInteger_ZERO = function() {
  var r = $.BigInteger$(null, null, null);
  r.fromInt$1(0);
  return r;
};

$.FormatException$ = function(message) {
  return new $.FormatException(message);
};

$.ListImplementation_List$from = function(other) {
  var result = $.ListImplementation_List(null);
  for (var t1 = $.iterator(other); t1.hasNext$0() === true;)
    result.push(t1.next$0());
  return result;
};

$.ObjectImplementation_toStringImpl = function(object) {
  return $.Primitives_objectToString(object);
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b) === true;
};

$.filter = function(receiver, predicate) {
  if (!$.isJsArray(receiver))
    return receiver.filter$1(predicate);
  else
    return $.Collections_filter(receiver, [], predicate);
};

$._ElementFactoryProvider_Element$html = function(html) {
  var match = $.CTC14.firstMatch$1(html);
  if (!(match == null)) {
    var tag = $.toLowerCase(match.group$1(1));
    var parentTag = $.CTC16.containsKey$1(tag) === true ? $.CTC16.operator$index$1(tag) : 'div';
  } else {
    parentTag = 'div';
    tag = null;
  }
  var temp = $._ElementFactoryProvider_Element$tag(parentTag);
  temp.set$innerHTML(html);
  if ($.eqB($.get$length(temp.get$elements()), 1))
    var element = temp.get$elements().get$first();
  else if ($.eqB(parentTag, 'html') && $.eqB($.get$length(temp.get$elements()), 2)) {
    var t1 = temp.get$elements();
    element = $.index(t1, $.eqB(tag, 'head') ? 0 : 1);
  } else
    throw $.captureStackTrace($.IllegalArgumentException$('HTML had ' + $.S($.get$length(temp.get$elements())) + ' ' + 'top level elements but 1 expected'));
  element.remove$0();
  return element;
};

$.Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      destination.push(t2);
  }
  return destination;
};

$.max = function(a, b) {
  if (typeof a === 'number') {
    if (a > b)
      return a;
    if (a < b)
      return b;
    if (typeof b === 'number') {
      if (typeof a === 'number')
        if (a === 0.0)
          return a + b;
      if ($.isNaN(b) === true)
        return b;
      return a;
    }
    if (b === 0 && $.isNegative(a) === true)
      return b;
    return a;
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b))
    return $.truncate(a / b);
  return a.operator$tdiv$1(b);
};

$._ChildrenElementList$_wrap = function(element) {
  return new $._ChildrenElementList(element, element.get$$$dom_children());
};

$.unwrapException = function(ex) {
  if ("dartException" in ex)
    return ex.dartException;
  var message = ex.message;
  if (ex instanceof TypeError) {
    var type = ex.type;
    var name$ = ex.arguments ? ex.arguments[0] : "";
    if ($.eqB(type, 'property_not_function') || $.eqB(type, 'called_non_callable') || $.eqB(type, 'non_object_property_call') || $.eqB(type, 'non_object_property_load'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NullPointerException$(null, $.CTC);
    else if ($.eqB(type, 'undefined_method'))
      if (typeof name$ === 'string' && $.startsWith(name$, 'call$') === true)
        return $.ObjectNotClosureException$();
      else
        return $.NoSuchMethodException$('', name$, [], null);
    if (typeof message === 'string')
      if ($.endsWith(message, 'is null') === true || $.endsWith(message, 'is undefined') === true || $.endsWith(message, 'is null or undefined') === true)
        return $.NullPointerException$(null, $.CTC);
      else if ($.contains$1(message, ' is not a function') === true || $.contains$1(message, 'doesn\'t support property or method') === true)
        return $.NoSuchMethodException$('', '<unknown>', [], null);
    return $.ExceptionImplementation$(typeof message === 'string' ? message : '');
  }
  if (ex instanceof RangeError) {
    if (typeof message === 'string' && $.contains$1(message, 'call stack') === true)
      return $.StackOverflowException$();
    return $.IllegalArgumentException$('');
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError)
    if (typeof message === 'string' && message === 'too much recursion')
      return $.StackOverflowException$();
  return ex;
};

$._FrozenElementList$_wrap = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number')
    if (typeof b === 'number')
      return true;
    else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    }
  return false;
};

$.captureStackTrace = function(ex) {
  if (ex == null)
    ex = $.CTC0;
  var jsError = new Error();
  jsError.name = ex;
  jsError.description = ex;
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.call$0;
  return jsError;
};

$._NodeListWrapper$ = function(list) {
  return new $._NodeListWrapper(list);
};

$.log = function(value) {
  return Math.log($.checkNum(value));
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a >= b;
  return a.operator$ge$1(b);
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(_receiver, _functionName, _arguments, existingArgumentNames);
};

$._convertDartToNative_PrepareForStructuredClone = function(value) {
  var values = [];
  var copies = [];
  var t1 = new $._convertDartToNative_PrepareForStructuredClone_findSlot(copies, values);
  var t2 = new $._convertDartToNative_PrepareForStructuredClone_readSlot(copies);
  var t3 = new $._convertDartToNative_PrepareForStructuredClone_writeSlot(copies);
  var t4 = new $._convertDartToNative_PrepareForStructuredClone_cleanupSlots();
  var copy = new $._convertDartToNative_PrepareForStructuredClone_walk(t3, t1, t2).call$1(value);
  t4.call$0();
  return copy;
};

$.pow = function(value, exponent) {
  $.checkNum(value);
  $.checkNum(exponent);
  return Math.pow(value, exponent);
};

$._Collections_filter = function(source, destination, f) {
  for (var t1 = $.iterator(source); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (f.call$1(t2) === true)
      destination.push(t2);
  }
  return destination;
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.floor$0();
  return Math.floor(receiver);
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string'))
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof startIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b)) {
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a > 0) {
      if (b > 31)
        return 0;
      return a >>> b;
    }
    if (b > 31)
      b = 31;
    return (a >> b) >>> 0;
  }
  return a.operator$shr$1(b);
};

$._convertDartToNative_SerializedScriptValue = function(value) {
  return $._convertDartToNative_PrepareForStructuredClone(value);
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0 || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  }
  a.operator$indexSet$2(index, value);
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target == null))
    target.builtin$typeInfo = typeInfo;
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number')
    return receiver & 0x1FFFFFFF;
  if (!(typeof receiver === 'string'))
    return receiver.hashCode$0();
  var length$ = receiver.length;
  for (var hash = 0, i = 0; i < length$; ++i) {
    var hash0 = 536870911 & hash + receiver.charCodeAt(i);
    var hash1 = 536870911 & hash0 + 524287 & hash0 << 10;
    hash1 = (hash1 ^ $.shr(hash1, 6)) >>> 0;
    hash = hash1;
  }
  hash0 = 536870911 & hash + 67108863 & hash << 3;
  hash0 = (hash0 ^ $.shr(hash0, 11)) >>> 0;
  return 536870911 & hash0 + 16383 & hash0 << 15;
};

$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a * b;
  return a.operator$mul$1(b);
};

$.getFunctionForTypeNameOf = function() {
  if (!(typeof(navigator) === 'object'))
    return $.typeNameInChrome;
  var userAgent = navigator.userAgent;
  if ($.contains(userAgent, 'Chrome') || $.contains(userAgent, 'DumpRenderTree'))
    return $.typeNameInChrome;
  else if ($.contains(userAgent, 'Firefox'))
    return $.typeNameInFirefox;
  else if ($.contains(userAgent, 'MSIE'))
    return $.typeNameInIE;
  else if ($.contains(userAgent, 'Opera'))
    return $.typeNameInOpera;
  else if ($.contains(userAgent, 'Safari'))
    return $.typeNameInSafari;
  else
    return $.constructorNameFallback;
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b);
};

$._ElementFactoryProvider_Element$tag = function(tag) {
return document.createElement(tag)
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a < b;
  return a.operator$lt$1(b);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number'))
      throw $.captureStackTrace($.IllegalArgumentException$(index));
    if (index < 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    if (index >= receiver.length)
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return receiver.charCodeAt(index);
  } else
    return receiver.charCodeAt$1(index);
};

$.Collections__emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && o !== null && (o.constructor === Array || o.is$Collection()))
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, typeof o === 'object' && o !== null && (o.constructor === Array || o.is$List()) ? '[...]' : '{...}');
    else
      $.Collections__emitCollection(o, result, visiting);
  else if (typeof o === 'object' && o !== null && o.is$Map())
    if ($.Collections__containsRef(visiting, o))
      $.add$1(result, '{...}');
    else
      $.Maps__emitMap(o, result, visiting);
  else
    $.add$1(result, o == null ? 'null' : o);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null)
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.call$1(obj);
};

$.truncate = function(receiver) {
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.ListImplementation_List = function(length$) {
  return $.Primitives_newList(length$);
};

$.contains$1 = function(receiver, other) {
  return $.contains$2(receiver, other, 0);
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a * b : $.mul$slow(a, b);
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix == null)
    if ($._Device_isFirefox() === true)
      $._cachedBrowserPrefix = '-moz-';
    else
      $._cachedBrowserPrefix = '-webkit-';
  return $._cachedBrowserPrefix;
};

$.forEach = function(receiver, f) {
  if (!$.isJsArray(receiver))
    return receiver.forEach$1(f);
  else
    return $.Collections_forEach(receiver, f);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.neg = function(a) {
  if (typeof a === "number")
    return -a;
  return a.operator$negate$0();
};

$.toLowerCase = function(receiver) {
  if (!(typeof receiver === 'string'))
    return receiver.toLowerCase$0();
  return receiver.toLowerCase();
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.contains = function(userAgent, name$) {
  return !(userAgent.indexOf(name$) === -1);
};

$.dynamicFunction = function(name$) {
  var f = Object.prototype[name$];
  if (!(f == null) && !!f.methods)
    return f.methods;
  var methods = {};
  var dartMethod = Object.getPrototypeOf($.CTC21)[name$];
  if (!(dartMethod == null))
    $.propertySet(methods, 'Object', dartMethod);
  var bind = function() {return $.dynamicBind.call$4(this, name$, methods, Array.prototype.slice.call(arguments));};
  bind.methods = methods;
  $.defineProperty(Object.prototype, name$, bind);
  return methods;
};

$.toString = function(value) {
  if (typeof value == "object" && value !== null)
    if ($.isJsArray(value))
      return $.Collections_collectionToString(value);
    else
      return value.toString$0();
  if (value === 0 && (1 / value) < 0)
    return '-0.0';
  if (value == null)
    return 'null';
  if (typeof value == "function")
    return 'Closure';
  return String(value);
};

$.BigInteger_ONE = function() {
  var r = $.BigInteger$(null, null, null);
  r.fromInt$1(1);
  return r;
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length;
  else
    return receiver.get$length();
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = methods[tag];
  if (method == null && !($._dynamicMetadata0() == null))
    for (var i = 0; i < $._dynamicMetadata0().length; ++i) {
      var entry = $._dynamicMetadata0()[i];
      if (entry.get$_set()[tag]) {
        method = methods[entry.get$_tag()];
        if (!(method == null))
          break;
      }
    }
  if (method == null)
    method = methods['Object'];
  var proto = Object.getPrototypeOf(obj);
  if (method == null)
    method = function () {if (Object.getPrototypeOf(this) === proto) {throw new TypeError(name$ + " is not a function");} else {return Object.prototype[name$].apply(this, arguments);}};
  if (!proto.hasOwnProperty(name$))
    $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number')
    return isNaN(receiver);
  else
    return receiver.isNaN$0();
};

$.regExpExec = function(regExp, str) {
  var result = $.regExpGetNative(regExp).exec(str);
  if (result === null)
    return;
  return result;
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(pattern);
  var sb = $.StringBufferImpl$('');
  if (multiLine === true)
    $.add$1(sb, 'm');
  if (ignoreCase === true)
    $.add$1(sb, 'i');
  if (global)
    $.add$1(sb, 'g');
  try {
    return new RegExp(pattern, $.toString(sb));
  } catch (exception) {
    var t1 = $.unwrapException(exception);
    var e = t1;
    throw $.captureStackTrace($.IllegalJSRegExpException$(pattern, String(e)));
  }

};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$2(other, startIndex);
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$.endsWith = function(receiver, other) {
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = other.length;
  if (otherLength > receiverLength)
    return false;
  return other === $.substring$1(receiver, receiverLength - otherLength);
};

$.or = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a | b) >>> 0;
  return a.operator$or$1(b);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.main = function() {
  try {
    var x = $.BigInteger$('abcd1234', 16, null);
    var y = $.BigInteger$('beef', 16, null);
    var z = x.mod$1(y);
    var t1 = z;
    $.add$1($.query('#container').get$elements(), $._ElementFactoryProvider_Element$html('<div>' + $.S(t1) + '<br></div>'));
    z = $.mod(x, y);
    var t2 = z;
    $.add$1($.query('#container').get$elements(), $._ElementFactoryProvider_Element$html('<div>' + $.S(t2) + '<br></div>'));
    z = $.remainder(x, y);
    var t3 = z;
    $.add$1($.query('#container').get$elements(), $._ElementFactoryProvider_Element$html('<div>' + $.S(t3) + '<br></div>'));
  } catch (exception) {
    t1 = $.unwrapException(exception);
    var ex = t1;
    t1 = ex;
    $.add$1($.query('#container').get$elements(), $._ElementFactoryProvider_Element$html('<div>' + $.S(t1) + '<br></div>'));
  }

};

$.BigInteger$ = function(a, b, c) {
  var t1 = new $.BigInteger(null, null, 244837814094590, null, null, null, '0123456789abcdefghijklmnopqrstuvwxyz', null, null, null);
  t1.BigInteger$3(a, b, c);
  return t1;
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver))
    return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.ceil = function(receiver) {
  return Math.ceil(receiver);
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$.toInt = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.toInt$0();
  if ($.isNaN(receiver) === true)
    throw $.captureStackTrace($.FormatException$('NaN'));
  if ($.isInfinite(receiver) === true)
    throw $.captureStackTrace($.FormatException$('Infinity'));
  var truncated = $.truncate(receiver);
  return truncated == -0.0 ? 0 : truncated;
};

$._dynamicMetadata0 = function() {
  if (typeof($dynamicMetadata) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.typeNameInSafari = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'WebKitMutationObserver')
    return 'MutationObserver';
  return name$;
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number')
    return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
  else
    return receiver.isNegative$0();
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a + b;
  return a.operator$add$1(b);
};

$._FrozenElementListIterator$ = function(_list) {
  return new $._FrozenElementListIterator(_list, 0);
};

$.jsHasOwnProperty = function(jsObject, property) {
  return jsObject.hasOwnProperty(property);
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListImplementation_List(null));
  return result.toString$0();
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0)
      throw $.captureStackTrace($.IndexOutOfRangeException$(-1));
    return receiver.pop();
  }
  return receiver.removeLast$0();
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0))
    return new $.invokeClosure_anon(closure).call$0();
  else if ($.eqB(numberOfArguments, 1))
    return new $.invokeClosure_anon0(closure, arg1).call$0();
  else if ($.eqB(numberOfArguments, 2))
    return new $.invokeClosure_anon1(closure, arg1, arg2).call$0();
  else
    throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$._MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $._MatchImplementation(pattern, str, _start, _end, _groups);
};

$.checkNull = function(object) {
  if (object == null)
    throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    if (i < 0 || i >= a.length)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.MetaInfo$ = function(_tag, _tags, _set) {
  return new $.MetaInfo(_tag, _tags, _set);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = index >>> 0;
    if (key === index && key < a.length) {
      a[key] = value;
      return;
    }
  }
  $.indexSet$slow(a, index, value);
};

$.index$slow = function(a, index) {
  if (typeof a === 'string' || $.isJsArray(a)) {
    if (!(typeof index === 'number' && index === (index | 0))) {
      if (!(typeof index === 'number'))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
      if (!($.truncate(index) === index))
        throw $.captureStackTrace($.IllegalArgumentException$(index));
    }
    if ($.ltB(index, 0) || $.geB(index, $.get$length(a)))
      throw $.captureStackTrace($.IndexOutOfRangeException$(index));
    return a[index];
  }
  return a.operator$index$1(index);
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a / b : $.div$slow(a, b);
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref)
      return true;
  }
  return false;
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a >= b : $.ge$slow(a, b) === true;
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$._ChildNodeListLazy$ = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.abs$0();
  return Math.abs(receiver);
};

$.compareTo = function(a, b) {
  if ($.checkNumbers(a, b))
    if ($.ltB(a, b))
      return -1;
    else if ($.gtB(a, b))
      return 1;
    else if ($.eqB(a, b)) {
      if ($.eqB(a, 0)) {
        var aIsNegative = $.isNegative(a);
        if ($.eqB(aIsNegative, $.isNegative(b)))
          return 0;
        if (aIsNegative === true)
          return -1;
        return 1;
      }
      return 0;
    } else if ($.isNaN(a) === true) {
      if ($.isNaN(b) === true)
        return 0;
      return 1;
    } else
      return -1;
  else if (typeof a === 'string') {
    if (!(typeof b === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (a == b)
      var t1 = 0;
    else
      t1 = a < b ? -1 : 1;
    return t1;
  } else
    return a.compareTo$1(b);
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a <= b : $.le$slow(a, b) === true;
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b)) {
    var result = a % b;
    if (result === 0)
      return 0;
    if (result > 0)
      return result;
    if (b < 0)
      return result - b;
    else
      return result + b;
  }
  return a.operator$mod$1(b);
};

$.Maps__emitMap = function(m, result, visiting) {
  var t1 = {};
  $.add$1(visiting, m);
  $.add$1(result, '{');
  t1.first_1 = true;
  $.forEach(m, new $.Maps__emitMap_anon(result, t1, visiting));
  $.add$1(result, '}');
  $.removeLast(visiting);
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'Document')
    return 'HTMLDocument';
  if (name$ === 'XMLDocument')
    return 'Document';
  if (name$ === 'WorkerMessageEvent')
    return 'MessageEvent';
  if (name$ === 'DragEvent')
    return 'MouseEvent';
  if (name$ === 'DataTransfer')
    return 'Clipboard';
  return name$;
};

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.propertySet = function(object, property, value) {
  object[property] = value;
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a - b;
  return a.operator$sub$1(b);
};

$._Device_isFirefox = function() {
  return $.contains$2($._Device_userAgent(), 'Firefox', 0);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListImplementation_List(null));
  return result.toString$0();
};

$.min = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      if (a > b)
        return b;
      if (a < b)
        return a;
      if (typeof b === 'number') {
        if (typeof a === 'number')
          if (a === 0.0)
            return (a + b) * a * b;
        if (a === 0 && $.isNegative(b) === true || $.isNaN(b) === true)
          return b;
        return a;
      }
      return a;
    }
    throw $.captureStackTrace($.IllegalArgumentException$(b));
  }
  throw $.captureStackTrace($.IllegalArgumentException$(a));
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver)) {
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    return $.Arrays_indexOf(receiver, element, start, receiver.length);
  } else if (typeof receiver === 'string') {
    $.checkNull(element);
    if (!(typeof start === 'number' && start === (start | 0)))
      throw $.captureStackTrace($.IllegalArgumentException$(start));
    if (!(typeof element === 'string'))
      throw $.captureStackTrace($.IllegalArgumentException$(element));
    if (start < 0)
      return -1;
    return receiver.indexOf(element, start);
  }
  return receiver.indexOf$2(element, start);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  if (name$ === 'Document') {
    if (!!obj.xmlVersion)
      return 'Document';
    return 'HTMLDocument';
  }
  if (name$ === 'CanvasPixelArray')
    return 'Uint8ClampedArray';
  if (name$ === 'DataTransfer')
    return 'Clipboard';
  if (name$ === 'DragEvent')
    return 'MouseEvent';
  if (name$ === 'HTMLDDElement')
    return 'HTMLElement';
  if (name$ === 'HTMLDTElement')
    return 'HTMLElement';
  if (name$ === 'HTMLTableDataCellElement')
    return 'HTMLTableCellElement';
  if (name$ === 'HTMLTableHeaderCellElement')
    return 'HTMLTableCellElement';
  if (name$ === 'HTMLPhraseElement')
    return 'HTMLElement';
  if (name$ === 'MSStyleCSSProperties')
    return 'CSSStyleDeclaration';
  if (name$ === 'MouseWheelEvent')
    return 'WheelEvent';
  return name$;
};

$.Primitives_newList = function(length$) {
  if (length$ == null)
    return new Array();
  if (!(typeof length$ === 'number' && length$ === (length$ | 0)) || length$ < 0)
    throw $.captureStackTrace($.IllegalArgumentException$(length$));
  var result = new Array(length$);
  result.fixed$length = true;
  return result;
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = index >>> 0;
    if (key === index && key < a.length)
      return a[key];
  }
  return $.index$slow(a, index);
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a <= b;
  return a.operator$le$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null)
    endIndex = length$;
  $.checkNum(endIndex);
  if (startIndex < 0)
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$))
    throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$.window = function() {
return window;
};

$.last = function(receiver) {
  if (!$.isJsArray(receiver))
    return receiver.last$0();
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if (name$ === 'Window')
    return 'DOMWindow';
  return name$;
};

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1.HashMapImplementation$0();
  return t1;
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), array, 0);
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a + b : $.add$slow(a, b);
};

$.eq = function(a, b) {
  if (a == null)
    return b == null;
  if (b == null)
    return false;
  if (typeof a === "object")
    if (!!a.operator$eq$1)
      return a.operator$eq$1(b);
  return a === b;
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(functionName, arguments$);
};

$.toStringWrapper = function() {
  return $.toString(this.dartException);
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$._ElementList$ = function(list) {
  return new $._ElementList(list);
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b) === true;
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b)) {
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31)
      return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  return !($.indexOf$2(receiver, other, startIndex) === -1);
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b);
};

$.isInfinite = function(receiver) {
  return receiver == Infinity || receiver == -Infinity;
};

$.regExpGetNative = function(regExp) {
  var r = regExp._re;
  return r == null ? regExp._re = $.regExpMakeNative(regExp, false) : r;
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$._Lists_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if ($.ltB(startIndex, 0))
    startIndex = 0;
  for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1))
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$.Arrays_indexOf$bailout = function(state, a, element, startIndex, endIndex) {
  if ($.geB(startIndex, $.get$length(a)))
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i)
    if ($.eqB($.index(a, i), element))
      return i;
  return -1;
};

$._Lists_getRange$bailout = function(state, a, start, length$, accumulator) {
  if ($.ltB(length$, 0))
    throw $.captureStackTrace($.IllegalArgumentException$('length'));
  if ($.ltB(start, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(start));
  var end = $.add(start, length$);
  if ($.gtB(end, $.get$length(a)))
    throw $.captureStackTrace($.IndexOutOfRangeException$(end));
  for (var i = start; $.ltB(i, end); i = $.add(i, 1))
    accumulator.push($.index(a, i));
  return accumulator;
};

$.StringImplementation__toJsStringArray$bailout = function(state, strings) {
  $.checkNull(strings);
  var length$ = $.get$length(strings);
  if ($.isJsArray(strings)) {
    for (var i = 0; $.ltB(i, length$); ++i) {
      var string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListImplementation_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      if (i < 0 || i >= array.length)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.dynamicBind.call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.toStringWrapper.call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.typeNameInFirefox.call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.typeNameInSafari.call$1 = $.typeNameInSafari;
$.typeNameInSafari.$name = "typeNameInSafari";
$.constructorNameFallback.call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
$.typeNameInChrome.call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.typeNameInIE.call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.invokeClosure.call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.typeNameInOpera.call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC4 = new Isolate.$isolateProperties.NotImplementedException('structured clone of RegExp');
$.CTC9 = new Isolate.$isolateProperties.NotImplementedException('structured clone of ArrayBufferView');
$.CTC19 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC7 = new Isolate.$isolateProperties.NotImplementedException('structured clone of FileList');
$.CTC18 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC20 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC14 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '<(\\w+)');
$.CTC8 = new Isolate.$isolateProperties.NotImplementedException('structured clone of ArrayBuffer');
$.CTC12 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC21 = new Isolate.$isolateProperties.Object();
$.CTC17 = new Isolate.$isolateProperties.IllegalAccessException();
$.CTC3 = new Isolate.$isolateProperties.NotImplementedException('structured clone of Date');
$.CTC15 = Isolate.makeConstantList(['body', 'head', 'caption', 'td', 'colgroup', 'col', 'tr', 'tbody', 'tfoot', 'thead', 'track']);
$.CTC2 = new Isolate.$isolateProperties._Default();
$.CTC1 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot add to immutable List.');
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(null, Isolate.$isolateProperties.CTC);
$.CTC10 = new Isolate.$isolateProperties.NotImplementedException('structured clone of other type');
$.CTC5 = new Isolate.$isolateProperties.NotImplementedException('structured clone of File');
$.CTC6 = new Isolate.$isolateProperties.NotImplementedException('structured clone of Blob');
$.CTC11 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC16 = new Isolate.$isolateProperties.ConstantMap(11, {'body': 'html', 'head': 'html', 'caption': 'table', 'td': 'tr', 'colgroup': 'table', 'col': 'colgroup', 'tr': 'tbody', 'tbody': 'table', 'tfoot': 'table', 'thead': 'table', 'track': 'audio'}, Isolate.$isolateProperties.CTC15);
$.CTC13 = new Isolate.$isolateProperties.UnsupportedOperationException('Cannot removeLast on immutable List.');
$.BigInteger_dbits = null;
$._cachedBrowserPrefix = null;
$.BigInteger_BI_F1 = null;
$.BigInteger_BI_DV = null;
$.BigInteger_BI_F2 = null;
$.BigInteger_BI_FP = null;
$.BigInteger_BI_DM = null;
$.BigInteger_BI_DB = null;
$._getTypeNameOf = null;
$.BigInteger_BI_FV = null;
var $ = null;
Isolate.$finishClasses($$);
$$ = {};
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};

(function(table) {
  for (var key in table) {
    $.defineProperty(Object.prototype, key, table[key]);
  }
})({
 is$JavaScriptIndexingBehavior: function() { return false; },
 is$ArrayBufferView: function() { return false; },
 is$_FileListImpl: function() { return false; },
 is$_ImageDataImpl: function() { return false; },
 is$_FileImpl: function() { return false; },
 is$_ArrayBufferViewImpl: function() { return false; },
 is$ArrayBuffer: function() { return false; },
 toString$0: function() { return $.toStringForNativeObject(this); },
 is$Blob: function() { return false; },
 is$File: function() { return false; },
 is$_BlobImpl: function() { return false; },
 is$Element: function() { return false; },
 is$List: function() { return false; },
 is$ImageData: function() { return false; },
 is$FileList: function() { return false; },
 is$Collection: function() { return false; },
 is$_ArrayBufferImpl: function() { return false; },
 is$Map: function() { return false; }
});

$.$defineNativeClass('HTMLAnchorElement', [], {
 toString$0: function() {
  return this.toString();
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ArrayBuffer', [], {
 is$_ArrayBufferImpl: function() { return true; },
 is$ArrayBuffer: function() { return true; }
});

$.$defineNativeClass('ArrayBufferView', [], {
 is$_ArrayBufferViewImpl: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('HTMLAudioElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.call$0(); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Blob', [], {
 is$_BlobImpl: function() { return true; },
 is$Blob: function() { return true; }
});

$.$defineNativeClass('HTMLBodyElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
},
 get$clear: function() {
  return this.getPropertyValue$1('clear');
},
 clear$0: function() { return this.get$clear().call$0(); },
 get$filter: function() {
  return this.getPropertyValue$1($.S($._browserPrefix()) + 'filter');
},
 filter$1: function(arg0) { return this.get$filter().call$1(arg0); }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
_ConsoleImpl.group$1 = function(arg) {
  return this.group(arg);
};
$.$defineNativeClass('HTMLContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'String'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 add$1: function(token) {
  return this.add(token);
},
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('HTMLDataListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
},
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
},
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('DataView', [], {
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDirectoryElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDivElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDocument', [], {
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
},
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 query$1: function(selectors) {
  if ($.CTC18.hasMatch$1(selectors) === true)
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  return this.$dom_querySelector$1(selectors);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 get$elements: function() {
  if (this._elements == null)
    this._elements = $.FilteredElementList$(this);
  return this._elements;
},
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
},
 set$innerHTML: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$innerHTML')) {
  {
  $.clear(this.get$nodes());
  var e = $._ElementFactoryProvider_Element$tag('div');
  e.set$innerHTML(value);
  var nodes = $.ListImplementation_List$from(e.get$nodes());
  $.addAll(this.get$nodes(), nodes);
}
  } else {
    return Object.prototype.set$innerHTML.call(this, value);
  }

},
 get$$$dom_firstElementChild: function() {
  return this.get$elements().first$0();
},
 get$$$dom_lastElementChild: function() {
  return $.last(this.get$elements());
},
 get$parent: function() {
  return;
},
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('Element', ["innerHTML!"], {
 set$elements: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$elements')) {
  {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
}
  } else {
    return Object.prototype.set$elements.call(this, value);
  }

},
 get$elements: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$elements')) {
  {
  return $._ChildrenElementList$_wrap(this);
}
  } else {
    return Object.prototype.get$elements.call(this);
  }

},
 query$1: function(selectors) {
  return this.$dom_querySelector$1(selectors);
},
 get$$$dom_children: function() {
return this.children;
},
 get$$$dom_firstElementChild: function() {
return this.firstElementChild;
},
 get$$$dom_lastElementChild: function() {
return this.lastElementChild;
},
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Entry', [], {
 copyTo$4: function(parent, name, successCallback, errorCallback) {
  return this.copyTo(parent,name,$.convertDartClosureToJS(successCallback, 1),$.convertDartClosureToJS(errorCallback, 1));
},
 copyTo$1: function(parent$) {
  return this.copyTo(parent$);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', [], {
 remove$0: function() {
  return this.remove();
}
});

$.$defineNativeClass('EventException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('HTMLFieldSetElement', ["elements?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('File', [], {
 is$_FileImpl: function() { return true; },
 is$File: function() { return true; },
 is$Blob: function() { return true; }
});

$.$defineNativeClass('FileException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('FileList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'File'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$_FileListImpl: function() { return true; },
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$FileList: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileWriter', ["length?"], {
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'num'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'num'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('GamepadList', ["length?"], {
});

$.$defineNativeClass('HTMLHRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 get$length: function() {
return this.length;
},
 set$length: function(value) {
this.length = value;
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLHeadElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHeadingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('HTMLHtmlElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('XMLHttpRequestException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('IDBDatabaseException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('IDBObjectStore', [], {
 add$2: function(value, key) {
  if (!$.eqB($.CTC2, key))
    return this._add_1$2($._convertDartToNative_SerializedScriptValue(value), key);
  return this._add_2$1($._convertDartToNative_SerializedScriptValue(value));
},
 add$1: function(value) {
  return this.add$2(value,Isolate.$isolateProperties.CTC2)
},
 _add_1$2: function(value, key) {
  return this.add(value,key);
},
 _add_2$1: function(value) {
  return this.add(value);
},
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('HTMLIFrameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ImageData', [], {
 is$_ImageDataImpl: function() { return true; },
 is$ImageData: function() { return true; }
});

$.$defineNativeClass('HTMLImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('HTMLKeygenElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLabelElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLegendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLinkElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('HTMLMapElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMediaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'String'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 add$1: function(track) {
  return this.add(track);
}
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMetaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMeterElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLModElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 get$nodes: function() {
  return $._ChildNodeListLazy$(this);
},
 remove$0: function() {
  if (!(this.get$parent() == null))
    this.get$parent().$dom_removeChild$1(this);
  return this;
},
 replaceWith$1: function(otherNode) {
  try {
    var parent$ = this.get$parent();
    parent$.$dom_replaceChild$2(otherNode, this);
  } catch (exception) {
    $.unwrapException(exception);
  }

  return this;
},
 get$$$dom_childNodes: function() {
return this.childNodes;
},
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
  {
return this.parentNode;
}
  } else {
    return Object.prototype.get$parent.call(this);
  }

},
 set$text: function(value) {
this.textContent = value;
},
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
},
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
},
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
}
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 addAll$1: function(collection) {
  for (var t1 = $.iterator(collection), t2 = this._parent; t1.hasNext$0() === true;)
    t2.$dom_appendChild$1(t1.next$0());
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._parent.$dom_removeChild$1(result);
  return result;
},
 clear$0: function() {
  this._parent.set$text('');
},
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._NodeListWrapper$($._Collections_filter(this, [], f));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 get$first: function() {
  return this.operator$index$1(0);
},
 first$0: function() { return this.get$first().call$0(); },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$($._Lists_getRange(this, start, rangeLength, []));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptGroupElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOutputElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParagraphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParamElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLPreElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLProgressElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('RadioNodeList', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('RangeException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphDefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphItemElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateColorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateMotionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateTransformElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimationElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCircleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDocument', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElement', [], {
 get$elements: function() {
  return $.FilteredElementList$(this);
},
 set$elements: function(value) {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
},
 set$innerHTML: function(svg) {
  var container = $._ElementFactoryProvider_Element$tag('div');
  container.set$innerHTML('<svg version="1.1">' + $.S(svg) + '</svg>');
  this.set$elements(container.get$elements().get$first().get$elements());
},
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('SVGFEBlendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncBElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEGaussianBlurElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceFormatElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceNameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceSrcElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceUriElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGForeignObjectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGLineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLinearGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMarkerElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMaskElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMetadataElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMissingGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPatternElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPolygonElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPolylineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRadialGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRectElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGScriptElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStopElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSwitchElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSymbolElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPositioningElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGUseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGVKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLScriptElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSelectElement', ["length="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ShadowRoot', ["innerHTML!"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SourceBufferList', ["length?"], {
});

$.$defineNativeClass('HTMLSourceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
},
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
},
 clear$0: function() {
  return this.$dom_clear$0();
},
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null)
      return;
    f.call$2(key, this.operator$index$1(key));
  }
},
 get$length: function() {
  return this.get$$$dom_length();
},
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
},
 get$$$dom_length: function() {
return this.length;
},
 $dom_clear$0: function() {
  return this.clear();
},
 $dom_getItem$1: function(key) {
  return this.getItem(key);
},
 $dom_key$1: function(index) {
  return this.key(index);
},
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
},
 is$Map: function() { return true; }
});

$.$defineNativeClass('HTMLStyleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'StyleSheet'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCaptionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TextTrackCue', ["text!"], {
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('HTMLTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TouchList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Touch'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TreeWalker', [], {
 filter$1: function(arg0) { return this.filter.call$1(arg0); }
});

$.$defineNativeClass('HTMLUListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 add$1: function(value) {
  throw $.captureStackTrace($.CTC1);
},
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC1);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 filter$1: function(f) {
  return $._Collections_filter(this, [], f);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC13);
},
 getRange$2: function(start, rangeLength) {
  return $._Lists_getRange(this, start, rangeLength, []);
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; },
 is$ArrayBufferView: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMWindow', ["length?", "navigator?"], {
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XPathException', [], {
 toString$0: function() {
  return this.toString();
}
});

// 247 dynamic classes.
// 266 classes
// 23 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_Uint8ArrayImpl)*/ = 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray';
  var v2/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement|SVGTextPathElement'].join('|');
  var v3/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v4/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v5/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v6/*class(_SVGElementImpl)*/ = [v2/*class(_SVGTextContentElementImpl)*/,v3/*class(_SVGGradientElementImpl)*/,v4/*class(_SVGComponentTransferFunctionElementImpl)*/,v5/*class(_SVGAnimationElementImpl)*/,v2/*class(_SVGTextContentElementImpl)*/,v3/*class(_SVGGradientElementImpl)*/,v4/*class(_SVGComponentTransferFunctionElementImpl)*/,v5/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v7/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement';
  var v8/*class(_ElementImpl)*/ = [v6/*class(_SVGElementImpl)*/,v7/*class(_MediaElementImpl)*/,v6/*class(_SVGElementImpl)*/,v7/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v9/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v10/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument|SVGDocument';
  var v11/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGGradientElement', v3/*class(_SVGGradientElementImpl)*/],
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v2/*class(_SVGTextContentElementImpl)*/],
    ['Uint8Array', v1/*class(_Uint8ArrayImpl)*/],
    ['ArrayBufferView', [v1/*class(_Uint8ArrayImpl)*/,v1/*class(_Uint8ArrayImpl)*/,'ArrayBufferView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView|Uint32Array|Uint16Array|Int8Array|Int32Array|Int16Array|Float64Array|Float32Array|DataView'].join('|')],
    ['Blob', 'Blob|File|File'],
    ['WorkerContext', 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v11/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v10/*class(_DocumentImpl)*/],
    ['DocumentFragment', v9/*class(_DocumentFragmentImpl)*/],
    ['SVGComponentTransferFunctionElement', v4/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v5/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v6/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v7/*class(_MediaElementImpl)*/],
    ['Element', v8/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['Node', [v8/*class(_ElementImpl)*/,v9/*class(_DocumentFragmentImpl)*/,v10/*class(_DocumentImpl)*/,v11/*class(_CharacterDataImpl)*/,v8/*class(_ElementImpl)*/,v9/*class(_DocumentFragmentImpl)*/,v10/*class(_DocumentImpl)*/,v11/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|')],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.main();
    }
  }, false);
} else {
  $.main();
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  constructor.prototype = prototype;
  return constructor;
};
var supportsProto = false;
var tmp = Isolate.$defineClass('c', ['f?'], {}).prototype;
if (tmp.__proto__) {
  tmp.__proto__ = {};
  if (typeof tmp.get$f !== "undefined") supportsProto = true;
}
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function(collectedClasses) {
  for (var cls in collectedClasses) {
    if (Object.prototype.hasOwnProperty.call(collectedClasses, cls)) {
      var desc = collectedClasses[cls];
      Isolate.$isolateProperties[cls] = Isolate.$defineClass(cls, desc[''], desc);
      if (desc['super'] !== "") Isolate.$pendingClasses[cls] = desc['super'];
    }
  }
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (supportsProto) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (member == '' || member == 'super') continue;
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
