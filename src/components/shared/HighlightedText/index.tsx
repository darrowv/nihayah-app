import { normalizeArabic } from "@/lib/utils/normalizeArabic";

import Text from "../Text";
import { appendZWJ, isArabicLetter, isConnectable, prependZWJ } from "./utils";

interface HighlightedTextProps {
  text: string;
  cleanText: string;
  searchTerm: string;
  highlightClassName: string;
}

function HighlightedText({
  text,
  cleanText,
  searchTerm,
  highlightClassName,
}: HighlightedTextProps) {
  if (!searchTerm) {
    return <Text className="text-arabic-xl leading-10">{text}</Text>;
  }

  // 1. normalize searchTerm
  let normalizedTerm = normalizeArabic(searchTerm);

  // 2. create map to store last original index for each normalized position
  let postitionMap: Record<number, number> = {};
  let normalizedIndex = 0;

  for (let originalIndex = 0; originalIndex < text.length; originalIndex++) {
    let originalChar = text[originalIndex];
    let normalizedChar = normalizeArabic(originalChar);

    postitionMap[normalizedIndex] = originalIndex;

    if (normalizedChar !== "") {
      normalizedIndex++;
    }
  }

  postitionMap[normalizedIndex] = text.length - 1;

  // 3. create matches array with positions of each match in original text
  let regex = new RegExp(`(${normalizedTerm})`, "gi");
  let matches: {
    originalStart: number;
    originalEnd: number;
    normalizedStart: number;
    normalizedEnd: number;
  }[] = [];
  let match: RegExpExecArray | null;

  while ((match = regex.exec(cleanText)) !== null) {
    let normalizedStart = match.index;
    let normalizedEnd = regex.lastIndex;

    let originalStart = postitionMap[normalizedStart];
    let originalEnd = postitionMap[normalizedEnd];

    matches.push({
      originalStart,
      originalEnd,
      normalizedStart,
      normalizedEnd,
    });
  }

  // 4. create parts array using matches array and add ZWJ where necessary
  type Part = { text: string; isHighlight: boolean; key: string };
  const parts: Part[] = [];
  let currentIndex = 0;
  let lastChar = normalizedTerm.at(-1);

  for (let i = 0; i < matches.length; i++) {
    let match = matches[i];
    let charBefore = cleanText.at(match.normalizedStart - 1);
    let charAfter = cleanText.at(match.normalizedEnd);

    if (currentIndex < match.originalStart) {
      let chunk = text.slice(currentIndex, match.originalStart);

      if (isConnectable(lastChar) && currentIndex !== 0) {
        chunk = prependZWJ(chunk);
      }

      if (isArabicLetter(charBefore)) {
        chunk = appendZWJ(chunk);
      }

      parts.push({
        text: chunk,
        isHighlight: false,
        key: `before-${i}`,
      });
    }

    let matchChunk = text.slice(match.originalStart, match.originalEnd);

    if (isArabicLetter(charBefore) && isConnectable(charBefore)) {
      matchChunk = prependZWJ(matchChunk);
    }

    if (isArabicLetter(charAfter)) {
      matchChunk = appendZWJ(matchChunk);
    }

    parts.push({
      text: matchChunk,
      isHighlight: true,
      key: `highlight-${i}`,
    });

    currentIndex = match.originalEnd;
  }

  if (currentIndex < text.length) {
    let lastChunk = text.slice(currentIndex);

    if (isConnectable(lastChar)) {
      lastChunk = prependZWJ(lastChunk);
    }

    parts.push({
      text: lastChunk,
      isHighlight: false,
      key: "after-last",
    });
  }

  return (
    <Text className="text-arabic-xl px-4 pb-4 pt-6 leading-10">
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
