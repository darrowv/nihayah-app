import { View } from "react-native";

import SearchArea from "@/components/SearchArea";
import WordsList from "@/components/WordsList";

export default function Main() {
  return (
    <View className="flex-1 bg-white">
      <SearchArea />
      <WordsList />
    </View>
  );
}
