# Changelog - dart-bignum

## 0.1.0 2015-02-03 (SDK 1.14.0)

- Cleaned up interface
- Hide platform-specific implementations
- Removed unused legacy implementation

## 0.0.7 2015-06-29 (SDK 1.11.0)

- Use native big integer when run in dartvm(>= 1.11.0)

## 0.0.6 2014-09-02 (SDK 1.6.0-dev.9.7 r39537)

- Used Uint8List instead of List<int> for performance improvement.

## 0.0.5 2014-02-10 (SDK 1.2.0-dev.4.0 r32426)

- Add a leading 0 to binary data in fromBytes() constructor if most
  significant bit set

