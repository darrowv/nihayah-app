import { Modal, ScrollView, TouchableOpacity, View } from "react-native";

import { IDictionaryEntry } from "@/lib/interfaces/entry.interface";

import { Text } from "../Text";
import { Icon } from "../Icon";
import Separator from "../Separator";

interface WordModalProps {
  entry: IDictionaryEntry;
  close: () => void;
}

function WordModal({ close, entry }: WordModalProps) {
  return (
    <Modal onRequestClose={close}>
      <View className="bg-[#90343d] px-5 py-4">
        <TouchableOpacity onPress={close}>
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

          <Text className="px-3 py-3 text-xl/10">{entry.explanation}</Text>
        </View>
      </ScrollView>
    </Modal>
  );
}

export default WordModal;
