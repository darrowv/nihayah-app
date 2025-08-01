import { useState } from "react";
import { View } from "react-native";
import { useSQLiteContext } from "expo-sqlite";
import { useSetAtom } from "jotai";

import { entriesAtom } from "@/lib/jotai/entries";
import { normalizeArabic } from "@/lib/utils/normalizeArabic";

import { TextInput } from "../TextInput";
import { Icon } from "../Icon";

function SearchArea() {
  let db = useSQLiteContext();
  let setEntries = useSetAtom(entriesAtom);

  let [searchValue, setSearchValue] = useState("");

  function handleSubmitWord() {
    let normalizedSearchValue = normalizeArabic(searchValue);
    let value = `%${normalizedSearchValue}%`;

    db.getAllAsync(
      `
        SELECT * FROM dictionary_entries
        WHERE word_clean LIKE ? OR explanation_clean LIKE ?
        ORDER BY
          CASE
            WHEN word_clean = ? THEN 1             -- exact match
            WHEN word_clean LIKE ? THEN 2          -- starts with
            WHEN word_clean LIKE ? THEN 3          -- contains
            WHEN explanation_clean LIKE ? THEN 4   -- found in explanation
            ELSE 5
          END,
          word_clean ASC
        `,
      [
        value, // word_clean LIKE ?
        value, // explanation_clean LIKE ?
        normalizedSearchValue, // word_clean = ?
        normalizedSearchValue + "%", // word_clean LIKE 'input%'
        "%" + normalizedSearchValue + "%", // word_clean LIKE '%input%'
        "%" + normalizedSearchValue + "%", // explanation_clean LIKE '%input%'
      ]
    ).then(setEntries);
  }

  return (
    <View className="bg-[#90343d] py-2">
      <View>
        <Icon
          type="MaterialIcons"
          name="search"
          size={24}
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
