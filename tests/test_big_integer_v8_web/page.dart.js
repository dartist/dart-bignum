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
},
 is$Exception: true
};

$$.FutureImpl = {"":
 ["_completionListeners", "_exceptionHandlers", "_successListeners", "_exceptionHandled", "_stackTrace", "_exception", "_lib0_value", "_isComplete"],
 super: "Object",
 _setException$2: function(exception, stackTrace) {
  if (exception == null)
    throw $.captureStackTrace($.IllegalArgumentException$(null));
  if (this._isComplete === true)
    throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._exception = exception;
  this._stackTrace = stackTrace;
  this._complete$0();
},
 _setValue$1: function(value) {
  if (this._isComplete === true)
    throw $.captureStackTrace($.FutureAlreadyCompleteException$());
  this._lib0_value = value;
  this._complete$0();
},
 _complete$0: function() {
  this._isComplete = true;
  try {
    if (!(this._exception == null))
      for (var t1 = $.iterator(this._exceptionHandlers); t1.hasNext$0() === true;) {
        var handler = t1.next$0();
        if ($.eqB(handler.call$1(this._exception), true)) {
          this._exceptionHandled = true;
          break;
        }
      }
    if (this.get$hasValue() === true)
      for (t1 = $.iterator(this._successListeners); t1.hasNext$0() === true;) {
        var listener = t1.next$0();
        listener.call$1(this.get$value());
      }
    else if (this._exceptionHandled !== true && $.gtB($.get$length(this._successListeners), 0))
      throw $.captureStackTrace(this._exception);
  } finally {
    for (t1 = $.iterator(this._completionListeners); t1.hasNext$0() === true;) {
      var listener0 = t1.next$0();
      try {
        listener0.call$1(this);
      } catch (exception) {
        $.unwrapException(exception);
      }

    }
  }
},
 handleException$1: function(onException) {
  if (this._exceptionHandled === true)
    return;
  if (this._isComplete === true) {
    var t1 = this._exception;
    if (!(t1 == null))
      this._exceptionHandled = onException.call$1(t1);
  } else
    $.add$1(this._exceptionHandlers, onException);
},
 then$1: function(onSuccess) {
  if (this.get$hasValue() === true)
    onSuccess.call$1(this.get$value());
  else if (this.get$isComplete() !== true)
    $.add$1(this._successListeners, onSuccess);
  else if (this._exceptionHandled !== true)
    throw $.captureStackTrace(this._exception);
},
 get$hasValue: function() {
  return this.get$isComplete() === true && this._exception == null;
},
 get$isComplete: function() {
  return this._isComplete;
},
 get$stackTrace: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  return this._stackTrace;
},
 get$value: function() {
  if (this.get$isComplete() !== true)
    throw $.captureStackTrace($.FutureNotCompleteException$());
  var t1 = this._exception;
  if (!(t1 == null))
    throw $.captureStackTrace(t1);
  return this._lib0_value;
}
};

$$.CompleterImpl = {"":
 ["_futureImpl"],
 super: "Object",
 completeException$2: function(exception, stackTrace) {
  this._futureImpl._setException$2(exception, stackTrace);
},
 completeException$1: function(exception) {
  return this.completeException$2(exception,null)
},
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
},
 get$future: function() {
  return this._futureImpl;
}
};

$$.HashMapImplementation = {"":
 ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
},
 getValues$0: function() {
  var t1 = {};
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'V'});
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getValues__(list, t1));
  return list;
},
 getKeys$0: function() {
  var t1 = {};
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'K'});
  t1.i_1 = 0;
  this.forEach$1(new $.HashMapImplementation_getKeys__(list, t1));
  return list;
},
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  if (typeof length$ !== 'number')
    return this.forEach$1$bailout(1, f, length$);
  for (var i = 0; i < length$; ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC1))
      f.call$2(key, $.index(this._values, i));
  }
},
 forEach$1$bailout: function(state, f, length$) {
  for (var i = 0; $.ltB(i, length$); ++i) {
    var key = $.index(this._keys, i);
    if (!(key == null) && !(key === $.CTC1))
      f.call$2(key, $.index(this._values, i));
  }
},
 get$length: function() {
  return this._numberOfEntries;
},
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
},
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, null);
    $.indexSet(this._keys, index, $.CTC1);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  }
  return;
},
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if (typeof index !== 'number')
    return this.operator$index$1$bailout(1, index, 0);
  if (index < 0)
    return;
  var t1 = this._values;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.operator$index$1$bailout(2, t1, index);
  if (index !== (index | 0))
    throw $.iae(index);
  var t3 = t1.length;
  if (index < 0 || index >= t3)
    throw $.ioore(index);
  return t1[index];
},
 operator$index$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      index = env0;
      break;
    case 2:
      t1 = env0;
      index = env1;
      break;
  }
  switch (state) {
    case 0:
      var index = this._probeForLookup$1(key);
    case 1:
      state = 0;
      if ($.ltB(index, 0))
        return;
      var t1 = this._values;
    case 2:
      state = 0;
      return $.index(t1, index);
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
  var t3 = t1.length;
  if (index < 0 || index >= t3)
    throw $.ioore(index);
  if (!(t1[index] == null)) {
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this.operator$indexSet$2$bailout(2, key, value, index, t1);
    t3 = t1.length;
    if (index < 0 || index >= t3)
      throw $.ioore(index);
    var t4 = t1[index] === $.CTC1;
    t1 = t4;
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
  t3 = t1.length;
  if (index < 0 || index >= t3)
    throw $.ioore(index);
  t1[index] = key;
  t1 = this._values;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(5, value, t1, index, 0);
  var t5 = t1.length;
  if (index < 0 || index >= t5)
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
            var t3 = $.index(t1, index) === $.CTC1;
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
 _grow$1: function(newCapacity) {
  var capacity = $.get$length(this._keys);
  if (typeof capacity !== 'number')
    return this._grow$1$bailout(1, newCapacity, capacity, 0, 0);
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object' || oldKeys === null || oldKeys.constructor !== Array && !oldKeys.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(2, newCapacity, oldKeys, capacity, 0);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object' || oldValues === null || oldValues.constructor !== Array && !oldValues.is$JavaScriptIndexingBehavior()))
    return this._grow$1$bailout(3, newCapacity, oldKeys, oldValues, capacity);
  this._keys = $.ListFactory_List(newCapacity);
  var t4 = $.ListFactory_List(newCapacity);
  $.setRuntimeTypeInfo(t4, {E: 'V'});
  this._values = t4;
  for (var i = 0; i < capacity; ++i) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var key = oldKeys[i];
    if (key == null || key === $.CTC1)
      continue;
    t1 = oldValues.length;
    if (i < 0 || i >= t1)
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
      this._loadLimit = $.HashMapImplementation__computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 2:
      state = 0;
      var oldValues = this._values;
    case 3:
      state = 0;
      this._keys = $.ListFactory_List(newCapacity);
      var t4 = $.ListFactory_List(newCapacity);
      $.setRuntimeTypeInfo(t4, {E: 'V'});
      this._values = t4;
      for (var i = 0; $.ltB(i, capacity); ++i) {
        var key = $.index(oldKeys, i);
        if (key == null || key === $.CTC1)
          continue;
        var value = $.index(oldValues, i);
        var newIndex = this._probeForAdding$1(key);
        $.indexSet(this._keys, newIndex, key);
        $.indexSet(this._values, newIndex, value);
      }
      this._numberOfDeleted = 0;
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
 _probeForLookup$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
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
 _probeForAdding$1: function(key) {
  var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0))
    return this._probeForAdding$1$bailout(1, key, hash, 0, 0, 0);
  for (var numberOfProbes = 1, insertionIndex = -1; true;) {
    var t1 = this._keys;
    if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
      return this._probeForAdding$1$bailout(2, numberOfProbes, hash, key, insertionIndex, t1);
    var t3 = t1.length;
    if (hash < 0 || hash >= t3)
      throw $.ioore(hash);
    var existingKey = t1[hash];
    if (existingKey == null) {
      if (insertionIndex < 0)
        return hash;
      return insertionIndex;
    } else if ($.eqB(existingKey, key))
      return hash;
    else if (insertionIndex < 0 && $.CTC1 === existingKey)
      insertionIndex = hash;
    var numberOfProbes0 = numberOfProbes + 1;
    hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    if (hash !== (hash | 0))
      return this._probeForAdding$1$bailout(3, key, numberOfProbes0, insertionIndex, hash, 0);
    numberOfProbes = numberOfProbes0;
  }
},
 _probeForAdding$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var key = env0;
      hash = env1;
      break;
    case 2:
      numberOfProbes = env0;
      hash = env1;
      key = env2;
      insertionIndex = env3;
      t1 = env4;
      break;
    case 3:
      key = env0;
      numberOfProbes0 = env1;
      insertionIndex = env2;
      hash = env3;
      break;
  }
  switch (state) {
    case 0:
      var hash = $.HashMapImplementation__firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var insertionIndex = -1;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!true)
                break L0;
              var t1 = this._keys;
            case 2:
              state = 0;
              var existingKey = $.index(t1, hash);
              if (existingKey == null) {
                if ($.ltB(insertionIndex, 0))
                  return hash;
                return insertionIndex;
              } else if ($.eqB(existingKey, key))
                return hash;
              else if ($.ltB(insertionIndex, 0) && $.CTC1 === existingKey)
                insertionIndex = hash;
              var numberOfProbes0 = numberOfProbes + 1;
              hash = $.HashMapImplementation__nextProbe(hash, numberOfProbes, $.get$length(this._keys));
            case 3:
              state = 0;
              numberOfProbes = numberOfProbes0;
          }
  }
},
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $.HashMapImplementation__computeLoadLimit(8);
  this._keys = $.ListFactory_List(8);
  var t1 = $.ListFactory_List(8);
  $.setRuntimeTypeInfo(t1, {E: 'V'});
  this._values = t1;
},
 is$Map: function() { return true; }
};

$$.HashSetImplementation = {"":
 ["_backingMap?"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 iterator$0: function() {
  var t1 = $.HashSetIterator$(this);
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  return t1;
},
 get$length: function() {
  return $.get$length(this._backingMap);
},
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
},
 forEach$1: function(f) {
  $.forEach(this._backingMap, new $.HashSetImplementation_forEach__(f));
},
 remove$1: function(value) {
  var t1 = this._backingMap;
  if (t1.containsKey$1(value) !== true)
    return false;
  t1.remove$1(value);
  return true;
},
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
},
 add$1: function(value) {
  var t1 = this._backingMap;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.add$1$bailout(1, t1, value);
  if (value !== (value | 0))
    throw $.iae(value);
  var t3 = t1.length;
  if (value < 0 || value >= t3)
    throw $.ioore(value);
  t1[value] = value;
},
 add$1$bailout: function(state, t1, value) {
  $.indexSet(t1, value, value);
},
 clear$0: function() {
  $.clear(this._backingMap);
},
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$();
},
 is$Collection: function() { return true; }
};

$$.HashSetIterator = {"":
 ["_nextValidIndex", "_entries"],
 super: "Object",
 _advance$0: function() {
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this._advance$0$bailout(1, t1);
  var length$ = t1.length;
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if (t2 >= length$)
      break;
    t2 = this._nextValidIndex;
    if (t2 !== (t2 | 0))
      throw $.iae(t2);
    var t3 = t1.length;
    if (t2 < 0 || t2 >= t3)
      throw $.ioore(t2);
    entry = t1[t2];
  } while (entry == null || entry === $.CTC1);
},
 _advance$0$bailout: function(state, t1) {
  var length$ = $.get$length(t1);
  var entry = null;
  do {
    var t2 = this._nextValidIndex + 1;
    this._nextValidIndex = t2;
    if ($.geB(t2, length$))
      break;
    entry = $.index(t1, this._nextValidIndex);
  } while (entry == null || entry === $.CTC1);
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var t1 = this._entries;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1);
  var t3 = this._nextValidIndex;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  var t4 = t1.length;
  if (t3 < 0 || t3 >= t4)
    throw $.ioore(t3);
  var res = t1[t3];
  this._advance$0();
  return res;
},
 next$0$bailout: function(state, t1) {
  var res = $.index(t1, this._nextValidIndex);
  this._advance$0();
  return res;
},
 hasNext$0: function() {
  var t1 = this._nextValidIndex;
  var t2 = this._entries;
  if (typeof t2 !== 'string' && (typeof t2 !== 'object' || t2 === null || t2.constructor !== Array && !t2.is$JavaScriptIndexingBehavior()))
    return this.hasNext$0$bailout(1, t1, t2);
  var t4 = t2.length;
  if (t1 >= t4)
    return false;
  if (t1 !== (t1 | 0))
    throw $.iae(t1);
  if (t1 < 0 || t1 >= t4)
    throw $.ioore(t1);
  if (t2[t1] === $.CTC1)
    this._advance$0();
  return this._nextValidIndex < t2.length;
},
 hasNext$0$bailout: function(state, t1, t2) {
  if ($.geB(t1, $.get$length(t2)))
    return false;
  if ($.index(t2, this._nextValidIndex) === $.CTC1)
    this._advance$0();
  return $.lt(this._nextValidIndex, $.get$length(t2));
},
 HashSetIterator$1: function(set_) {
  this._advance$0();
}
};

$$._DeletedKeySentinel = {"":
 [],
 super: "Object"
};

$$.KeyValuePair = {"":
 ["value=", "key?"],
 super: "Object"
};

$$.LinkedHashMapImplementation = {"":
 ["_map", "_list"],
 super: "Object",
 toString$0: function() {
  return $.Maps_mapToString(this);
},
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._list);
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 get$length: function() {
  return $.get$length(this._map);
},
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
},
 forEach$1: function(f) {
  $.forEach(this._list, new $.LinkedHashMapImplementation_forEach__(f));
},
 getValues$0: function() {
  var t1 = {};
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'V'});
  t1.index_1 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getValues__(list, t1));
  return list;
},
 getKeys$0: function() {
  var t1 = {};
  var list = $.ListFactory_List($.get$length(this));
  $.setRuntimeTypeInfo(list, {E: 'K'});
  t1.index_1 = 0;
  $.forEach(this._list, new $.LinkedHashMapImplementation_getKeys__(list, t1));
  return list;
},
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry == null)
    return;
  entry.remove$0();
  return entry.get$element().get$value();
},
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry == null)
    return;
  return entry.get$element().get$value();
},
 operator$indexSet$2: function(key, value) {
  var t1 = this._map;
  if (typeof t1 !== 'object' || t1 === null || (t1.constructor !== Array || !!t1.immutable$list) && !t1.is$JavaScriptIndexingBehavior())
    return this.operator$indexSet$2$bailout(1, key, value, t1);
  if (t1.containsKey$1(key) === true) {
    if (key !== (key | 0))
      throw $.iae(key);
    var t2 = t1.length;
    if (key < 0 || key >= t2)
      throw $.ioore(key);
    t1[key].get$element().set$value(value);
  } else {
    t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    t2 = t2.lastEntry$0();
    if (key !== (key | 0))
      throw $.iae(key);
    var t3 = t1.length;
    if (key < 0 || key >= t3)
      throw $.ioore(key);
    t1[key] = t2;
  }
},
 operator$indexSet$2$bailout: function(state, key, value, t1) {
  if (t1.containsKey$1(key) === true)
    $.index(t1, key).get$element().set$value(value);
  else {
    var t2 = this._list;
    $.addLast(t2, $.KeyValuePair$(key, value));
    $.indexSet(t1, key, t2.lastEntry$0());
  }
},
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$();
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, {E: 'KeyValuePair<K, V>'});
  this._list = t1;
},
 is$Map: function() { return true; }
};

$$.DoubleLinkedQueueEntry = {"":
 ["_element?", "_next=", "_previous="],
 super: "Object",
 get$element: function() {
  return this._element;
},
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
},
 _asNonSentinelEntry$0: function() {
  return this;
},
 remove$0: function() {
  var t1 = this._next;
  this._previous.set$_next(t1);
  t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = null;
  this._previous = null;
  return this._element;
},
 prepend$1: function(e) {
  var t1 = $.DoubleLinkedQueueEntry$(e);
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  t1._link$2(this._previous, this);
},
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
},
 DoubleLinkedQueueEntry$1: function(e) {
  this._element = e;
}
};

$$._DoubleLinkedQueueEntrySentinel = {"":
 ["_element", "_next", "_previous"],
 super: "DoubleLinkedQueueEntry",
 get$element: function() {
  throw $.captureStackTrace($.CTC5);
},
 _asNonSentinelEntry$0: function() {
  return;
},
 remove$0: function() {
  throw $.captureStackTrace($.CTC5);
},
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
}
};

$$.DoubleLinkedQueue = {"":
 ["_sentinel"],
 super: "Object",
 toString$0: function() {
  return $.Collections_collectionToString(this);
},
 iterator$0: function() {
  var t1 = $._DoubleLinkedQueueIterator$(this._sentinel);
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  return t1;
},
 forEach$1: function(f) {
  var t1 = this._sentinel;
  var entry = t1.get$_next();
  for (; !(entry == null ? t1 == null : entry === t1);) {
    var nextEntry = entry.get$_next();
    f.call$1(entry.get$_element());
    entry = nextEntry;
  }
},
 clear$0: function() {
  var t1 = this._sentinel;
  t1.set$_next(t1);
  t1.set$_previous(t1);
},
 isEmpty$0: function() {
  var t1 = this._sentinel;
  var t2 = t1.get$_next();
  return t2 == null ? t1 == null : t2 === t1;
},
 get$length: function() {
  var t1 = {};
  t1.counter_1 = 0;
  this.forEach$1(new $.DoubleLinkedQueue_length__(t1));
  return t1.counter_1;
},
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
},
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
},
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
},
 add$1: function(value) {
  this.addLast$1(value);
},
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
},
 DoubleLinkedQueue$0: function() {
  var t1 = $._DoubleLinkedQueueEntrySentinel$();
  $.setRuntimeTypeInfo(t1, {E: 'E'});
  this._sentinel = t1;
},
 is$Collection: function() { return true; }
};

$$._DoubleLinkedQueueIterator = {"":
 ["_currentEntry", "_sentinel"],
 super: "Object",
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
},
 hasNext$0: function() {
  var t1 = this._currentEntry.get$_next();
  var t2 = this._sentinel;
  return !(t1 == null ? t2 == null : t1 === t2);
},
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
}
};

$$.StringBufferImpl = {"":
 ["_length", "_buffer"],
 super: "Object",
 toString$0: function() {
  if ($.get$length(this._buffer) === 0)
    return '';
  if ($.get$length(this._buffer) === 1)
    return $.index(this._buffer, 0);
  var result = $.StringBase_concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
},
 clear$0: function() {
  var t1 = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(t1, {E: 'String'});
  this._buffer = t1;
  this._length = 0;
  return this;
},
 add$1: function(obj) {
  var str = $.toString(obj);
  if (str == null || $.isEmpty(str) === true)
    return this;
  $.add$1(this._buffer, str);
  var t1 = this._length;
  if (typeof t1 !== 'number')
    return this.add$1$bailout(1, str, t1);
  var t3 = $.get$length(str);
  if (typeof t3 !== 'number')
    return this.add$1$bailout(2, t1, t3);
  this._length = t1 + t3;
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
      var t1 = this._length;
    case 1:
      state = 0;
      var t3 = $.get$length(str);
    case 2:
      state = 0;
      this._length = $.add(t1, t3);
      return this;
  }
},
 isEmpty$0: function() {
  return this._length === 0;
},
 get$length: function() {
  return this._length;
},
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
}
};

$$.JSSyntaxRegExp = {"":
 ["ignoreCase?", "multiLine?", "pattern?"],
 super: "Object",
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$(this, str);
},
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
},
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m == null)
    return;
  var matchStart = $.regExpMatchStart(m);
  var t1 = $.get$length($.index(m, 0));
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var matchEnd = matchStart + t1;
  return $.MatchImplementation$(this.pattern, str, matchStart, matchEnd, m);
},
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
},
 is$JSSyntaxRegExp: true
};

$$.MatchImplementation = {"":
 ["_groups", "_end", "_start", "str", "pattern?"],
 super: "Object",
 operator$index$1: function(index) {
  return this.group$1(index);
},
 group$1: function(index) {
  return $.index(this._groups, index);
}
};

$$._AllMatchesIterable = {"":
 ["_str", "_re"],
 super: "Object",
 iterator$0: function() {
  return $._AllMatchesIterator$(this._re, this._str);
}
};

$$._AllMatchesIterator = {"":
 ["_done", "_next=", "_str", "_re"],
 super: "Object",
 hasNext$0: function() {
  if (this._done === true)
    return false;
  else if (!(this._next == null))
    return true;
  this._next = this._re.firstMatch$1(this._str);
  if (this._next == null) {
    this._done = true;
    return false;
  } else
    return true;
},
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var next = this._next;
  this._next = null;
  return next;
}
};

$$.ListIterator = {"":
 ["list", "i"],
 super: "Object",
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
},
 hasNext$0: function() {
  var t1 = this.i;
  if (typeof t1 !== 'number')
    return this.hasNext$0$bailout(1, t1);
  return t1 < this.list.length;
},
 hasNext$0$bailout: function(state, t1) {
  return $.lt(t1, this.list.length);
}
};

$$.StackTrace = {"":
 ["stack"],
 super: "Object",
 toString$0: function() {
  var t1 = this.stack;
  return !(t1 == null) ? t1 : '';
}
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
},
 is$Function: true
};

$$.MetaInfo = {"":
 ["set?", "tags", "tag?"],
 super: "Object"
};

$$.StringMatch = {"":
 ["pattern?", "str", "_lib1_start"],
 super: "Object",
 group$1: function(group_) {
  if (!$.eqB(group_, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(group_));
  return this.pattern;
},
 operator$index$1: function(g) {
  return this.group$1(g);
}
};

$$.Object = {"":
 [],
 super: "",
 toString$0: function() {
  return $.Primitives_objectToString(this);
}
};

$$.IndexOutOfRangeException = {"":
 ["_value"],
 super: "Object",
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.S(this._value);
},
 is$Exception: true
};

$$.NoSuchMethodException = {"":
 ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"],
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
    var t2 = t1.length;
    if (i < 0 || i >= t2)
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
    t2 = t1.length;
    if (i < 0 || i >= t2)
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
},
 is$Exception: true
};

$$.ObjectNotClosureException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Object is not closure';
},
 is$Exception: true
};

$$.IllegalArgumentException = {"":
 ["_arg"],
 super: "Object",
 toString$0: function() {
  return 'Illegal argument(s): ' + $.S(this._arg);
},
 is$Exception: true
};

$$.StackOverflowException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Stack Overflow';
},
 is$Exception: true
};

$$.FormatException = {"":
 ["message"],
 super: "Object",
 toString$0: function() {
  return 'FormatException: ' + $.S(this.message);
},
 is$Exception: true
};

$$.NullPointerException = {"":
 ["arguments", "functionName"],
 super: "Object",
 get$exceptionName: function() {
  return 'NullPointerException';
},
 toString$0: function() {
  var t1 = this.functionName;
  if (t1 == null)
    return this.get$exceptionName();
  else
    return $.S(this.get$exceptionName()) + ' : method: \'' + $.S(t1) + '\'\n' + 'Receiver: null\n' + 'Arguments: ' + $.S(this.arguments);
},
 is$Exception: true
};

$$.NoMoreElementsException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'NoMoreElementsException';
},
 is$Exception: true
};

$$.EmptyQueueException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'EmptyQueueException';
},
 is$Exception: true
};

$$.UnsupportedOperationException = {"":
 ["_message"],
 super: "Object",
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.S(this._message);
},
 is$Exception: true
};

$$.IllegalJSRegExpException = {"":
 ["_errmsg", "_pattern"],
 super: "Object",
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.S(this._pattern) + '\' \'' + $.S(this._errmsg) + '\'';
},
 is$Exception: true
};

$$.FutureNotCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future has not been completed';
},
 is$Exception: true
};

$$.FutureAlreadyCompleteException = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Exception: future already completed';
},
 is$Exception: true
};

$$.Classic = {"":
 ["m"],
 super: "Object",
 sqrTo$2: function(x, r) {
  x.squareTo$1(r);
  this.reduce$1(r);
},
 mulTo$3: function(x, y, r) {
  x.multiplyTo$2(y, r);
  this.reduce$1(r);
},
 reduce$1: function(x) {
  x.divRemTo$3(this.m, null, x);
},
 revert$1: function(x) {
  return x;
},
 convert$1: function(x) {
  if ($.ltB(x.s, 0) || $.geB(x.compareTo$1(this.m), 0))
    return x.mod$1(this.m);
  else
    return x;
},
 Classic$1: function(m) {
  this.m = m;
}
};

