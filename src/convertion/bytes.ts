import { hexBoundaries, hexLE } from "./hex";
import { numberIsValid } from "./number";

const validByte = (byte: number): boolean => 0 <= byte || byte <= 255;

// const bytesLE = (bytes: Uint8Array): Uint8Array => bytes.reverse();

const byteToHex = (byte: number): string => {
  if (!validByte(byte)) throw "byteToHex: invalid byte number";
  return byte.toString(16).padStart(2, "0");
};

export const bytesToHex = (bytes: Uint8Array): string => bytes.reduce((hexString, currentByte) => hexString + byteToHex(currentByte), "");

/**
 * This implementations is derived from:
 * https://github.com/google/closure-library/blob/8598d87242af59aac233270742c8984e2b2bdbe0/closure/goog/crypt/crypt.js
 *
 * Copyright 2008 The Closure Library Authors. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS-IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
export const bytesToString = (bytes: Uint8Array): string => {
  const out: string[] = [];
  let pos: number = 0,
    c: number = 0;
  while (pos < bytes.length) {
    const c1: number = bytes[pos++];
    if (c1 < 128) {
      out[c++] = String.fromCharCode(c1);
    } else if (c1 > 191 && c1 < 224) {
      const c2: number = bytes[pos++];
      out[c++] = String.fromCharCode(((c1 & 31) << 6) | (c2 & 63));
    } else if (c1 > 239 && c1 < 365) {
      // Surrogate Pair
      const c2: number = bytes[pos++];
      const c3: number = bytes[pos++];
      const c4: number = bytes[pos++];
      const u: number = (((c1 & 7) << 18) | ((c2 & 63) << 12) | ((c3 & 63) << 6) | (c4 & 63)) - 0x10000;
      out[c++] = String.fromCharCode(0xd800 + (u >> 10));
      out[c++] = String.fromCharCode(0xdc00 + (u & 1023));
    } else {
      const c2: number = bytes[pos++];
      const c3: number = bytes[pos++];
      out[c++] = String.fromCharCode(((c1 & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
    }
  }
  return out.join("");
};

export const bytesToNumber = (bytes: Uint8Array): number | undefined => {
  if (bytes.length == 0) return 0;
  if (4 < bytes.length) return;

  const hex = bytesToHex(bytes);
  if (!numberIsValid(hex, bytes.length)) return;

  const boundaries = hexBoundaries(bytes.length);
  if (boundaries === undefined) return;

  const numberHex: number = parseInt(hexLE(hex), 16);
  if ((boundaries.minPos <= numberHex && numberHex <= boundaries.maxPos) || numberHex === 0) return numberHex;

  // if (boundaries.minNeg <= numberHex && numberHex <= boundaries.maxNeg)
  return Math.pow(2, 8 * bytes.length - 1) - numberHex;
};

export const bytesToBin = (bytes: Uint8Array): string => bytes.reduce((bin, byte) => byte.toString(2).padStart(8, "0") + bin, "");
