import {
  NON_CONNECTING_LETTERS_REGEX,
  NORMALIZED_ARABIC_LETTERS_REGEX,
  ZWJ,
} from "./constants";

export function isArabicLetter(char: string) {
  if (typeof char !== "string" || char.length !== 1) {
    return false;
  }

  return NORMALIZED_ARABIC_LETTERS_REGEX.test(char);
}

export function isConnectable(char: string) {
  if (typeof char !== "string" || char.length !== 1) {
    return false;
  }

  return !NON_CONNECTING_LETTERS_REGEX.test(char);
}

export function prependZWJ(chunk: string) {
  return ZWJ + chunk;
}

export function appendZWJ(chunk: string) {
  return chunk + ZWJ;
}