$$.Montgomery = {"":
 ["mt2", "um", "mph", "mpl", "mp", "m"],
 super: "Object",
 mulTo$3: function(x, y, r) {
  x.multiplyTo$2(y, r);
  this.reduce$1(r);
},
 sqrTo$2: function(x, r) {
  x.squareTo$1(r);
  this.reduce$1(r);
},
 reduce$1: function(x) {
  var x_array = x.get$array();
  if (typeof x_array !== 'object' || x_array === null || (x_array.constructor !== Array || !!x_array.immutable$list) && !x_array.is$JavaScriptIndexingBehavior())
    return this.reduce$1$bailout(1, x, x_array, 0, 0, 0, 0);
  var t1 = this.mt2;
  if (typeof t1 !== 'number')
    return this.reduce$1$bailout(2, x, t1, x_array, 0, 0, 0);
  for (; $.leB(x.get$t(), t1);) {
    var t2 = x.get$t();
    x.set$t($.add(t2, 1));
    if (t2 !== (t2 | 0))
      throw $.iae(t2);
    var t3 = x_array.length;
    if (t2 < 0 || t2 >= t3)
      throw $.ioore(t2);
    x_array[t2] = 0;
  }
  t1 = this.m;
  t2 = this.mpl;
  if (t2 !== (t2 | 0))
    return this.reduce$1$bailout(3, x, x_array, t1, t2, 0, 0);
  var t4 = this.mph;
  if (t4 !== (t4 | 0))
    return this.reduce$1$bailout(4, x, x_array, t1, t2, t4, 0);
  var t6 = this.um;
  if (t6 !== (t6 | 0))
    return this.reduce$1$bailout(5, x, t6, x_array, t1, t2, t4);
  var i = 0;
  for (; $.ltB(i, t1.get$t()); ++i) {
    t3 = x_array.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    var j = $.and(x_array[i], 32767);
    var t5 = $.mul(j, t2);
    var t7 = $.mul(j, t4);
    var t8 = x_array.length;
    if (i < 0 || i >= t8)
      throw $.ioore(i);
    var u0 = $.and($.add(t5, $.shl($.and($.add(t7, $.mul($.shr(x_array[i], 15), t2)), t6), 15)), $.BI_DM);
    var t9 = t1.get$t();
    if (typeof t9 !== 'number')
      throw $.iae(t9);
    j = i + t9;
    t9 = t1.am$6(0, u0, x, i, 0, t1.get$t());
    if (j !== (j | 0))
      throw $.iae(j);
    var t10 = x_array.length;
    if (j < 0 || j >= t10)
      throw $.ioore(j);
    t9 = $.add(x_array[j], t9);
    var t11 = x_array.length;
    if (j < 0 || j >= t11)
      throw $.ioore(j);
    x_array[j] = t9;
    while (true) {
      if (j !== (j | 0))
        throw $.iae(j);
      t3 = x_array.length;
      if (j < 0 || j >= t3)
        throw $.ioore(j);
      if (!$.geB(x_array[j], $.BI_DV))
        break;
      t3 = $.BI_DV;
      t5 = x_array.length;
      if (j < 0 || j >= t5)
        throw $.ioore(j);
      t3 = $.sub(x_array[j], t3);
      t7 = x_array.length;
      if (j < 0 || j >= t7)
        throw $.ioore(j);
      x_array[j] = t3;
      ++j;
      if (j !== (j | 0))
        throw $.iae(j);
      t3 = x_array.length;
      if (j < 0 || j >= t3)
        throw $.ioore(j);
      t8 = $.add(x_array[j], 1);
      t9 = x_array.length;
      if (j < 0 || j >= t9)
        throw $.ioore(j);
      x_array[j] = t8;
    }
  }
  x.clamp$0();
  x.drShiftTo$2(t1.get$t(), x);
  if ($.geB($.compareTo(x, t1), 0))
    x.subTo$2(t1, x);
},
 reduce$1$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var x = env0;
      x_array = env1;
      break;
    case 2:
      x = env0;
      t1 = env1;
      x_array = env2;
      break;
    case 3:
      x = env0;
      x_array = env1;
      t1 = env2;
      t2 = env3;
      break;
    case 4:
      x = env0;
      x_array = env1;
      t1 = env2;
      t2 = env3;
      t4 = env4;
      break;
    case 5:
      x = env0;
      t6 = env1;
      x_array = env2;
      t1 = env3;
      t2 = env4;
      t4 = env5;
      break;
  }
  switch (state) {
    case 0:
      var x_array = x.get$array();
    case 1:
      state = 0;
      var t1 = this.mt2;
    case 2:
      state = 0;
      for (; $.leB(x.get$t(), t1);) {
        var t2 = x.get$t();
        x.set$t($.add(t2, 1));
        $.indexSet(x_array, t2, 0);
      }
      t1 = this.m;
      t2 = this.mpl;
    case 3:
      state = 0;
      var t4 = this.mph;
    case 4:
      state = 0;
      var t6 = this.um;
    case 5:
      state = 0;
      var i = 0;
      for (; $.ltB(i, t1.get$t()); ++i) {
        var j = $.and($.index(x_array, i), 32767);
        var u0 = $.and($.add($.mul(j, t2), $.shl($.and($.add($.mul(j, t4), $.mul($.shr($.index(x_array, i), 15), t2)), t6), 15)), $.BI_DM);
        var t3 = t1.get$t();
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        var j0 = i + t3;
        t3 = t1.am$6(0, u0, x, i, 0, t1.get$t());
        $.indexSet(x_array, j0, $.add($.index(x_array, j0), t3));
        for (j = j0; $.geB($.index(x_array, j), $.BI_DV);) {
          t3 = $.BI_DV;
          $.indexSet(x_array, j, $.sub($.index(x_array, j), t3));
          ++j;
          $.indexSet(x_array, j, $.add($.index(x_array, j), 1));
        }
      }
      x.clamp$0();
      x.drShiftTo$2(t1.get$t(), x);
      if ($.geB($.compareTo(x, t1), 0))
        x.subTo$2(t1, x);
  }
},
 revert$1: function(x) {
  var r = $.nbi();
  x.copyTo$1(r);
  this.reduce$1(r);
  return r;
},
 convert$1: function(x) {
  var r = $.nbi();
  var t1 = x.abs$0();
  var t2 = this.m;
  t1.dlShiftTo$2(t2.get$t(), r);
  r.divRemTo$3(t2, null, r);
  if ($.ltB(x.s, 0) && $.gtB(r.compareTo$1($.BigInteger_ZERO()), 0))
    t2.subTo$2(r, r);
  return r;
},
 Montgomery$1: function(m) {
  this.m = m;
  this.mp = m.invDigit$0();
  var t1 = this.mp;
  this.mpl = $.and(t1, 32767);
  this.mph = $.shr(t1, 15);
  var t2 = $.sub($.BI_DB, 15);
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  this.um = $.shl(1, t2) - 1;
  var t3 = m.get$t();
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  this.mt2 = 2 * t3;
}
};

$$.Barrett = {"":
 ["mu", "q3", "r2", "m"],
 super: "Object",
 mulTo$3: function(x, y, r) {
  x.multiplyTo$2(y, r);
  this.reduce$1(r);
},
 sqrTo$2: function(x, r) {
  x.squareTo$1(r);
  this.reduce$1(r);
},
 reduce$1: function(x) {
  var t1 = this.m;
  var t2 = $.sub(t1.get$t(), 1);
  var t3 = this.r2;
  x.drShiftTo$2(t2, t3);
  if ($.gtB(x.get$t(), $.add(t1.get$t(), 1))) {
    x.set$t($.add(t1.get$t(), 1));
    x.clamp$0();
  }
  t2 = this.mu;
  var t4 = $.add(t1.get$t(), 1);
  var t5 = this.q3;
  t2.multiplyUpperTo$3(t3, t4, t5);
  t1.multiplyLowerTo$3(t5, $.add(t1.get$t(), 1), t3);
  for (; $.ltB($.compareTo(x, t3), 0);)
    x.dAddOffset$2(1, $.add(t1.get$t(), 1));
  x.subTo$2(t3, x);
  for (; $.geB($.compareTo(x, t1), 0);)
    x.subTo$2(t1, x);
},
 revert$1: function(x) {
  return x;
},
 convert$1: function(x) {
  if (!$.ltB(x.s, 0)) {
    var t1 = x.t;
    var t2 = this.m.get$t();
    if (typeof t2 !== 'number')
      throw $.iae(t2);
    t1 = $.gtB(t1, 2 * t2);
  } else
    t1 = true;
  if (t1)
    return x.mod$1(this.m);
  else if ($.ltB(x.compareTo$1(this.m), 0))
    return x;
  else {
    var r = $.nbi();
    x.copyTo$1(r);
    this.reduce$1(r);
    return r;
  }
},
 Barrett$1: function(m) {
  this.r2 = $.nbi();
  this.q3 = $.nbi();
  var t1 = $.BigInteger_ONE();
  var t2 = m.get$t();
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  t2 = 2 * t2;
  var t3 = this.r2;
  t1.dlShiftTo$2(t2, t3);
  this.mu = t3.divide$1(m);
  this.m = m;
}
};

