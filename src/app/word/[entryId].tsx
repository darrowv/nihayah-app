import { useEffect, useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useSetAtom } from "jotai";

import Text from "@/components/shared/Text";
import ScreenWrapper from "@/components/shared/ScreenWrapper";
import { IDictionaryEntry } from "@/lib/interfaces";
import Loader from "@/components/shared/Loader";
import { useDatabaseRepo } from "@/lib/hooks/useDatabaseRepo";
import { removeFromFavoriteEntriesAtom } from "@/lib/atoms";
import Icon from "@/components/shared/Icon";
import HighlightedText from "@/components/shared/HighlightedText";

export default function WordScreen() {
  let repo = useDatabaseRepo();
  let router = useRouter();

  let removeFromFavoriteEntriesState = useSetAtom(
    removeFromFavoriteEntriesAtom
  );
  let [entry, setEntry] = useState<IDictionaryEntry | null>(null);
  let [starred, setStarred] = useState<boolean | null>(null);

  let { entryId, searchTerm } = useLocalSearchParams<{
    entryId: string;
    searchTerm?: string;
  }>();

  useEffect(() => {
    let isMounted = true;

    repo.getDictEntryById(Number(entryId)).then((res) => {
      setEntry(res);
      repo.isEntryInFavorites(res.id).then((inFavorites) => {
        if (isMounted) setStarred(inFavorites);
      });
    });

    return () => {
      isMounted = false;
    };
  }, [repo, entryId]);

  function handleAddToFavorites() {
    repo.addEntryToFavorites(entry.id).then(() => setStarred(true));
  }

  function handleRemoveFromFavorites() {
    repo.removeEntryFromFavorites(entry.id).then(() => {
      removeFromFavoriteEntriesState(entry.id);
      setStarred(false);
    });
  }

  if (entry === null) return <Loader size="medium" />;

  return (
    <ScreenWrapper>
      <View className="h-20 flex-row-reverse justify-between bg-brand px-5 py-6">
        <TouchableOpacity onPress={() => router.back()}>
          <Icon
            type="MaterialIcons"
            name="arrow-back"
            size={28}
            color="white"
          />
        </TouchableOpacity>
        {starred ? (
          <TouchableOpacity onPress={handleRemoveFromFavorites}>
            <Icon type="MaterialIcons" name="star" size={28} color="#fff085" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={handleAddToFavorites}>
            <Icon
              type="MaterialIcons"
              name="star-border"
              size={28}
              color="white"
            />
          </TouchableOpacity>
        )}
      </View>
      <ScrollView>
        <View className="bg-background">
          <Text
            weight="semibold"
            className="px-4 pb-2 pt-6 text-2xl text-blue-950"
          >
            {entry.word}
          </Text>

          {searchTerm ? (
            <HighlightedText
              searchTerm={searchTerm}
              text={entry.explanation}
              containerTextClassName="px-4 py-3 text-xl/10"
              highlightClassName="bg-yellow-100 text-red-700"
            />
          ) : (
            <Text className="px-4 py-3 text-xl/10">{entry.explanation}</Text>
          )}
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
