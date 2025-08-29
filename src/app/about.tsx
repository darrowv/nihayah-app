import { ScrollView, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import Icon from "@/components/shared/Icon";
import ScreenWrapper from "@/components/shared/ScreenWrapper";
import Text from "@/components/shared/Text";
import Separator from "@/components/shared/Separator";

export default function About() {
  let router = useRouter();

  return (
    <ScreenWrapper>
      <View className="h-20 flex-row items-center justify-between bg-brand px-5">
        <TouchableOpacity onPress={() => router.back()}>
          <Icon
            type="MaterialIcons"
            name="arrow-forward"
            size={28}
            color="white"
          />
        </TouchableOpacity>
        <Text className="text-arabic-2xl text-white">حول التطبيق</Text>
      </View>

      <ScrollView className="">
        <View className="m-3 rounded-2xl bg-white p-5 shadow-lg">
          <Text
            weight="semibold"
            className="text-arabic-2xl mb-3 text-blue-900"
          >
            عن الكتاب
          </Text>
          <Text className="text-arabic-xl mb-2">
            «النهاية في غريب الحديث والأثر» من أهم المعاجم التي جمعت ألفاظ غريب
            الحديث وشرحتها، صنّفه الإمام مجد الدين أبو السعادات المبارك بن محمد
            بن محمد بن محمد بن عبد الكريم الشيباني الجزري ابن الأثير (ت ٦٠٦هـ).
            وقد أصبح مرجعًا أساسياً لطالب العلم والباحث في معاني الأحاديث
            النبوية وآثار الصحابة.
          </Text>

          <Separator />

          <Text className="text-arabic-base my-2">
            <Text weight="semibold">الناشر: </Text>المكتبة العلمية - بيروت،
            ١٣٩٩هـ - ١٩٧٩م
          </Text>
          <Text className="text-arabic-base mb-2">
            <Text weight="semibold">تحقيق: </Text>طاهر أحمد الزاوى - محمود محمد
            الطناحي
          </Text>
          <Text className="text-arabic-base mb-2">
            <Text weight="semibold">عدد الأجزاء: </Text>٥
          </Text>
          <Text className="text-arabic-base text-gray-500">
            [ترقيم الكتاب موافق للمطبوع]
          </Text>
        </View>

        <View className="m-3 rounded-2xl bg-white p-5 shadow-lg">
          <Text
            weight="semibold"
            className="text-arabic-2xl mb-3 text-blue-900"
          >
            عن المؤلف
          </Text>
          <Text className="text-arabic-xl">
            ابن الأثير مجد الدين من كبار علماء القرن السادس الهجري، جمع بين
            الفقه والحديث واللغة، واشتهر بكتبه التي خدمت التراث الإسلامي، وعلى
            رأسها هذا المعجم الفريد.
          </Text>
        </View>

        <View className="m-3 rounded-2xl bg-white p-5 shadow-lg">
          <Text
            weight="semibold"
            className="text-arabic-2xl mb-3 text-blue-900"
          >
            عن التطبيق
          </Text>
          <Text className="text-arabic-xl">
            هدف هذا التطبيق هو تيسير البحث واستكشاف ألفاظ كتاب النهاية بطريقة
            سهلة وسريعة، ليكون أقرب إلى يد الطالب والباحث، مع واجهة عصرية تسهّل
            الوصول إلى المعاني والمصادر.
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
