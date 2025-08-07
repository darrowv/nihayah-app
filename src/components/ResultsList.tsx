import { useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useAtomValue } from "jotai";

import { useDatabaseRepo } from "@/lib/hooks/useDatabaseRepo";
import { IDictionaryEntry } from "@/lib/interfaces";
import { searchResultsAtom } from "@/lib/atoms";

import { Text } from "./shared/Text";
import { Icon } from "./shared/Icon";
import WordModal from "./WordModal";
import Separator from "./shared/Separator";

function ResultsList() {
  let repo = useDatabaseRepo();
  let searchedEntries = useAtomValue(searchResultsAtom);
  let [selectedEntry, setSelectedEntry] = useState<IDictionaryEntry | null>(
    null
  );

  if (selectedEntry) {
    return (
      <WordModal close={() => setSelectedEntry(null)} entry={selectedEntry} />
    );
  }

  return (
    <FlatList
      data={searchedEntries}
      ListHeaderComponent={
        <View>
          <Text className="px-4 py-3 text-lg text-gray-400">نتائج البحث</Text>
          <Separator />
        </View>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => {
            repo.addEntryToHistory(item.id);
            setSelectedEntry(item);
          }}
          className="flex-row-reverse items-center justify-between border-b border-b-gray-300 px-4 py-4"
        >
          <Icon
            type="MaterialIcons"
            name="chevron-left"
            size={26}
            color="#99a1af"
          />
          <View className="me-4 flex-1 gap-2">
            <Text className="text-xl text-gray-600">{item.word}</Text>
            <Text className="line-clamp-1 text-base text-gray-400">
              {item.explanation}
            </Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}

export default ResultsList;
