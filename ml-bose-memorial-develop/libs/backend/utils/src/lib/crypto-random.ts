import getRandomValues from 'polyfill-crypto.getrandomvalues';

/**
 * Secure implementation of `Math.Random()`
 *
 * @example
 *
 * const random = cryptoRandom() // 0.5885287949721449
 * @returns a number type the float.
 */
export function cryptoRandom(): number {
  const buffer = new ArrayBuffer(8);
  const ints = new Int8Array(buffer);
  getRandomValues(ints);

  // Set the sign (ints[7][7]) to 0 and the
  // exponent (ints[7][6]-[6][5]) to just the right size
  // (all ones except for the highest bit)
  ints[7] = 63;
  ints[6] |= 0xf0;

  // Now view it as a Float64Array, and read the one float from it
  const random = new DataView(buffer).getFloat64(0, true) - 1;

  return random;
}
