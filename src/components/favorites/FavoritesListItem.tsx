import { Pressable, View } from "react-native";

import { IFavoriteEntry } from "@/lib/interfaces";

import Icon from "../shared/Icon";
import Text from "../shared/Text";

interface FavoritesListItemProps {
  entry: IFavoriteEntry;
  handlePress: () => void;
}

function FavoritesListItem({ entry, handlePress }: FavoritesListItemProps) {
  const { word, explanation } = entry;

  return (
    <Pressable
      onPress={handlePress}
      className="mx-3 mb-3 flex-row-reverse items-center justify-between rounded-2xl bg-white py-4 pe-2 ps-4 shadow-lg active:scale-95"
    >
      <Icon
        type="MaterialIcons"
        name="chevron-left"
        size={26}
        color="#9ca3af"
      />
      <View className="me-4 flex-1 gap-3">
        <Text weight="semibold" className="py-2 text-2xl text-red-700">
          {word}
        </Text>
        <Text className="line-clamp-1 text-base text-gray-400">
          {explanation.substring(0, 100)}
        </Text>
      </View>
    </Pressable>
  );
}

export default FavoritesListItem;
