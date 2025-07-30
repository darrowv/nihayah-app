import { View } from "react-native";

import SearchArea from "@/components/home/SearchArea";
import WordsList from "@/components/home/WordsList";

export default function Page() {
  return (
    <View className="flex-1 bg-white">
      <SearchArea />

      <WordsList />
    </View>
  );
}