$$.BigInteger = {"":
 ["s=", "t=", "BI_RC", "BI_RM", "am", "array?", "j_lm", "canary", "lplim", "lowprimes"],
 super: "Object",
 millerRabin$1: function(t) {
  var n1 = this.subtract$1($.BigInteger_ONE());
  var k = n1.getLowestSetBit$0();
  if (typeof k !== 'number')
    return this.millerRabin$1$bailout(1, t, n1, k, 0, 0);
  if (k <= 0)
    return false;
  var r = n1.shiftRight$1(k);
  var t1 = $.shr($.add(t, 1), 1);
  var t2 = this.lowprimes;
  t = $.gtB(t1, t2.length) ? t2.length : t1;
  if (t !== (t | 0))
    return this.millerRabin$1$bailout(2, r, t2, t, n1, k);
  var a = $.nbi();
  for (var i = 0; i < t; ++i) {
    t1 = t2.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    a.fromInt$1(t2[i]);
    var y = a.modPow$2(r, this);
    if (!$.eqB($.compareTo(y, $.BigInteger_ONE()), 0) && !$.eqB($.compareTo(y, n1), 0)) {
      var j = 1;
      while (true) {
        var j0 = j + 1;
        if (!(j < k && !$.eqB($.compareTo(y, n1), 0)))
          break;
        y = y.modPowInt$2(2, this);
        if ($.eqB($.compareTo(y, $.BigInteger_ONE()), 0))
          return false;
        j = j0;
      }
      if (!$.eqB($.compareTo(y, n1), 0))
        return false;
    }
  }
  return true;
},
 millerRabin$1$bailout: function(state, env0, env1, env2, env3, env4) {
  switch (state) {
    case 1:
      var t = env0;
      n1 = env1;
      k = env2;
      break;
    case 2:
      r = env0;
      t2 = env1;
      t = env2;
      n1 = env3;
      k = env4;
      break;
  }
  switch (state) {
    case 0:
      var n1 = this.subtract$1($.BigInteger_ONE());
      var k = n1.getLowestSetBit$0();
    case 1:
      state = 0;
      if ($.leB(k, 0))
        return false;
      var r = n1.shiftRight$1(k);
      var t1 = $.shr($.add(t, 1), 1);
      var t2 = this.lowprimes;
      t = $.gtB(t1, t2.length) ? t2.length : t1;
    case 2:
      state = 0;
      var a = $.nbi();
      for (var i = 0; $.ltB(i, t); ++i) {
        t1 = t2.length;
        if (i < 0 || i >= t1)
          throw $.ioore(i);
        a.fromInt$1(t2[i]);
        var y = a.modPow$2(r, this);
        if (!$.eqB($.compareTo(y, $.BigInteger_ONE()), 0) && !$.eqB($.compareTo(y, n1), 0)) {
          var j = 1;
          while (true) {
            var j0 = j + 1;
            if (!($.ltB(j, k) && !$.eqB($.compareTo(y, n1), 0)))
              break;
            y = y.modPowInt$2(2, this);
            if ($.eqB($.compareTo(y, $.BigInteger_ONE()), 0))
              return false;
            j = j0;
          }
          if (!$.eqB($.compareTo(y, n1), 0))
            return false;
        }
      }
      return true;
  }
},
 isProbablePrime$1: function(t) {
  var x = this.abs$0();
  var x_array = x.get$array();
  if (typeof x_array !== 'string' && (typeof x_array !== 'object' || x_array === null || x_array.constructor !== Array && !x_array.is$JavaScriptIndexingBehavior()))
    return this.isProbablePrime$1$bailout(1, t, x, x_array, 0, 0, 0, 0, 0);
  var t1 = x.get$t();
  if (typeof t1 !== 'number')
    return this.isProbablePrime$1$bailout(2, t, t1, x, x_array, 0, 0, 0, 0);
  if (t1 === 1) {
    t1 = x_array.length;
    if (0 >= t1)
      throw $.ioore(0);
    var t2 = x_array[0];
    if (typeof t2 !== 'number')
      return this.isProbablePrime$1$bailout(3, t, t2, x, x_array, 0, 0, 0, 0);
    var t4 = this.lowprimes;
    var t5 = t4.length;
    var t6 = t5 - 1;
    if (t6 < 0 || t6 >= t5)
      throw $.ioore(t6);
    t6 = t4[t6];
    if (typeof t6 !== 'number')
      return this.isProbablePrime$1$bailout(4, t, t2, t6, x, x_array, 0, 0, 0);
    t6 = t2 <= t6;
    t1 = t6;
  } else
    t1 = false;
  if (t1) {
    for (var t1 = this.lowprimes, i = 0; t2 = t1.length, i < t2; ++i) {
      var t3 = x_array.length;
      if (0 >= t3)
        throw $.ioore(0);
      t4 = x_array[0];
      if (i < 0 || i >= t2)
        throw $.ioore(i);
      if ($.eqB(t4, t1[i]))
        return true;
    }
    return false;
  }
  if ($.isEven(x) === true)
    return false;
  t1 = this.lowprimes;
  t2 = this.lplim;
  if (typeof t2 !== 'number')
    return this.isProbablePrime$1$bailout(5, t, t2, x, t1, 0, 0, 0, 0);
  i = 1;
  for (; t3 = t1.length, i < t3;) {
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    var m = t1[i];
    if (typeof m !== 'number')
      return this.isProbablePrime$1$bailout(6, t, m, i, t1, t2, x, 0, 0);
    var j = i + 1;
    while (true) {
      if (!(j < t3 && m < t2))
        break;
      var j0 = j + 1;
      if (j < 0 || j >= t3)
        throw $.ioore(j);
      t4 = t1[j];
      if (typeof t4 !== 'number')
        return this.isProbablePrime$1$bailout(7, t, i, j0, t4, t1, m, t2, x);
      m *= t4;
      j = j0;
    }
    m = x.modInt$1(m);
    if (typeof m !== 'number')
      return this.isProbablePrime$1$bailout(8, t, i, t1, j, t2, x, m, 0);
    for (t3 = t1.length; i < j;) {
      var i0 = i + 1;
      if (i < 0 || i >= t3)
        throw $.ioore(i);
      t4 = t1[i];
      if (typeof t4 !== 'number')
        return this.isProbablePrime$1$bailout(9, i0, t4, t1, j, m, 0, 0, 0);
      if ($.mod(m, t4) === 0)
        return false;
      i = i0;
    }
  }
  return x.millerRabin$1(t);
},
 isProbablePrime$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
  switch (state) {
    case 1:
      var t = env0;
      x = env1;
      x_array = env2;
      break;
    case 2:
      t = env0;
      t1 = env1;
      x = env2;
      x_array = env3;
      break;
    case 3:
      t = env0;
      t1 = env1;
      x = env2;
      x_array = env3;
      break;
    case 4:
      t = env0;
      t1 = env1;
      t4 = env2;
      x = env3;
      x_array = env4;
      break;
    case 5:
      t = env0;
      t2 = env1;
      x = env2;
      t1 = env3;
      break;
    case 6:
      t = env0;
      m = env1;
      i = env2;
      t1 = env3;
      t2 = env4;
      x = env5;
      break;
    case 7:
      t = env0;
      i = env1;
      j0 = env2;
      t4 = env3;
      t1 = env4;
      m = env5;
      t2 = env6;
      x = env7;
      break;
    case 8:
      t = env0;
      i = env1;
      t1 = env2;
      j = env3;
      t2 = env4;
      x = env5;
      m = env6;
      break;
    case 9:
      i0 = env0;
      t4 = env1;
      t1 = env2;
      j = env3;
      m = env4;
      break;
  }
  switch (state) {
    case 0:
      var x = this.abs$0();
      var x_array = x.get$array();
    case 1:
      state = 0;
      var t1 = x.get$t();
    case 2:
      state = 0;
    default:
      if (state === 4 || state === 3 || state === 0 && $.eqB(t1, 1))
        switch (state) {
          case 0:
            t1 = $.index(x_array, 0);
          case 3:
            state = 0;
            var t3 = this.lowprimes;
            var t4 = t3.length - 1;
            var t5 = t3.length;
            if (t4 < 0 || t4 >= t5)
              throw $.ioore(t4);
            t4 = t3[t4];
          case 4:
            state = 0;
            t4 = $.leB(t1, t4);
            t1 = t4;
        }
      else
        t1 = false;
      if (t1) {
        for (var t1 = this.lowprimes, i = 0; i < t1.length; ++i) {
          var t2 = $.index(x_array, 0);
          t3 = t1.length;
          if (i < 0 || i >= t3)
            throw $.ioore(i);
          if ($.eqB(t2, t1[i]))
            return true;
        }
        return false;
      }
      if ($.isEven(x) === true)
        return false;
      t1 = this.lowprimes;
      t2 = this.lplim;
    case 5:
      state = 0;
      i = 1;
    case 6:
    case 7:
    case 8:
    case 9:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!(i < t1.length))
                break L0;
              t3 = t1.length;
              if (i < 0 || i >= t3)
                throw $.ioore(i);
              var m = t1[i];
            case 6:
              state = 0;
              var j = i + 1;
            case 7:
              L1:
                while (true)
                  switch (state) {
                    case 0:
                      if (!(j < t1.length && $.ltB(m, t2)))
                        break L1;
                      var j0 = j + 1;
                      t3 = t1.length;
                      if (j < 0 || j >= t3)
                        throw $.ioore(j);
                      t4 = t1[j];
                    case 7:
                      state = 0;
                      m = $.mul(m, t4);
                      j = j0;
                  }
              m = x.modInt$1(m);
            case 8:
              state = 0;
            case 9:
              L2:
                while (true)
                  switch (state) {
                    case 0:
                      if (!(i < j))
                        break L2;
                      var i0 = i + 1;
                      t3 = t1.length;
                      if (i < 0 || i >= t3)
                        throw $.ioore(i);
                      t4 = t1[i];
                    case 9:
                      state = 0;
                      if ($.eqB($.mod(m, t4), 0))
                        return false;
                      i = i0;
                  }
          }
      return x.millerRabin$1(t);
  }
},
 modInt$1: function(n) {
  if (typeof n !== 'number')
    return this.modInt$1$bailout(1, n, 0, 0, 0, 0, 0);
  var this_array = this.array;
  if (n <= 0)
    return 0;
  var t1 = $.BI_DV;
  if (typeof t1 !== 'number')
    return this.modInt$1$bailout(2, n, this_array, t1, 0, 0, 0);
  var d = $.mod(t1, n);
  t1 = this.s;
  if (typeof t1 !== 'number')
    return this.modInt$1$bailout(3, n, this_array, t1, d, 0, 0);
  var r = t1 < 0 ? n - 1 : 0;
  t1 = this.t;
  if (typeof t1 !== 'number')
    return this.modInt$1$bailout(4, n, this_array, r, t1, d, 0);
  if (t1 > 0)
    if (d === 0) {
      t1 = this_array.operator$index$1(0);
      if (typeof t1 !== 'number')
        return this.modInt$1$bailout(5, n, t1, 0, 0, 0, 0);
      r = $.mod(t1, n);
    } else {
      if (typeof t1 !== 'number')
        return this.modInt$1$bailout(6, n, t1, this_array, r, d, 0);
      var i = t1 - 1;
      for (; i >= 0; --i) {
        t1 = d * r;
        var t2 = this_array.operator$index$1(i);
        if (typeof t2 !== 'number')
          return this.modInt$1$bailout(7, n, t2, i, this_array, t1, d);
        r = $.mod(t1 + t2, n);
      }
    }
  return r;
},
 modInt$1$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var n = env0;
      break;
    case 2:
      n = env0;
      this_array = env1;
      t1 = env2;
      break;
    case 3:
      n = env0;
      this_array = env1;
      t1 = env2;
      d = env3;
      break;
    case 4:
      n = env0;
      this_array = env1;
      r = env2;
      t1 = env3;
      d = env4;
      break;
    case 5:
      n = env0;
      t1 = env1;
      break;
    case 6:
      n = env0;
      t1 = env1;
      this_array = env2;
      r = env3;
      d = env4;
      break;
    case 7:
      n = env0;
      t2 = env1;
      i = env2;
      this_array = env3;
      t1 = env4;
      d = env5;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var this_array = this.array;
      if ($.leB(n, 0))
        return 0;
      var t1 = $.BI_DV;
    case 2:
      state = 0;
      var d = $.mod(t1, n);
      t1 = this.s;
    case 3:
      state = 0;
      var r = $.ltB(t1, 0) ? $.sub(n, 1) : 0;
      t1 = this.t;
    case 4:
      state = 0;
    default:
      if (state === 7 || state === 6 || state === 5 || state === 0 && $.gtB(t1, 0))
        switch (state) {
          case 0:
          default:
            if (state === 5 || state === 0 && $.eqB(d, 0))
              switch (state) {
                case 0:
                  t1 = $.index(this_array, 0);
                case 5:
                  state = 0;
                  r = $.mod(t1, n);
              }
            else
              switch (state) {
                case 0:
                  t1 = this.t;
                case 6:
                  state = 0;
                  var i = $.sub(t1, 1);
                case 7:
                  L0:
                    while (true)
                      switch (state) {
                        case 0:
                          if (!$.geB(i, 0))
                            break L0;
                          t1 = $.mul(d, r);
                          var t2 = $.index(this_array, i);
                        case 7:
                          state = 0;
                          r = $.mod($.add(t1, t2), n);
                          i = $.sub(i, 1);
                      }
              }
        }
      return r;
  }
},
 modPow$2: function(e, m) {
  var e_array = e.get$array();
  if (typeof e_array !== 'string' && (typeof e_array !== 'object' || e_array === null || e_array.constructor !== Array && !e_array.is$JavaScriptIndexingBehavior()))
    return this.modPow$2$bailout(1, e, m, e_array, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var i = e.bitLength$0();
  if (typeof i !== 'number')
    return this.modPow$2$bailout(2, e, m, e_array, i, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var r = $.BigInteger_nbv(1);
  if (i <= 0)
    return r;
  else if (i < 18)
    var k = 1;
  else if (i < 48)
    k = 3;
  else if (i < 144)
    k = 4;
  else
    k = i < 768 ? 5 : 6;
  if (i < 8)
    var z = $.Classic$(m);
  else
    z = m.isEven$0() === true ? $.Barrett$(m) : $.Montgomery$(m);
  var g = $.HashMapImplementation$();
  var k1 = k - 1;
  var km = $.shl(1, k) - 1;
  g.operator$indexSet$2(1, z.convert$1(this));
  if (k > 1) {
    var g2 = $.nbi();
    z.sqrTo$2(g.operator$index$1(1), g2);
    for (var n = 3; n <= km;) {
      g.operator$indexSet$2(n, $.nbi());
      z.mulTo$3(g2, g.operator$index$1(n - 2), g.operator$index$1(n));
      n += 2;
    }
  } else
    n = 3;
  var t1 = e.get$t();
  if (typeof t1 !== 'number')
    return this.modPow$2$bailout(3, z, g, e_array, k1, k, r, km, t1, n, 0, 0, 0, 0, 0, 0, 0);
  var j = t1 - 1;
  var r2 = $.nbi();
  if (j !== (j | 0))
    throw $.iae(j);
  t1 = e_array.length;
  if (j < 0 || j >= t1)
    throw $.ioore(j);
  var t3 = this.nbits$1(e_array[j]);
  if (t3 !== (t3 | 0))
    return this.modPow$2$bailout(4, r2, z, g, t3, e_array, k1, k, r, km, n, j, 0, 0, 0, 0, 0);
  i = t3 - 1;
  for (var w = null, is1 = true, t = null; j >= 0;) {
    t1 = i >= k1;
    var t2 = e_array.length;
    if (t1) {
      if (j !== (j | 0))
        throw $.iae(j);
      if (j < 0 || j >= t2)
        throw $.ioore(j);
      t1 = e_array[j];
      if (t1 !== (t1 | 0))
        return this.modPow$2$bailout(5, e_array, t1, r, j, z, is1, g, i, t, r2, k1, k, km, 0, 0, 0);
      w = ($.shr(t1, i - k1) & km) >>> 0;
    } else {
      if (j !== (j | 0))
        throw $.iae(j);
      if (j < 0 || j >= t2)
        throw $.ioore(j);
      t1 = e_array[j];
      if (t1 !== (t1 | 0))
        return this.modPow$2$bailout(6, e_array, r, j, t1, z, is1, g, k1, t, r2, i, k, km, 0, 0, 0);
      var t4 = i + 1;
      t1 = (t1 & $.shl(1, t4) - 1) >>> 0;
      w = $.shl(t1, k1 - i);
      if (j > 0) {
        t1 = j - 1;
        if (t1 !== (t1 | 0))
          throw $.iae(t1);
        t2 = e_array.length;
        if (t1 < 0 || t1 >= t2)
          throw $.ioore(t1);
        t1 = e_array[t1];
        if (t1 !== (t1 | 0))
          return this.modPow$2$bailout(9, t1, e_array, r, j, z, is1, g, i, t, r2, k1, k, km, w, i, 0);
        t4 = $.BI_DB;
        if (t4 !== (t4 | 0))
          return this.modPow$2$bailout(10, t1, e_array, t4, r, j, z, is1, g, i, t, r2, k1, k, km, w, i);
        w = (w | $.shr(t1, t4 + i - k1)) >>> 0;
      }
    }
    for (n = k; (w & 1) === 0;) {
      w = $.shr(w, 1);
      --n;
    }
    i -= n;
    if (i < 0) {
      t1 = $.BI_DB;
      if (t1 !== (t1 | 0))
        return this.modPow$2$bailout(11, e_array, r, j, z, is1, g, w, t, r2, k1, k, i, km, t1, n, 0);
      i += t1;
      --j;
    }
    if (is1) {
      g.operator$index$1(w).copyTo$1(r);
      is1 = false;
    } else {
      for (; n > 1;) {
        z.sqrTo$2(r, r2);
        z.sqrTo$2(r2, r);
        n -= 2;
      }
      if (n > 0)
        z.sqrTo$2(r, r2);
      else {
        t = r;
        r = r2;
        r2 = t;
      }
      z.mulTo$3(r2, g.operator$index$1(w), r);
    }
    while (true) {
      if (j >= 0) {
        if (j !== (j | 0))
          throw $.iae(j);
        t1 = e_array.length;
        if (j < 0 || j >= t1)
          throw $.ioore(j);
        t2 = e_array[j];
        if (t2 !== (t2 | 0))
          return this.modPow$2$bailout(12, r2, e_array, is1, t2, n, z, g, r, w, j, k1, k, km, i, t, 0);
        t4 = (t2 & $.shl(1, i)) >>> 0 === 0;
        t1 = t4;
      } else
        t1 = false;
      if (!t1)
        break;
      z.sqrTo$2(r, r2);
      --i;
      if (i < 0) {
        t1 = $.BI_DB;
        if (t1 !== (t1 | 0))
          return this.modPow$2$bailout(14, r2, t1, z, r, e_array, j, w, is1, n, 0, 0, 0, 0, 0, 0, 0);
        i = t1 - 1;
        --j;
      }
      t = r;
      r = r2;
      r2 = t;
    }
  }
  return z.revert$1(r);
},
 modPow$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9, env10, env11, env12, env13, env14, env15) {
  switch (state) {
    case 1:
      var e = env0;
      var m = env1;
      e_array = env2;
      break;
    case 2:
      e = env0;
      m = env1;
      e_array = env2;
      i = env3;
      break;
    case 3:
      z = env0;
      g = env1;
      e_array = env2;
      k1 = env3;
      k = env4;
      r = env5;
      km = env6;
      t1 = env7;
      n = env8;
      break;
    case 4:
      r2 = env0;
      z = env1;
      g = env2;
      t1 = env3;
      e_array = env4;
      k1 = env5;
      k = env6;
      r = env7;
      km = env8;
      n = env9;
      j = env10;
      break;
    case 5:
      e_array = env0;
      t1 = env1;
      r = env2;
      j = env3;
      z = env4;
      is1 = env5;
      g = env6;
      i = env7;
      t = env8;
      r2 = env9;
      k1 = env10;
      k = env11;
      km = env12;
      break;
    case 6:
      e_array = env0;
      r = env1;
      j = env2;
      t1 = env3;
      z = env4;
      is1 = env5;
      g = env6;
      k1 = env7;
      t = env8;
      r2 = env9;
      i = env10;
      k = env11;
      km = env12;
      break;
    case 7:
      t3 = env0;
      e_array = env1;
      r = env2;
      j = env3;
      t1 = env4;
      z = env5;
      is1 = env6;
      g = env7;
      i = env8;
      t = env9;
      r2 = env10;
      k1 = env11;
      k = env12;
      km = env13;
      break;
    case 8:
      e_array = env0;
      r = env1;
      j = env2;
      z = env3;
      is1 = env4;
      g = env5;
      i = env6;
      t = env7;
      r2 = env8;
      k1 = env9;
      k = env10;
      t1 = env11;
      km = env12;
      i = env13;
      break;
    case 9:
      t1 = env0;
      e_array = env1;
      r = env2;
      j = env3;
      z = env4;
      is1 = env5;
      g = env6;
      i = env7;
      t = env8;
      r2 = env9;
      k1 = env10;
      k = env11;
      km = env12;
      w = env13;
      i = env14;
      break;
    case 10:
      t1 = env0;
      e_array = env1;
      t3 = env2;
      r = env3;
      j = env4;
      z = env5;
      is1 = env6;
      g = env7;
      i = env8;
      t = env9;
      r2 = env10;
      k1 = env11;
      k = env12;
      km = env13;
      w = env14;
      i = env15;
      break;
    case 11:
      e_array = env0;
      r = env1;
      j = env2;
      z = env3;
      is1 = env4;
      g = env5;
      w = env6;
      t = env7;
      r2 = env8;
      k1 = env9;
      k = env10;
      i = env11;
      km = env12;
      t1 = env13;
      n = env14;
      break;
    case 12:
      r2 = env0;
      e_array = env1;
      is1 = env2;
      t1 = env3;
      n = env4;
      z = env5;
      g = env6;
      r = env7;
      w = env8;
      j = env9;
      k1 = env10;
      k = env11;
      km = env12;
      i = env13;
      t = env14;
      break;
    case 13:
      r2 = env0;
      i = env1;
      e_array = env2;
      is1 = env3;
      t1 = env4;
      n = env5;
      z = env6;
      g = env7;
      r = env8;
      w = env9;
      j = env10;
      k1 = env11;
      k = env12;
      km = env13;
      i = env14;
      t = env15;
      break;
    case 14:
      r2 = env0;
      t1 = env1;
      z = env2;
      r = env3;
      e_array = env4;
      j = env5;
      w = env6;
      is1 = env7;
      n = env8;
      break;
  }
  switch (state) {
    case 0:
      var e_array = e.get$array();
    case 1:
      state = 0;
      var i = e.bitLength$0();
    case 2:
      state = 0;
      var r = $.BigInteger_nbv(1);
      if ($.leB(i, 0))
        return r;
      else if ($.ltB(i, 18))
        var k = 1;
      else if ($.ltB(i, 48))
        k = 3;
      else if ($.ltB(i, 144))
        k = 4;
      else
        k = $.ltB(i, 768) ? 5 : 6;
      if ($.ltB(i, 8))
        var z = $.Classic$(m);
      else
        z = m.isEven$0() === true ? $.Barrett$(m) : $.Montgomery$(m);
      var g = $.HashMapImplementation$();
      var k1 = k - 1;
      var km = $.shl(1, k) - 1;
      g.operator$indexSet$2(1, z.convert$1(this));
      if (k > 1) {
        var g2 = $.nbi();
        z.sqrTo$2(g.operator$index$1(1), g2);
        for (var n = 3; n <= km;) {
          g.operator$indexSet$2(n, $.nbi());
          z.mulTo$3(g2, g.operator$index$1(n - 2), g.operator$index$1(n));
          n += 2;
        }
      } else
        n = 3;
      var t1 = e.get$t();
    case 3:
      state = 0;
      var j = $.sub(t1, 1);
      var r2 = $.nbi();
      t1 = this.nbits$1($.index(e_array, j));
    case 4:
      state = 0;
      i = $.sub(t1, 1);
      var w = null;
      var is1 = true;
      var t = null;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.geB(j, 0))
                break L0;
            default:
              if (state === 5 || state === 0 && $.geB(i, k1))
                switch (state) {
                  case 0:
                    t1 = $.index(e_array, j);
                  case 5:
                    state = 0;
                    w = $.and($.shr(t1, $.sub(i, k1)), km);
                }
              else
                switch (state) {
                  case 0:
                    t1 = $.index(e_array, j);
                  case 6:
                    state = 0;
                    var t3 = $.add(i, 1);
                    if (typeof t3 !== 'number')
                      throw $.iae(t3);
                  case 7:
                    state = 0;
                    t1 = $.and(t1, $.shl(1, t3) - 1);
                    if (typeof i !== 'number')
                      throw $.iae(i);
                  case 8:
                    state = 0;
                    w = $.shl(t1, k1 - i);
                  default:
                    if (state === 10 || state === 9 || state === 0 && $.gtB(j, 0))
                      switch (state) {
                        case 0:
                          t1 = $.index(e_array, $.sub(j, 1));
                        case 9:
                          state = 0;
                          t3 = $.BI_DB;
                        case 10:
                          state = 0;
                          w = $.or(w, $.shr(t1, $.sub($.add(t3, i), k1)));
                      }
                }
              for (n = k; $.eqB($.and(w, 1), 0);) {
                w = $.shr(w, 1);
                --n;
              }
              i = $.sub(i, n);
            case 11:
              if (state === 11 || state === 0 && $.ltB(i, 0))
                switch (state) {
                  case 0:
                    t1 = $.BI_DB;
                  case 11:
                    state = 0;
                    i = $.add(i, t1);
                    j = $.sub(j, 1);
                }
              if (is1) {
                g.operator$index$1(w).copyTo$1(r);
                is1 = false;
              } else {
                for (; n > 1;) {
                  z.sqrTo$2(r, r2);
                  z.sqrTo$2(r2, r);
                  n -= 2;
                }
                if (n > 0)
                  z.sqrTo$2(r, r2);
                else {
                  t = r;
                  r = r2;
                  r2 = t;
                }
                z.mulTo$3(r2, g.operator$index$1(w), r);
              }
            case 12:
            case 13:
            case 14:
              L1:
                while (true)
                  switch (state) {
                    case 0:
                    default:
                      if (state === 13 || state === 12 || state === 0 && $.geB(j, 0))
                        switch (state) {
                          case 0:
                            t1 = $.index(e_array, j);
                          case 12:
                            state = 0;
                            if (typeof i !== 'number')
                              throw $.iae(i);
                          case 13:
                            state = 0;
                            var t4 = $.eqB($.and(t1, $.shl(1, i)), 0);
                            t1 = t4;
                        }
                      else
                        t1 = false;
                      if (!t1)
                        break L1;
                      z.sqrTo$2(r, r2);
                      i = $.sub(i, 1);
                    case 14:
                      if (state === 14 || state === 0 && $.ltB(i, 0))
                        switch (state) {
                          case 0:
                            t1 = $.BI_DB;
                          case 14:
                            state = 0;
                            i = $.sub(t1, 1);
                            j = $.sub(j, 1);
                        }
                      t = r;
                      r = r2;
                      r2 = t;
                  }
          }
      return z.revert$1(r);
  }
},
 multiplyUpperTo$3: function(a, n, r) {
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.multiplyUpperTo$3$bailout(1, a, n, r, r_array, 0, 0);
  var a_array = a.get$array();
  if (typeof a_array !== 'string' && (typeof a_array !== 'object' || a_array === null || a_array.constructor !== Array && !a_array.is$JavaScriptIndexingBehavior()))
    return this.multiplyUpperTo$3$bailout(2, a, n, r, r_array, a_array, 0);
  n = $.sub(n, 1);
  if (typeof n !== 'number')
    return this.multiplyUpperTo$3$bailout(3, a, n, r, r_array, a_array, 0);
  var i = $.sub($.add(this.t, a.get$t()), n);
  if (typeof i !== 'number')
    return this.multiplyUpperTo$3$bailout(4, a, r, r_array, a_array, n, i);
  r.set$t(i);
  r.set$s(0);
  for (; --i, i >= 0;) {
    if (i !== (i | 0))
      throw $.iae(i);
    var t1 = r_array.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    r_array[i] = 0;
  }
  t1 = this.t;
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  i = $.Math_max(n - t1, 0);
  for (; $.ltB(i, a.get$t()); ++i) {
    t1 = $.sub($.add(this.t, i), n);
    var t2 = n - i;
    if (i !== (i | 0))
      throw $.iae(i);
    var t3 = a_array.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    t2 = this.am$6(t2, a_array[i], r, 0, 0, $.sub($.add(this.t, i), n));
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    var t4 = r_array.length;
    if (t1 < 0 || t1 >= t4)
      throw $.ioore(t1);
    r_array[t1] = t2;
  }
  r.clamp$0();
  r.drShiftTo$2(1, r);
},
 multiplyUpperTo$3$bailout: function(state, env0, env1, env2, env3, env4, env5) {
  switch (state) {
    case 1:
      var a = env0;
      var n = env1;
      var r = env2;
      r_array = env3;
      break;
    case 2:
      a = env0;
      n = env1;
      r = env2;
      r_array = env3;
      a_array = env4;
      break;
    case 3:
      a = env0;
      n = env1;
      r = env2;
      r_array = env3;
      a_array = env4;
      break;
    case 4:
      a = env0;
      r = env1;
      r_array = env2;
      a_array = env3;
      n = env4;
      i = env5;
      break;
  }
  switch (state) {
    case 0:
      var r_array = r.get$array();
    case 1:
      state = 0;
      var a_array = a.get$array();
    case 2:
      state = 0;
      n = $.sub(n, 1);
    case 3:
      state = 0;
      var i = $.sub($.add(this.t, a.get$t()), n);
    case 4:
      state = 0;
      r.set$t(i);
      r.set$s(0);
      for (; i = $.sub(i, 1), $.geB(i, 0);)
        $.indexSet(r_array, i, 0);
      for (i = $.Math_max($.sub(n, this.t), 0); $.ltB(i, a.get$t()); ++i)
        $.indexSet(r_array, $.sub($.add(this.t, i), n), this.am$6($.sub(n, i), $.index(a_array, i), r, 0, 0, $.sub($.add(this.t, i), n)));
      r.clamp$0();
      r.drShiftTo$2(1, r);
  }
},
 multiplyLowerTo$3: function(a, n, r) {
  if (typeof n !== 'number')
    return this.multiplyLowerTo$3$bailout(1, a, n, r, 0, 0, 0, 0);
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.multiplyLowerTo$3$bailout(2, a, n, r, r_array, 0, 0, 0);
  var a_array = a.get$array();
  if (typeof a_array !== 'string' && (typeof a_array !== 'object' || a_array === null || a_array.constructor !== Array && !a_array.is$JavaScriptIndexingBehavior()))
    return this.multiplyLowerTo$3$bailout(3, a, n, r, r_array, a_array, 0, 0);
  var i = $.Math_min($.add(this.t, a.get$t()), n);
  r.set$s(0);
  r.set$t(i);
  for (; i > 0;) {
    --i;
    if (i !== (i | 0))
      throw $.iae(i);
    var t1 = r_array.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    r_array[i] = 0;
  }
  var j = $.sub(r.get$t(), this.t);
  if (typeof j !== 'number')
    return this.multiplyLowerTo$3$bailout(4, a, n, r, r_array, a_array, i, j);
  for (; i < j; ++i) {
    t1 = this.t;
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    var t2 = i + t1;
    if (i !== (i | 0))
      throw $.iae(i);
    var t3 = a_array.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    t1 = this.am$6(0, a_array[i], r, i, 0, t1);
    if (t2 !== (t2 | 0))
      throw $.iae(t2);
    var t4 = r_array.length;
    if (t2 < 0 || t2 >= t4)
      throw $.ioore(t2);
    r_array[t2] = t1;
  }
  for (j = $.Math_min(a.get$t(), n); i < j; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    t1 = a_array.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    this.am$6(0, a_array[i], r, i, 0, n - i);
  }
  r.clamp$0();
},
 multiplyLowerTo$3$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var a = env0;
      var n = env1;
      var r = env2;
      break;
    case 2:
      a = env0;
      n = env1;
      r = env2;
      r_array = env3;
      break;
    case 3:
      a = env0;
      n = env1;
      r = env2;
      r_array = env3;
      a_array = env4;
      break;
    case 4:
      a = env0;
      n = env1;
      r = env2;
      r_array = env3;
      a_array = env4;
      i = env5;
      j = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var r_array = r.get$array();
    case 2:
      state = 0;
      var a_array = a.get$array();
    case 3:
      state = 0;
      var i = $.Math_min($.add(this.t, a.get$t()), n);
      r.set$s(0);
      r.set$t(i);
      for (; i > 0;) {
        --i;
        $.indexSet(r_array, i, 0);
      }
      var j = $.sub(r.get$t(), this.t);
    case 4:
      state = 0;
      for (; $.ltB(i, j); ++i) {
        var t1 = this.t;
        if (typeof t1 !== 'number')
          throw $.iae(t1);
        $.indexSet(r_array, i + t1, this.am$6(0, $.index(a_array, i), r, i, 0, this.t));
      }
      for (j = $.Math_min(a.get$t(), n); i < j; ++i)
        this.am$6(0, $.index(a_array, i), r, i, 0, $.sub(n, i));
      r.clamp$0();
  }
},
 dAddOffset$2: function(n, w) {
  if (typeof n !== 'number')
    return this.dAddOffset$2$bailout(1, n, w, 0, 0);
  if (typeof w !== 'number')
    return this.dAddOffset$2$bailout(1, n, w, 0, 0);
  var this_array = this.array;
  while (true) {
    var t1 = this.t;
    if (typeof t1 !== 'number')
      return this.dAddOffset$2$bailout(2, this_array, w, t1, n);
    if (!(t1 <= w))
      break;
    if (typeof t1 !== 'number')
      return this.dAddOffset$2$bailout(3, this_array, w, t1, n);
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
    var t3 = $.BI_DV;
    if (typeof t3 !== 'number')
      return this.dAddOffset$2$bailout(6, this_array, t1, t3, w);
    if (!(t1 >= t3))
      break;
    t1 = $.BI_DV;
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
      if (typeof t1 !== 'number')
        return this.dAddOffset$2$bailout(10, this_array, t1, w, 0);
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
              var t3 = $.BI_DV;
            case 6:
              state = 0;
              if (!$.geB(t1, t3))
                break L1;
              t1 = $.BI_DV;
            case 7:
              state = 0;
              t3 = $.index(this_array, w);
            case 8:
              state = 0;
              $.indexSet(this_array, w, $.sub(t3, t1));
              w = $.add(w, 1);
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
 divide$1: function(a) {
  var r = $.nbi();
  this.divRemTo$3(a, r, null);
  return r;
},
 multiply$1: function(a) {
  var r = $.nbi();
  this.multiplyTo$2(a, r);
  return r;
},
 subtract$1: function(a) {
  var r = $.nbi();
  this.subTo$2(a, r);
  return r;
},
 add$1: function(a) {
  var r = $.nbi();
  this.addTo$2(a, r);
  return r;
},
 addTo$2: function(a, r) {
  var this_array = this.array;
  var a_array = a.get$array();
  if (typeof a_array !== 'string' && (typeof a_array !== 'object' || a_array === null || a_array.constructor !== Array && !a_array.is$JavaScriptIndexingBehavior()))
    return this.addTo$2$bailout(1, a, r, a_array, this_array, 0, 0);
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.addTo$2$bailout(2, a, r, this_array, a_array, r_array, 0);
  var m = $.Math_min(a.get$t(), this.t);
  for (var c = 0, i = 0; i < m;) {
    var t1 = this_array.operator$index$1(i);
    var t2 = a_array.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    t1 = $.add(t1, a_array[i]);
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    c += t1;
    var i0 = i + 1;
    t1 = $.BI_DM;
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = (c & t1) >>> 0;
    var t3 = r_array.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    r_array[i] = t1;
    t1 = $.BI_DB;
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    c = $.shr(c, t1);
    i = i0;
  }
  if ($.ltB(a.get$t(), this.t)) {
    t1 = a.get$s();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    c += t1;
    if (c !== (c | 0))
      return this.addTo$2$bailout(3, c, r, this_array, i, r_array, 0);
    for (; $.ltB(i, this.t);) {
      t1 = this_array.operator$index$1(i);
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      c += t1;
      i0 = i + 1;
      t1 = $.BI_DM;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      t1 = (c & t1) >>> 0;
      t2 = r_array.length;
      if (i < 0 || i >= t2)
        throw $.ioore(i);
      r_array[i] = t1;
      t1 = $.BI_DB;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      c = $.shr(c, t1);
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
      return this.addTo$2$bailout(4, a, r, i, a_array, r_array, c);
    for (; $.ltB(i, a.get$t());) {
      t1 = a_array.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      t2 = a_array[i];
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      c += t2;
      i0 = i + 1;
      t2 = $.BI_DM;
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      t2 = (c & t2) >>> 0;
      t3 = r_array.length;
      if (i < 0 || i >= t3)
        throw $.ioore(i);
      r_array[i] = t2;
      t2 = $.BI_DB;
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
  r.set$s(c < 0 ? -1 : 0);
  if (c > 0) {
    i0 = i + 1;
    t1 = r_array.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    r_array[i] = c;
    i = i0;
  } else if (c < -1) {
    i0 = i + 1;
    t1 = $.add($.BI_DV, c);
    t2 = r_array.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    r_array[i] = t1;
    i = i0;
  }
  r.set$t(i);
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
      a = env0;
      r = env1;
      this_array = env2;
      a_array = env3;
      r_array = env4;
      break;
    case 3:
      c = env0;
      r = env1;
      this_array = env2;
      i = env3;
      r_array = env4;
      break;
    case 4:
      a = env0;
      r = env1;
      i = env2;
      a_array = env3;
      r_array = env4;
      c = env5;
      break;
  }
  switch (state) {
    case 0:
      var this_array = this.array;
      var a_array = a.get$array();
    case 1:
      state = 0;
      var r_array = r.get$array();
    case 2:
      state = 0;
      var m = $.Math_min(a.get$t(), this.t);
      for (var c = 0, i = 0; i < m;) {
        var t1 = $.add($.index(this_array, i), $.index(a_array, i));
        if (typeof t1 !== 'number')
          throw $.iae(t1);
        c += t1;
        var i0 = i + 1;
        t1 = $.BI_DM;
        if (typeof t1 !== 'number')
          throw $.iae(t1);
        $.indexSet(r_array, i, (c & t1) >>> 0);
        var t2 = $.BI_DB;
        if (typeof t2 !== 'number')
          throw $.iae(t2);
        c = $.shr(c, t2);
        i = i0;
      }
    default:
      if (state === 3 || state === 0 && $.ltB(a.get$t(), this.t))
        switch (state) {
          case 0:
            t1 = a.get$s();
            if (typeof t1 !== 'number')
              throw $.iae(t1);
            c += t1;
          case 3:
            state = 0;
            for (; $.ltB(i, this.t);) {
              t1 = $.index(this_array, i);
              if (typeof t1 !== 'number')
                throw $.iae(t1);
              c += t1;
              i0 = i + 1;
              t1 = $.BI_DM;
              if (typeof t1 !== 'number')
                throw $.iae(t1);
              $.indexSet(r_array, i, (c & t1) >>> 0);
              t2 = $.BI_DB;
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
          case 4:
            state = 0;
            for (; $.ltB(i, a.get$t());) {
              t1 = $.index(a_array, i);
              if (typeof t1 !== 'number')
                throw $.iae(t1);
              c += t1;
              i0 = i + 1;
              t1 = $.BI_DM;
              if (typeof t1 !== 'number')
                throw $.iae(t1);
              $.indexSet(r_array, i, (c & t1) >>> 0);
              t2 = $.BI_DB;
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
      r.set$s(c < 0 ? -1 : 0);
      if (c > 0) {
        i0 = i + 1;
        $.indexSet(r_array, i, c);
        i = i0;
      } else if (c < -1) {
        i0 = i + 1;
        $.indexSet(r_array, i, $.add($.BI_DV, c));
        i = i0;
      }
      r.set$t(i);
      r.clamp$0();
  }
},
 testBit$1: function(n) {
  var this_array = this.array;
  var j = $.floor($.div(n, $.BI_DB));
  if ($.geB(j, this.t))
    return !$.eqB(this.s, 0);
  var t1 = $.index(this_array, j);
  var t2 = $.mod(n, $.BI_DB);
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  return !$.eqB($.and(t1, $.shl(1, t2)), 0);
},
 getLowestSetBit$0: function() {
  var this_array = this.array;
  for (var i = 0; $.ltB(i, this.t); ++i)
    if (!$.eqB($.index(this_array, i), 0)) {
      var t1 = $.BI_DB;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      t1 = i * t1;
      var t2 = this.lbit$1($.index(this_array, i));
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      return t1 + t2;
    }
  if ($.ltB(this.s, 0))
    return $.mul(this.t, $.BI_DB);
  return -1;
},
 lbit$1: function(x) {
  if ($.eqB(x, 0))
    return -1;
  if ($.eqB($.and(x, 65535), 0)) {
    x = $.shr(x, 16);
    var r = 16;
  } else
    r = 0;
  if ($.eqB($.and(x, 255), 0)) {
    x = $.shr(x, 8);
    r += 8;
  }
  if ($.eqB($.and(x, 15), 0)) {
    x = $.shr(x, 4);
    r += 4;
  }
  if ($.eqB($.and(x, 3), 0)) {
    x = $.shr(x, 2);
    r += 2;
  }
  return $.eqB($.and(x, 1), 0) ? r + 1 : r;
},
 shiftRight$1: function(n) {
  var r = $.nbi();
  if ($.ltB(n, 0))
    this.lShiftTo$2($.neg(n), r);
  else
    this.rShiftTo$2(n, r);
  return r;
},
 shiftLeft$1: function(n) {
  if (typeof n !== 'number')
    return this.shiftLeft$1$bailout(1, n);
  var r = $.nbi();
  if (n < 0)
    this.rShiftTo$2(-n, r);
  else
    this.lShiftTo$2(n, r);
  return r;
},
 shiftLeft$1$bailout: function(state, n) {
  var r = $.nbi();
  if ($.ltB(n, 0))
    this.rShiftTo$2($.neg(n), r);
  else
    this.lShiftTo$2(n, r);
  return r;
},
 op_or$2: function(x, y) {
  return $.or(x, y);
},
 get$op_or: function() { return new $.BoundClosure(this, 'op_or$2'); },
 bitwiseTo$3: function(a, op, r) {
  var this_array = this.array;
  var a_array = a.get$array();
  if (typeof a_array !== 'string' && (typeof a_array !== 'object' || a_array === null || a_array.constructor !== Array && !a_array.is$JavaScriptIndexingBehavior()))
    return this.bitwiseTo$3$bailout(1, this_array, op, r, a, a_array, 0, 0);
  var r_array = r.array;
  var m = $.Math_min(a.get$t(), this.t);
  for (var i = 0; i < m; ++i) {
    var t1 = this_array.operator$index$1(i);
    var t2 = a_array.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    r_array.operator$indexSet$2(i, op.call$2(t1, a_array[i]));
  }
  if ($.ltB(a.get$t(), this.t)) {
    var f = $.and(a.get$s(), $.BI_DM);
    if (f !== (f | 0))
      return this.bitwiseTo$3$bailout(2, this_array, r_array, op, a, r, f, m);
    for (i = m; $.ltB(i, this.t); ++i)
      r_array.operator$indexSet$2(i, op.call$2(this_array.operator$index$1(i), f));
    r.t = this.t;
  } else {
    f = $.and(this.s, $.BI_DM);
    if (f !== (f | 0))
      return this.bitwiseTo$3$bailout(3, a, r_array, op, r, a_array, m, f);
    for (i = m; $.ltB(i, a.get$t()); ++i) {
      if (i !== (i | 0))
        throw $.iae(i);
      t1 = a_array.length;
      if (i < 0 || i >= t1)
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
      var m = $.Math_min(a.get$t(), this.t);
      for (var i = 0; i < m; ++i)
        $.indexSet(r_array, i, op.call$2($.index(this_array, i), $.index(a_array, i)));
    default:
      if (state === 2 || state === 0 && $.ltB(a.get$t(), this.t))
        switch (state) {
          case 0:
            var f = $.and(a.get$s(), $.BI_DM);
          case 2:
            state = 0;
            for (i = m; $.ltB(i, this.t); ++i)
              $.indexSet(r_array, i, op.call$2($.index(this_array, i), f));
            r.t = this.t;
        }
      else
        switch (state) {
          case 0:
            f = $.and(this.s, $.BI_DM);
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
 fromNumber$3: function(a, b, c) {
  if (a !== (a | 0))
    return this.fromNumber$3$bailout(1, a, b, c);
  if (typeof b === 'number' || typeof b === 'number' && b === (b | 0) || typeof b === 'number')
    if (a < 2)
      this.fromInt$1(1);
    else {
      this.fromNumber$3(a, c, null);
      var t1 = a - 1;
      if (this.testBit$1(t1) !== true)
        this.bitwiseTo$3($.BigInteger_ONE().shiftLeft$1(t1), this.get$op_or(), this);
      if (this.isEven$0() === true)
        this.dAddOffset$2(1, 0);
      for (; this.isProbablePrime$1(b) !== true;) {
        this.dAddOffset$2(2, 0);
        if ($.gtB(this.bitLength$0(), a))
          this.subTo$2($.BigInteger_ONE().shiftLeft$1(t1), this);
      }
    }
  else {
    var x = $.HashMapImplementation$();
    var t = a & 7;
    b.nextBytes$1(x);
    if (t > 0) {
      t1 = $.shl(1, t) - 1;
      x.operator$indexSet$2(0, $.and(x.operator$index$1(0), t1));
    } else
      x.operator$indexSet$2(0, 0);
    this.fromString$2(x, 256);
  }
},
 fromNumber$3$bailout: function(state, a, b, c) {
  if (typeof b === 'number' || typeof b === 'number' && b === (b | 0) || typeof b === 'number')
    if ($.ltB(a, 2))
      this.fromInt$1(1);
    else {
      this.fromNumber$3(a, c, null);
      if (this.testBit$1($.sub(a, 1)) !== true)
        this.bitwiseTo$3($.BigInteger_ONE().shiftLeft$1($.sub(a, 1)), this.get$op_or(), this);
      if (this.isEven$0() === true)
        this.dAddOffset$2(1, 0);
      for (; this.isProbablePrime$1(b) !== true;) {
        this.dAddOffset$2(2, 0);
        if ($.gtB(this.bitLength$0(), a))
          this.subTo$2($.BigInteger_ONE().shiftLeft$1($.sub(a, 1)), this);
      }
    }
  else {
    var x = $.HashMapImplementation$();
    var t = $.and(a, 7);
    b.nextBytes$1(x);
    if ($.gtB(t, 0)) {
      if (typeof t !== 'number')
        throw $.iae(t);
      var t1 = $.shl(1, t) - 1;
      x.operator$indexSet$2(0, $.and(x.operator$index$1(0), t1));
    } else
      x.operator$indexSet$2(0, 0);
    this.fromString$2(x, 256);
  }
},
 fromRadix$2: function(s, b) {
  this.fromInt$1(0);
  if (b == null)
    b = 10;
  if (b !== (b | 0))
    return this.fromRadix$2$bailout(1, s, b, 0);
  var cs = this.chunkSize$1(b);
  if (typeof cs !== 'number')
    return this.fromRadix$2$bailout(2, s, cs, b);
  var d = $.Math_pow(b, cs);
  for (var w = 0, mi = false, j = 0, i = 0; $.ltB(i, $.get$length(s)); ++i) {
    var x = this.intAt$2(s, i);
    if ($.ltB(x, 0)) {
      if ($.eqB(s.charAt$1(i), '-') && $.eqB(this.signum$0(), 0))
        mi = true;
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
    this.dMultiply$1($.Math_pow(b, j));
    this.dAddOffset$2(w, 0);
  }
  if (mi)
    $.BigInteger_ZERO().subTo$2(this, this);
},
 fromRadix$2$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var s = env0;
      b = env1;
      break;
    case 2:
      s = env0;
      cs = env1;
      b = env2;
      break;
  }
  switch (state) {
    case 0:
      this.fromInt$1(0);
      if (b == null)
        var b = 10;
    case 1:
      state = 0;
      var cs = this.chunkSize$1(b);
    case 2:
      state = 0;
      var d = $.Math_pow(b, cs);
      for (var w = 0, mi = false, j = 0, i = 0; $.ltB(i, $.get$length(s)); ++i) {
        var x = this.intAt$2(s, i);
        if ($.ltB(x, 0)) {
          if ($.eqB(s.charAt$1(i), '-') && $.eqB(this.signum$0(), 0))
            mi = true;
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
        this.dMultiply$1($.Math_pow(b, j));
        this.dAddOffset$2(w, 0);
      }
      if (mi)
        $.BigInteger_ZERO().subTo$2(this, this);
  }
},
 toRadix$1: function(b) {
  if (b == null)
    b = 10;
  if (typeof b !== 'number')
    return this.toRadix$1$bailout(1, b, 0);
  if ($.eqB(this.signum$0(), 0) || b < 2 || b > 36)
    return '0';
  var a = $.Math_pow(b, this.chunkSize$1(b));
  if (typeof a !== 'number')
    return this.toRadix$1$bailout(2, a, b);
  var d = $.BigInteger_nbv(a);
  var y = $.nbi();
  var z = $.nbi();
  this.divRemTo$3(d, y, z);
  for (var r = ''; $.gtB(y.signum$0(), 0);) {
    var t1 = z.intValue$0();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    r = $.add((a + t1).toString$1(b).substr$1(1), r);
    y.divRemTo$3(d, y, z);
  }
  return $.add(z.intValue$0().toString$1(b), r);
},
 toRadix$1$bailout: function(state, env0, env1) {
  switch (state) {
    case 1:
      b = env0;
      break;
    case 2:
      a = env0;
      b = env1;
      break;
  }
  switch (state) {
    case 0:
      if (b == null)
        var b = 10;
    case 1:
      state = 0;
      if ($.eqB(this.signum$0(), 0) || $.ltB(b, 2) || $.gtB(b, 36))
        return '0';
      var a = $.Math_pow(b, this.chunkSize$1(b));
    case 2:
      state = 0;
      var d = $.BigInteger_nbv(a);
      var y = $.nbi();
      var z = $.nbi();
      this.divRemTo$3(d, y, z);
      for (var r = ''; $.gtB(y.signum$0(), 0);) {
        r = $.add($.add(a, z.intValue$0()).toString$1(b).substr$1(1), r);
        y.divRemTo$3(d, y, z);
      }
      return $.add(z.intValue$0().toString$1(b), r);
  }
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
    if (!(t1 <= 0)) {
      if (typeof t1 !== 'number')
        return this.signum$0$bailout(3, this_array, t1);
      if (t1 === 1) {
        t1 = this_array.operator$index$1(0);
        if (typeof t1 !== 'number')
          return this.signum$0$bailout(4, t1, 0);
        t1 = t1 <= 0;
      } else
        t1 = false;
    } else
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
 chunkSize$1: function(r) {
  var t1 = $.BI_DB;
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  t1 = 0.6931471805599453 * t1;
  var t2 = $.Math_log(r);
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  return $.floor(t1 / t2);
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
      var t3 = $.BI_DV;
      if (typeof t3 !== 'number')
        return this.intValue$0$bailout(4, t1, t3, 0);
      return t1 - t3;
    } else {
      if (typeof t1 !== 'number')
        return this.intValue$0$bailout(5, t1, this_array, 0);
      if (t1 === 0)
        return -1;
    }
  } else {
    t1 = this.t;
    if (typeof t1 !== 'number')
      return this.intValue$0$bailout(6, t1, this_array, 0);
    if (t1 === 1)
      return this_array.operator$index$1(0);
    else {
      if (typeof t1 !== 'number')
        return this.intValue$0$bailout(7, this_array, t1, 0);
      if (t1 === 0)
        return 0;
    }
  }
  t1 = this_array.operator$index$1(1);
  if (t1 !== (t1 | 0))
    return this.intValue$0$bailout(8, t1, this_array, 0);
  t3 = $.BI_DB;
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  if (t3 !== (t3 | 0))
    return this.intValue$0$bailout(9, t1, this_array, t3);
  t1 = (t1 & $.shl(1, 32 - t3) - 1) >>> 0;
  var t5 = $.BI_DB;
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
                  var t3 = $.BI_DV;
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
      t3 = $.BI_DB;
      if (typeof t3 !== 'number')
        throw $.iae(t3);
    case 9:
      state = 0;
      t1 = $.and(t1, $.shl(1, 32 - t3) - 1);
      var t5 = $.BI_DB;
    case 10:
      state = 0;
      t5 = $.shl(t1, t5);
      t1 = $.index(this_array, 0);
    case 11:
      state = 0;
      return $.or(t5, t1);
  }
},
 modPowInt$2: function(e, m) {
  return this.exp$2(e, e < 256 || m.isEven$0() === true ? $.Classic$(m) : $.Montgomery$(m));
},
 exp$2: function(e, z) {
  if (e > 4294967295 || e < 1)
    return $.BigInteger_ONE();
  var r = $.nbi();
  var r2 = $.nbi();
  var g = z.convert$1(this);
  var i = $.sub(this.nbits$1(e), 1);
  if (typeof i !== 'number')
    return this.exp$2$bailout(1, e, z, i, r, r2, g);
  g.copyTo$1(r);
  for (; --i, i >= 0;) {
    z.sqrTo$2(r, r2);
    if ((e & $.shl(1, i)) >>> 0 > 0)
      z.mulTo$3(r2, g, r);
    else {
      var t0 = r2;
      r2 = r;
      r = t0;
    }
  }
  return z.revert$1(r);
},
 exp$2$bailout: function(state, e, z, i, r, r2, g) {
  g.copyTo$1(r);
  for (; i = $.sub(i, 1), $.geB(i, 0);) {
    z.sqrTo$2(r, r2);
    if (typeof i !== 'number')
      throw $.iae(i);
    if ((e & $.shl(1, i)) >>> 0 > 0)
      z.mulTo$3(r2, g, r);
    else {
      var t0 = r2;
      r2 = r;
      r = t0;
    }
  }
  return z.revert$1(r);
},
 isEven$0: function() {
  var this_array = this.array;
  var t1 = $.gtB(this.t, 0) ? $.and($.index(this_array, 0), 1) : this.s;
  return $.eq(t1, 0);
},
 invDigit$0: function() {
  var this_array = this.array;
  if ($.ltB(this.t, 1))
    return 0;
  var x = $.index(this_array, 0);
  if ($.eqB($.and(x, 1), 0))
    return 0;
  var y = $.and(x, 3);
  var t1 = $.mul($.and(x, 15), y);
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  var y0 = $.and($.mul(y, 2 - t1), 15);
  var t2 = $.mul($.and(x, 255), y0);
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  var y1 = $.and($.mul(y0, 2 - t2), 255);
  var t3 = $.and($.mul($.and(x, 65535), y1), 65535);
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  var y2 = $.and($.mul(y1, 2 - t3), 65535);
  var t4 = $.mod($.mul(x, y2), $.BI_DV);
  if (typeof t4 !== 'number')
    throw $.iae(t4);
  var y3 = $.mod($.mul(y2, 2 - t4), $.BI_DV);
  return $.gtB(y3, 0) ? $.sub($.BI_DV, y3) : $.neg(y3);
},
 mod$1: function(a) {
  var r = $.nbi();
  this.abs$0().divRemTo$3(a, null, r);
  if ($.ltB(this.s, 0) && $.gtB(r.compareTo$1($.BigInteger_ZERO()), 0))
    a.subTo$2(r, r);
  return r;
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
    return this.divRemTo$3$bailout(2, m, q, r, pt, t1, pm, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t3 = pm.get$t();
  if (typeof t3 !== 'number')
    return this.divRemTo$3$bailout(3, m, q, r, pt, t1, pm, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (t1 < t3) {
    if (!(q == null))
      q.fromInt$1(0);
    if (!(r == null))
      this.copyTo$1(r);
    return;
  }
  if (r == null)
    r = $.nbi();
  var y = $.nbi();
  var ts = this.s;
  if (typeof ts !== 'number')
    return this.divRemTo$3$bailout(4, m, q, pt, pm, ts, r, y, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var ms = m.get$s();
  var pm_array = pm.get$array();
  if (typeof pm_array !== 'string' && (typeof pm_array !== 'object' || pm_array === null || pm_array.constructor !== Array && !pm_array.is$JavaScriptIndexingBehavior()))
    return this.divRemTo$3$bailout(5, q, pt, pm, ts, r, y, ms, pm_array, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  t3 = $.BI_DB;
  if (typeof t3 !== 'number')
    return this.divRemTo$3$bailout(6, q, pt, pm, ts, r, y, ms, pm_array, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t5 = pm.get$t();
  if (typeof t5 !== 'number')
    return this.divRemTo$3$bailout(7, q, pt, t5, pm, ts, r, y, ms, pm_array, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  --t5;
  if (t5 !== (t5 | 0))
    throw $.iae(t5);
  var t7 = pm_array.length;
  if (t5 < 0 || t5 >= t7)
    throw $.ioore(t5);
  var t8 = this.nbits$1(pm_array[t5]);
  if (typeof t8 !== 'number')
    return this.divRemTo$3$bailout(8, q, pt, pm, t8, ts, r, y, ms, t3, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var nsh = t3 - t8;
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
    return this.divRemTo$3$bailout(9, q, nsh, ts, r, ys, y, ms, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var y_array = y.array;
  var y0 = y_array.operator$index$1(ys - 1);
  if (typeof y0 !== 'number')
    return this.divRemTo$3$bailout(10, q, nsh, ts, y0, ys, y_array, ms, y, r, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  if (y0 === 0)
    return;
  var t2 = $.BI_F1;
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  if (t2 !== (t2 | 0))
    return this.divRemTo$3$bailout(11, q, y, nsh, ts, y0, ys, y_array, t2, ms, r, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var t4 = y0 * $.shl(1, t2);
  if (ys > 1) {
    t2 = y_array.operator$index$1(ys - 2);
    if (t2 !== (t2 | 0))
      return this.divRemTo$3$bailout(12, q, r, t4, nsh, ts, y0, ys, y_array, ms, y, t2, 0, 0, 0, 0, 0, 0, 0, 0);
    t5 = $.BI_F2;
    if (t5 !== (t5 | 0))
      return this.divRemTo$3$bailout(13, q, t4, nsh, ts, ys, y_array, t2, t5, r, y0, y, ms, 0, 0, 0, 0, 0, 0, 0);
    t5 = $.shr(t2, t5);
    t2 = t5;
  } else
    t2 = 0;
  var yt = t4 + t2;
  t2 = $.BI_FV;
  if (typeof t2 !== 'number')
    return this.divRemTo$3$bailout(14, q, y, yt, nsh, ts, y0, ys, y_array, ms, t2, r, 0, 0, 0, 0, 0, 0, 0, 0);
  var d1 = t2 / yt;
  t2 = $.BI_F1;
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  if (t2 !== (t2 | 0))
    return this.divRemTo$3$bailout(15, q, nsh, ts, ys, y_array, yt, y0, d1, y, r, ms, t2, 0, 0, 0, 0, 0, 0, 0);
  var d2 = $.shl(1, t2) / yt;
  t5 = $.BI_F2;
  if (typeof t5 !== 'number')
    throw $.iae(t5);
  if (t5 !== (t5 | 0))
    return this.divRemTo$3$bailout(16, d2, q, nsh, ts, ys, y_array, y0, d1, y, t5, ms, r, 0, 0, 0, 0, 0, 0, 0);
  var e = $.shl(1, t5);
  var i = r.get$t();
  if (typeof i !== 'number')
    return this.divRemTo$3$bailout(17, q, e, i, nsh, ts, ys, y_array, y0, d1, y, r, ms, d2, 0, 0, 0, 0, 0, 0);
  var j = i - ys;
  t2 = q == null;
  var t = t2 ? $.nbi() : q;
  y.dlShiftTo$2(j, t);
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.divRemTo$3$bailout(18, q, e, i, j, nsh, ts, ys, y_array, t, t2, r_array, y0, r, y, d1, ms, d2, 0, 0);
  t3 = $.compareTo(r, t);
  if (typeof t3 !== 'number')
    return this.divRemTo$3$bailout(19, q, e, i, j, nsh, ts, ys, y_array, t, t2, r_array, t3, y0, r, y, d1, ms, d2, 0);
  if (t3 >= 0) {
    t3 = r.get$t();
    if (typeof t3 !== 'number')
      return this.divRemTo$3$bailout(20, q, e, i, j, nsh, ts, ys, y_array, t, t2, r_array, y0, t3, y, r, d1, ms, d2, 0);
    r.set$t(t3 + 1);
    if (t3 !== (t3 | 0))
      throw $.iae(t3);
    t5 = r_array.length;
    if (t3 < 0 || t3 >= t5)
      throw $.ioore(t3);
    r_array[t3] = 1;
    r.subTo$2(t, r);
  }
  $.BigInteger_ONE().dlShiftTo$2(ys, t);
  t.subTo$2(y, y);
  while (true) {
    t3 = y.t;
    if (typeof t3 !== 'number')
      return this.divRemTo$3$bailout(21, t3, q, e, i, j, nsh, ts, ys, y_array, t, t2, r_array, y0, r, y, d1, ms, d2, 0);
    if (!(t3 < ys))
      break;
    if (typeof t3 !== 'number')
      return this.divRemTo$3$bailout(22, t3, q, e, i, j, nsh, ts, ys, y_array, t, t2, r_array, y0, r, y, d1, ms, d2, 0);
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
      return this.divRemTo$3$bailout(23, q, e, j, nsh, ts, ys, t, t2, r_array, i, t4, r, d1, y, y0, ms, d2, 0, 0);
    if (t4 === y0) {
      t3 = $.BI_DM;
      if (typeof t3 !== 'number')
        return this.divRemTo$3$bailout(24, q, e, j, nsh, ts, ys, t, t2, r_array, i, r, t3, y, y0, d1, ms, d2, 0, 0);
      var qd = t3;
    } else {
      t4 = r_array[i];
      if (typeof t4 !== 'number')
        return this.divRemTo$3$bailout(25, q, e, j, nsh, ts, ys, t, t2, r_array, i, r, d1, y, y0, t4, ms, d2, 0, 0);
      t4 *= d1;
      var t6 = i - 1;
      if (t6 !== (t6 | 0))
        throw $.iae(t6);
      if (t6 < 0 || t6 >= t3)
        throw $.ioore(t6);
      t6 = r_array[t6];
      if (typeof t6 !== 'number')
        return this.divRemTo$3$bailout(26, t4, q, e, t6, j, nsh, ts, ys, t, t2, r_array, i, r, y0, y, d1, ms, d2, 0);
      t8 = $.floor(t4 + (t6 + e) * d2);
      if (typeof t8 !== 'number')
        return this.divRemTo$3$bailout(27, q, e, j, nsh, t8, ys, ts, t, t2, r_array, i, r, y0, y, d1, ms, d2, 0, 0);
      qd = t8;
    }
    t3 = y.am$6(0, qd, r, j, 0, ys);
    if (typeof t3 !== 'number')
      return this.divRemTo$3$bailout(28, q, e, j, nsh, ts, ys, qd, t3, t, r_array, i, t2, r, y0, y, d1, ms, d2, 0);
    t5 = r_array.length;
    if (i < 0 || i >= t5)
      throw $.ioore(i);
    t6 = r_array[i];
    if (typeof t6 !== 'number')
      return this.divRemTo$3$bailout(29, q, e, j, nsh, ts, ys, qd, t, t3, r_array, t6, i, t2, r, y0, y, d1, ms, d2);
    t3 = t6 + t3;
    r_array[i] = t3;
    if (t3 < qd) {
      y.dlShiftTo$2(j, t);
      r.subTo$2(t, r);
      while (true) {
        t3 = r_array.length;
        if (i < 0 || i >= t3)
          throw $.ioore(i);
        t4 = r_array[i];
        if (typeof t4 !== 'number')
          return this.divRemTo$3$bailout(30, ms, q, e, j, ts, nsh, ys, t, t2, r_array, i, t4, r, y0, y, d1, qd, d2, 0);
        --qd;
        if (!(t4 < qd))
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
      pt = env3;
      t1 = env4;
      pm = env5;
      break;
    case 3:
      m = env0;
      q = env1;
      r = env2;
      pt = env3;
      t1 = env4;
      pm = env5;
      t3 = env6;
      break;
    case 4:
      m = env0;
      q = env1;
      pt = env2;
      pm = env3;
      ts = env4;
      r = env5;
      y = env6;
      break;
    case 5:
      q = env0;
      pt = env1;
      pm = env2;
      ts = env3;
      r = env4;
      y = env5;
      ms = env6;
      pm_array = env7;
      break;
    case 6:
      q = env0;
      pt = env1;
      pm = env2;
      ts = env3;
      r = env4;
      y = env5;
      ms = env6;
      pm_array = env7;
      t3 = env8;
      break;
    case 7:
      q = env0;
      pt = env1;
      t5 = env2;
      pm = env3;
      ts = env4;
      r = env5;
      y = env6;
      ms = env7;
      pm_array = env8;
      t3 = env9;
      break;
    case 8:
      q = env0;
      pt = env1;
      pm = env2;
      t7 = env3;
      ts = env4;
      r = env5;
      y = env6;
      ms = env7;
      t3 = env8;
      break;
    case 9:
      q = env0;
      nsh = env1;
      ts = env2;
      r = env3;
      ys = env4;
      y = env5;
      ms = env6;
      break;
    case 10:
      q = env0;
      nsh = env1;
      ts = env2;
      y0 = env3;
      ys = env4;
      y_array = env5;
      ms = env6;
      y = env7;
      r = env8;
      break;
    case 11:
      q = env0;
      y = env1;
      nsh = env2;
      ts = env3;
      y0 = env4;
      ys = env5;
      y_array = env6;
      t1 = env7;
      ms = env8;
      r = env9;
      break;
    case 12:
      q = env0;
      r = env1;
      t3 = env2;
      nsh = env3;
      ts = env4;
      y0 = env5;
      ys = env6;
      y_array = env7;
      ms = env8;
      y = env9;
      t1 = env10;
      break;
    case 13:
      q = env0;
      t3 = env1;
      nsh = env2;
      ts = env3;
      ys = env4;
      y_array = env5;
      t1 = env6;
      t4 = env7;
      r = env8;
      y0 = env9;
      y = env10;
      ms = env11;
      break;
    case 14:
      q = env0;
      y = env1;
      yt = env2;
      nsh = env3;
      ts = env4;
      y0 = env5;
      ys = env6;
      y_array = env7;
      ms = env8;
      t1 = env9;
      r = env10;
      break;
    case 15:
      q = env0;
      nsh = env1;
      ts = env2;
      ys = env3;
      y_array = env4;
      yt = env5;
      y0 = env6;
      d1 = env7;
      y = env8;
      r = env9;
      ms = env10;
      t1 = env11;
      break;
    case 16:
      d2 = env0;
      q = env1;
      nsh = env2;
      ts = env3;
      ys = env4;
      y_array = env5;
      y0 = env6;
      d1 = env7;
      y = env8;
      t1 = env9;
      ms = env10;
      r = env11;
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
      d1 = env8;
      y = env9;
      r = env10;
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
      ys = env6;
      y_array = env7;
      t = env8;
      t1 = env9;
      r_array = env10;
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
      ys = env6;
      y_array = env7;
      t = env8;
      t1 = env9;
      r_array = env10;
      t2 = env11;
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
      ys = env6;
      y_array = env7;
      t = env8;
      t1 = env9;
      r_array = env10;
      y0 = env11;
      t2 = env12;
      y = env13;
      r = env14;
      d1 = env15;
      ms = env16;
      d2 = env17;
      break;
    case 21:
      t2 = env0;
      q = env1;
      e = env2;
      i = env3;
      j = env4;
      nsh = env5;
      ts = env6;
      ys = env7;
      y_array = env8;
      t = env9;
      t1 = env10;
      r_array = env11;
      y0 = env12;
      r = env13;
      y = env14;
      d1 = env15;
      ms = env16;
      d2 = env17;
      break;
    case 22:
      t2 = env0;
      q = env1;
      e = env2;
      i = env3;
      j = env4;
      nsh = env5;
      ts = env6;
      ys = env7;
      y_array = env8;
      t = env9;
      t1 = env10;
      r_array = env11;
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
      j = env2;
      nsh = env3;
      ts = env4;
      ys = env5;
      t = env6;
      t1 = env7;
      r_array = env8;
      i = env9;
      t2 = env10;
      r = env11;
      d1 = env12;
      y = env13;
      y0 = env14;
      ms = env15;
      d2 = env16;
      break;
    case 24:
      q = env0;
      e = env1;
      j = env2;
      nsh = env3;
      ts = env4;
      ys = env5;
      t = env6;
      t1 = env7;
      r_array = env8;
      i = env9;
      r = env10;
      t2 = env11;
      y = env12;
      y0 = env13;
      d1 = env14;
      ms = env15;
      d2 = env16;
      break;
    case 25:
      q = env0;
      e = env1;
      j = env2;
      nsh = env3;
      ts = env4;
      ys = env5;
      t = env6;
      t1 = env7;
      r_array = env8;
      i = env9;
      r = env10;
      d1 = env11;
      y = env12;
      y0 = env13;
      t2 = env14;
      ms = env15;
      d2 = env16;
      break;
    case 26:
      t2 = env0;
      q = env1;
      e = env2;
      t4 = env3;
      j = env4;
      nsh = env5;
      ts = env6;
      ys = env7;
      t = env8;
      t1 = env9;
      r_array = env10;
      i = env11;
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
      j = env2;
      nsh = env3;
      t6 = env4;
      ys = env5;
      ts = env6;
      t = env7;
      t1 = env8;
      r_array = env9;
      i = env10;
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
      j = env2;
      nsh = env3;
      ts = env4;
      ys = env5;
      qd = env6;
      t2 = env7;
      t = env8;
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
    case 29:
      q = env0;
      e = env1;
      j = env2;
      nsh = env3;
      ts = env4;
      ys = env5;
      qd = env6;
      t = env7;
      t2 = env8;
      r_array = env9;
      t4 = env10;
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
      ms = env0;
      q = env1;
      e = env2;
      j = env3;
      ts = env4;
      nsh = env5;
      ys = env6;
      t = env7;
      t1 = env8;
      r_array = env9;
      i = env10;
      t2 = env11;
      r = env12;
      y0 = env13;
      y = env14;
      d1 = env15;
      qd = env16;
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
        r = $.nbi();
      var y = $.nbi();
      var ts = this.s;
    case 4:
      state = 0;
      var ms = m.get$s();
      var pm_array = pm.get$array();
    case 5:
      state = 0;
      t3 = $.BI_DB;
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
      t1 = $.BI_F1;
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
            var t4 = $.BI_F2;
          case 13:
            state = 0;
            t4 = $.shr(t1, t4);
            t1 = t4;
        }
      else
        t1 = 0;
      var yt = $.add(t3, t1);
      t1 = $.BI_FV;
    case 14:
      state = 0;
      var d1 = $.div(t1, yt);
      t1 = $.BI_F1;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
    case 15:
      state = 0;
      t1 = $.shl(1, t1);
      if (typeof yt !== 'number')
        throw $.iae(yt);
      var d2 = t1 / yt;
      t1 = $.BI_F2;
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
      var t = t1 ? $.nbi() : q;
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
                    t2 = $.BI_DM;
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
 squareTo$1: function(r) {
  var x = this.abs$0();
  var x_array = x.get$array();
  if (typeof x_array !== 'string' && (typeof x_array !== 'object' || x_array === null || x_array.constructor !== Array && !x_array.is$JavaScriptIndexingBehavior()))
    return this.squareTo$1$bailout(1, r, x_array, x, 0);
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.squareTo$1$bailout(2, r, x, x_array, r_array);
  var t3 = x.get$t();
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  var i = 2 * t3;
  r.set$t(i);
  for (; --i, i >= 0;) {
    if (i !== (i | 0))
      throw $.iae(i);
    var t1 = r_array.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    r_array[i] = 0;
  }
  for (i = 0; $.ltB(i, $.sub(x.get$t(), 1)); ++i) {
    t1 = x_array.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = x_array[i];
    t3 = 2 * i;
    var c = x.am$6(i, t2, r, t3, 0, 1);
    t1 = x.get$t();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = i + t1;
    t2 = i + 1;
    var t4 = x_array.length;
    if (i < 0 || i >= t4)
      throw $.ioore(i);
    var t5 = x_array[i];
    if (typeof t5 !== 'number')
      throw $.iae(t5);
    t2 = x.am$6(t2, 2 * t5, r, t3 + 1, c, $.sub($.sub(x.get$t(), i), 1));
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    var t6 = r_array.length;
    if (t1 < 0 || t1 >= t6)
      throw $.ioore(t1);
    t2 = $.add(r_array[t1], t2);
    var t7 = r_array.length;
    if (t1 < 0 || t1 >= t7)
      throw $.ioore(t1);
    r_array[t1] = t2;
    if ($.geB(t2, $.BI_DV)) {
      t1 = x.get$t();
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      t1 = i + t1;
      t2 = $.BI_DV;
      if (t1 !== (t1 | 0))
        throw $.iae(t1);
      t3 = r_array.length;
      if (t1 < 0 || t1 >= t3)
        throw $.ioore(t1);
      t2 = $.sub(r_array[t1], t2);
      t4 = r_array.length;
      if (t1 < 0 || t1 >= t4)
        throw $.ioore(t1);
      r_array[t1] = t2;
      t2 = x.get$t();
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      t1 = i + t2 + 1;
      if (t1 !== (t1 | 0))
        throw $.iae(t1);
      t5 = r_array.length;
      if (t1 < 0 || t1 >= t5)
        throw $.ioore(t1);
      r_array[t1] = 1;
    }
  }
  if ($.gtB(r.get$t(), 0)) {
    t1 = $.sub(r.get$t(), 1);
    t2 = x_array.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    t3 = x.am$6(i, x_array[i], r, 2 * i, 0, 1);
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    t4 = r_array.length;
    if (t1 < 0 || t1 >= t4)
      throw $.ioore(t1);
    t3 = $.add(r_array[t1], t3);
    t5 = r_array.length;
    if (t1 < 0 || t1 >= t5)
      throw $.ioore(t1);
    r_array[t1] = t3;
  }
  r.set$s(0);
  r.clamp$0();
},
 squareTo$1$bailout: function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var r = env0;
      x_array = env1;
      x = env2;
      break;
    case 2:
      r = env0;
      x = env1;
      x_array = env2;
      r_array = env3;
      break;
  }
  switch (state) {
    case 0:
      var x = this.abs$0();
      var x_array = x.get$array();
    case 1:
      state = 0;
      var r_array = r.get$array();
    case 2:
      state = 0;
      var t3 = x.get$t();
      if (typeof t3 !== 'number')
        throw $.iae(t3);
      var i = 2 * t3;
      r.set$t(i);
      for (; --i, i >= 0;)
        $.indexSet(r_array, i, 0);
      for (i = 0; $.ltB(i, $.sub(x.get$t(), 1)); ++i) {
        var t1 = $.index(x_array, i);
        var t2 = 2 * i;
        var c = x.am$6(i, t1, r, t2, 0, 1);
        t1 = x.get$t();
        if (typeof t1 !== 'number')
          throw $.iae(t1);
        t1 = i + t1;
        t3 = i + 1;
        var t4 = $.index(x_array, i);
        if (typeof t4 !== 'number')
          throw $.iae(t4);
        t3 = x.am$6(t3, 2 * t4, r, t2 + 1, c, $.sub($.sub(x.get$t(), i), 1));
        t3 = $.add($.index(r_array, t1), t3);
        $.indexSet(r_array, t1, t3);
        if ($.geB(t3, $.BI_DV)) {
          t1 = x.get$t();
          if (typeof t1 !== 'number')
            throw $.iae(t1);
          t1 = i + t1;
          t2 = $.BI_DV;
          $.indexSet(r_array, t1, $.sub($.index(r_array, t1), t2));
          t1 = x.get$t();
          if (typeof t1 !== 'number')
            throw $.iae(t1);
          $.indexSet(r_array, i + t1 + 1, 1);
        }
      }
      if ($.gtB(r.get$t(), 0)) {
        t1 = $.sub(r.get$t(), 1);
        t2 = x.am$6(i, $.index(x_array, i), r, 2 * i, 0, 1);
        $.indexSet(r_array, t1, $.add($.index(r_array, t1), t2));
      }
      r.set$s(0);
      r.clamp$0();
  }
},
 multiplyTo$2: function(a, r) {
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.multiplyTo$2$bailout(1, a, r, r_array, 0, 0, 0, 0);
  var x = this.abs$0();
  var y = $.abs(a);
  var y_array = y.get$array();
  if (typeof y_array !== 'string' && (typeof y_array !== 'object' || y_array === null || y_array.constructor !== Array && !y_array.is$JavaScriptIndexingBehavior()))
    return this.multiplyTo$2$bailout(2, x, r, a, r_array, y, y_array, 0);
  var i = x.get$t();
  if (typeof i !== 'number')
    return this.multiplyTo$2$bailout(3, x, r, a, r_array, y, y_array, i);
  var t4 = y.get$t();
  if (typeof t4 !== 'number')
    throw $.iae(t4);
  r.set$t(i + t4);
  for (; --i, i >= 0;) {
    if (i !== (i | 0))
      throw $.iae(i);
    var t1 = r_array.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    r_array[i] = 0;
  }
  for (i = 0; $.ltB(i, y.get$t()); ++i) {
    t1 = x.get$t();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    t1 = i + t1;
    var t2 = y_array.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var t3 = x.am$6(0, y_array[i], r, i, 0, x.get$t());
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    t4 = r_array.length;
    if (t1 < 0 || t1 >= t4)
      throw $.ioore(t1);
    r_array[t1] = t3;
  }
  r.set$s(0);
  r.clamp$0();
  if (!$.eqB(this.s, a.get$s()))
    $.BigInteger_ZERO().subTo$2(r, r);
},
 multiplyTo$2$bailout: function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var a = env0;
      var r = env1;
      r_array = env2;
      break;
    case 2:
      x = env0;
      r = env1;
      a = env2;
      r_array = env3;
      y = env4;
      y_array = env5;
      break;
    case 3:
      x = env0;
      r = env1;
      a = env2;
      r_array = env3;
      y = env4;
      y_array = env5;
      i = env6;
      break;
  }
  switch (state) {
    case 0:
      var r_array = r.get$array();
    case 1:
      state = 0;
      var x = this.abs$0();
      var y = $.abs(a);
      var y_array = y.get$array();
    case 2:
      state = 0;
      var i = x.get$t();
    case 3:
      state = 0;
      r.set$t($.add(i, y.get$t()));
      for (; i = $.sub(i, 1), $.geB(i, 0);)
        $.indexSet(r_array, i, 0);
      for (i = 0; $.ltB(i, y.get$t()); ++i) {
        var t1 = x.get$t();
        if (typeof t1 !== 'number')
          throw $.iae(t1);
        $.indexSet(r_array, i + t1, x.am$6(0, $.index(y_array, i), r, i, 0, x.get$t()));
      }
      r.set$s(0);
      r.clamp$0();
      if (!$.eqB(this.s, a.get$s()))
        $.BigInteger_ZERO().subTo$2(r, r);
  }
},
 subTo$2: function(a, r) {
  var this_array = this.array;
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.subTo$2$bailout(1, a, r, r_array, this_array, 0, 0, 0, 0, 0, 0);
  var a_array = a.get$array();
  if (typeof a_array !== 'string' && (typeof a_array !== 'object' || a_array === null || a_array.constructor !== Array && !a_array.is$JavaScriptIndexingBehavior()))
    return this.subTo$2$bailout(2, a, r, this_array, r_array, a_array, 0, 0, 0, 0, 0);
  var m = $.Math_min(a.get$t(), this.t);
  for (var c = 0, i = 0; i < m;) {
    var t1 = this_array.operator$index$1(i);
    if (typeof t1 !== 'number')
      return this.subTo$2$bailout(3, a, r, c, r_array, i, a_array, m, this_array, t1, 0);
    var t3 = a_array.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    var t4 = a_array[i];
    if (typeof t4 !== 'number')
      return this.subTo$2$bailout(4, a, t4, r, c, r_array, i, a_array, m, this_array, t1);
    t4 = t1 - t4;
    if (t4 !== (t4 | 0))
      return this.subTo$2$bailout(5, a, r, c, r_array, i, a_array, m, t4, this_array, 0);
    c += t4;
    var i0 = i + 1;
    t4 = $.BI_DM;
    if (typeof t4 !== 'number')
      throw $.iae(t4);
    if (t4 !== (t4 | 0))
      return this.subTo$2$bailout(6, t4, a, r, c, r_array, a_array, i, i0, m, this_array);
    t4 = (c & t4) >>> 0;
    var t7 = r_array.length;
    if (i < 0 || i >= t7)
      throw $.ioore(i);
    r_array[i] = t4;
    t4 = $.BI_DB;
    if (typeof t4 !== 'number')
      throw $.iae(t4);
    if (t4 !== (t4 | 0))
      return this.subTo$2$bailout(7, a, r, t4, c, r_array, a_array, i0, m, this_array, 0);
    c = $.shr(c, t4);
    i = i0;
  }
  t1 = a.get$t();
  if (typeof t1 !== 'number')
    return this.subTo$2$bailout(8, a, r, c, i, r_array, a_array, t1, this_array, 0, 0);
  t3 = this.t;
  if (typeof t3 !== 'number')
    return this.subTo$2$bailout(9, a, r, c, i, r_array, a_array, t1, t3, this_array, 0);
  if (t1 < t3) {
    t1 = a.get$s();
    if (typeof t1 !== 'number')
      throw $.iae(t1);
    if (t1 !== (t1 | 0))
      return this.subTo$2$bailout(10, r, c, i, r_array, t1, this_array, 0, 0, 0, 0);
    c -= t1;
    while (true) {
      t1 = this.t;
      if (typeof t1 !== 'number')
        return this.subTo$2$bailout(11, r, t1, i, r_array, c, this_array, 0, 0, 0, 0);
      if (!(i < t1))
        break;
      t1 = this_array.operator$index$1(i);
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      if (t1 !== (t1 | 0))
        return this.subTo$2$bailout(12, r, i, t1, r_array, c, this_array, 0, 0, 0, 0);
      c += t1;
      i0 = i + 1;
      t1 = $.BI_DM;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      if (t1 !== (t1 | 0))
        return this.subTo$2$bailout(13, r, i, r_array, c, t1, i0, this_array, 0, 0, 0);
      t1 = (c & t1) >>> 0;
      t4 = r_array.length;
      if (i < 0 || i >= t4)
        throw $.ioore(i);
      r_array[i] = t1;
      t1 = $.BI_DB;
      if (typeof t1 !== 'number')
        throw $.iae(t1);
      if (t1 !== (t1 | 0))
        return this.subTo$2$bailout(14, r, r_array, c, i0, t1, this_array, 0, 0, 0, 0);
      c = $.shr(c, t1);
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
      return this.subTo$2$bailout(15, a, r, t1, c, i, r_array, a_array, 0, 0, 0);
    c += t1;
    while (true) {
      t1 = a.get$t();
      if (typeof t1 !== 'number')
        return this.subTo$2$bailout(16, a, r, c, r_array, i, t1, a_array, 0, 0, 0);
      if (!(i < t1))
        break;
      t1 = a_array.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      var t2 = a_array[i];
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      if (t2 !== (t2 | 0))
        return this.subTo$2$bailout(17, a, r, r_array, c, i, a_array, t2, 0, 0, 0);
      c -= t2;
      i0 = i + 1;
      t2 = $.BI_DM;
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      if (t2 !== (t2 | 0))
        return this.subTo$2$bailout(18, a, r, c, r_array, i0, i, a_array, t2, 0, 0);
      t2 = (c & t2) >>> 0;
      var t5 = r_array.length;
      if (i < 0 || i >= t5)
        throw $.ioore(i);
      r_array[i] = t2;
      t2 = $.BI_DB;
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      if (t2 !== (t2 | 0))
        return this.subTo$2$bailout(19, a, r, t2, c, r_array, i0, a_array, 0, 0, 0);
      c = $.shr(c, t2);
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
    t1 = $.BI_DV;
    if (typeof t1 !== 'number')
      return this.subTo$2$bailout(20, r, r_array, i0, t1, c, i, 0, 0, 0, 0);
    t1 += c;
    t3 = r_array.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    r_array[i] = t1;
    i = i0;
  } else if (c > 0) {
    i0 = i + 1;
    t1 = r_array.length;
    if (i < 0 || i >= t1)
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
      r_array = env2;
      this_array = env3;
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
      c = env2;
      r_array = env3;
      i = env4;
      a_array = env5;
      m = env6;
      this_array = env7;
      t1 = env8;
      break;
    case 4:
      a = env0;
      t3 = env1;
      r = env2;
      c = env3;
      r_array = env4;
      i = env5;
      a_array = env6;
      m = env7;
      this_array = env8;
      t1 = env9;
      break;
    case 5:
      a = env0;
      r = env1;
      c = env2;
      r_array = env3;
      i = env4;
      a_array = env5;
      m = env6;
      t3 = env7;
      this_array = env8;
      break;
    case 6:
      t3 = env0;
      a = env1;
      r = env2;
      c = env3;
      r_array = env4;
      a_array = env5;
      i = env6;
      i0 = env7;
      m = env8;
      this_array = env9;
      break;
    case 7:
      a = env0;
      r = env1;
      t6 = env2;
      c = env3;
      r_array = env4;
      a_array = env5;
      i0 = env6;
      m = env7;
      this_array = env8;
      break;
    case 8:
      a = env0;
      r = env1;
      c = env2;
      i = env3;
      r_array = env4;
      a_array = env5;
      t1 = env6;
      this_array = env7;
      break;
    case 9:
      a = env0;
      r = env1;
      c = env2;
      i = env3;
      r_array = env4;
      a_array = env5;
      t1 = env6;
      t3 = env7;
      this_array = env8;
      break;
    case 10:
      r = env0;
      c = env1;
      i = env2;
      r_array = env3;
      t1 = env4;
      this_array = env5;
      break;
    case 11:
      r = env0;
      t1 = env1;
      i = env2;
      r_array = env3;
      c = env4;
      this_array = env5;
      break;
    case 12:
      r = env0;
      i = env1;
      t1 = env2;
      r_array = env3;
      c = env4;
      this_array = env5;
      break;
    case 13:
      r = env0;
      i = env1;
      r_array = env2;
      c = env3;
      t1 = env4;
      i0 = env5;
      this_array = env6;
      break;
    case 14:
      r = env0;
      r_array = env1;
      c = env2;
      i0 = env3;
      t4 = env4;
      this_array = env5;
      break;
    case 15:
      a = env0;
      r = env1;
      t1 = env2;
      c = env3;
      i = env4;
      r_array = env5;
      a_array = env6;
      break;
    case 16:
      a = env0;
      r = env1;
      c = env2;
      r_array = env3;
      i = env4;
      t1 = env5;
      a_array = env6;
      break;
    case 17:
      a = env0;
      r = env1;
      r_array = env2;
      c = env3;
      i = env4;
      a_array = env5;
      t1 = env6;
      break;
    case 18:
      a = env0;
      r = env1;
      c = env2;
      r_array = env3;
      i0 = env4;
      i = env5;
      a_array = env6;
      t1 = env7;
      break;
    case 19:
      a = env0;
      r = env1;
      t4 = env2;
      c = env3;
      r_array = env4;
      i0 = env5;
      a_array = env6;
      break;
    case 20:
      r = env0;
      r_array = env1;
      i0 = env2;
      t1 = env3;
      c = env4;
      i = env5;
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
      var m = $.Math_min(a.get$t(), this.t);
      var c = 0;
      var i = 0;
    default:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!(i < m))
                break L0;
              var t1 = $.index(this_array, i);
            case 3:
              state = 0;
              var t3 = $.index(a_array, i);
            case 4:
              state = 0;
              t3 = $.sub(t1, t3);
              if (typeof t3 !== 'number')
                throw $.iae(t3);
            case 5:
              state = 0;
              c += t3;
              var i0 = i + 1;
              t3 = $.BI_DM;
              if (typeof t3 !== 'number')
                throw $.iae(t3);
            case 6:
              state = 0;
              $.indexSet(r_array, i, (c & t3) >>> 0);
              var t6 = $.BI_DB;
              if (typeof t6 !== 'number')
                throw $.iae(t6);
            case 7:
              state = 0;
              c = $.shr(c, t6);
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
                    t1 = $.BI_DM;
                    if (typeof t1 !== 'number')
                      throw $.iae(t1);
                  case 13:
                    state = 0;
                    $.indexSet(r_array, i, (c & t1) >>> 0);
                    var t4 = $.BI_DB;
                    if (typeof t4 !== 'number')
                      throw $.iae(t4);
                  case 14:
                    state = 0;
                    c = $.shr(c, t4);
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
                    t1 = $.BI_DM;
                    if (typeof t1 !== 'number')
                      throw $.iae(t1);
                  case 18:
                    state = 0;
                    $.indexSet(r_array, i, (c & t1) >>> 0);
                    t4 = $.BI_DB;
                    if (typeof t4 !== 'number')
                      throw $.iae(t4);
                  case 19:
                    state = 0;
                    c = $.shr(c, t4);
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
            t1 = $.BI_DV;
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
 clamp$0: function() {
  var this_array = this.array;
  var c = $.and(this.s, $.BI_DM);
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
 rShiftTo$2: function(n, r) {
  var this_array = this.array;
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.rShiftTo$2$bailout(1, n, r, this_array, r_array, 0, 0);
  r.set$s(this.s);
  var ds = $.floor($.div(n, $.BI_DB));
  if (typeof ds !== 'number')
    return this.rShiftTo$2$bailout(2, n, r, this_array, ds, r_array, 0);
  if ($.geB(ds, this.t)) {
    r.set$t(0);
    return;
  }
  var bs = $.mod(n, $.BI_DB);
  var cbs = $.sub($.BI_DB, bs);
  if (cbs !== (cbs | 0))
    return this.rShiftTo$2$bailout(3, r, r_array, bs, this_array, ds, cbs);
  if (typeof bs !== 'number')
    throw $.iae(bs);
  if (bs !== (bs | 0))
    return this.rShiftTo$2$bailout(4, r, r_array, bs, this_array, ds, cbs);
  var bm = $.shl(1, bs) - 1;
  var t3 = $.shr(this_array.operator$index$1(ds), bs);
  var t4 = r_array.length;
  if (0 >= t4)
    throw $.ioore(0);
  r_array[0] = t3;
  for (var i = ds + 1; $.ltB(i, this.t); ++i) {
    var t1 = i - ds;
    var t2 = t1 - 1;
    t3 = $.shl($.and(this_array.operator$index$1(i), bm), cbs);
    if (t2 !== (t2 | 0))
      throw $.iae(t2);
    t4 = r_array.length;
    if (t2 < 0 || t2 >= t4)
      throw $.ioore(t2);
    t3 = $.or(r_array[t2], t3);
    var t5 = r_array.length;
    if (t2 < 0 || t2 >= t5)
      throw $.ioore(t2);
    r_array[t2] = t3;
    t3 = $.shr(this_array.operator$index$1(i), bs);
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    t2 = r_array.length;
    if (t1 < 0 || t1 >= t2)
      throw $.ioore(t1);
    r_array[t1] = t3;
  }
  if (bs > 0) {
    t1 = $.sub($.sub(this.t, ds), 1);
    t2 = $.shl($.and(this.s, bm), cbs);
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    t3 = r_array.length;
    if (t1 < 0 || t1 >= t3)
      throw $.ioore(t1);
    t2 = $.or(r_array[t1], t2);
    t4 = r_array.length;
    if (t1 < 0 || t1 >= t4)
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
      r_array = env1;
      bs = env2;
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
      var ds = $.floor($.div(n, $.BI_DB));
    case 2:
      state = 0;
      if ($.geB(ds, this.t)) {
        r.set$t(0);
        return;
      }
      var bs = $.mod(n, $.BI_DB);
      var cbs = $.sub($.BI_DB, bs);
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
 lShiftTo$2: function(n, r) {
  var this_array = this.array;
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.lShiftTo$2$bailout(1, n, r, this_array, r_array, 0, 0, 0, 0, 0);
  var bs = $.mod(n, $.BI_DB);
  if (bs !== (bs | 0))
    return this.lShiftTo$2$bailout(2, n, r, bs, r_array, this_array, 0, 0, 0, 0);
  var cbs = $.sub($.BI_DB, bs);
  if (typeof cbs !== 'number')
    throw $.iae(cbs);
  if (cbs !== (cbs | 0))
    return this.lShiftTo$2$bailout(3, n, r, r_array, bs, this_array, cbs, 0, 0, 0);
  var bm = $.shl(1, cbs) - 1;
  var ds = $.floor($.div(n, $.BI_DB));
  if (typeof ds !== 'number')
    return this.lShiftTo$2$bailout(4, bm, r, r_array, ds, bs, this_array, cbs, 0, 0);
  var c = $.and($.shl(this.s, bs), $.BI_DM);
  if (c !== (c | 0))
    return this.lShiftTo$2$bailout(5, bm, r, r_array, ds, bs, this_array, c, cbs, 0);
  var i = $.sub(this.t, 1);
  if (typeof i !== 'number')
    return this.lShiftTo$2$bailout(6, bm, r, i, r_array, ds, bs, this_array, c, cbs);
  for (; i >= 0; --i) {
    var t1 = i + ds + 1;
    var t2 = $.or($.shr(this_array.operator$index$1(i), cbs), c);
    if (t1 !== (t1 | 0))
      throw $.iae(t1);
    var t3 = r_array.length;
    if (t1 < 0 || t1 >= t3)
      throw $.ioore(t1);
    r_array[t1] = t2;
    c = $.shl($.and(this_array.operator$index$1(i), bm), bs);
  }
  for (i = ds - 1; i >= 0; --i) {
    if (i !== (i | 0))
      throw $.iae(i);
    t1 = r_array.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    r_array[i] = 0;
  }
  if (ds !== (ds | 0))
    throw $.iae(ds);
  t1 = r_array.length;
  if (ds < 0 || ds >= t1)
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
      this_array = env2;
      r_array = env3;
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
      bs = env3;
      this_array = env4;
      cbs = env5;
      break;
    case 4:
      bm = env0;
      r = env1;
      r_array = env2;
      ds = env3;
      bs = env4;
      this_array = env5;
      cbs = env6;
      break;
    case 5:
      bm = env0;
      r = env1;
      r_array = env2;
      ds = env3;
      bs = env4;
      this_array = env5;
      c = env6;
      cbs = env7;
      break;
    case 6:
      bm = env0;
      r = env1;
      i = env2;
      r_array = env3;
      ds = env4;
      bs = env5;
      this_array = env6;
      c = env7;
      cbs = env8;
      break;
  }
  switch (state) {
    case 0:
      var this_array = this.array;
      var r_array = r.get$array();
    case 1:
      state = 0;
      var bs = $.mod(n, $.BI_DB);
    case 2:
      state = 0;
      var cbs = $.sub($.BI_DB, bs);
      if (typeof cbs !== 'number')
        throw $.iae(cbs);
    case 3:
      state = 0;
      var bm = $.shl(1, cbs) - 1;
      var ds = $.floor($.div(n, $.BI_DB));
    case 4:
      state = 0;
      var c = $.and($.shl(this.s, bs), $.BI_DM);
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
    var t3 = r_array.length;
    if (t1 < 0 || t1 >= t3)
      throw $.ioore(t1);
    r_array[t1] = t2;
  }
  r.set$t($.Math_max($.sub(this.t, n), 0));
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
      r.set$t($.Math_max($.sub(this.t, n), 0));
      r.set$s(this.s);
  }
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
    var t3 = r_array.length;
    if (t1 < 0 || t1 >= t3)
      throw $.ioore(t1);
    r_array[t1] = t2;
  }
  for (i = n - 1; i >= 0; --i) {
    if (i !== (i | 0))
      throw $.iae(i);
    t1 = r_array.length;
    if (i < 0 || i >= t1)
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
 bitLength$0: function() {
  var this_array = this.array;
  var t1 = this.t;
  if (typeof t1 !== 'number')
    return this.bitLength$0$bailout(1, this_array, t1, 0, 0);
  if (t1 <= 0)
    return 0;
  var t2 = $.BI_DB;
  if (typeof t2 !== 'number')
    return this.bitLength$0$bailout(2, this_array, t2, 0, 0);
  if (typeof t1 !== 'number')
    return this.bitLength$0$bailout(3, this_array, t2, t1, 0);
  t2 *= t1 - 1;
  if (typeof t1 !== 'number')
    return this.bitLength$0$bailout(4, t2, this_array, t1, 0);
  var t6 = this_array.operator$index$1(t1 - 1);
  if (t6 !== (t6 | 0))
    return this.bitLength$0$bailout(5, t2, t6, 0, 0);
  var t8 = this.s;
  if (t8 !== (t8 | 0))
    return this.bitLength$0$bailout(6, t8, t2, t6, 0);
  var t10 = $.BI_DM;
  if (t10 !== (t10 | 0))
    return this.bitLength$0$bailout(7, t8, t10, t2, t6);
  var t12 = this.nbits$1((t6 ^ t8 & t10) >>> 0);
  if (typeof t12 !== 'number')
    return this.bitLength$0$bailout(8, t2, t12, 0, 0);
  return t2 + t12;
},
 bitLength$0$bailout: function(state, env0, env1, env2, env3) {
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
      t3 = env2;
      break;
    case 4:
      t1 = env0;
      this_array = env1;
      t5 = env2;
      break;
    case 5:
      t1 = env0;
      t7 = env1;
      break;
    case 6:
      t9 = env0;
      t1 = env1;
      t7 = env2;
      break;
    case 7:
      t9 = env0;
      t11 = env1;
      t1 = env2;
      t7 = env3;
      break;
    case 8:
      t1 = env0;
      t13 = env1;
      break;
  }
  switch (state) {
    case 0:
      var this_array = this.array;
      var t1 = this.t;
    case 1:
      state = 0;
      if ($.leB(t1, 0))
        return 0;
      t1 = $.BI_DB;
    case 2:
      state = 0;
      var t3 = this.t;
    case 3:
      state = 0;
      t1 = $.mul(t1, $.sub(t3, 1));
      var t5 = this.t;
    case 4:
      state = 0;
      var t7 = $.index(this_array, $.sub(t5, 1));
    case 5:
      state = 0;
      var t9 = this.s;
    case 6:
      state = 0;
      var t11 = $.BI_DM;
    case 7:
      state = 0;
      var t13 = this.nbits$1($.xor(t7, $.and(t9, t11)));
    case 8:
      state = 0;
      return $.add(t1, t13);
  }
},
 nbits$1: function(x) {
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
    t2 = a_array.length;
    if (i < 0 || i >= t2)
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
 abs$0: function() {
  return $.ltB(this.s, 0) ? this.negate$0() : this;
},
 negate$0: function() {
  var r = $.nbi();
  $.BigInteger_ZERO().subTo$2(this, r);
  return r;
},
 toString$1: function(b) {
  if (typeof b !== 'number')
    return this.toString$1$bailout(1, b, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  var this_array = this.array;
  var t1 = this.s;
  if (typeof t1 !== 'number')
    return this.toString$1$bailout(2, b, this_array, t1, 0, 0, 0, 0, 0, 0, 0);
  if (t1 < 0)
    return '-' + $.S(this.negate$0().toString$1(b));
  if (b === 16)
    var k = 4;
  else if (b === 8)
    k = 3;
  else if (b === 2)
    k = 1;
  else if (b === 32)
    k = 5;
  else {
    if (b === 4)
      ;
    else
      return this.toRadix$1(b);
    k = 2;
  }
  var km = $.shl(1, k) - 1;
  var i = this.t;
  if (i !== (i | 0))
    return this.toString$1$bailout(3, this_array, i, km, k, 0, 0, 0, 0, 0, 0);
  var t2 = $.BI_DB;
  if (t2 !== (t2 | 0))
    return this.toString$1$bailout(4, this_array, i, km, k, t2, 0, 0, 0, 0, 0);
  var t4 = $.BI_DB;
  if (t4 !== (t4 | 0))
    return this.toString$1$bailout(5, i, k, this_array, km, t2, t4, 0, 0, 0, 0);
  var p = t2 - $.mod(i * t4, k);
  var i0 = i - 1;
  if (i > 0) {
    t1 = $.BI_DB;
    if (typeof t1 !== 'number')
      return this.toString$1$bailout(6, p, k, i0, this_array, km, t1, 0, 0, 0, 0);
    if (p < t1) {
      t1 = this_array.operator$index$1(i0);
      if (t1 !== (t1 | 0))
        return this.toString$1$bailout(7, p, t1, k, i0, this_array, km, 0, 0, 0, 0);
      var d = $.shr(t1, p);
      t1 = d > 0;
    } else {
      d = null;
      t1 = false;
    }
    if (t1) {
      var r = this.int2char$1(d);
      if (typeof r !== 'string')
        return this.toString$1$bailout(8, r, p, k, i0, this_array, km, d, 0, 0, 0);
      var m = true;
    } else {
      r = '';
      m = false;
    }
    for (i = i0; i >= 0;) {
      if (p < k) {
        t1 = this_array.operator$index$1(i);
        if (t1 !== (t1 | 0))
          return this.toString$1$bailout(9, k, this_array, r, m, p, t1, km, i, 0, 0);
        d = $.shl(t1 & $.shl(1, p) - 1, k - p);
        --i;
        var t3 = this_array.operator$index$1(i);
        if (t3 !== (t3 | 0))
          return this.toString$1$bailout(11, k, d, this_array, r, i, m, t3, p, km, 0);
        var t5 = $.BI_DB;
        if (typeof t5 !== 'number')
          return this.toString$1$bailout(12, k, d, this_array, r, i, m, t3, p, km, t5);
        t5 -= k;
        if (t5 !== (t5 | 0))
          return this.toString$1$bailout(13, km, k, d, this_array, r, i, m, t3, p, t5);
        p += t5;
        d = (d | $.shr(t3, p)) >>> 0;
      } else {
        t1 = $.toInt(this_array.operator$index$1(i));
        if (t1 !== (t1 | 0))
          return this.toString$1$bailout(14, k, km, r, t1, m, p, this_array, i, 0, 0);
        t3 = $.toInt(k);
        if (t3 !== (t3 | 0))
          return this.toString$1$bailout(15, k, km, r, t1, m, p, t3, this_array, i, 0);
        p -= t3;
        t3 = $.toInt(p);
        if (t3 !== (t3 | 0))
          return this.toString$1$bailout(16, i, this_array, k, km, r, t1, m, p, t3, 0);
        t3 = $.shr(t1, t3);
        t1 = $.toInt(km);
        if (t1 !== (t1 | 0))
          return this.toString$1$bailout(17, t3, km, t1, k, this_array, r, m, p, i, 0);
        d = (t3 & t1) >>> 0;
        if (p <= 0) {
          t1 = $.BI_DB;
          if (t1 !== (t1 | 0))
            return this.toString$1$bailout(18, km, k, d, this_array, r, m, t1, p, i, 0);
          p += t1;
          --i;
        }
      }
      if (d > 0)
        m = true;
      if (m)
        r += $.S(this.int2char$1(d));
    }
  } else {
    r = '';
    m = false;
  }
  return m ? r : '0';
},
 toString$1$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7, env8, env9) {
  switch (state) {
    case 1:
      var b = env0;
      break;
    case 2:
      b = env0;
      this_array = env1;
      t1 = env2;
      break;
    case 3:
      this_array = env0;
      i = env1;
      km = env2;
      k = env3;
      break;
    case 4:
      this_array = env0;
      i = env1;
      km = env2;
      k = env3;
      t2 = env4;
      break;
    case 5:
      i = env0;
      k = env1;
      this_array = env2;
      km = env3;
      t2 = env4;
      t4 = env5;
      break;
    case 6:
      p = env0;
      k = env1;
      i0 = env2;
      this_array = env3;
      km = env4;
      t1 = env5;
      break;
    case 7:
      p = env0;
      t1 = env1;
      k = env2;
      i0 = env3;
      this_array = env4;
      km = env5;
      break;
    case 8:
      r = env0;
      p = env1;
      k = env2;
      i0 = env3;
      this_array = env4;
      km = env5;
      d = env6;
      break;
    case 9:
      k = env0;
      this_array = env1;
      r = env2;
      m = env3;
      p = env4;
      t1 = env5;
      km = env6;
      i = env7;
      break;
    case 10:
      k = env0;
      this_array = env1;
      r = env2;
      p = env3;
      m = env4;
      t1 = env5;
      km = env6;
      i = env7;
      break;
    case 11:
      k = env0;
      d = env1;
      this_array = env2;
      r = env3;
      i = env4;
      m = env5;
      t4 = env6;
      p = env7;
      km = env8;
      break;
    case 12:
      k = env0;
      d = env1;
      this_array = env2;
      r = env3;
      i = env4;
      m = env5;
      t4 = env6;
      p = env7;
      km = env8;
      t6 = env9;
      break;
    case 13:
      km = env0;
      k = env1;
      d = env2;
      this_array = env3;
      r = env4;
      i = env5;
      m = env6;
      t4 = env7;
      p = env8;
      t6 = env9;
      break;
    case 14:
      k = env0;
      km = env1;
      r = env2;
      t1 = env3;
      m = env4;
      p = env5;
      this_array = env6;
      i = env7;
      break;
    case 15:
      k = env0;
      km = env1;
      r = env2;
      t1 = env3;
      m = env4;
      p = env5;
      t3 = env6;
      this_array = env7;
      i = env8;
      break;
    case 16:
      i = env0;
      this_array = env1;
      k = env2;
      km = env3;
      r = env4;
      t1 = env5;
      m = env6;
      p = env7;
      t3 = env8;
      break;
    case 17:
      t3 = env0;
      km = env1;
      t1 = env2;
      k = env3;
      this_array = env4;
      r = env5;
      m = env6;
      p = env7;
      i = env8;
      break;
    case 18:
      km = env0;
      k = env1;
      d = env2;
      this_array = env3;
      r = env4;
      m = env5;
      t1 = env6;
      p = env7;
      i = env8;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var this_array = this.array;
      var t1 = this.s;
    case 2:
      state = 0;
      if ($.ltB(t1, 0))
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
    case 3:
      state = 0;
      var t2 = $.BI_DB;
    case 4:
      state = 0;
      var t4 = $.BI_DB;
    case 5:
      state = 0;
      var p = $.sub(t2, $.mod($.mul(i, t4), k));
      var i0 = $.sub(i, 1);
    default:
      if (state === 18 || state === 17 || state === 16 || state === 15 || state === 14 || state === 13 || state === 12 || state === 11 || state === 10 || state === 9 || state === 8 || state === 7 || state === 6 || state === 0 && $.gtB(i, 0))
        switch (state) {
          case 0:
            t1 = $.BI_DB;
          case 6:
            state = 0;
          case 7:
            if (state === 7 || state === 0 && $.ltB(p, t1))
              switch (state) {
                case 0:
                  t1 = $.index(this_array, i0);
                case 7:
                  state = 0;
                  var d = $.shr(t1, p);
                  t1 = $.gtB(d, 0);
              }
            else {
              d = null;
              t1 = false;
            }
          case 8:
            if (state === 8 || state === 0 && t1)
              switch (state) {
                case 0:
                  var r = this.int2char$1(d);
                case 8:
                  state = 0;
                  var m = true;
              }
            else {
              r = '';
              m = false;
            }
            i = i0;
          default:
            L0:
              while (true)
                switch (state) {
                  case 0:
                    if (!$.geB(i, 0))
                      break L0;
                  default:
                    if (state === 13 || state === 12 || state === 11 || state === 10 || state === 9 || state === 0 && $.ltB(p, k))
                      switch (state) {
                        case 0:
                          t1 = $.index(this_array, i);
                        case 9:
                          state = 0;
                          if (typeof p !== 'number')
                            throw $.iae(p);
                        case 10:
                          state = 0;
                          d = $.shl($.and(t1, $.shl(1, p) - 1), k - p);
                          i = $.sub(i, 1);
                          t4 = $.index(this_array, i);
                        case 11:
                          state = 0;
                          var t6 = $.BI_DB;
                        case 12:
                          state = 0;
                          t6 = $.sub(t6, k);
                          if (typeof t6 !== 'number')
                            throw $.iae(t6);
                        case 13:
                          state = 0;
                          p += t6;
                          d = $.or(d, $.shr(t4, p));
                      }
                    else
                      switch (state) {
                        case 0:
                          t1 = $.toInt($.index(this_array, i));
                        case 14:
                          state = 0;
                          var t3 = $.toInt(k);
                        case 15:
                          state = 0;
                          p = $.sub(p, t3);
                          t3 = $.toInt(p);
                        case 16:
                          state = 0;
                          t3 = $.shr(t1, t3);
                          t1 = $.toInt(km);
                        case 17:
                          state = 0;
                          d = $.and(t3, t1);
                        case 18:
                          if (state === 18 || state === 0 && $.leB(p, 0))
                            switch (state) {
                              case 0:
                                t1 = $.BI_DB;
                              case 18:
                                state = 0;
                                p = $.add(p, t1);
                                i = $.sub(i, 1);
                            }
                      }
                    if ($.gtB(d, 0))
                      m = true;
                    if (m)
                      r = $.S(r) + $.S(this.int2char$1(d));
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
      var t2 = s.length;
      if (i < 0 || i >= t2)
        throw $.ioore(i);
      var x = $.and(s[i], 255);
    } else
      x = this.intAt$2(s, i);
    if ($.ltB(x, 0)) {
      t2 = s.length;
      if (i < 0 || i >= t2)
        throw $.ioore(i);
      if ($.eqB(s[i], '-'))
        mi = true;
      continue;
    }
    if (sh === 0) {
      t2 = this.t;
      this.t = $.add(t2, 1);
      this_array.operator$indexSet$2(t2, x);
    } else {
      t2 = $.gtB(sh + k, $.BI_DB);
      var t3 = this.t;
      if (t2) {
        t2 = $.sub(t3, 1);
        t3 = $.sub($.BI_DB, sh);
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        var t4 = $.shl($.and(x, $.shl(1, t3) - 1), sh);
        this_array.operator$indexSet$2(t2, $.or(this_array.operator$index$1(t2), t4));
        t2 = this.t;
        this.t = $.add(t2, 1);
        this_array.operator$indexSet$2(t2, $.shr(x, $.sub($.BI_DB, sh)));
      } else {
        t2 = $.sub(t3, 1);
        t3 = $.shl(x, sh);
        this_array.operator$indexSet$2(t2, $.or(this_array.operator$index$1(t2), t3));
      }
    }
    sh += k;
    if ($.geB(sh, $.BI_DB)) {
      t2 = $.BI_DB;
      if (typeof t2 !== 'number')
        throw $.iae(t2);
      sh -= t2;
    }
    mi = false;
  }
  if (t1) {
    t1 = s.length;
    if (0 >= t1)
      throw $.ioore(0);
    t2 = !$.eqB($.and(s[0], 128), 0);
    t1 = t2;
  } else
    t1 = false;
  if (t1) {
    this.s = -1;
    if (sh > 0) {
      t1 = $.sub(this.t, 1);
      t2 = $.sub($.BI_DB, sh);
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
    var x = t1 ? $.and($.index(s, i), 255) : this.intAt$2(s, i);
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
      t2 = $.gtB(sh + k, $.BI_DB);
      var t3 = this.t;
      if (t2) {
        t2 = $.sub(t3, 1);
        t3 = $.sub($.BI_DB, sh);
        if (typeof t3 !== 'number')
          throw $.iae(t3);
        var t4 = $.shl($.and(x, $.shl(1, t3) - 1), sh);
        $.indexSet(this_array, t2, $.or($.index(this_array, t2), t4));
        t2 = this.t;
        this.t = $.add(t2, 1);
        $.indexSet(this_array, t2, $.shr(x, $.sub($.BI_DB, sh)));
      } else {
        t2 = $.sub(t3, 1);
        t3 = $.shl(x, sh);
        $.indexSet(this_array, t2, $.or($.index(this_array, t2), t3));
      }
    }
    sh += k;
    if ($.geB(sh, $.BI_DB)) {
      t2 = $.BI_DB;
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
      t2 = $.sub($.BI_DB, sh);
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
 fromInt$1: function(x) {
  if (typeof x !== 'number')
    return this.fromInt$1$bailout(1, x, 0, 0);
  var this_array = this.array;
  this.t = 1;
  this.s = x < 0 ? -1 : 0;
  if (x > 0)
    this_array.operator$indexSet$2(0, x);
  else if (x < -1) {
    var t1 = $.BI_DV;
    if (typeof t1 !== 'number')
      return this.fromInt$1$bailout(2, x, t1, this_array);
    this_array.operator$indexSet$2(0, x + t1);
  } else
    this.t = 0;
},
 fromInt$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var x = env0;
      break;
    case 2:
      x = env0;
      t1 = env1;
      this_array = env2;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var this_array = this.array;
      this.t = 1;
      this.s = $.ltB(x, 0) ? -1 : 0;
    case 2:
      if (state === 0 && $.gtB(x, 0))
        $.indexSet(this_array, 0, x);
      else
        switch (state) {
          case 0:
          case 2:
            if (state === 2 || state === 0 && $.ltB(x, -1))
              switch (state) {
                case 0:
                  var t1 = $.BI_DV;
                case 2:
                  state = 0;
                  $.indexSet(this_array, 0, $.add(x, t1));
              }
            else
              this.t = 0;
        }
  }
},
 copyTo$1: function(r) {
  var this_array = this.array;
  var r_array = r.get$array();
  if (typeof r_array !== 'object' || r_array === null || (r_array.constructor !== Array || !!r_array.immutable$list) && !r_array.is$JavaScriptIndexingBehavior())
    return this.copyTo$1$bailout(1, this_array, r, r_array, 0);
  var t1 = this.t;
  if (typeof t1 !== 'number')
    return this.copyTo$1$bailout(2, this_array, r, t1, r_array);
  var i = t1 - 1;
  for (; i >= 0; --i) {
    t1 = this_array.operator$index$1(i);
    if (i !== (i | 0))
      throw $.iae(i);
    var t2 = r_array.length;
    if (i < 0 || i >= t2)
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
      t1 = env2;
      r_array = env3;
      break;
  }
  switch (state) {
    case 0:
      var this_array = this.array;
      var r_array = r.get$array();
    case 1:
      state = 0;
      var t1 = this.t;
    case 2:
      state = 0;
      var i = $.sub(t1, 1);
      for (; $.geB(i, 0); i = $.sub(i, 1))
        $.indexSet(r_array, i, $.index(this_array, i));
      r.set$t(this.t);
      r.set$s(this.s);
  }
},
 intAt$2: function(s, i) {
  var c = this.BI_RC.operator$index$1($.charCodeAt(s, i));
  if (typeof c !== 'number')
    return this.intAt$2$bailout(1, c);
  var t1 = c;
  return t1;
},
 intAt$2$bailout: function(state, c) {
  return c == null ? -1 : c;
},
 int2char$1: function(n) {
  var t1 = this.BI_RM;
  if (n !== (n | 0))
    throw $.iae(n);
  var t2 = t1.length;
  if (n < 0 || n >= t2)
    throw $.ioore(n);
  return t1[n];
},
 setupDigitConversions$0: function() {
  this.BI_RM = '0123456789abcdefghijklmnopqrstuvwxyz';
  this.BI_RC = $.HashMapImplementation$();
  var rr = $.charCodeAt('0', 0);
  if (typeof rr !== 'number')
    return this.setupDigitConversions$0$bailout(1, rr);
  for (var vv = 0; vv <= 9; ++vv) {
    var t1 = this.BI_RC;
    var rr0 = rr + 1;
    t1.operator$indexSet$2(rr, vv);
    rr = rr0;
  }
  rr = $.charCodeAt('a', 0);
  if (typeof rr !== 'number')
    return this.setupDigitConversions$0$bailout(2, rr);
  for (vv = 10; vv < 36; ++vv) {
    t1 = this.BI_RC;
    rr0 = rr + 1;
    t1.operator$indexSet$2(rr, vv);
    rr = rr0;
  }
  rr = $.charCodeAt('A', 0);
  if (typeof rr !== 'number')
    return this.setupDigitConversions$0$bailout(3, rr);
  for (vv = 10; vv < 36; ++vv) {
    t1 = this.BI_RC;
    rr0 = rr + 1;
    t1.operator$indexSet$2(rr, vv);
    rr = rr0;
  }
},
 setupDigitConversions$0$bailout: function(state, env0) {
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
 setupEngine$2: function(fn, bits) {
  this.am = fn;
  $.dbits = bits;
  $.BI_DB = $.dbits;
  var t1 = $.dbits;
  if (typeof t1 !== 'number')
    throw $.iae(t1);
  $.BI_DM = $.shl(1, t1) - 1;
  var t2 = $.dbits;
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  $.BI_DV = $.shl(1, t2);
  $.BI_FP = 52;
  $.BI_FV = $.Math_pow(2, $.BI_FP);
  $.BI_F1 = $.sub($.BI_FP, $.dbits);
  var t3 = $.dbits;
  if (typeof t3 !== 'number')
    throw $.iae(t3);
  t3 = 2 * t3;
  var t4 = $.BI_FP;
  if (typeof t4 !== 'number')
    throw $.iae(t4);
  $.BI_F2 = t3 - t4;
},
 am3$6: function(i, x, w, j, c, n) {
  if (typeof i !== 'number')
    return this.am3$6$bailout(1, i, x, w, j, c, n, 0, 0);
  if (typeof j !== 'number')
    return this.am3$6$bailout(1, i, x, w, j, c, n, 0, 0);
  if (c !== (c | 0))
    return this.am3$6$bailout(1, i, x, w, j, c, n, 0, 0);
  if (typeof n !== 'number')
    return this.am3$6$bailout(1, i, x, w, j, c, n, 0, 0);
  var this_array = this.array;
  var w_array = w.get$array();
  if (typeof w_array !== 'object' || w_array === null || (w_array.constructor !== Array || !!w_array.immutable$list) && !w_array.is$JavaScriptIndexingBehavior())
    return this.am3$6$bailout(2, i, x, j, c, n, this_array, w_array, 0);
  var xl = $.and($.toInt(x), 16383);
  if (xl !== (xl | 0))
    return this.am3$6$bailout(3, i, x, j, c, n, this_array, w_array, xl);
  var xh = $.shr($.toInt(x), 14);
  if (xh !== (xh | 0))
    return this.am3$6$bailout(4, i, xh, j, n, this_array, c, w_array, xl);
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
    t1 = w_array.length;
    if (j < 0 || j >= t1)
      throw $.ioore(j);
    var t3 = w_array[j];
    if (typeof t3 !== 'number')
      throw $.iae(t3);
    var l0 = t2 + t3 + c;
    var t4 = $.shr(l0, 28) + $.shr(m, 14);
    if (typeof h !== 'number')
      throw $.iae(h);
    c = t4 + xh * h;
    var j0 = j + 1;
    t4 = l0 & 268435455;
    var t5 = w_array.length;
    if (j < 0 || j >= t5)
      throw $.ioore(j);
    w_array[j] = t4;
    j = j0;
    i = i0;
  }
  return c;
},
 am3$6$bailout: function(state, env0, env1, env2, env3, env4, env5, env6, env7) {
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
 get$am3: function() { return new $.BoundClosure0(this, 'am3$6'); },
 am$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.am.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 am$6: function(arg0, arg1, arg2, arg3, arg4, arg5) { return this.am.call$6(arg0, arg1, arg2, arg3, arg4, arg5); },
 BigInteger$3: function(a, b, c) {
  this.lowprimes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 503, 509];
  this.BI_RC = $.HashMapImplementation$();
  this.j_lm = (this.canary & 16777215) === 15715070;
  this.setupDigitConversions$0();
  var t1 = this.lowprimes;
  var t2 = t1.length - 1;
  var t3 = t1.length;
  if (t2 < 0 || t2 >= t3)
    throw $.ioore(t2);
  t2 = t1[t2];
  if (typeof t2 !== 'number')
    throw $.iae(t2);
  this.lplim = 67108864 / t2;
  this.setupEngine$2(this.get$am3(), 28);
  this.array = $.HashMapImplementation$();
  if (!(a == null))
    if (typeof a === 'number' || typeof a === 'number' && a === (a | 0) || typeof a === 'number')
      this.fromNumber$3(a, b, c);
    else if (b == null && !(typeof a === 'string'))
      this.fromString$2(a, 256);
    else
      this.fromString$2(a, b);
}
};

$$._FixedSizeListIterator = {"":
 ["_lib_length", "_pos", "_array"],
 super: "_VariableSizeListIterator",
 hasNext$0: function() {
  var t1 = this._lib_length;
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
      var t1 = this._lib_length;
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
 next$0: function() {
  if (this.hasNext$0() !== true)
    throw $.captureStackTrace($.CTC2);
  var t1 = this._array;
  if (typeof t1 !== 'string' && (typeof t1 !== 'object' || t1 === null || t1.constructor !== Array && !t1.is$JavaScriptIndexingBehavior()))
    return this.next$0$bailout(1, t1, 0);
  var t3 = this._pos;
  if (typeof t3 !== 'number')
    return this.next$0$bailout(2, t1, t3);
  this._pos = t3 + 1;
  if (t3 !== (t3 | 0))
    throw $.iae(t3);
  var t5 = t1.length;
  if (t3 < 0 || t3 >= t5)
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
        throw $.captureStackTrace($.CTC2);
      var t1 = this._array;
    case 1:
      state = 0;
      var t3 = this._pos;
    case 2:
      state = 0;
      this._pos = $.add(t3, 1);
      return $.index(t1, t3);
  }
},
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
}
};

$$._MessageTraverserVisitedMap = {"":
 [],
 super: "Object",
 cleanup$0: function() {
},
 reset$0: function() {
},
 operator$indexSet$2: function(object, info) {
},
 operator$index$1: function(object) {
  return;
}
};

$$._MessageTraverser = {"":
 [],
 super: "Object",
 visitFunction$1: function(func) {
  throw $.captureStackTrace('Serialization of functions is not allowed.');
},
 _dispatch$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x))
    return this.visitPrimitive$1(x);
  if (typeof x === 'object' && x !== null && (x.constructor === Array || x.is$List()))
    return this.visitList$1(x);
  if (typeof x === 'object' && x !== null && x.is$Map())
    return this.visitMap$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPort)
    return this.visitSendPort$1(x);
  if (typeof x === 'object' && x !== null && !!x.is$SendPortSync)
    return this.visitSendPortSync$1(x);
  if (typeof x === 'function' || typeof x === 'object' && x !== null && !!x.is$Function)
    return this.visitFunction$1(x);
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.S(x) + ' passed');
},
 traverse$1: function(x) {
  if ($._MessageTraverser_isPrimitive(x))
    return this.visitPrimitive$1(x);
  var t1 = this._visited;
  t1.reset$0();
  var result = null;
  try {
    result = this._dispatch$1(x);
  } finally {
    t1.cleanup$0();
  }
  return result;
}
};

$$._Copier = {"":
 [],
 super: "_MessageTraverser",
 visitMap$1: function(map) {
  var t1 = {};
  var t2 = this._visited;
  t1.copy_1 = $.index(t2, map);
  var t3 = t1.copy_1;
  if (!(t3 == null))
    return t3;
  t1.copy_1 = $.HashMapImplementation$();
  $.indexSet(t2, map, t1.copy_1);
  map.forEach$1(new $._Copier_visitMap_anon(this, t1));
  return t1.copy_1;
},
 visitList$1: function(list) {
  if (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior())
    return this.visitList$1$bailout(1, list);
  var t1 = this._visited;
  var copy = t1.operator$index$1(list);
  if (!(copy == null))
    return copy;
  var len = list.length;
  copy = $.ListFactory_List(len);
  t1.operator$indexSet$2(list, copy);
  for (var i = 0; i < len; ++i) {
    t1 = list.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = copy.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    copy[i] = t2;
  }
  return copy;
},
 visitList$1$bailout: function(state, list) {
  var t1 = this._visited;
  var copy = $.index(t1, list);
  if (!(copy == null))
    return copy;
  var len = $.get$length(list);
  copy = $.ListFactory_List(len);
  $.indexSet(t1, list, copy);
  for (var i = 0; $.ltB(i, len); ++i) {
    t1 = this._dispatch$1($.index(list, i));
    var t2 = copy.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    copy[i] = t1;
  }
  return copy;
},
 visitPrimitive$1: function(x) {
  return x;
}
};

$$._Serializer = {"":
 [],
 super: "_MessageTraverser",
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object' || list === null || list.constructor !== Array && !list.is$JavaScriptIndexingBehavior()))
    return this._serializeList$1$bailout(1, list);
  var len = list.length;
  var result = $.ListFactory_List(len);
  for (var i = 0; i < len; ++i) {
    var t1 = list.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = this._dispatch$1(list[i]);
    var t3 = result.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    result[i] = t2;
  }
  return result;
},
 _serializeList$1$bailout: function(state, list) {
  var len = $.get$length(list);
  var result = $.ListFactory_List(len);
  for (var i = 0; $.ltB(i, len); ++i) {
    var t1 = this._dispatch$1($.index(list, i));
    var t2 = result.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    result[i] = t1;
  }
  return result;
},
 visitMap$1: function(map) {
  var t1 = this._visited;
  var copyId = $.index(t1, map);
  if (!(copyId == null))
    return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
},
 visitList$1: function(list) {
  var t1 = this._visited;
  var copyId = $.index(t1, list);
  if (!(copyId == null))
    return ['ref', copyId];
  var id = this._nextFreeRefId;
  this._nextFreeRefId = id + 1;
  $.indexSet(t1, list, id);
  return ['list', id, this._serializeList$1(list)];
},
 visitPrimitive$1: function(x) {
  return x;
}
};

$$._Deserializer = {"":
 [],
 super: "Object",
 _deserializeMap$1: function(x) {
  var result = $.HashMapImplementation$();
  var id = $.index(x, 1);
  $.indexSet(this._deserialized, id, result);
  var keys = $.index(x, 2);
  if (typeof keys !== 'string' && (typeof keys !== 'object' || keys === null || keys.constructor !== Array && !keys.is$JavaScriptIndexingBehavior()))
    return this._deserializeMap$1$bailout(1, x, result, keys);
  var values = $.index(x, 3);
  if (typeof values !== 'string' && (typeof values !== 'object' || values === null || values.constructor !== Array && !values.is$JavaScriptIndexingBehavior()))
    return this._deserializeMap$1$bailout(2, values, result, keys);
  var len = keys.length;
  for (var i = 0; i < len; ++i) {
    var t1 = keys.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var key = this._deserializeHelper$1(keys[i]);
    var t2 = values.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    result.operator$indexSet$2(key, this._deserializeHelper$1(values[i]));
  }
  return result;
},
 _deserializeMap$1$bailout: function(state, env0, env1, env2) {
  switch (state) {
    case 1:
      var x = env0;
      result = env1;
      keys = env2;
      break;
    case 2:
      values = env0;
      result = env1;
      keys = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.HashMapImplementation$();
      var id = $.index(x, 1);
      $.indexSet(this._deserialized, id, result);
      var keys = $.index(x, 2);
    case 1:
      state = 0;
      var values = $.index(x, 3);
    case 2:
      state = 0;
      var len = $.get$length(keys);
      for (var i = 0; $.ltB(i, len); ++i)
        result.operator$indexSet$2(this._deserializeHelper$1($.index(keys, i)), this._deserializeHelper$1($.index(values, i)));
      return result;
  }
},
 _deserializeList$1: function(x) {
  var id = $.index(x, 1);
  var dartList = $.index(x, 2);
  if (typeof dartList !== 'object' || dartList === null || (dartList.constructor !== Array || !!dartList.immutable$list) && !dartList.is$JavaScriptIndexingBehavior())
    return this._deserializeList$1$bailout(1, dartList, id);
  $.indexSet(this._deserialized, id, dartList);
  var len = dartList.length;
  for (var i = 0; i < len; ++i) {
    var t1 = dartList.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var t2 = this._deserializeHelper$1(dartList[i]);
    var t3 = dartList.length;
    if (i < 0 || i >= t3)
      throw $.ioore(i);
    dartList[i] = t2;
  }
  return dartList;
},
 _deserializeList$1$bailout: function(state, dartList, id) {
  $.indexSet(this._deserialized, id, dartList);
  var len = $.get$length(dartList);
  for (var i = 0; $.ltB(i, len); ++i)
    $.indexSet(dartList, i, this._deserializeHelper$1($.index(dartList, i)));
  return dartList;
},
 _deserializeRef$1: function(x) {
  var id = $.index(x, 1);
  return $.index(this._deserialized, id);
},
 _deserializeHelper$1: function(x) {
  if ($._Deserializer_isPrimitive(x))
    return x;
  switch ($.index(x, 0)) {
    case 'ref':
      return this._deserializeRef$1(x);
    case 'list':
      return this._deserializeList$1(x);
    case 'map':
      return this._deserializeMap$1(x);
    case 'sendport':
      return this.deserializeSendPort$1(x);
    default:
      throw $.captureStackTrace('Unexpected serialized object');
  }
},
 deserialize$1: function(x) {
  if ($._Deserializer_isPrimitive(x))
    return x;
  this._deserialized = $.HashMapImplementation$();
  return this._deserializeHelper$1(x);
}
};

$$._Manager = {"":
 ["managers?", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId", "currentManagerId?", "nextIsolateId="],
 super: "Object",
 maybeCloseWorker$0: function() {
  if ($.isEmpty(this.isolates) === true)
    this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
},
 _nativeInitWorkerMessageHandler$0: function() {
    $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  
},
 _nativeDetectEnvironment$0: function() {
    this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  
},
 get$needSerialization: function() {
  return this.get$useWorkers();
},
 get$useWorkers: function() {
  return this.supportsWorkers;
},
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$();
  this.isolates = $.HashMapImplementation$();
  this.managers = $.HashMapImplementation$();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$();
    this._nativeInitWorkerMessageHandler$0();
  }
}
};

$$._IsolateContext = {"":
 ["isolateStatics", "ports?", "id?"],
 super: "Object",
 unregister$1: function(portId) {
  var t1 = this.ports;
  t1.remove$1(portId);
  if ($.isEmpty(t1) === true)
    $._globalState().get$isolates().remove$1(this.id);
},
 register$2: function(portId, port) {
  var t1 = this.ports;
  if (t1.containsKey$1(portId) === true)
    throw $.captureStackTrace($.ExceptionImplementation$('Registry: ports must be registered only once.'));
  $.indexSet(t1, portId, port);
  $.indexSet($._globalState().get$isolates(), this.id, this);
},
 lookup$1: function(portId) {
  return $.index(this.ports, portId);
},
 _setGlobals$0: function() {
$setGlobals(this);
},
 eval$1: function(code) {
  var old = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var result = null;
  try {
    result = code.call$0();
  } finally {
    var t1 = old;
    $._globalState().set$currentContext(t1);
    t1 = old;
    if (!(t1 == null))
      t1._setGlobals$0();
  }
  return result;
},
 initGlobals$0: function() {
$initGlobals(this);
},
 _IsolateContext$0: function() {
  var t1 = $._globalState();
  var t2 = t1.get$nextIsolateId();
  t1.set$nextIsolateId($.add(t2, 1));
  this.id = t2;
  this.ports = $.HashMapImplementation$();
  this.initGlobals$0();
}
};

$$._EventLoop = {"":
 ["events"],
 super: "Object",
 run$0: function() {
  if ($._globalState().get$isWorker() !== true)
    this._runHelper$0();
  else
    try {
      this._runHelper$0();
    } catch (exception) {
      var t1 = $.unwrapException(exception);
      var e = t1;
      var trace = $.getTraceFromException(exception);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', $.S(e) + '\n' + $.S(trace)])));
    }

},
 _runHelper$0: function() {
  if (!($._window() == null))
    new $._EventLoop__runHelper_next(this).call$0();
  else
    for (; this.runIteration$0() === true;)
      ;
},
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if (event$ == null) {
    if ($._globalState().get$isWorker() === true)
      $._globalState().maybeCloseWorker$0();
    else if (!($._globalState().get$rootContext() == null) && $._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true && $._globalState().get$fromCommandLine() === true && $.isEmpty($._globalState().get$rootContext().get$ports()) === true)
      throw $.captureStackTrace($.ExceptionImplementation$('Program exited with open ReceivePorts.'));
    return false;
  }
  event$.process$0();
  return true;
},
 dequeue$0: function() {
  var t1 = this.events;
  if ($.isEmpty(t1) === true)
    return;
  return t1.removeFirst$0();
},
 enqueue$3: function(isolate, fn, msg) {
  $.addLast(this.events, $._IsolateEvent$(isolate, fn, msg));
}
};

$$._IsolateEvent = {"":
 ["message", "fn", "isolate"],
 super: "Object",
 process$0: function() {
  this.isolate.eval$1(this.fn);
}
};

$$._MainManagerStub = {"":
 [],
 super: "Object",
 postMessage$1: function(msg) {
$globalThis.postMessage(msg);
},
 get$id: function() {
  return 0;
}
};

$$._JsSerializer = {"":
 ["_nextFreeRefId", "_visited"],
 super: "_Serializer",
 visitBufferingSendPort$1: function(port) {
  var t1 = port._port;
  if (!(t1 == null))
    return this.visitSendPort$1(t1);
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port._workerId, port._isolateId, port._receivePortId];
},
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port._isolateId, port._receivePort.get$_id()];
},
 visitSendPort$1: function(x) {
  if (!!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (!!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (!!x.is$_BufferingSendPort)
    return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(x));
},
 _JsSerializer$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsCopier = {"":
 ["_visited"],
 super: "_Copier",
 visitBufferingSendPort$1: function(port) {
  var t1 = port._port;
  if (!(t1 == null))
    return this.visitSendPort$1(t1);
  else
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
},
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$(port._workerId, port._isolateId, port._receivePortId);
},
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$(port._receivePort, port._isolateId);
},
 visitSendPort$1: function(x) {
  if (!!x.is$_NativeJsSendPort)
    return this.visitNativeJsSendPort$1(x);
  if (!!x.is$_WorkerSendPort)
    return this.visitWorkerSendPort$1(x);
  if (!!x.is$_BufferingSendPort)
    return this.visitBufferingSendPort$1(x);
  throw $.captureStackTrace('Illegal underlying port ' + $.S(this.get$p()));
},
 _JsCopier$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._JsDeserializer = {"":
 ["_deserialized"],
 super: "_Deserializer",
 deserializeSendPort$1: function(x) {
  var managerId = $.index(x, 1);
  var isolateId = $.index(x, 2);
  var receivePortId = $.index(x, 3);
  if ($.eqB(managerId, $._globalState().get$currentManagerId())) {
    var isolate = $.index($._globalState().get$isolates(), isolateId);
    if (isolate == null)
      return;
    return $._NativeJsSendPort$(isolate.lookup$1(receivePortId), isolateId);
  } else
    return $._WorkerSendPort$(managerId, isolateId, receivePortId);
}
};

$$._JsVisitedMap = {"":
 ["tagged"],
 super: "Object",
 _getAttachedInfo$1: function(o) {
return o['__MessageTraverser__attached_info__'];
},
 _setAttachedInfo$2: function(o, info) {
o['__MessageTraverser__attached_info__'] = info;
},
 _clearAttachedInfo$1: function(o) {
o['__MessageTraverser__attached_info__'] = (void 0);
},
 cleanup$0: function() {
  var length$ = $.get$length(this.tagged);
  if (typeof length$ !== 'number')
    return this.cleanup$0$bailout(1, length$);
  var i = 0;
  for (; i < length$; ++i)
    this._clearAttachedInfo$1($.index(this.tagged, i));
  this.tagged = null;
},
 cleanup$0$bailout: function(state, length$) {
  var i = 0;
  for (; $.ltB(i, length$); ++i)
    this._clearAttachedInfo$1($.index(this.tagged, i));
  this.tagged = null;
},
 reset$0: function() {
  this.tagged = $.ListFactory_List(null);
},
 operator$indexSet$2: function(object, info) {
  $.add$1(this.tagged, object);
  this._setAttachedInfo$2(object, info);
},
 operator$index$1: function(object) {
  return this._getAttachedInfo$1(object);
}
};

$$._BaseSendPort = {"":
 ["_isolateId?"],
 super: "Object",
 call$1: function(message) {
  var completer = $.CompleterImpl$();
  var port = $._ReceivePortImpl$();
  this.send$2(message, port.toSendPort$0());
  port.receive$1(new $._BaseSendPort_call_anon(port, completer));
  return completer.get$future();
},
 _checkReplyTo$1: function(replyTo) {
  if (!(replyTo == null) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_NativeJsSendPort) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_WorkerSendPort) && !(typeof replyTo === 'object' && replyTo !== null && !!replyTo.is$_BufferingSendPort))
    throw $.captureStackTrace($.ExceptionImplementation$('SendPort.send: Illegal replyTo port type'));
},
 is$SendPort: true
};

$$._NativeJsSendPort = {"":
 ["_receivePort?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return this._receivePort.get$_id();
},
 operator$eq$1: function(other) {
  return typeof other === 'object' && other !== null && !!other.is$_NativeJsSendPort && $.eqB(this._receivePort, other._receivePort);
},
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._NativeJsSendPort_send_anon(message, this, replyTo));
},
 is$_NativeJsSendPort: true,
 is$SendPort: true
};

$$._WorkerSendPort = {"":
 ["_receivePortId", "_workerId?", "_isolateId"],
 super: "_BaseSendPort",
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
},
 operator$eq$1: function(other) {
  if (typeof other === 'object' && other !== null && !!other.is$_WorkerSendPort)
    var t1 = $.eqB(this._workerId, other._workerId) && $.eqB(this._isolateId, other._isolateId) && $.eqB(this._receivePortId, other._receivePortId);
  else
    t1 = false;
  return t1;
},
 send$2: function(message, replyTo) {
  $._waitForPendingPorts([message, replyTo], new $._WorkerSendPort_send_anon(message, this, replyTo));
},
 is$_WorkerSendPort: true,
 is$SendPort: true
};

$$._ReceivePortImpl = {"":
 ["_callback?", "_id?"],
 super: "Object",
 toSendPort$0: function() {
  return $._NativeJsSendPort$(this, $._globalState().get$currentContext().get$id());
},
 close$0: function() {
  this._callback = null;
  $._globalState().get$currentContext().unregister$1(this._id);
},
 receive$1: function(onMessage) {
  this._callback = onMessage;
},
 _callback$2: function(arg0, arg1) { return this._callback.call$2(arg0, arg1); },
 _ReceivePortImpl$0: function() {
  $._globalState().get$currentContext().register$2(this._id, this);
}
};

$$._PendingSendPortFinder = {"":
 ["ports?", "_visited"],
 super: "_MessageTraverser",
 visitSendPort$1: function(port) {
  if (!!port.is$_BufferingSendPort && port._port == null)
    $.add$1(this.ports, port.get$_futurePort());
},
 visitMap$1: function(map) {
  var t1 = this._visited;
  if (!($.index(t1, map) == null))
    return;
  $.indexSet(t1, map, true);
  $.forEach(map.getValues$0(), new $._PendingSendPortFinder_visitMap_anon(this));
},
 visitList$1: function(list) {
  var t1 = this._visited;
  if (!($.index(t1, list) == null))
    return;
  $.indexSet(t1, list, true);
  $.forEach(list, new $._PendingSendPortFinder_visitList_anon(this));
},
 visitPrimitive$1: function(x) {
},
 _PendingSendPortFinder$0: function() {
  this._visited = $._JsVisitedMap$();
}
};

$$._Timer = {"":
 ["_handle", "_once"],
 super: "Object",
 _Timer$repeating$2: function(milliSeconds, callback) {
  this._handle = $._window().setInterval$2(new $.anon0(this, callback), milliSeconds);
},
 _Timer$2: function(milliSeconds, callback) {
  this._handle = $._window().setTimeout$2(new $.anon(this, callback), milliSeconds);
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

$$.HashSetImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 call$2: function(key, value) {
  this.f_0.call$1(key);
}
};

$$.startRootIsolate_anon = {"":
 [],
 super: "Closure",
 call$0: function() {
  return $._setTimerFactoryClosure($._timerFactory);
}
};

$$.DoubleLinkedQueue_length__ = {"":
 ["box_0"],
 super: "Closure",
 call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
}
};

$$.LinkedHashMapImplementation_forEach__ = {"":
 ["f_0"],
 super: "Closure",
 call$1: function(entry) {
  this.f_0.call$2(entry.get$key(), entry.get$value());
}
};

$$._BaseSendPort_call_anon = {"":
 ["port_1", "completer_0"],
 super: "Closure",
 call$2: function(value, ignoreReplyTo) {
  this.port_1.close$0();
  var t1 = typeof value === 'object' && value !== null && !!value.is$Exception;
  var t2 = this.completer_0;
  if (t1)
    t2.completeException$1(value);
  else
    t2.complete$1(value);
}
};

$$._WorkerSendPort_send_anon = {"":
 ["message_2", "this_1", "replyTo_0"],
 super: "Closure",
 call$0: function() {
  this.this_1._checkReplyTo$1(this.replyTo_0);
  var workerMessage = $._serializeMessage($.makeLiteralMap(['command', 'message', 'port', this.this_1, 'msg', this.message_2, 'replyTo', this.replyTo_0]));
  if ($._globalState().get$isWorker() === true)
    $._globalState().get$mainManager().postMessage$1(workerMessage);
  else
    $.index($._globalState().get$managers(), this.this_1.get$_workerId()).postMessage$1(workerMessage);
}
};

$$._waitForPendingPorts_anon = {"":
 ["callback_0"],
 super: "Closure",
 call$1: function(_) {
  return this.callback_0.call$0();
}
};

$$.Futures_wait_anon = {"":
 ["result_5", "pos_4", "completer_3", "box_0", "values_2"],
 super: "Closure",
 call$1: function(value) {
  $.indexSet(this.values_2, this.pos_4, value);
  var remaining = $.sub(this.box_0.remaining_1, 1);
  this.box_0.remaining_1 = remaining;
  if ($.eqB(remaining, 0) && this.result_5.get$isComplete() !== true)
    this.completer_3.complete$1(this.values_2);
}
};

$$.Futures_wait_anon0 = {"":
 ["result_8", "completer_7", "future_6"],
 super: "Closure",
 call$1: function(exception) {
  if (this.result_8.get$isComplete() !== true)
    this.completer_7.completeException$2(exception, this.future_6.get$stackTrace());
  return true;
}
};

$$._PendingSendPortFinder_visitList_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0._dispatch$1(e);
}
};

$$._PendingSendPortFinder_visitMap_anon = {"":
 ["this_0"],
 super: "Closure",
 call$1: function(e) {
  return this.this_0._dispatch$1(e);
}
};

$$._StorageImpl_getValues_anon = {"":
 ["values_0"],
 super: "Closure",
 call$2: function(k, v) {
  return $.add$1(this.values_0, v);
}
};

$$.HashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.add(t2, 1);
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, value);
}
};

$$.LinkedHashMapImplementation_getValues__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$value());
}
};

