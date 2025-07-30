import { FlatList, View } from "react-native";

import { Text } from "../Text";
import { Icon } from "../Icon";

let words = [
  {
    word: "سمهل",
    explanation: "هذا شرح وهمي لكلمة سمهل في هذا السياق.",
    pageNumber: 14,
    volumeNumber: 1,
  },
  {
    word: "قنبز",
    explanation: "كلمة تستخدم في السياق الفلاني وتعني شيئًا محددًا.",
    pageNumber: 28,
    volumeNumber: 1,
  },
  {
    word: "رغشب",
    explanation: "مصطلح غير شائع يدل على حالة أو فعل معين.",
    pageNumber: 33,
    volumeNumber: 1,
  },
  {
    word: "فركت",
    explanation:
      "تُستخدم في بعض اللهجات وتعني التشتت أو الانفبمنت بمنتس سيمنتبابشسيتنب منسشتيبصال.",
    pageNumber: 41,
    volumeNumber: 1,
  },
  {
    word: "نثعل",
    explanation: "شرح توضيحي لكلمة نثعل في هذا السياق.",
    pageNumber: 53,
    volumeNumber: 1,
  },
  {
    word: "حوشق",
    explanation: "ربما تدل على صفة أو حالة في سياق معين.",
    pageNumber: 61,
    volumeNumber: 1,
  },
];

function WordsList() {
  return (
    <FlatList
      data={words}
      renderItem={({ item }) => (
        <View className="flex-row items-center justify-between border-b border-gray-300 px-4 py-4">
          <Icon type="AntDesign" name="left" size={20} color="#99a1af" />
          <View className="flex-1 gap-1">
            <Text className="text-xl text-gray-600">{item.word}</Text>
            <Text className="ml-5 line-clamp-1 text-base text-gray-400">
              {item.explanation}
            </Text>
          </View>
        </View>
      )}
    />
  );
}

export default WordsList;
