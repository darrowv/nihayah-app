import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useAtom } from "jotai";
import { useLocalSearchParams, useRouter } from "expo-router";

import { useDatabaseRepo } from "@/lib/hooks/useDatabaseRepo";
import { searchResultsAtom } from "@/lib/atoms";

import Text from "../shared/Text";
import ResultsListItem from "./ResultsListItem";
import Loader from "../shared/Loader";
import EmptyList from "../EmptyList";

function ResultsList() {
  let repo = useDatabaseRepo();
  let router = useRouter();
  let [searchResults, setSearchResults] = useAtom(searchResultsAtom);
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

  let handleRedirect = (entryId: number) => {
    router.push({
      pathname: "/word/[entryId]",
      params: { entryId, searchTerm },
    });
  };

  if (loadingResults) return <Loader size="medium" />;

  return (
    <FlatList
      data={searchResults}
      ListEmptyComponent={
        <EmptyList text="لم يتم العثور على كلمات مطابقة لبحثك" />
      }
      ListHeaderComponent={
        <View>
          <Text className="mt-4 p-4 text-xl text-gray-500">
            نتائج البحث : {searchResults.length}
          </Text>
        </View>
      }
      renderItem={({ item }) => (
        <ResultsListItem
          entry={item}
          handlePress={() => {
            repo.addEntryToHistory(item.id);
            handleRedirect(item.id);
          }}
        />
      )}
    />
  );
}

export default ResultsList;