$$._NativeJsSendPort_send_anon = {"":
 ["message_5", "this_4", "replyTo_3"],
 super: "Closure",
 call$0: function() {
  var t1 = {};
  this.this_4._checkReplyTo$1(this.replyTo_3);
  var isolate = $.index($._globalState().get$isolates(), this.this_4.get$_isolateId());
  if (isolate == null)
    return;
  if (this.this_4.get$_receivePort().get$_callback() == null)
    return;
  var shouldSerialize = !($._globalState().get$currentContext() == null) && !$.eqB($._globalState().get$currentContext().get$id(), this.this_4.get$_isolateId());
  t1.msg_1 = this.message_5;
  t1.reply_2 = this.replyTo_3;
  if (shouldSerialize) {
    t1.msg_1 = $._serializeMessage(t1.msg_1);
    t1.reply_2 = $._serializeMessage(t1.reply_2);
  }
  $._globalState().get$topEventLoop().enqueue$3(isolate, new $._NativeJsSendPort_send_anon0(this.this_4, t1, shouldSerialize), 'receive ' + $.S(this.message_5));
}
};

$$._NativeJsSendPort_send_anon0 = {"":
 ["this_7", "box_0", "shouldSerialize_6"],
 super: "Closure",
 call$0: function() {
  if (!(this.this_7.get$_receivePort().get$_callback() == null)) {
    if (this.shouldSerialize_6 === true) {
      var msg = $._deserializeMessage(this.box_0.msg_1);
      this.box_0.msg_1 = msg;
      var reply = $._deserializeMessage(this.box_0.reply_2);
      this.box_0.reply_2 = reply;
    }
    var t1 = this.this_7.get$_receivePort();
    var t2 = this.box_0;
    t1._callback$2(t2.msg_1, t2.reply_2);
  }
}
};

