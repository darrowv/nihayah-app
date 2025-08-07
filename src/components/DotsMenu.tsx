import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";

type DotsMenuProps = {
  visible: boolean;
  onClose: () => void;
  onOptionPress: (option: string) => void;
  position?: { x: number; y: number };
};

export default function DotsMenu({
  visible,
  onClose,
  onOptionPress,
  position = { x: 20, y: 60 },
}: DotsMenuProps) {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <TouchableOpacity className="flex-1" activeOpacity={1} onPress={onClose}>
        <View
          className="absolute z-50 gap-2 space-y-2 rounded-lg bg-white py-2 shadow-xl"
          style={{ top: position.y, right: position.x }}
        >
          <Pressable
            className="border-b border-b-gray-200 py-1 pe-14 ps-4"
            onPress={() => onOptionPress("history")}
          >
            <Text className="text-xl text-gray-800">السجل</Text>
          </Pressable>
          <Pressable
            className="border-b border-b-gray-200 py-1 pe-14 ps-4"
            onPress={() => onOptionPress("favorites")}
          >
            <Text className="text-xl text-gray-800">المفضلة</Text>
          </Pressable>
          <Pressable
            className="py-1 pe-14 ps-4"
            onPress={() => onOptionPress("about")}
          >
            <Text className="text-xl text-gray-800">حول التطبيق</Text>
          </Pressable>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}
