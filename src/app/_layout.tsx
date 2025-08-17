import "../global.css";

import { DevSettings, I18nManager, StatusBar, View } from "react-native";
import { Stack } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { Suspense, useEffect } from "react";
import * as SplashScreen from "expo-splash-screen";
import {
  useFonts,
  NotoSansArabic_400Regular,
  NotoSansArabic_500Medium,
  NotoSansArabic_600SemiBold,
} from "@expo-google-fonts/noto-sans-arabic";

import Loader from "@/components/shared/Loader";
import SearchArea from "@/components/SearchArea";

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

    if (!I18nManager.isRTL) {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(true);

      // DEV ONLY — force reload after RTL is changed
      if (__DEV__) {
        DevSettings.reload();
      }
    }
  }, [fontLoaded, fontError]);

  if (!fontLoaded && !fontError) {
    return null;
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView className="bg-brand flex-1">
        <StatusBar backgroundColor="#2C3E50" barStyle="light-content" />
        <Suspense
          fallback={
            <View className="flex-1 items-center justify-center bg-white">
              <Loader size="large" />
            </View>
          }
        >
          <SQLiteProvider
            databaseName="nihayah.db"
            assetSource={{ assetId: require("../../assets/nihayah.db") }}
            useSuspense
          >
            <SearchArea />

            <Stack screenOptions={{ headerShown: false, animation: "none" }}>
              <Stack.Screen name="index" />
              <Stack.Screen name="history" />
              <Stack.Screen name="favorites" />
              <Stack.Screen name="results" />
            </Stack>
          </SQLiteProvider>
        </Suspense>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
