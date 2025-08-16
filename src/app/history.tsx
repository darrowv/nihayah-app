import { View } from "react-native";

import HistoryList from "@/components/history/HistoryList";

export default function History() {
  return (
    <View className="flex-1 bg-[#f9fafb]">
      <HistoryList />
    </View>
  );
}
