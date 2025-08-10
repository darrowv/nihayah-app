import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useAtom } from "jotai";

import { useDatabaseRepo } from "@/lib/hooks/useDatabaseRepo";
import { IDictionaryEntry } from "@/lib/interfaces";
import { historyEntriesAtom } from "@/lib/atoms";

import Text from "./shared/Text";
import WordModal from "./WordModal";
import Loader from "./shared/Loader";
import Separator from "./shared/Separator";
import HistoryListItem from "./HistoryListItem";

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
        <HistoryListItem
          entry={item}
          handlePress={() => setSelectedEntry(item)}
        />
      )}
    />
  );
}

export default HistoryList;
