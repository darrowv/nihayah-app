import { Modal, Text, TouchableOpacity, View } from "react-native";

import Icon from "./shared/Icon";
import Separator from "./shared/Separator";

interface DotsMenuProps {
  visible: boolean;
  onClose: () => void;
  onOptionPress: (option: string) => void;
  position?: { x: number; y: number };
}

function DotsMenu({
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
          className="absolute z-50 gap-2 space-y-2 rounded-lg bg-white py-2 shadow-2xl"
          style={{ top: position.y, right: position.x }}
        >
          <TouchableOpacity
            className="flex-row items-center gap-2 py-1 pe-14 ps-4"
            onPress={() => onOptionPress("history")}
          >
            <Icon type="MaterialIcons" name="history" size={18} />
            <Text className="text-xl text-gray-800">السجل</Text>
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity
            className="flex-row items-center gap-2 py-1 pe-14 ps-4"
            onPress={() => onOptionPress("favorites")}
          >
            <Icon type="MaterialIcons" name="star-border" size={18} />
            <Text className="text-xl text-gray-800">المفضلة</Text>
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity
            className="flex-row items-center gap-2 py-1 pe-14 ps-4"
            onPress={() => onOptionPress("about")}
          >
            <Icon type="MaterialIcons" name="info-outline" size={18} />
            <Text className="text-xl text-gray-800">حول التطبيق</Text>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Modal>
  );
}

export default DotsMenu;
