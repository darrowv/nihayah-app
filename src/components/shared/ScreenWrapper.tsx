import { View } from "react-native";

function ScreenWrapper({ children }) {
  return <View className="flex-1 bg-background">{children}</View>;
}

export default ScreenWrapper;
