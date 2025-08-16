import { View } from "react-native";

import FavoritesList from "@/components/favorites/FavoritesList";

export default function Favorites() {
  return (
    <View className="flex-1 bg-[#f9fafb]">
      <FavoritesList />
    </View>
  );
}
