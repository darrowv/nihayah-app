import { Modal, Text, TouchableOpacity, View } from "react-native";
import { usePathname, useRouter } from "expo-router";
import { useSetAtom } from "jotai";

import { searchTermAtom } from "@/lib/atoms";

import Icon from "./shared/Icon";
import Separator from "./shared/Separator";

interface DotsMenuProps {
  visible: boolean;
  onClose: () => void;
}

function DotsMenu({ visible, onClose }: DotsMenuProps) {
  let router = useRouter();
  let pathname = usePathname();

  let setSearchTerm = useSetAtom(searchTermAtom);

  function redirectToScreen(screen: string) {
    onClose();

    if (pathname === screen) {
      return;
    }

    setSearchTerm("");

    router.push(screen);
  }

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
          style={{ top: 60, right: 20 }}
        >
          <TouchableOpacity
            className="flex-row items-center gap-2 py-1 pe-14 ps-4"
            onPress={() => redirectToScreen("/history")}
          >
            <Icon type="MaterialIcons" name="history" size={18} />
            <Text className="text-xl text-gray-800">السجل</Text>
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity
            className="flex-row items-center gap-2 py-1 pe-14 ps-4"
            onPress={() => redirectToScreen("/favorites")}
          >
            <Icon type="MaterialIcons" name="star-border" size={18} />
            <Text className="text-xl text-gray-800">المفضلة</Text>
          </TouchableOpacity>
          <Separator />
          <TouchableOpacity
            className="flex-row items-center gap-2 py-1 pe-14 ps-4"
            onPress={() => redirectToScreen("/about")}
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
