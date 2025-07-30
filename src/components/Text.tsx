import { Text as DefaultText, Platform, TextProps } from "react-native";

export interface CustomTextProps extends TextProps {
  weight?: "regular" | "medium" | "semibold";
}

export const Text = ({
  children,
  style,
  weight = "regular",
  ...props
}: CustomTextProps) => {
  let fontFamily;

  if (weight === "regular") {
    fontFamily = Platform.select({
      android: "NotoSansArabic_400Regular",
      ios: "NotoSansArabic-Regular",
    });
  } else if (weight === "medium") {
    fontFamily = Platform.select({
      android: "NotoSansArabic_500Medium",
      ios: "NotoSansArabic-Medium",
    });
  } else if (weight === "semibold") {
    fontFamily = Platform.select({
      android: "NotoSansArabic_600SemiBold",
      ios: "NotoSansArabic-SemiBold",
    });
  }

  return (
    <DefaultText
      style={[
        { fontFamily, writingDirection: "rtl", textAlign: "right" },
        style,
      ]}
      {...props}
    >
      {children}
    </DefaultText>
  );
};
