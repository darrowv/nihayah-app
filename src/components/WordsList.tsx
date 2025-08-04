import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useAtom } from "jotai";

import { useDatabaseRepo } from "@/lib/hooks/useDatabaseRepo";
import { IDictionaryEntry } from "@/lib/interfaces";
import { dictionaryEntriesAtom } from "@/lib/atoms";

import { Text } from "./shared/Text";
import { Icon } from "./shared/Icon";
import WordModal from "./WordModal";
import Loader from "./shared/Loader";

function WordsList() {
  let repo = useDatabaseRepo();
  let [dictEntries, setDictEntries] = useAtom(dictionaryEntriesAtom);
  let [loading, setLoading] = useState(false);
  let [selectedEntry, setSelectedEntry] = useState<IDictionaryEntry | null>(
    null
  );

  useEffect(() => {
    setLoading(true);

    repo
      .getAllEntries()
      .then(setDictEntries)
      .finally(() => setLoading(false));
  }, [repo, setDictEntries]);

  if (loading) return <Loader size="medium" />;

  if (selectedEntry) {
    return (
      <WordModal close={() => setSelectedEntry(null)} entry={selectedEntry} />
    );
  }

  return (
    <FlatList
      data={dictEntries}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => setSelectedEntry(item)}
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