$$._StorageImpl_getKeys_anon = {"":
 ["keys_0"],
 super: "Closure",
 call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
}
};

$$.HashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$2: function(key, value) {
  var t1 = this.list_2;
  var t2 = this.box_0.i_1;
  var i = $.add(t2, 1);
  this.box_0.i_1 = i;
  $.indexSet(t1, t2, key);
}
};

$$.LinkedHashMapImplementation_getKeys__ = {"":
 ["list_2", "box_0"],
 super: "Closure",
 call$1: function(entry) {
  var t1 = this.list_2;
  var t2 = this.box_0.index_1;
  var index = $.add(t2, 1);
  this.box_0.index_1 = index;
  $.indexSet(t1, t2, entry.get$key());
}
};

$$._Copier_visitMap_anon = {"":
 ["this_2", "box_0"],
 super: "Closure",
 call$2: function(key, val) {
  $.indexSet(this.box_0.copy_1, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
}
};

$$._EventLoop__runHelper_next = {"":
 ["this_0"],
 super: "Closure",
 call$0: function() {
  if (this.this_0.runIteration$0() !== true)
    return;
  $._window().setTimeout$2(this, 0);
}
};

$$.anon = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 call$0: function() {
  return this.callback_0.call$1(this.this_1);
}
};

$$.anon0 = {"":
 ["this_1", "callback_0"],
 super: "Closure",
 call$0: function() {
  return this.callback_0.call$1(this.this_1);
}
};

