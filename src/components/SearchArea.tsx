import { useState } from "react";
import { View } from "react-native";
import { useSetAtom } from "jotai";

import { useDatabaseRepo } from "@/lib/hooks/useDatabaseRepo";
import { dictionaryEntriesAtom } from "@/lib/atoms";

import { TextInput } from "./shared/TextInput";
import { Icon } from "./shared/Icon";

function SearchArea() {
  let repo = useDatabaseRepo();
  let setDictEntries = useSetAtom(dictionaryEntriesAtom);

  let [searchValue, setSearchValue] = useState("");

  function handleSubmitWord() {
    repo.searchEntries(searchValue).then(setDictEntries);
  }

  return (
    <View className="bg-brand py-2">
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
