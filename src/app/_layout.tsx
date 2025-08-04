import { StatusBar, View } from "react-native";
import { Slot } from "expo-router";
import { SQLiteProvider } from "expo-sqlite";
import "../global.css";
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

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1, backgroundColor: "#90343d" }}>
        <StatusBar backgroundColor="#90343d" barStyle="light-content" />
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
            <Slot />
          </SQLiteProvider>
        </Suspense>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
