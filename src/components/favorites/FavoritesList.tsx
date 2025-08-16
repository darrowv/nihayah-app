import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useAtom } from "jotai";

import { useDatabaseRepo } from "@/lib/hooks/useDatabaseRepo";
import { IFavoriteEntry } from "@/lib/interfaces";
import { favoriteEntriesAtom } from "@/lib/atoms";

import Text from "../shared/Text";
import WordModal from "../WordModal";
import Loader from "../shared/Loader";
import FavoritesListItem from "./FavoritesListItem";
import EmptyList from "../EmptyList";

function FavoritesList() {
  let repo = useDatabaseRepo();
  let [favoritesEntries, setFavoritesEntries] = useAtom(favoriteEntriesAtom);
  let [loading, setLoading] = useState(false);
  let [selectedEntry, setSelectedEntry] = useState<IFavoriteEntry | null>(null);

  useEffect(() => {
    setLoading(true);

    repo
      .getDictEntriesFromFavorites()
      .then(setFavoritesEntries)
      .finally(() => setLoading(false));
  }, [repo, setFavoritesEntries]);

  if (loading) return <Loader size="medium" />;

  if (selectedEntry) {
    return (
      <WordModal close={() => setSelectedEntry(null)} entry={selectedEntry} />
    );
  }

  return (
    <FlatList
      data={favoritesEntries}
      ListEmptyComponent={<EmptyList text="لا توجد كلمات في المفضلة بعد" />}
      ListHeaderComponent={
        <View>
          <Text className="mt-4 p-4 text-xl text-gray-500">كلماتك المفضلة</Text>
        </View>
      }
      renderItem={({ item }) => (
        <FavoritesListItem
          entry={item}
          handlePress={() => setSelectedEntry(item)}
        />
      )}
    />
  );
}

export default FavoritesList;
