import { normalizeArabic } from "@/lib/utils/normalizeArabic";

import Text from "./Text";

interface HighlightedTextProps {
  text: string;
  searchTerm: string;
  containerTextClassName: string;
  highlightClassName: string;
}

const ZWJ = "\u200D";

// Common Arabic diacritics ranges (covers typical harakat + many combining marks)
const DIACRITICS_REGEX = /[\u0610-\u061A\u064B-\u065F\u06D6-\u06ED]/g;

/**
 * Letters that do NOT connect to the following letter (the usual 6 "selfish" letters + ALEF variants)
 * u0627 = ا, u062F = د, u0630 = ذ, u0631 = ر, u0632 = ز, u0648 = و
 * include ALEF variants that also behave as non-joiners to the next letter.
 */
const NON_JOINING_AFTER = new Set([
  "\u0627", // ا
  "\u0622", // آ
  "\u0623", // أ
  "\u0625", // إ
  "\u062F", // د
  "\u0630", // ذ
  "\u0631", // ر
  "\u0632", // ز
  "\u0648", // و
  "\u0671", // ٱ (alef wasla) - included for safety
]);

function removeZwjAndZwnj(str: string) {
  return str.replace(/[\u200C\u200D]/g, "");
}

function removeDiacritics(str: string) {
  return str.replace(DIACRITICS_REGEX, "");
}

// Return first non-diacritic, non-zwj codepoint or undefined
function getFirstBaseChar(str: string): string | undefined {
  const cleaned = removeDiacritics(removeZwjAndZwnj(str));
  if (!cleaned) return undefined;
  return Array.from(cleaned)[0];
}

// Return last non-diacritic, non-zwj codepoint or undefined
function getLastBaseChar(str: string): string | undefined {
  const cleaned = removeDiacritics(removeZwjAndZwnj(str));
  if (!cleaned) return undefined;
  const arr = Array.from(cleaned);
  return arr[arr.length - 1];
}

function isArabicChar(char?: string) {
  if (!char) return false;
  const cp = char.codePointAt(0)!;
  return (
    (cp >= 0x0600 && cp <= 0x06ff) ||
    (cp >= 0x0750 && cp <= 0x077f) ||
    (cp >= 0x08a0 && cp <= 0x08ff) ||
    (cp >= 0xfb50 && cp <= 0xfdff) ||
    (cp >= 0xfe70 && cp <= 0xfeff)
  );
}

/**
 * Returns true if prevBase can connect to nextBase.
 * We require both be Arabic base letters and that neither is in the NON_JOINING_AFTER set.
 * (This matches the rule: previous must be able to join to the right AND next must be able to accept a left-join.)
 */
function areConnectable(prevPartText: string, nextPartText: string) {
  const prevBase = getLastBaseChar(prevPartText);
  const nextBase = getFirstBaseChar(nextPartText);

  if (!prevBase || !nextBase) return false;
  if (!isArabicChar(prevBase) || !isArabicChar(nextBase)) return false;

  // If previous base is one of the "selfish" letters, it does NOT connect to the following char.
  if (NON_JOINING_AFTER.has(prevBase)) return false;

  // If nextBase is itself one of the special non-connecting variants (rare), don't join.
  if (NON_JOINING_AFTER.has(nextBase)) return false;

  return true;
}

function removeExistingZwj(str: string) {
  // remove any ZWJ we might have added before to avoid duplicates
  return str.replace(new RegExp(ZWJ, "g"), "");
}

function HighlightedText({
  text,
  searchTerm,
  containerTextClassName,
  highlightClassName,
}: HighlightedTextProps) {
  if (!searchTerm) {
    return <Text className={containerTextClassName}>{text}</Text>;
  }

  const normalizedSearchTerm = normalizeArabic(searchTerm);
  const normalizedText = normalizeArabic(text);

  // Create a mapping between normalized and original positions
  let positionMap: number[] = [];
  let normalizedIndex = 0;

  for (let originalIndex = 0; originalIndex < text.length; originalIndex++) {
    const originalChar = text[originalIndex];
    const normalizedChar = normalizeArabic(originalChar);

    // always push mapping for this original character
    positionMap.push(normalizedIndex);

    if (normalizedChar !== "") {
      normalizedIndex++;
    }
  }

  const regex = new RegExp(`(${normalizedSearchTerm})`, "gi");
  const matches: { start: number; end: number }[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(normalizedText)) !== null) {
    const normalizedStart = match.index;
    const normalizedEnd = match.index + match[0].length;

    // find original start position
    let originalStart = -1;
    for (let i = 0; i < positionMap.length; i++) {
      if (positionMap[i] === normalizedStart) {
        originalStart = i;
        break;
      }
    }

    // find original end position
    let originalEnd = text.length;
    for (let i = originalStart; i < positionMap.length; i++) {
      if (positionMap[i] >= normalizedEnd) {
        originalEnd = i;
        break;
      }
    }

    if (originalStart !== -1) {
      matches.push({
        start: originalStart,
        end: originalEnd,
      });
    }
  }

  if (matches.length === 0) {
    return <Text className={containerTextClassName}>{text}</Text>;
  }

  // Build parts using original text positions
  type Part = { text: string; isHighlight: boolean; key: string };
  const parts: Part[] = [];
  let currentIndex = 0;

  matches.forEach((matchPos, index) => {
    if (currentIndex < matchPos.start) {
      parts.push({
        text: text.slice(currentIndex, matchPos.start),
        isHighlight: false,
        key: `before-${index}`,
      });
    }

    parts.push({
      text: text.slice(matchPos.start, matchPos.end),
      isHighlight: true,
      key: `highlight-${index}`,
    });

    currentIndex = matchPos.end;
  });

  if (currentIndex < text.length) {
    parts.push({
      text: text.slice(currentIndex),
      isHighlight: false,
      key: "after-last",
    });
  }

  // Remove any existing ZWJ we might previously have inserted (defensive) before checks
  parts.forEach((p) => {
    p.text = removeExistingZwj(p.text);
  });

  // For each highlighted part, check left and right connectivity and add ZWJ pairs accordingly.
  for (let i = 0; i < parts.length; i++) {
    const p = parts[i];
    if (!p.isHighlight) continue;

    const prev = i - 1 >= 0 ? parts[i - 1] : null;
    const next = i + 1 < parts.length ? parts[i + 1] : null;

    // LEFT side: prev end <> highlight start
    if (prev) {
      if (areConnectable(prev.text, p.text)) {
        // add zwj to end of prev and start of highlight
        prev.text = prev.text + ZWJ;
        p.text = ZWJ + p.text;
      }
    }

    // RIGHT side: highlight end <> next start
    if (next) {
      if (areConnectable(p.text, next.text)) {
        // add zwj to end of highlight and start of next
        p.text = p.text + ZWJ;
        next.text = ZWJ + next.text;
      }
    }
  }

  return (
    <Text className={containerTextClassName}>
      {parts.map((part) => {
        if (part.isHighlight) {
          return (
            <Text key={part.key} className={highlightClassName}>
              {part.text}
            </Text>
          );
        }

        return <Text key={part.key}>{part.text}</Text>;
      })}
    </Text>
  );
}

export default HighlightedText;
