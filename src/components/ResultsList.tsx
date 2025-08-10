import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useAtom } from "jotai";
import { useLocalSearchParams } from "expo-router";

import { useDatabaseRepo } from "@/lib/hooks/useDatabaseRepo";
import { IDictionaryEntry } from "@/lib/interfaces";
import { searchResultsAtom } from "@/lib/atoms";

import Text from "./shared/Text";
import WordModal from "./WordModal";
import Separator from "./shared/Separator";
import ResultsListItem from "./ResultsListItem";
import Loader from "./shared/Loader";

function ResultsList() {
  let repo = useDatabaseRepo();
  let [searchResults, setSearchResults] = useAtom(searchResultsAtom);

  let [selectedEntry, setSelectedEntry] = useState<IDictionaryEntry | null>(
    null
  );
  let [loadingResults, setLoadingResults] = useState(false);

  let params = useLocalSearchParams<{ searchTerm: string }>();
  let { searchTerm } = params;

  useEffect(() => {
    setLoadingResults(true);
    repo.searchDictEntries(searchTerm).then((results) => {
      setSearchResults(results);
      setLoadingResults(false);
    });
  }, [searchTerm, repo, setSearchResults]);

  if (loadingResults) return <Loader size="medium" />;

  if (selectedEntry) {
    return (
      <WordModal
        close={() => setSelectedEntry(null)}
        searchTerm={searchTerm}
        entry={selectedEntry}
      />
    );
  }

  return (
    <FlatList
      data={searchResults}
      ListHeaderComponent={
        <View>
          <Text className="px-4 py-3 text-lg text-gray-400">نتائج البحث</Text>
          <Separator />
        </View>
      }
      renderItem={({ item }) => (
        <ResultsListItem
          entry={item}
          handlePress={() => {
            repo.addEntryToHistory(item.id);
            setSelectedEntry(item);
          }}
        />
      )}
    />
  );
}

export default ResultsList;
