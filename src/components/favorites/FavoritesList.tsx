import { useEffect, useState } from "react";
import { FlatList, View } from "react-native";
import { useRouter } from "expo-router";
import { useAtom } from "jotai";

import { useDatabaseRepo } from "@/lib/hooks/useDatabaseRepo";
import { favoriteEntriesAtom } from "@/lib/atoms";

import Text from "../shared/Text";
import Loader from "../shared/Loader";
import FavoritesListItem from "./FavoritesListItem";
import EmptyList from "../EmptyList";

function FavoritesList() {
  let repo = useDatabaseRepo();
  let router = useRouter();
  let [favoritesEntries, setFavoritesEntries] = useAtom(favoriteEntriesAtom);
  let [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    repo
      .getDictEntriesFromFavorites()
      .then(setFavoritesEntries)
      .finally(() => setLoading(false));
  }, [repo, setFavoritesEntries]);

  let handleRedirect = (entryId: number) => {
    router.push(`/word/${entryId}`);
  };

  if (loading) return <Loader size="medium" />;

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
          handlePress={() => handleRedirect(item.entry_id)}
        />
      )}
    />
  );
}

export default FavoritesList;
