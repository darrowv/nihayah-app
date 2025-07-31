import { useEffect } from "react";
import { View } from "react-native";
import { useSetAtom } from "jotai";
import { useSQLiteContext } from "expo-sqlite";

import SearchArea from "@/components/home/SearchArea";
import WordsList from "@/components/home/WordsList";
import { entriesAtom } from "@/lib/jotai/entries";

export default function Page() {
  let db = useSQLiteContext();
  let setEntries = useSetAtom(entriesAtom);

  useEffect(() => {
    db.getAllAsync("SELECT * FROM dictionary_entries").then(setEntries);
  }, [db, setEntries]);

  return (
    <View className="flex-1 bg-white">
      <SearchArea />
      <WordsList />
    </View>
  );
}
