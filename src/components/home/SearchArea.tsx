import { View } from "react-native";

import { TextInput } from "../TextInput";
import { Icon } from "../Icon";

function SearchArea() {
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
        />
      </View>
    </View>
  );
}

export default SearchArea;
