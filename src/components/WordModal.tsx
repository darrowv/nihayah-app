import { useEffect, useState } from "react";
import { Modal, ScrollView, TouchableOpacity, View } from "react-native";
import { useSetAtom } from "jotai";

import { IDictionaryEntry } from "@/lib/interfaces";
import { useDatabaseRepo } from "@/lib/hooks/useDatabaseRepo";
import { removeFromFavoriteEntriesAtom } from "@/lib/atoms";

import Text from "./shared/Text";
import Icon from "./shared/Icon";
import HighlightedText from "./shared/HighlightedText";
import Loader from "./shared/Loader";

interface WordModalProps {
  entry: IDictionaryEntry;
  searchTerm?: string;
  close: () => void;
}

function WordModal({ close, searchTerm, entry }: WordModalProps) {
  let repo = useDatabaseRepo();
  let removeFromFavoriteEntriesState = useSetAtom(
    removeFromFavoriteEntriesAtom
  );
  let [starred, setStarred] = useState<boolean | null>(null);

  useEffect(() => {
    let isMounted = true;

    repo.isEntryInFavorites(entry.id).then((inFavorites) => {
      if (isMounted) setStarred(inFavorites);
    });

    return () => {
      isMounted = false;
    };
  }, [entry.id, repo]);

  function handleAddToFavorites() {
    repo.addEntryToFavorites(entry.id).then(() => setStarred(true));
  }

  function handleRemoveFromFavorites() {
    repo.removeEntryFromFavorites(entry.id).then(() => {
      removeFromFavoriteEntriesState(entry.id);
      setStarred(false);
    });
  }

  if (starred === null) return <Loader size="medium" />;

  return (
    <Modal onRequestClose={close} transparent>
      <View className="flex-row-reverse justify-between bg-brand px-5 py-6">
        <TouchableOpacity onPress={close}>
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
    </Modal>
  );
}

export default WordModal;
