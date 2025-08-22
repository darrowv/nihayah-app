import { ScrollView, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import Icon from "@/components/shared/Icon";
import ScreenWrapper from "@/components/shared/ScreenWrapper";
import Text from "@/components/shared/Text";

export default function About() {
  let router = useRouter();

  return (
    <ScreenWrapper>
      <View className="h-20 flex-row-reverse items-center justify-between bg-brand px-5">
        <TouchableOpacity onPress={() => router.back()}>
          <Icon
            type="MaterialIcons"
            name="arrow-back"
            size={28}
            color="white"
          />
        </TouchableOpacity>
        <Text className="py-1 text-2xl text-white">حول التطبيق</Text>
      </View>

      <ScrollView className="px-5 pt-6">
        <View className="gap-3 pb-7">
          <Text weight="semibold" className="text-2xl text-blue-900">
            عن الكتاب
          </Text>
          <Text className="text-xl/8">
            «النهاية في غريب الحديث والأثر» من أهم المعاجم التي جمعت ألفاظ غريب
            الحديث وشرحتها، صنّفه الإمام مجد الدين أبو السعادات المبارك بن محمد
            بن محمد بن محمد بن عبد الكريم الشيباني الجزري ابن الأثير (ت ٦٠٦هـ).
            وقد أصبح مرجعًا أساسياً لطالب العلم والباحث في معاني الأحاديث
            النبوية وآثار الصحابة.
          </Text>
        </View>

        <View className="gap-3 pb-7">
          <Text weight="semibold" className="text-2xl text-blue-900">
            عن المؤلف
          </Text>
          <Text className="text-xl/8">
            ابن الأثير مجد الدين من كبار علماء القرن السادس الهجري، جمع بين
            الفقه والحديث واللغة، واشتهر بكتبه التي خدمت التراث الإسلامي، وعلى
            رأسها هذا المعجم الفريد.
          </Text>
        </View>

        <View className="gap-3 pb-7">
          <Text weight="semibold" className="text-2xl text-blue-900">
            عن التطبيق
          </Text>
          <Text className="text-xl/8">
            هدف هذا التطبيق هو تيسير البحث واستكشاف ألفاظ كتاب النهاية بطريقة
            سهلة وسريعة، ليكون أقرب إلى يد الطالب والباحث، مع واجهة عصرية تسهّل
            الوصول إلى المعاني والمصادر.
          </Text>
        </View>
      </ScrollView>
    </ScreenWrapper>
  );
}
