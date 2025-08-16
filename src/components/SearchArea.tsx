import { useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import { TextInput } from "./shared/TextInput";
import Icon from "./shared/Icon";
import DotsMenu from "./DotsMenu";

function SearchArea() {
  let [dotsMenuOpened, setDotsMenuOpened] = useState(false);
  let router = useRouter();

  let [searchTerm, setSearchTerm] = useState("");

  function handleSubmitWord() {
    if (searchTerm.length < 2) {
      Alert.alert("يجب أن يتكون مصطلح البحث من حرفين على الأقل");
      return;
    }

    router.push({ pathname: "/results", params: { searchTerm } });
  }

  function handleMenuOption(option: string) {
    setDotsMenuOpened(false);
    setSearchTerm("");

    switch (option) {
      case "history":
        router.push("/history");
        break;
      case "favorites":
        router.push("/favorites");
        break;
      case "about":
        router.push("/about");
        break;
      default:
        break;
    }
  }

  return (
    <View className="flex-row-reverse items-center justify-between gap-2 bg-brand px-3 py-3">
      <TouchableOpacity onPress={() => setDotsMenuOpened(true)}>
        <Icon
          type="MaterialCommunityIcons"
          name="dots-vertical"
          size={24}
          color="white"
        />

        <DotsMenu
          visible={dotsMenuOpened}
          onClose={() => setDotsMenuOpened(false)}
          onOptionPress={handleMenuOption}
        />
      </TouchableOpacity>

      <View className="flex-1">
        <TouchableOpacity
          className="absolute start-3 top-1/2 z-10 flex-1 -translate-y-1/2 items-center justify-center"
          onPress={handleSubmitWord}
        >
          <Icon type="MaterialIcons" name="search" size={24} color="#4a5565" />
        </TouchableOpacity>
        <TextInput
          className="my-1 rounded-2xl pl-12 text-xl"
          placeholder="ابدأ بكتابة الكلمة"
          maxLength={30}
          value={searchTerm}
          onChangeText={setSearchTerm}
          returnKeyType="search"
          onSubmitEditing={handleSubmitWord}
        />
      </View>
    </View>
  );
}

export default SearchArea;
