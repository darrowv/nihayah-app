import { useState } from "react";
import { View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useSetAtom } from "jotai";

import { entriesAtom } from "@/lib/jotai/entries";

import { TextInput } from "../TextInput";
import { Icon } from "../Icon";

function SearchArea() {
  let db = useSQLiteContext();
  let setEntries = useSetAtom(entriesAtom);

  let [searchValue, setSearchValue] = useState("");

  function handleSubmitWord() {
    let value = `%${searchValue}%`;

    db.getAllAsync(
      "SELECT * FROM dictionary_entries WHERE word LIKE ? OR explanation LIKE ? ORDER BY word ASC",
      [value, value]
    ).then(setEntries);
  }

  return (
    <View className="bg-[#90343d] py-2">
      <View>
        <Icon
          type="AntDesign"
          name="search1"
          size={20}
          color="#4a5565"
          className="absolute left-7 top-1/2 z-10 -translate-y-1/2"
        />
        <TextInput
          className="mx-4 my-1 pl-10 text-xl"
          placeholder="ابدأ بكتابة الكلمة"
          autoFocus
          maxLength={30}
          value={searchValue}
          onChangeText={setSearchValue}
          returnKeyType="search"
          onSubmitEditing={handleSubmitWord}
        />
      </View>
    </View>
  );
}

export default SearchArea;
