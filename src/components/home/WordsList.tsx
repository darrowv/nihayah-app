import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useAtomValue } from "jotai";

import { entriesAtom } from "@/lib/jotai/entries";
import { IDictionaryEntry } from "@/lib/interfaces/entry.interface";

import { Text } from "../Text";
import { Icon } from "../Icon";
import WordModal from "./WordModal";

function WordsList() {
  let entries = useAtomValue(entriesAtom);
  let [wordModal, setWordModal] = useState<IDictionaryEntry | null>(null);

  if (wordModal) {
    return (
      <WordModal
        close={() => setWordModal(null)}
        entry={wordModal as IDictionaryEntry}
      />
    );
  }

  return (
    <FlatList
      data={entries as IDictionaryEntry[]}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => setWordModal(item)}
          className="flex-row items-center justify-between border-b border-gray-300 px-4 py-4"
        >
          <Icon
            type="MaterialIcons"
            name="chevron-left"
            size={24}
            color="#99a1af"
          />
          <View className="flex-1 gap-1">
            <Text className="text-xl text-gray-600">{item.word}</Text>
            <Text className="ml-5 line-clamp-1 text-base text-gray-400">
              {item.explanation}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

export default WordsList;
