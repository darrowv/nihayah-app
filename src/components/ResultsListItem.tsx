import { Pressable, View } from "react-native";

import { IDictionaryEntry } from "@/lib/interfaces";

import Icon from "./shared/Icon";
import Text from "./shared/Text";

interface ResultsListItemProps {
  entry: IDictionaryEntry;
  handlePress: () => void;
}

function ResultsListItem({ entry, handlePress }: ResultsListItemProps) {
  const { word, explanation } = entry;

  return (
    <Pressable
      onPress={handlePress}
      className="flex-row-reverse items-center justify-between border-b border-b-gray-300 px-4 py-4"
    >
      <Icon
        type="MaterialIcons"
        name="chevron-left"
        size={26}
        color="#99a1af"
      />
      <View className="me-4 flex-1 gap-2">
        <Text className="text-xl text-gray-600">{word}</Text>
        <Text className="line-clamp-1 text-base text-gray-400">
          {explanation}
        </Text>
      </View>
    </Pressable>
  );
}

export default ResultsListItem;