$$.Closure = {"":
 [],
 super: "Object",
 toString$0: function() {
  return 'Closure';
},
 is$Function: true
};

$$.BoundClosure = {'':
 ['self', 'target'],
 'super': 'Closure',
call$2: function(p0, p1) { return this.self[this.target](p0, p1); }
};
$$.BoundClosure0 = {'':
 ['self', 'target'],
 'super': 'Closure',
call$6: function(p0, p1, p2, p3, p4, p5) { return this.self[this.target](p0, p1, p2, p3, p4, p5); }
};
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a * b;
  return a.operator$mul$1(b);
};

$.startRootIsolate = function(entry) {
  var t1 = $._Manager$();
  $._globalState0(t1);
  if ($._globalState().get$isWorker() === true)
    return;
  var rootContext = $._IsolateContext$();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
  if (!($._window() == null))
    rootContext.eval$1(new $.startRootIsolate_anon());
  rootContext.eval$1(entry);
  $._globalState().get$topEventLoop().run$0();
};

$.FutureImpl$ = function() {
  var t1 = [];
  var t2 = [];
  return new $.FutureImpl([], t2, t1, false, null, null, null, false);
};

$._window = function() {
  return typeof window != "undefined" ? window : null;
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$(argument));
};

$._IsolateContext$ = function() {
  var t1 = new $._IsolateContext(null, null, null);
  t1._IsolateContext$0();
  return t1;
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.floor$0();
  return Math.floor(receiver);
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.truncate$0();
  return receiver < 0 ? $.ceil(receiver) : $.floor(receiver);
};

