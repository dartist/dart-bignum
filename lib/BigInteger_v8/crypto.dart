
class Arcfour {
  var i;
  var j;
  Map S;
  Arcfour() {
    this.i = 0;
    this.j = 0;
    this.S = new Map();
  }
  
// Initialize arcfour context from key, an array of ints, each from [0..255]
  init(key) {
    var i, j, t;
    for(i = 0; i < 256; ++i)
      this.S[i] = i;
    j = 0;
    for(i = 0; i < 256; ++i) {
      j = (j + this.S[i] + key[i % key.length]) & 255;
      t = this.S[i];
      this.S[i] = this.S[j];
      this.S[j] = t;
    }
    this.i = 0;
    this.j = 0;
  }
  
  next() {
    var t;
    this.i = (this.i + 1) & 255;
    this.j = (this.j + this.S[this.i]) & 255;
    t = this.S[this.i];
    this.S[this.i] = this.S[this.j];
    this.S[this.j] = t;
    return this.S[(t + this.S[this.i]) & 255];
  }
}

// Plug in your RNG constructor here
prng_newstate() {
  return new Arcfour();
}


class SecureRandom {
  Mathx.Random rng;
  SecureRandom() {
    rng = new Mathx.Random();
    rng_pool_init();
    
  }
  
  // Pool size must be a multiple of 4 and greater than 32.
  // An array of bytes the size of the pool will be passed to init()
  var rng_psize = 256;
  // Random number generator - requires a PRNG backend, e.g. prng4.js
  
  // For best results, put code like
  // <body onClick='rng_seed_time();' onKeyPress='rng_seed_time();'>
  // in your main HTML document.
  
  var rng_state;
  var rng_pool;
  var rng_pptr;
  
  // Mix in a 32-bit integer into the pool
  rng_seed_int(x) {
    rng_pool[rng_pptr++] ^= x & 255;
    rng_pool[rng_pptr++] ^= (x >> 8) & 255;
    rng_pool[rng_pptr++] ^= (x >> 16) & 255;
    rng_pool[rng_pptr++] ^= (x >> 24) & 255;
    if(rng_pptr >= rng_psize) rng_pptr -= rng_psize;
  }
  
  // Mix in the current time (w/milliseconds) into the pool
  rng_seed_time() {
    // Use pre-computed date to avoid making the benchmark
    // results dependent on the current date.
    rng_seed_int(1122926989487);
  }
  
  
  // TODO: this must get called at some point
  rng_pool_init() {
    // Initialize the pool with junk if needed.
    if(rng_pool == null) {
      rng_pool = new Map();
      rng_pptr = 0;
      var t;
      while(rng_pptr < rng_psize) {  // extract some randomness from Mathx.random()
        //t = (65536 * Mathx.random()).floor();
        t = (65536 * rng.nextDouble()).floor();
        rng_pool[rng_pptr++] = t.toInt() >> 8;
        rng_pool[rng_pptr++] = t.toInt() & 255;
      }
      rng_pptr = 0;
      rng_seed_time();
      //rng_seed_int(window.screenX);
      //rng_seed_int(window.screenY);
    }
  }
  
  
  rng_get_byte() {
    if(rng_state == null) {
      rng_seed_time();
      rng_state = prng_newstate();
      rng_state.init(rng_pool);
      for(rng_pptr = 0; rng_pptr < rng_pool.length; ++rng_pptr)
        rng_pool[rng_pptr] = 0;
      rng_pptr = 0;
      //rng_pool = null;
    }
    // TODO: allow reseeding after first request
    return rng_state.next();
  }
  
  //rng_get_bytes(ba) {
  nextBytes(ba) {
    var i;
    for(i = 0; i < ba.length; ++i) ba[i] = rng_get_byte();
  }
}

// convert a (hex) string to a bignum object
parseBigInt(str,r) {
  return new BigInteger(str,r);
}

// PKCS#1 (type 2, random) pad input string s to n bytes, and return a bigint
pkcs1pad2(s,n) {
  if(n < s.length + 11) {
    print("Message too long for RSA");
    return null;
  }
  var ba = new Map();
  var i = s.length - 1;
  while(i >= 0 && n > 0) ba[--n] = s.charCodeAt(i--);
  ba[--n] = 0;
  var rng = new SecureRandom();
  var x = new Map();
  while(n > 2) { // random non-zero pad
    x[0] = 0;
    while(x[0] == 0) rng.nextBytes(x);
    ba[--n] = x[0];
  }
  ba[--n] = 2;
  ba[--n] = 0;
  return new BigInteger(ba);
}

class RSAKey {
  var n;
  var e;
  var d;
  var p;
  var q;
  var dmp1;
  var dmq1;
  var coeff;
  
  // "empty" RSA key constructor
  RSAKey() {
    this.n = null;
    this.e = 0;
    this.d = null;
    this.p = null;
    this.q = null;
    this.dmp1 = null;
    this.dmq1 = null;
    this.coeff = null;
  }
  
