import { Pressable, View } from "react-native";

import { IHistoryEntry } from "@/lib/interfaces";

import Icon from "../shared/Icon";
import Text from "../shared/Text";

interface HistoryListItemProps {
  entry: IHistoryEntry;
  handlePress: () => void;
}

function HistoryListItem({ entry, handlePress }: HistoryListItemProps) {
  const { word, explanation } = entry;

  return (
    <Pressable
      onPress={handlePress}
      className="mx-3 mb-3 flex-row-reverse items-center justify-between rounded-2xl border-2 border-white bg-gray-50 py-2.5 pe-2 ps-4 shadow-lg active:scale-95"
    >
      <Icon
        type="MaterialIcons"
        name="chevron-left"
        size={26}
        color="#9ca3af"
      />
      <View className="me-4 flex-1 gap-3">
        <Text weight="semibold" className="py-2 text-2xl text-blue-950">
          {word}
        </Text>
        <Text className="line-clamp-1 text-base text-gray-400">
          {explanation.substring(0, 100)}
        </Text>
      </View>
    </Pressable>
  );
}

export default HistoryListItem;