$.sub = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a - b : $.sub$slow(a, b);
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number')
    return isNaN(receiver);
  else
    return receiver.isNaN$0();
};

$.Montgomery$ = function(m) {
  var t1 = new $.Montgomery(null, null, null, null, null, null);
  t1.Montgomery$1(m);
  return t1;
};

$.isInfinite = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.isInfinite$0();
  return receiver == Infinity || receiver == -Infinity;
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

$.BigInteger$ = function(a, b, c) {
  var t1 = new $.BigInteger(null, null, null, '0123456789abcdefghijklmnopqrstuvwxyz', null, null, null, 244837814094590, null, null);
  t1.BigInteger$3(a, b, c);
  return t1;
};

$.Collections__containsRef = function(c, ref) {
  for (var t1 = $.iterator(c); t1.hasNext$0() === true;) {
    var t2 = t1.next$0();
    if (t2 == null ? ref == null : t2 === ref)
      return true;
  }
  return false;
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.ListFactory_List(null);
  $.setRuntimeTypeInfo(result, {E: 'Match'});
  var length$ = $.get$length(haystack);
  var patternLength = needle.length;
  for (var startIndex = 0; true;) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1))
      break;
    result.push($.StringMatch$(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$))
      break;
    else
      startIndex = $.eqB(position, endIndex) ? $.add(startIndex, 1) : endIndex;
  }
  return result;
};

$._AllMatchesIterator$ = function(re, _str) {
  return new $._AllMatchesIterator(false, null, _str, $.JSSyntaxRegExp$_globalVersionOf(re));
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a <= b;
  return a.operator$le$1(b);
};

$.isJsArray = function(value) {
  return !(value == null) && value.constructor === Array;
};

$.HashMapImplementation__nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
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

$._AllMatchesIterable$ = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.Arrays_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $.Arrays_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (startIndex >= a.length)
    return -1;
  if (startIndex < 0)
    startIndex = 0;
  for (var i = startIndex; i < endIndex; ++i) {
    var t1 = a.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string'))
    return receiver.allMatches$1(str);
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.BigInteger_nbv = function(i) {
  var r = $.nbi();
  r.fromInt$1(i);
  return r;
};

$.dynamicSetMetadata = function(inputTable) {
  var t1 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t1);
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.get$length = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length;
  else
    return receiver.get$length();
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a >= b;
  return a.operator$ge$1(b);
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.endsWith$1(other);
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength))
    return false;
  if (typeof otherLength !== 'number')
    throw $.iae(otherLength);
  return $.eq(other, $.substring$1(receiver, receiverLength - otherLength));
};

$.ListIterator$ = function(list) {
  return new $.ListIterator(list, 0);
};

$.IllegalJSRegExpException$ = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.FutureImpl_FutureImpl$immediate = function(value) {
  var res = $.FutureImpl$();
  res._setValue$1(value);
  return res;
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.clear = function(receiver) {
  if (!$.isJsArray(receiver))
    return receiver.clear$0();
  $.set$length(receiver, 0);
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion)
      return 'Document';
    return 'HTMLDocument';
  }
  if ($.eqB(name$, 'CanvasPixelArray'))
    return 'Uint8ClampedArray';
  if ($.eqB(name$, 'HTMLDDElement'))
    return 'HTMLElement';
  if ($.eqB(name$, 'HTMLDTElement'))
    return 'HTMLElement';
  if ($.eqB(name$, 'HTMLTableDataCellElement'))
    return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLTableHeaderCellElement'))
    return 'HTMLTableCellElement';
  if ($.eqB(name$, 'HTMLPhraseElement'))
    return 'HTMLElement';
  if ($.eqB(name$, 'MSStyleCSSProperties'))
    return 'CSSStyleDeclaration';
  if ($.eqB(name$, 'MouseWheelEvent'))
    return 'WheelEvent';
  return name$;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = obj.constructor;
  if (typeof(constructor$) === 'function') {
    var name$ = constructor$.name;
    if (typeof(name$) === 'string' && $.isEmpty(name$) !== true && !(name$ === 'Object') && !(name$ === 'Function.prototype'))
      return name$;
  }
  var string = Object.prototype.toString.call(obj);
  return $.substring$2(string, 8, string.length - 1);
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.FutureAlreadyCompleteException$ = function() {
  return new $.FutureAlreadyCompleteException();
};

$.ltB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b) === true;
};

$.NullPointerException$ = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true)
    return $._JsSerializer$().traverse$1(message);
  else
    return $._JsCopier$().traverse$1(message);
};

$.Math_max = function(a, b) {
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

$.Primitives_printString = function(string) {
  if (typeof dartPrint == "function") {
    dartPrint(string);
    return;
  }
  if (typeof console == "object") {
    console.log(string);
    return;
  }
  if (typeof write == "function") {
    write(string);
    write("\n");
  }
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure == null)
    return;
  var function$ = closure.$identity;
  if (!!function$)
    return function$;
  function$ = function() {
    return $.invokeClosure.call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  };
  closure.$identity = function$;
  return function$;
};

$._JsSerializer$ = function() {
  var t1 = new $._JsSerializer(0, $._MessageTraverserVisitedMap$());
  t1._JsSerializer$0();
  return t1;
};

$.JSSyntaxRegExp$_globalVersionOf = function(other) {
  var t1 = other.get$pattern();
  var t2 = other.get$multiLine();
  t1 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t2, t1);
  t1.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t1;
};

$._FixedSizeListIterator$ = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
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

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string'))
    return receiver.split$1(pattern);
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$._deserializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true)
    return $._JsDeserializer$().deserialize$1(message);
  else
    return message;
};

$.StringBase_concatAll = function(strings) {
  return $.stringJoinUnchecked($.StringBase__toJsStringArray(strings), '');
};

$.Math_log = function(x) {
  return $.MathNatives_log(x);
};

$.Math_pow = function(x, exponent) {
  return $.MathNatives_pow(x, exponent);
};

$.MathNatives_pow = function(value, exponent) {
  $.checkNum(value);
  $.checkNum(exponent);
  return Math.pow(value, exponent);
};

$._DoubleLinkedQueueIterator$ = function(_sentinel) {
  var t1 = new $._DoubleLinkedQueueIterator(null, _sentinel);
  t1._DoubleLinkedQueueIterator$1(_sentinel);
  return t1;
};

$.MathNatives_log = function(value) {
  return Math.log($.checkNum(value));
};

$.S = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string'))
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  return res;
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$.LinkedHashMapImplementation$ = function() {
  var t1 = new $.LinkedHashMapImplementation(null, null);
  t1.LinkedHashMapImplementation$0();
  return t1;
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b)) {
    a = a;
    b = b;
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

$._PendingSendPortFinder$ = function() {
  var t1 = $._MessageTraverserVisitedMap$();
  t1 = new $._PendingSendPortFinder([], t1);
  t1._PendingSendPortFinder$0();
  return t1;
};

$.regExpGetNative = function(regExp) {
  var r = regExp._re;
  return r == null ? regExp._re = $.regExpMakeNative(regExp, false) : r;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$(obj, name$, arguments$, null));
};

$.checkNull = function(object) {
  if (object == null)
    throw $.captureStackTrace($.NullPointerException$(null, $.CTC));
  return object;
};

$._dynamicMetadata0 = function() {
  if (typeof($dynamicMetadata) === 'undefined') {
    var t1 = [];
    $._dynamicMetadata(t1);
  }
  return $dynamicMetadata;
};

$.CompleterImpl$ = function() {
  return new $.CompleterImpl($.FutureImpl$());
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a & b) >>> 0;
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex == null)
    endIndex = length$;
  $.checkNum(endIndex);
  if ($.ltB(startIndex, 0))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(startIndex, endIndex))
    throw $.captureStackTrace($.IndexOutOfRangeException$(startIndex));
  if ($.gtB(endIndex, length$))
    throw $.captureStackTrace($.IndexOutOfRangeException$(endIndex));
  return $.substringUnchecked(receiver, startIndex, endIndex);
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

$.ExceptionImplementation$ = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$ = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.StackTrace$ = function(stack) {
  return new $.StackTrace(stack);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  if ($.eqB(numberOfArguments, 0))
    return $._callInIsolate(isolate, new $.invokeClosure_anon(closure));
  else if ($.eqB(numberOfArguments, 1))
    return $._callInIsolate(isolate, new $.invokeClosure_anon0(closure, arg1));
  else if ($.eqB(numberOfArguments, 2))
    return $._callInIsolate(isolate, new $.invokeClosure_anon1(closure, arg1, arg2));
  else
    throw $.captureStackTrace($.ExceptionImplementation$('Unsupported number of arguments for wrapped closure'));
};

$.stringJoinUnchecked = function(array, separator) {
  return array.join(separator);
};

$.gt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b);
};

$._fillStatics = function(context) {
  $globals = context.isolateStatics;
  $static_init();

};

$.DoubleLinkedQueue$ = function() {
  var t1 = new $.DoubleLinkedQueue(null);
  t1.DoubleLinkedQueue$0();
  return t1;
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object' || inputTable === null || inputTable.constructor !== Array && !inputTable.is$JavaScriptIndexingBehavior()))
    return $.buildDynamicMetadata$bailout(1, inputTable, 0, 0, 0, 0, 0, 0);
  var result = [];
  for (var i = 0; t1 = inputTable.length, i < t1; ++i) {
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t2 = inputTable.length;
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$();
    $.setRuntimeTypeInfo(set, {E: 'String'});
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object' || tagNames === null || tagNames.constructor !== Array && !tagNames.is$JavaScriptIndexingBehavior()))
      return $.buildDynamicMetadata$bailout(2, inputTable, result, tagNames, tag, i, tags, set);
    for (var j = 0; t1 = tagNames.length, j < t1; ++j) {
      if (j < 0 || j >= t1)
        throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$(tag, tags, set));
  }
  return result;
  var t1;
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

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.contains$1(other);
  return $.contains$2(receiver, other, 0);
};

$._DoubleLinkedQueueEntrySentinel$ = function() {
  var t1 = new $._DoubleLinkedQueueEntrySentinel(null, null, null);
  t1.DoubleLinkedQueueEntry$1(null);
  t1._DoubleLinkedQueueEntrySentinel$0();
  return t1;
};

$.mul = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a * b : $.mul$slow(a, b);
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a < b;
  return a.operator$lt$1(b);
};

$._Deserializer_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
};

$.neg = function(a) {
  if (typeof a === "number")
    return -a;
  return a.operator$negate$0();
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

$._MessageTraverser_isPrimitive = function(x) {
  return x == null || typeof x === 'string' || typeof x === 'number' || typeof x === 'boolean';
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

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
};

$.BigInteger_ONE = function() {
  return $.BigInteger_nbv(1);
};

$.isEven = function(receiver) {
  if (!(typeof receiver === 'number' && receiver === (receiver | 0)))
    return receiver.isEven$0();
  return (receiver & 1) === 0;
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a - b;
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString(this.dartException);
};

$._globalState = function() {
return $globalState;
};

$.DoubleLinkedQueueEntry$ = function(e) {
  var t1 = new $.DoubleLinkedQueueEntry(null, null, null);
  t1.DoubleLinkedQueueEntry$1(e);
  return t1;
};

$._globalState0 = function(val) {
$globalState = val;
};

$._ReceivePortImpl$ = function() {
  var t1 = $._ReceivePortImpl__nextFreeId;
  $._ReceivePortImpl__nextFreeId = $.add(t1, 1);
  t1 = new $._ReceivePortImpl(null, t1);
  t1._ReceivePortImpl$0();
  return t1;
};

$.or = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a | b) >>> 0;
  return a.operator$or$1(b);
};

