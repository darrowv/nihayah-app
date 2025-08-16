import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useAtom } from "jotai";

import { useDatabaseRepo } from "@/lib/hooks/useDatabaseRepo";
import { IHistoryEntry } from "@/lib/interfaces";
import { historyEntriesAtom } from "@/lib/atoms";

import Text from "../shared/Text";
import WordModal from "../WordModal";
import Loader from "../shared/Loader";
import HistoryListItem from "./HistoryListItem";
import EmptyList from "../EmptyList";

function HistoryList() {
  let repo = useDatabaseRepo();
  let [historyEntries, setHistoryEntries] = useAtom(historyEntriesAtom);
  let [loading, setLoading] = useState(false);
  let [selectedEntry, setSelectedEntry] = useState<IHistoryEntry | null>(null);

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
      ListEmptyComponent={<EmptyList text="لا توجد كلمات في السجل بعد" />}
      ListHeaderComponent={
        <View>
          <Text className="mt-4 p-4 text-xl text-gray-500">
            الكلمات التي شاهدتها
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <HistoryListItem
          entry={item}
          handlePress={() => setSelectedEntry(item)}
        />
      )}
    />
  );
}

export default HistoryList;
