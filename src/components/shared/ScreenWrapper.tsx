import { View } from "react-native";

function ScreenWrapper({ children }) {
  return <View className="bg-background flex-1">{children}</View>;
}

export default ScreenWrapper;