$.contains$2 = function(receiver, other, startIndex) {
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._MainManagerStub$ = function() {
  return new $._MainManagerStub();
};

$._setTimerFactoryClosure = function(closure) {
  $._TimerFactory__factory = closure;
};

$.StringBase__toJsStringArray = function(strings) {
  if (typeof strings !== 'object' || strings === null || (strings.constructor !== Array || !!strings.immutable$list) && !strings.is$JavaScriptIndexingBehavior())
    return $.StringBase__toJsStringArray$bailout(1, strings);
  $.checkNull(strings);
  var length$ = strings.length;
  if ($.isJsArray(strings)) {
    for (var i = 0; i < length$; ++i) {
      var t1 = strings.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      var string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
    }
    var array = strings;
  } else {
    array = $.ListFactory_List(length$);
    for (i = 0; i < length$; ++i) {
      t1 = strings.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      string = strings[i];
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      t1 = array.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.IndexOutOfRangeException$ = function(_value) {
  return new $.IndexOutOfRangeException(_value);
};

$.typeNameInOpera = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  return name$;
};

$._MessageTraverserVisitedMap$ = function() {
  return new $._MessageTraverserVisitedMap();
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$(exception.stack);
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

$.HashSetImplementation$ = function() {
  var t1 = new $.HashSetImplementation(null);
  t1.HashSetImplementation$0();
  return t1;
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string')
    return receiver.split(pattern);
  else if (typeof pattern === 'object' && pattern !== null && !!pattern.is$JSSyntaxRegExp)
    return receiver.split($.regExpGetNative(pattern));
  else
    throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
};

$.Classic$ = function(m) {
  var t1 = new $.Classic(null);
  t1.Classic$1(m);
  return t1;
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length))
    throw $.captureStackTrace($.UnsupportedOperationException$(reason));
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

$._timerFactory = function(millis, callback, repeating) {
  return repeating === true ? $._Timer$repeating(millis, callback) : $._Timer$(millis, callback);
};

$._EventLoop$ = function() {
  var t1 = $.DoubleLinkedQueue$();
  $.setRuntimeTypeInfo(t1, {E: '_IsolateEvent'});
  return new $._EventLoop(t1);
};

$.Futures_wait = function(futures) {
  var t1 = {};
  if (typeof futures !== 'string' && (typeof futures !== 'object' || futures === null || futures.constructor !== Array && !futures.is$JavaScriptIndexingBehavior()))
    return $.Futures_wait$bailout(1, futures, t1);
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, {T: 'List'});
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, {T: 'List'});
  var result = completer.get$future();
  t1.remaining_1 = futures.length;
  var values = $.ListFactory_List(futures.length);
  for (var i = 0; t2 = futures.length, i < t2; ++i) {
    if (i < 0 || i >= t2)
      throw $.ioore(i);
    var future = futures[i];
    future.then$1(new $.Futures_wait_anon(result, i, completer, t1, values));
    future.handleException$1(new $.Futures_wait_anon0(result, completer, future));
  }
  return result;
  var t2;
};

$.MetaInfo$ = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$.Collections_collectionToString = function(c) {
  var result = $.StringBufferImpl$('');
  $.Collections__emitCollection(c, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.KeyValuePair$ = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$.nbi = function() {
  return $.BigInteger$(null, null, null);
};

$._NativeJsSendPort$ = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver)) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  }
  return receiver.add$1(value);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});
};

$.print = function(obj) {
  if (typeof obj === 'string')
    $.Primitives_printString(obj);
  else
    $.Primitives_printString($.toString(obj));
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$(value));
  }
  return value;
};

$.div = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a / b : $.div$slow(a, b);
};

$.dynamicFunction = function(name$) {
  var f = Object.prototype[name$];
  if (!(f == null) && !!f.methods)
    return f.methods;
  var methods = {};
  var dartMethod = Object.getPrototypeOf($.CTC4)[name$];
  if (!(dartMethod == null))
    methods['Object'] = dartMethod;
  var bind = function() {return $.dynamicBind.call$4(this, name$, methods, Array.prototype.slice.call(arguments));};
  bind.methods = methods;
  $.defineProperty(Object.prototype, name$, bind);
  return methods;
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.geB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a >= b : $.ge$slow(a, b) === true;
};

$.regExpExec = function(regExp, str) {
  var result = $.regExpGetNative(regExp).exec(str);
  if (result === null)
    return;
  return result;
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver))
    return $.ListIterator$(receiver);
  return receiver.iterator$0();
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string')
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  else if (typeof other === 'object' && other !== null && !!other.is$JSSyntaxRegExp)
    return other.hasMatch$1($.substring$1(receiver, startIndex));
  else
    return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
};

$._Timer$repeating = function(milliSeconds, callback) {
  var t1 = new $._Timer(null, false);
  t1._Timer$repeating$2(milliSeconds, callback);
  return t1;
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

$.ObjectNotClosureException$ = function() {
  return new $.ObjectNotClosureException();
};

$.Primitives_objectToString = function(object) {
  return 'Instance of \'' + $.S($.Primitives_objectTypeName(object)) + '\'';
};

$._Lists_indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object' || a === null || a.constructor !== Array && !a.is$JavaScriptIndexingBehavior()))
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if (typeof endIndex !== 'number')
    return $._Lists_indexOf$bailout(1, a, element, startIndex, endIndex);
  if ($.geB(startIndex, a.length))
    return -1;
  if ($.ltB(startIndex, 0))
    startIndex = 0;
  if (typeof startIndex !== 'number')
    return $._Lists_indexOf$bailout(2, a, element, startIndex, endIndex);
  for (var i = startIndex; i < endIndex; ++i) {
    if (i !== (i | 0))
      throw $.iae(i);
    var t1 = a.length;
    if (i < 0 || i >= t1)
      throw $.ioore(i);
    if ($.eqB(a[i], element))
      return i;
  }
  return -1;
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.abs$0();
  return Math.abs(receiver);
};

$.typeNameInSafari = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  if ($.eqB(name$, 'CanvasPixelArray'))
    return 'Uint8ClampedArray';
  if ($.eqB(name$, 'WebKitMutationObserver'))
    return 'MutationObserver';
  return name$;
};

$.HashMapImplementation__firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
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

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$(index));
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window'))
    return 'DOMWindow';
  if ($.eqB(name$, 'Document'))
    return 'HTMLDocument';
  if ($.eqB(name$, 'XMLDocument'))
    return 'Document';
  if ($.eqB(name$, 'WorkerMessageEvent'))
    return 'MessageEvent';
  return name$;
};

$.leB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a <= b : $.le$slow(a, b) === true;
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a > b;
  return a.operator$gt$1(b);
};

$.isNegative = function(receiver) {
  if (typeof receiver === 'number')
    return receiver === 0 ? 1 / receiver < 0 : receiver < 0;
  else
    return receiver.isNegative$0();
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b)) {
    var result = a % b;
    if (result === 0)
      return 0;
    if (result > 0)
      return result;
    b = b;
    if (b < 0)
      return result - b;
    else
      return result + b;
  }
  return a.operator$mod$1(b);
};

$.regExpMakeNative = function(regExp, global) {
  var pattern = regExp.pattern;
  var multiLine = regExp.multiLine;
  var ignoreCase = regExp.ignoreCase;
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

$.BigInteger_ZERO = function() {
  return $.BigInteger_nbv(0);
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

$._JsVisitedMap$ = function() {
  return new $._JsVisitedMap(null);
};

$._JsDeserializer$ = function() {
  return new $._JsDeserializer(null);
};

$.Maps_mapToString = function(m) {
  var result = $.StringBufferImpl$('');
  $.Maps__emitMap(m, result, $.ListFactory_List(null));
  return result.toString$0();
};

$.isEmpty = function(receiver) {
  if (typeof receiver === 'string' || $.isJsArray(receiver))
    return receiver.length === 0;
  return receiver.isEmpty$0();
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$();
  for (; iterator.hasNext$0() === true;)
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  return result;
};

$.Math_min = function(a, b) {
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

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string'))
    return receiver.startsWith$1(other);
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length))
    return false;
  return other == receiver.substring(0, length$);
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

$._IsolateEvent$ = function(isolate, fn, message) {
  return new $._IsolateEvent(message, fn, isolate);
};

$.forEach = function(receiver, f) {
  if (!$.isJsArray(receiver))
    return receiver.forEach$1(f);
  else
    return $.Collections_forEach(receiver, f);
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

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.S($.getTypeNameOf(obj));
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

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = methods[tag];
  if (method == null && !($._dynamicMetadata0() == null))
    for (var i = 0; $.ltB(i, $.get$length($._dynamicMetadata0())); ++i) {
      var entry = $.index($._dynamicMetadata0(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        method = methods[entry.get$tag()];
        if (!(method == null))
          break;
      }
    }
  if (method == null)
    method = methods['Object'];
  var proto = Object.getPrototypeOf(obj);
  if (method == null)
    method = function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}};
  if (!proto.hasOwnProperty(name$))
    $.defineProperty(proto, name$, method);
  return method.apply(obj, arguments$);
};

$.Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$.getFunctionForTypeNameOf = function() {
  if (!(typeof(navigator) === 'object'))
    return $.typeNameInChrome;
  var userAgent = navigator.userAgent;
  if ($.contains$1(userAgent, $.CTC3) === true)
    return $.typeNameInChrome;
  else if ($.contains$1(userAgent, 'Firefox') === true)
    return $.typeNameInFirefox;
  else if ($.contains$1(userAgent, 'MSIE') === true)
    return $.typeNameInIE;
  else if ($.contains$1(userAgent, 'Opera') === true)
    return $.typeNameInOpera;
  else if ($.contains$1(userAgent, 'Safari') === true)
    return $.typeNameInSafari;
  else
    return $.constructorNameFallback;
};

$._waitForPendingPorts = function(message, callback) {
  var finder = $._PendingSendPortFinder$();
  finder.traverse$1(message);
  $.Futures_wait(finder.ports).then$1(new $._waitForPendingPorts_anon(callback));
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = index >>> 0;
    if (key === index && key < a.length)
      return a[key];
  }
  return $.index$slow(a, index);
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b))
    return (a ^ b) >>> 0;
  return a.operator$xor$1(b);
};

$.MatchImplementation$ = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.add = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a + b : $.add$slow(a, b);
};

$.ListFactory_List = function(length$) {
  return $.Primitives_newList(length$);
};

$.UnsupportedOperationException$ = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.captureStackTrace = function(ex) {
  if (ex == null)
    ex = $.CTC0;
  var jsError = new Error();
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.call$0;
  return jsError;
};

$._Collections_forEach = function(iterable, f) {
  for (var t1 = $.iterator(iterable); t1.hasNext$0() === true;)
    f.call$1(t1.next$0());
};

$.Barrett$ = function(m) {
  var t1 = new $.Barrett(null, null, null, null);
  t1.Barrett$1(m);
  return t1;
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

$.StackOverflowException$ = function() {
  return new $.StackOverflowException();
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

$.HashMapImplementation$ = function() {
  var t1 = new $.HashMapImplementation(null, null, null, null, null);
  t1.HashMapImplementation$0();
  return t1;
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a / b;
  return a.operator$div$1(b);
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string'))
    return receiver.substring$1(startIndex);
  return $.substring$2(receiver, startIndex, null);
};

$.FormatException$ = function(message) {
  return new $.FormatException(message);
};

$._Timer$ = function(milliSeconds, callback) {
  var t1 = new $._Timer(null, true);
  t1._Timer$2(milliSeconds, callback);
  return t1;
};

$.StringBufferImpl$ = function(content$) {
  var t1 = new $.StringBufferImpl(null, null);
  t1.StringBufferImpl$1(content$);
  return t1;
};

$._JsCopier$ = function() {
  var t1 = new $._JsCopier($._MessageTraverserVisitedMap$());
  t1._JsCopier$0();
  return t1;
};

$.gtB = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a > b : $.gt$slow(a, b) === true;
};

$.NoMoreElementsException$ = function() {
  return new $.NoMoreElementsException();
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target == null))
    target.builtin$typeInfo = typeInfo;
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b)) {
    a = a;
    b = b;
    if (b < 0)
      throw $.captureStackTrace($.IllegalArgumentException$(b));
    if (b > 31)
      return 0;
    return (a << b) >>> 0;
  }
  return a.operator$shl$1(b);
};

$._Manager$ = function() {
  var t1 = new $._Manager(null, null, null, null, null, null, null, null, null, 1, 0, 0);
  t1._Manager$0();
  return t1;
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b))
    return a + b;
  return a.operator$add$1(b);
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

$.lt = function(a, b) {
  return typeof a === 'number' && typeof b === 'number' ? a < b : $.lt$slow(a, b);
};

$.main = function() {
  var x = $.BigInteger$('abcd1234', 16, null);
  var y = $.BigInteger$('beef', 16, null);
  var z = x.mod$1(y);
  var zz = x.multiply$1(y);
  $.print(x.toString$1(16));
  $.print(y.toString$1(16));
  $.print(z.toString$1(16));
  $.print(zz.toString$1(16));
  for (var i = 0; i < 100;) {
    $.print('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
    zz = x.multiply$1(zz);
    $.print(zz.toString$1(16));
    ++i;
  }
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
      else if ($.contains$1(message, ' is not a function') === true)
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

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number'))
    return receiver.ceil$0();
  return Math.ceil(receiver);
};

$.NoSuchMethodException$ = function(_receiver, _functionName, _arguments, existingArgumentNames) {
  return new $.NoSuchMethodException(existingArgumentNames, _arguments, _functionName, _receiver);
};

$.HashMapImplementation__computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.HashSetIterator$ = function(set_) {
  var t1 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t1.HashSetIterator$1(set_);
  return t1;
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf == null)
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  return $._getTypeNameOf.call$1(obj);
};

$.FutureNotCompleteException$ = function() {
  return new $.FutureNotCompleteException();
};

$.addLast = function(receiver, value) {
  if (!$.isJsArray(receiver))
    return receiver.addLast$1(value);
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$._WorkerSendPort$ = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_receivePortId, _workerId, isolateId);
};

$.IllegalArgumentException$ = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._Lists_indexOf$bailout = function(state, env0, env1, env2, env3) {
  switch (state) {
    case 1:
      var a = env0;
      var element = env1;
      var startIndex = env2;
      var endIndex = env3;
      break;
    case 2:
      a = env0;
      element = env1;
      startIndex = env2;
      endIndex = env3;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.geB(startIndex, $.get$length(a)))
        return -1;
      if ($.ltB(startIndex, 0))
        startIndex = 0;
    case 2:
      state = 0;
      for (var i = startIndex; $.ltB(i, endIndex); i = $.add(i, 1))
        if ($.eqB($.index(a, i), element))
          return i;
      return -1;
  }
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

$.Futures_wait$bailout = function(state, futures, t1) {
  if ($.isEmpty(futures) === true) {
    t1 = $.FutureImpl_FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, {T: 'List'});
    return t1;
  }
  var completer = $.CompleterImpl$();
  $.setRuntimeTypeInfo(completer, {T: 'List'});
  var result = completer.get$future();
  t1.remaining_1 = $.get$length(futures);
  var values = $.ListFactory_List($.get$length(futures));
  for (var i = 0; $.ltB(i, $.get$length(futures)); ++i) {
    var future = $.index(futures, i);
    future.then$1(new $.Futures_wait_anon(result, i, completer, t1, values));
    future.handleException$1(new $.Futures_wait_anon0(result, completer, future));
  }
  return result;
};

$.buildDynamicMetadata$bailout = function(state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      var inputTable = env0;
      break;
    case 2:
      inputTable = env0;
      result = env1;
      tagNames = env2;
      tag = env3;
      i = env4;
      tags = env5;
      set = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0:
        while (true)
          switch (state) {
            case 0:
              if (!$.ltB(i, $.get$length(inputTable)))
                break L0;
              var tag = $.index($.index(inputTable, i), 0);
              var tags = $.index($.index(inputTable, i), 1);
              var set = $.HashSetImplementation$();
              $.setRuntimeTypeInfo(set, {E: 'String'});
              var tagNames = $.split(tags, '|');
            case 2:
              state = 0;
              for (var j = 0; $.ltB(j, $.get$length(tagNames)); ++j)
                set.add$1($.index(tagNames, j));
              $.add$1(result, $.MetaInfo$(tag, tags, set));
              ++i;
          }
      return result;
  }
};

$.StringBase__toJsStringArray$bailout = function(state, strings) {
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
    array = $.ListFactory_List(length$);
    for (i = 0; $.ltB(i, length$); ++i) {
      string = $.index(strings, i);
      $.checkNull(string);
      if (!(typeof string === 'string'))
        throw $.captureStackTrace($.IllegalArgumentException$(string));
      var t1 = array.length;
      if (i < 0 || i >= t1)
        throw $.ioore(i);
      array[i] = string;
    }
  }
  return array;
};

$.dynamicBind.call$4 = $.dynamicBind;
$.dynamicBind.$name = "dynamicBind";
$.typeNameInOpera.call$1 = $.typeNameInOpera;
$.typeNameInOpera.$name = "typeNameInOpera";
$.typeNameInIE.call$1 = $.typeNameInIE;
$.typeNameInIE.$name = "typeNameInIE";
$.typeNameInFirefox.call$1 = $.typeNameInFirefox;
$.typeNameInFirefox.$name = "typeNameInFirefox";
$.constructorNameFallback.call$1 = $.constructorNameFallback;
$.constructorNameFallback.$name = "constructorNameFallback";
$._timerFactory.call$3 = $._timerFactory;
$._timerFactory.$name = "_timerFactory";
$.throwNoSuchMethod.call$3 = $.throwNoSuchMethod;
$.throwNoSuchMethod.$name = "throwNoSuchMethod";
$.invokeClosure.call$5 = $.invokeClosure;
$.invokeClosure.$name = "invokeClosure";
$.typeNameInChrome.call$1 = $.typeNameInChrome;
$.typeNameInChrome.$name = "typeNameInChrome";
$.toStringWrapper.call$0 = $.toStringWrapper;
$.toStringWrapper.$name = "toStringWrapper";
$.typeNameInSafari.call$1 = $.typeNameInSafari;
$.typeNameInSafari.$name = "typeNameInSafari";
Isolate.$finishClasses($$);
$$ = {};
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC2 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC5 = new Isolate.$isolateProperties.EmptyQueueException();
$.CTC3 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC1 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC4 = new Isolate.$isolateProperties.Object();
$.CTC0 = new Isolate.$isolateProperties.NullPointerException(Isolate.$isolateProperties.CTC, null);
$.BI_FV = null;
$.dbits = null;
$.BI_F2 = null;
$._getTypeNameOf = null;
$._TimerFactory__factory = null;
$.BI_DV = null;
$.BI_DM = null;
$.BI_FP = null;
$._ReceivePortImpl__nextFreeId = 1;
$.BI_DB = null;
$.BI_F1 = null;
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
 is$Collection: function() { return false; },
 toString$0: function() { return $.toStringForNativeObject(this); },
 is$List: function() { return false; },
 is$Map: function() { return false; },
 is$JavaScriptIndexingBehavior: function() { return false; }
});

$.$defineNativeClass('HTMLAnchorElement', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('Attr', ["value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioParam', ["value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.call$0(); }
});

$.$defineNativeClass('HTMLButtonElement', ["value="], {
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 get$clear: function() {
  return this.getPropertyValue$1('clear');
},
 clear$0: function() { return this.get$clear().call$0(); },
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
}
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
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

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
},
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'String'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
},
 remove$1: function(token) {
  return this.remove(token);
},
 contains$1: function(token) {
  return this.contains(token);
},
 add$1: function(token) {
  return this.add(token);
}
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
},
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
},
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('DocumentFragment', [], {
 get$parent: function() {
  return;
},
 get$id: function() {
  return '';
}
});

$.$defineNativeClass('Element', ["id?"], {
});

$.$defineNativeClass('Entry', [], {
 remove$2: function(successCallback, errorCallback) {
  return this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1));
},
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  return this.remove(successCallback);
},
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

$.$defineNativeClass('EventSource', [], {
 close$0: function() {
  return this.close();
}
});

$.$defineNativeClass('FileException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('FileList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'File'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileWriter', ["length?"], {
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'num'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'num'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
 reset$0: function() {
  return this.reset();
}
});

$.$defineNativeClass('Gamepad', ["id?"], {
});

$.$defineNativeClass('GamepadList', ["length?"], {
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 remove$1: function(index) {
  return this.remove(index);
},
 set$length: function(value) {
this.length = value;
},
 get$length: function() {
return this.length;
},
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('IDBCursor', ["key?"], {
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', [], {
 close$0: function() {
  return this.close();
}
});

$.$defineNativeClass('IDBDatabaseException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('IDBObjectStore', [], {
 clear$0: function() {
  return this.clear();
},
 add$2: function(value, key) {
  return this.add(value,key);
},
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('HTMLImageElement', [], {
 complete$1: function(arg0) { return this.complete.call$1(arg0); }
});

$.$defineNativeClass('HTMLInputElement', ["value=", "pattern?"], {
});

$.$defineNativeClass('Int16Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["value="], {
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('MediaList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'String'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
 remove$1: function(track) {
  return this.remove(track);
},
 add$1: function(track) {
  return this.add(track);
}
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
});

$.$defineNativeClass('MessagePort', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 close$0: function() {
  return this.close();
}
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
},
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
},
 contains$1: function(other) {
  return this.contains(other);
},
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
},
 set$text: function(value) {
this.textContent = value;
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
 remove$0: function() {
  if (!(this.get$parent() == null))
    this.get$parent().$dom_removeChild$1(this);
  return this;
}
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
return this[index];
},
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
},
 clear$0: function() {
  this._parent.set$text('');
},
 removeLast$0: function() {
  var result = this.last$0();
  if (!(result == null))
    this._parent.$dom_removeChild$1(result);
  return result;
},
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Node'});
  return t1;
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Notification', ["tag?"], {
 close$0: function() {
  return this.close();
}
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
});

$.$defineNativeClass('HTMLOutputElement', ["value="], {
});

$.$defineNativeClass('HTMLParamElement', ["value="], {
});

$.$defineNativeClass('PeerConnection00', [], {
 close$0: function() {
  return this.close();
}
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
});

$.$defineNativeClass('RadioNodeList', ["value="], {
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

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGElement', [], {
 get$id: function() {
return this.id;
}
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
}
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "length="], {
});

$.$defineNativeClass('SourceBufferList', ["length?"], {
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
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
},
 $dom_removeItem$1: function(key) {
  return this.removeItem(key);
},
 $dom_key$1: function(index) {
  return this.key(index);
},
 $dom_getItem$1: function(key) {
  return this.getItem(key);
},
 $dom_clear$0: function() {
  return this.clear();
},
 get$$$dom_length: function() {
return this.length;
},
 isEmpty$0: function() {
  return this.$dom_key$1(0) == null;
},
 get$length: function() {
  return this.get$$$dom_length();
},
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $._StorageImpl_getValues_anon(values));
  return values;
},
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $._StorageImpl_getKeys_anon(keys));
  return keys;
},
 forEach$1: function(f) {
  for (var i = 0; true; ++i) {
    var key = this.$dom_key$1(i);
    if (key == null)
      return;
    f.call$2(key, this.operator$index$1(key));
  }
},
 clear$0: function() {
  return this.$dom_clear$0();
},
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
},
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
},
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
},
 containsKey$1: function(key) {
  return !(this.$dom_getItem$1(key) == null);
},
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'StyleSheet'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["value="], {
});

$.$defineNativeClass('TextTrackCue', ["text!", "id?"], {
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('TouchList', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'Touch'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot assign element of immutable List.'));
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot removeLast on immutable List.'));
},
 indexOf$2: function(element, start) {
  return $._Lists_indexOf(this, element, start, $.get$length(this));
},
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
},
 forEach$1: function(f) {
  return $._Collections_forEach(this, f);
},
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$('Cannot add to immutable List.'));
},
 iterator$0: function() {
  var t1 = $._FixedSizeListIterator$(this);
  $.setRuntimeTypeInfo(t1, {T: 'int'});
  return t1;
},
 operator$indexSet$2: function(index, value) {
this[index] = value
},
 operator$index$1: function(index) {
return this[index];
},
 is$JavaScriptIndexingBehavior: function() { return true; },
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('WebSocket', [], {
 close$2: function(code, reason) {
  return this.close(code,reason);
},
 close$0: function() {
  return this.close();
}
});

$.$defineNativeClass('DOMWindow', ["length?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
},
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
},
 close$0: function() {
  return this.close();
}
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
},
 postMessage$1: function(message) {
  return this.postMessage(message);
}
});

$.$defineNativeClass('WorkerContext', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
},
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
},
 close$0: function() {
  return this.close();
}
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('XMLHttpRequestException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('XPathException', [], {
 toString$0: function() {
  return this.toString();
}
});

$.$defineNativeClass('XSLTProcessor', [], {
 reset$0: function() {
  return this.reset();
}
});

$.$defineNativeClass('Worker', [], {
 postMessage$1: function(msg) {
return this.postMessage(msg);
},
 get$id: function() {
return this.id;
}
});

$.$defineNativeClass('DOMWindow', [], {
 setInterval$2: function(handler, timeout) {
  return this.setInterval($.convertDartClosureToJS(handler, 0),timeout);
},
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
}
});

// 116 dynamic classes.
// 276 classes
// 23 !leaf
(function(){
  var v0/*class(_SVGElementImpl)*/ = 'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGTextContentElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement|SVGTextPathElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGRadialGradientElement|SVGLinearGradientElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement|SVGClipPathElement|SVGCircleElement|SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement';
  var v1/*class(_ElementImpl)*/ = [v0/*class(_SVGElementImpl)*/,v0/*class(_SVGElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMediaElement|HTMLVideoElement|HTMLAudioElement|HTMLVideoElement|HTMLAudioElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDataListElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v2/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot|ShadowRoot';
  var v3/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|CDATASection|Comment|Text|CDATASection|CDATASection|Comment';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync|FileEntrySync|DirectoryEntrySync'],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue|IDBCursorWithValue'],
    ['SVGElement', v0/*class(_SVGElementImpl)*/],
    ['Element', v1/*class(_ElementImpl)*/],
    ['DocumentFragment', v2/*class(_DocumentFragmentImpl)*/],
    ['CharacterData', v3/*class(_CharacterDataImpl)*/],
    ['Node', [v1/*class(_ElementImpl)*/,v2/*class(_DocumentFragmentImpl)*/,v3/*class(_CharacterDataImpl)*/,v1/*class(_ElementImpl)*/,v2/*class(_DocumentFragmentImpl)*/,v3/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|HTMLDocument|SVGDocument|SVGDocument|Attr|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|HTMLDocument|SVGDocument|SVGDocument|Attr'].join('|')],
    ['NodeList', 'NodeList|RadioNodeList|RadioNodeList'],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain|AudioGain'],
    ['WorkerContext', 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext|SharedWorkerContext|DedicatedWorkerContext'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList|DOMSettableTokenList'],
    ['Entry', 'Entry|FileEntry|DirectoryEntry|FileEntry|DirectoryEntry']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.call$0 = $.main
if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.startRootIsolate($.main);
    }
  }, false);
} else {
  $.startRootIsolate($.main);
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
