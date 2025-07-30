import { I18nManager, StatusBar } from "react-native";
import { Slot } from "expo-router";
import "../global.css";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  NotoSansArabic_400Regular,
  NotoSansArabic_500Medium,
  NotoSansArabic_600SemiBold,
} from "@expo-google-fonts/noto-sans-arabic";

export default function Layout() {
  let [fontLoaded, fontError] = useFonts({
    NotoSansArabic_400Regular,
    NotoSansArabic_500Medium,
    NotoSansArabic_600SemiBold,
  });

  useEffect(() => {
    if (fontLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontLoaded, fontError]);

  if (!fontLoaded && !fontError) {
    return null;
  }

  I18nManager.allowRTL(true);
  I18nManager.forceRTL(true);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#90343d" }}>
      <StatusBar backgroundColor="#90343d" barStyle="light-content" />
      <Slot />
    </SafeAreaView>
  );
}
