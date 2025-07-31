import { FlatList, View } from "react-native";
import { useAtomValue } from "jotai";

import { entriesAtom, IDictionaryEntry } from "@/lib/jotai/entries";

import { Text } from "../Text";
import { Icon } from "../Icon";

function WordsList() {
  let entries = useAtomValue(entriesAtom);

  return (
    <FlatList
      data={entries as IDictionaryEntry[]}
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
