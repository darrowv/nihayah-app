import React from "react";
import { View } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

interface LoaderProps {
  size: "small" | "medium" | "large";
}

const Loader = ({ size = "medium" }: LoaderProps) => {
  let sizes = {
    small: "h-[20px] w-[20px] rounded-[10px] border-[2px]",
    medium: "h-[40px] w-[40px] rounded-[20px] border-[4px]",
    large: "h-[60px] w-[60px] rounded-[30px] border-[6px]",
  };

  const rotation = useSharedValue(0);

  // Start spinning animation
  rotation.value = withRepeat(withTiming(360, { duration: 900 }), -1, false);

  // Apply the rotation style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${rotation.value}deg` }],
  }));

  return (
    <View className="flex-1 items-center justify-center">
      <Animated.View
        className={`border-b-slate-200 border-l-brand border-r-slate-200 border-t-slate-200 ${sizes[size]}`}
        style={animatedStyle}
      />
    </View>
  );
};

export default Loader;
