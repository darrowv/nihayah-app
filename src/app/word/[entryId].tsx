import { useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  Share,
  TouchableOpacity,
  View,
} from "react-native";
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

  async function handleShare() {
    try {
      await Share.share({
        message: `${entry.word}\n\n${entry.explanation}`,
      });
    } catch (error) {
      console.log("Error sharing: ", error);
    }
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
      </View>
      <ScrollView>
        <View>
          <ImageBackground
            source={require("../../../assets/images/word_background.png")}
            className="items-center justify-center gap-5 bg-teal-700 px-4 pb-8"
          >
            <Text
              weight="semibold"
              className="text-arabic-4xl pt-10 text-center text-white"
            >
              {entry.word}
            </Text>
            <View className="flex-row-reverse items-center gap-8">
              {starred ? (
                <Pressable
                  className="rounded-full border-2 border-amber-300 p-0.5 active:scale-95 active:opacity-50"
                  onPress={handleRemoveFromFavorites}
                >
                  <Icon
                    type="MaterialIcons"
                    name="star"
                    size={26}
                    color="#ffd230"
                  />
                </Pressable>
              ) : (
                <Pressable
                  className="rounded-full border-2 border-white p-0.5 active:scale-95 active:opacity-50"
                  onPress={handleAddToFavorites}
                >
                  <Icon
                    type="MaterialIcons"
                    name="star-border"
                    size={26}
                    color="white"
                  />
                </Pressable>
              )}

              <Pressable
                className="rounded-full border-2 border-white p-0.5 active:scale-95 active:opacity-50"
                onPress={handleShare}
              >
                <Icon
                  type="MaterialCommunityIcons"
                  name="share"
                  size={26}
                  color="white"
                />
              </Pressable>
            </View>
          </ImageBackground>

          <View>
            {searchTerm ? (
              <HighlightedText
                searchTerm={searchTerm}
                text={entry.explanation}
                cleanText={entry.explanation_clean}
                highlightClassName="bg-yellow-100 text-red-700"
              />
            ) : (
              <Text className="text-arabic-xl px-4 pb-4 pt-6 leading-10">
                {entry.explanation}
              </Text>
            )}
          </View>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
