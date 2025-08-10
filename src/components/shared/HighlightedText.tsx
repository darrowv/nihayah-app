import { normalizeArabic } from "@/lib/utils/normalizeArabic";

import Text from "./Text";

interface HighlightedTextProps {
  text: string;
  searchTerm: string;
  containerTextClassName: string;
  highlightClassName: string;
}

function HighlightedText({
  text,
  searchTerm,
  containerTextClassName,
  highlightClassName,
}: HighlightedTextProps) {
  if (!searchTerm || !text) {
    return <Text className={containerTextClassName}>{text}</Text>;
  }

  const normalizedSearchTerm = normalizeArabic(searchTerm.trim());

  if (!normalizedSearchTerm) {
    return <Text className={containerTextClassName}>{text}</Text>;
  }

  const words = text.split(/(\s+)/);

  return (
    <Text className={containerTextClassName}>
      {words.map((word, index) => {
        if (/^\s+$/.test(word)) {
          return <Text key={index}>{word}</Text>;
        }

        const normalizedWord = normalizeArabic(word);
        const isMatch =
          normalizedWord && normalizedWord.includes(normalizedSearchTerm);

        return (
          <Text
            key={index}
            className={isMatch ? highlightClassName : undefined}
          >
            {word}
          </Text>
        );
      })}
    </Text>
  );
}

export default HighlightedText;
