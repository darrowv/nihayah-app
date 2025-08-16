import { ForwardedRef, forwardRef } from "react";
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
    return (
      <DefaultTextInput
        {...props}
        ref={ref}
        className={`h-14 bg-white px-3 py-1 text-right ${props.className || ""}`}
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
        placeholderTextColor={placeholderTextColor || "#9ca3af"}
      />
    );
  }
);
