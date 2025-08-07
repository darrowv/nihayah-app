import { useEffect, useState } from "react";
import { FlatList, TouchableOpacity, View } from "react-native";
import { useAtom } from "jotai";

import { useDatabaseRepo } from "@/lib/hooks/useDatabaseRepo";
import { IDictionaryEntry } from "@/lib/interfaces";
import { historyEntriesAtom } from "@/lib/atoms";

import { Text } from "./shared/Text";
import { Icon } from "./shared/Icon";
import WordModal from "./WordModal";
import Loader from "./shared/Loader";
import Separator from "./shared/Separator";

function HistoryList() {
  let repo = useDatabaseRepo();
  let [historyEntries, setHistoryEntries] = useAtom(historyEntriesAtom);
  let [loading, setLoading] = useState(false);
  let [selectedEntry, setSelectedEntry] = useState<IDictionaryEntry | null>(
    null
  );

  useEffect(() => {
    setLoading(true);

    repo
      .getDictEntriesFromHistory()
      .then(setHistoryEntries)
      .finally(() => setLoading(false));
  }, [repo, setHistoryEntries]);

  if (loading) return <Loader size="medium" />;

  if (selectedEntry) {
    return (
      <WordModal close={() => setSelectedEntry(null)} entry={selectedEntry} />
    );
  }

  return (
    <FlatList
      data={historyEntries}
      ListHeaderComponent={
        <View>
          <Text className="px-4 py-3 text-lg text-gray-400">
            تاريخ الكلمات التي تمت مشاهدتها
          </Text>
          <Separator />
        </View>
      }
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => setSelectedEntry(item)}
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

export default HistoryList;
