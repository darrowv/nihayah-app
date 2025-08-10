import { Modal, ScrollView, TouchableOpacity, View } from "react-native";

import { IDictionaryEntry } from "@/lib/interfaces";

import Text from "./shared/Text";
import Icon from "./shared/Icon";
import Separator from "./shared/Separator";
import HighlightedText from "./shared/HighlightedText";

interface WordModalProps {
  entry: IDictionaryEntry;
  searchTerm?: string;
  close: () => void;
}

function WordModal({ close, searchTerm, entry }: WordModalProps) {
  return (
    <Modal onRequestClose={close}>
      <View className="bg-brand px-5 py-4">
        <TouchableOpacity onPress={close} className="items-end">
          <Icon
            type="MaterialIcons"
            name="arrow-back"
            size={24}
            color="white"
          />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <View className="">
          <Text weight="semibold" className="px-5 py-4 text-2xl text-red-700">
            {entry.word}
          </Text>
          <Separator />

          {searchTerm ? (
            <HighlightedText
              searchTerm={searchTerm}
              text={entry.explanation}
              containerTextClassName="px-3 py-3 text-xl/10"
              highlightClassName="bg-yellow-200 text-brand"
            />
          ) : (
            <Text className="px-3 py-3 text-xl/10">{entry.explanation}</Text>
          )}
        </View>
      </ScrollView>
    </Modal>
  );
}

export default WordModal;
