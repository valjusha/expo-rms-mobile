// todo примеры анимации над заголовком при скроле
// https://reactnavigation.org/docs/community-libraries-and-navigators
// https://medium.com/swlh/making-a-collapsible-sticky-header-animations-with-react-native-6ad7763875c3

import {
  Box,
  Button,
  Divider,
  Heading,
  Radio,
  ScrollView,
  SectionList,
  View,
} from "native-base";
import { SafeAreaView, StyleSheet } from "react-native";
import { useVehicle } from "@store/vehicle";
import { SearchBar } from "@screens/FlightSearch/FlightSearch";
import { useCallback, useState } from "react";
import { RootStackScreenProps } from "@navigation/types";

export default ({ navigation }: RootStackScreenProps<"Root">) => {
  const { list, current, choiceVehicle } = useVehicle();
  const [selected, setSelectedVehicle] = useState<string | undefined>(
    undefined
  );

  const handleOnChange = useCallback(
    (value: any) => setSelectedVehicle(value),
    [list]
  );

  const handleOnPress = useCallback(() => {
    selected && choiceVehicle(selected);
    selected && navigation.navigate("Root");
  }, [selected]);

  return (
    <SafeAreaView style={styles.viewArea}>
      <View p="10" pb="5" style={styles.container}>
        <SearchBar />
        {/* <ScrollView showsVerticalScrollIndicator={false}> */}
          <Radio.Group
            name="name"
            accessibilityLabel="puck"
            defaultValue={current || undefined}
            onChange={handleOnChange}
          >
            <SectionList
              sections={list}
              keyExtractor={(item, index) =>
                `${(item as string).replace(/\s+/g, "")}-${index}`
              }
              renderSectionHeader={({ section }) => (
                <Heading mt={4} mb={2}>{section.title}</Heading>
              )}
              renderItem={({ item }) => (
                <Radio value={item} my={1}>
                  {item}
                </Radio>
              )}
            />
          </Radio.Group>
        {/* </ScrollView> */}
        <Box mt="auto">
          <Divider mb="5" />
          <Button isDisabled={!selected} onPress={handleOnPress}>
            {`${selected ? "Выбрать ТС" : "Выберите ТС"}`}
          </Button>
        </Box>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  viewArea: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingTop: 2,
  },
});
