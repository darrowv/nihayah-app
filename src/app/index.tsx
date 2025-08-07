import { View } from "react-native";

import HistoryList from "@/components/HistoryList";

export default function Home() {
  return (
    <View className="flex-1 bg-white">
      <HistoryList />
    </View>
  );
}
