import { common } from "@styles/common";
import {
  Icon,
  Text,
  Switch,
  View,
  VStack,
  HStack,
  Center,
  Divider,
  Box,
} from "native-base";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { FlightSearchRouteProps } from ".";
import { AntDesign, Entypo } from "@expo/vector-icons";
import { TasksDirection, FakeDirection } from "@screens/Tasks/FakeDirection";

const maybe = Math.round(Math.random());

export default ({ navigation, route }: FlightSearchRouteProps) => {
  const [isEmpty, setEmptyStatus] = useState(true);

  console.log(route.params.uuid);
  const handleChangeSwitch = useCallback(
    (value: boolean) => setEmptyStatus(!value),
    [setEmptyStatus]
  );

  useEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <HStack>
          <Switch size="sm" onValueChange={handleChangeSwitch} mr="1" />
          <Text>Изменить вариант контента</Text>
        </HStack>
      ),
    });
  }, []);

  return (
    <View>
      <HStack alignItems="center" pl="4">
        <Icon
          color="gray.600"
          as={Entypo}
          name={maybe ? "aircraft-landing" : "aircraft-take-off"}
          size="lg"
        />
        <Text p="4" mt="0" backgroundColor="gray.700">
          {JSON.stringify(route.params.uuid)}
        </Text>
      </HStack>
      <Divider />
      {isEmpty ? <EmptyTask /> : <DetailTask />}
    </View>
  );
};

const DetailTask = () => (
  <Box pt="2" pl="15" pr="15">
    <TasksDirection data={fakeData} />
  </Box>
);

const fakeData: FakeDirection[] = [
  {
    id: 1,
    title:
      "В данном окне должна быть отображена следующая информация по рейсу:",
    list: [
      "-номер рейса;",
      "-МС;",
      "-время рейса;",
      "-регистрационный номер ВС;",
      "-маршрут",
    ],
  },
  {
    id: 2,
    title:
      "Все задачи в указанном разделе по списку должны быть перечислены с указанием следующих данных:",
    list: [
      "-требование задачи;",
      "-ресурс;",
      "-плановое время начала/окончания задачи;",
      "-фактическое время начала/окончания задачи;",
      "-статус задачи",
    ],
  },
];

const EmptyTask = () => (
  <View style={common.container} mt="5">
    <VStack space={4} alignItems="center">
      <Center>
        <Icon
          color="gray.600"
          as={AntDesign}
          name="bars"
          size="6xl"
          fontSize="6xl"
        />
      </Center>
      <Center alignContent="center">
        <Text fontSize="xl">Нет доступных задач</Text>
      </Center>
    </VStack>
  </View>
);

const page = StyleSheet.create({
  container: {
    display: "flex",
    padding: 24,
    alignItems: "stretch",
  },
});

const containerStyles = StyleSheet.flatten([page.container, common.container]);
