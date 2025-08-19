export function normalizeArabic(text: string) {
  return text
    .normalize("NFKC")
    .replace(/[\u0610-\u061A\u064B-\u065F\u06D6-\u06ED]/g, "") // Remove diacritics
    .replace(/[إأآ]/g, "ا")
    .replace(/ى/g, "ي")
    .replace(/ؤ/g, "و")
    .replace(/ئ/g, "ي")
    .replace(/ۀ/g, "ه");
}
