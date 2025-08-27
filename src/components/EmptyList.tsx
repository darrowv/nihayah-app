import { View } from "react-native";

import Text from "./shared/Text";
import Icon from "./shared/Icon";

interface EmtptyListProps {
  text: string;
}

function EmptyList({ text }: EmtptyListProps) {
  return (
    <View className="mt-12 items-center gap-2">
      <Icon type="AntDesign" name="dropbox" size={50} color="#99a1af" />
      <Text className="text-arabic-xl text-gray-400">{text}</Text>
    </View>
  );
}

export default EmptyList;
