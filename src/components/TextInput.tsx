import { ForwardedRef, forwardRef, useState } from "react";
import {
  TextInput as DefaultTextInput,
  Platform,
  TextInputProps,
} from "react-native";

export const TextInput = forwardRef<DefaultTextInput, TextInputProps>(
  function TextInput(
    { placeholderTextColor, ...props },
    ref: ForwardedRef<DefaultTextInput>
  ) {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = () => {
      setIsFocused(true);
    };

    const handleEndEditing = () => {
      setIsFocused(false);
    };

    return (
      <DefaultTextInput
        {...props}
        ref={ref}
        onFocus={handleFocus}
        onEndEditing={handleEndEditing}
        className={`h-14 rounded-xl border border-[#302c21] bg-white px-3 py-1 text-right ${isFocused ? "border-[#f5de8e]" : ""} ${props.className || ""}`}
        style={[
          props.style,
          {
            writingDirection: "rtl",
            textAlignVertical: "center",
            fontFamily: Platform.select({
              android: "NotoSansArabic_400Regular",
              ios: "NotoSansArabic-Regular",
            }),
          },
        ]}
      />
    );
  }
);