  // Set the public key fields N and e from hex strings
  setPublic(N,E) {
    if(N != null && E != null && N.length > 0 && E.length > 0) {
      this.n = parseBigInt(N,16);
      //this.e = parseInt(E,16);
      this.e = Fixnum.int32.parseHex(E).toInt();
      //Mathx.parseInt("A");
    }
    else
      print("Invalid RSA public key");
  }
  
  // Perform raw public operation on "x": return x^e (mod n)
  doPublic(x) {
    return x.modPowInt(this.e, this.n);
  }
  
  // Return the PKCS#1 RSA encryption of "text" as an even-length hex string
  encrypt(text) {
    var m = pkcs1pad2(text,(this.n.bitLength()+7)>>3);
    if(m == null) return null;
    var c = this.doPublic(m);
    if(c == null) return null;
    var h = c.toString(16);
    if((h.length & 1) == 0) { 
        return h;  
      } else { 
        //return "0" + h; 
        return "0${h}"; 
      }
  }
  
  // Undo PKCS#1 (type 2, random) padding and, if valid, return the plaintext
  pkcs1unpad2(d,n) {
    var b = d.toByteArray();
    var i = 0;
    while(i < b.length && b[i] == 0) ++i;
    if(b.length-i != n-1 || b[i] != 2)
      return null;
    ++i;
    while(b[i] != 0)
      if(++i >= b.length) return null;
    var ret = "";
    while(++i < b.length) {
      var c = new String.fromCharCodes([b[i]]);
      ret = "$ret${c}";
    }
      //ret += String.fromCharCode(b[i]);
    return ret;
  }
  
  // Set the private key fields N, e, and d from hex strings
  setPrivate(N,E,D) {
    if(N != null && E != null && N.length > 0 && E.length > 0) {
      this.n = parseBigInt(N,16);
      //this.e = parseInt(E,16);
      this.e = Fixnum.int32.parseHex(E).toInt();
      this.d = parseBigInt(D,16);
    }
    else
      print("Invalid RSA private key");
  }
  
  // Set the private key fields N, e, d and CRT params from hex strings
  setPrivateEx(N,E,D,P,Q,DP,DQ,C) {
    if(N != null && E != null && N.length > 0 && E.length > 0) {
      this.n = parseBigInt(N,16);
      //this.e = parseInt(E,16);
      this.e = Fixnum.int32.parseHex(E).toInt();
      this.d = parseBigInt(D,16);
      this.p = parseBigInt(P,16);
      this.q = parseBigInt(Q,16);
      this.dmp1 = parseBigInt(DP,16);
      this.dmq1 = parseBigInt(DQ,16);
      this.coeff = parseBigInt(C,16);
    }
    else
      print("Invalid RSA private key");
  }
  
  // Generate a new random private key B bits long, using public expt E
  generate(B,E) {
    var rng = new SecureRandom();
    var qs = B>>1;
    //this.e = parseInt(E,16);
    this.e = Fixnum.int32.parseHex(E).toInt();
    var ee = new BigInteger(E,16);
    for(;;) {
      for(;;) {
        this.p = new BigInteger(B-qs,1,rng);
        if(this.p.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.p.isProbablePrime(10)) break;
      }
      for(;;) {
        this.q = new BigInteger(qs,1,rng);
        if(this.q.subtract(BigInteger.ONE).gcd(ee).compareTo(BigInteger.ONE) == 0 && this.q.isProbablePrime(10)) break;
      }
      if(this.p.compareTo(this.q) <= 0) {
        var t = this.p;
        this.p = this.q;
        this.q = t;
      }
      var p1 = this.p.subtract(BigInteger.ONE);
      var q1 = this.q.subtract(BigInteger.ONE);
      var phi = p1.multiply(q1);
      if(phi.gcd(ee).compareTo(BigInteger.ONE) == 0) {
        this.n = this.p.multiply(this.q);
        this.d = ee.modInverse(phi);
        this.dmp1 = this.d.mod(p1);
        this.dmq1 = this.d.mod(q1);
        this.coeff = this.q.modInverse(this.p);
        break;
      }
    }
  }
  
  // Perform raw private operation on "x": return x^d (mod n)
  doPrivate(x) {
    if(this.p == null || this.q == null)
      return x.modPow(this.d, this.n);
  
    // TODO: re-calculate any missing CRT params
    var xp = x.mod(this.p).modPow(this.dmp1, this.p);
    var xq = x.mod(this.q).modPow(this.dmq1, this.q);
  
    while(xp.compareTo(xq) < 0)
      xp = xp.add(this.p);
    return xp.subtract(xq).multiply(this.coeff).mod(this.p).multiply(this.q).add(xq);
  }
  
  // Return the PKCS#1 RSA decryption of "ctext".
  // "ctext" is an even-length hex string and the output is a plain string.
  decrypt(ctext) {
    var c = parseBigInt(ctext, 16);
    var m = this.doPrivate(c);
    if(m == null) return null;
    return pkcs1unpad2(m, (this.n.bitLength()+7)>>3);
  }
  
}


