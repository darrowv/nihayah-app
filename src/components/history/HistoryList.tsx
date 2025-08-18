import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";

import { useDatabaseRepo } from "@/lib/hooks/useDatabaseRepo";
import { historyEntriesAtom } from "@/lib/atoms";

import Text from "../shared/Text";
import Loader from "../shared/Loader";
import HistoryListItem from "./HistoryListItem";
import EmptyList from "../EmptyList";

function HistoryList() {
  let repo = useDatabaseRepo();
  let router = useRouter();
  let [historyEntries, setHistoryEntries] = useAtom(historyEntriesAtom);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    repo
      .getDictEntriesFromHistory()
      .then(setHistoryEntries)
      .finally(() => setLoading(false));
  }, [repo, setHistoryEntries]);

  let handleRedirect = (entryId: number) => {
    router.push(`/word/${entryId}`);
  };

  if (loading) return <Loader size="medium" />;

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
          handlePress={() => handleRedirect(item.entry_id)}
        />
      )}
    />
  );
}

export default HistoryList;
