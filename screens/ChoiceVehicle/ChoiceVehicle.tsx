// todo примеры анимации над заголовком при скроле
// https://reactnavigation.org/docs/community-libraries-and-navigators
// https://medium.com/swlh/making-a-collapsible-sticky-header-animations-with-react-native-6ad7763875c3

import { common } from "@styles/common";
import { Box, Text, View } from "native-base";
import { SafeAreaView } from "react-native";

export default () => (
  <SafeAreaView style={common.container}>
    <View p="10" style={common.container}>
      <Box style={common.code}>
        <Text fontSize="md" mb="1.5">
          Поиск + список по ТС
        </Text>
        <Text fontSize="sm" mb="1">
          Выводим списки ТС сгруппированные по алфавиту;
        </Text>
        <Text fontSize="sm" mb="1">
          При выборе ТС появляется кнопка выбора;
        </Text>
        <Text fontSize="sm">
          При подтверждении выбора в навигации изменится статус.
        </Text>
      </Box>
    </View>
  </SafeAreaView>
);
