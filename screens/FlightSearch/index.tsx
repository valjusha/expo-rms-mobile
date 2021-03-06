import React, { useCallback } from "react";
import {
  createNativeStackNavigator,
  NativeStackScreenProps,
} from "@react-navigation/native-stack";
import { Text, Button } from "react-native";

import FlightSearch from "./FlightSearch";
import FlightDetail from "./FlightDetail";

import { DrawerToggleButton } from "@react-navigation/drawer";
import { TasksTabScreenProps } from "@navigation/types";

export type FlightSearchRouteProps = NativeStackScreenProps<
  {
    flightDetail: {
      uuid: string;
    };
  },
  "flightDetail"
>;

const Stack = createNativeStackNavigator();

export default ({ navigation }: TasksTabScreenProps<"List">) => {
  const handleOpenMainNavigation = useCallback(() => {
    navigation.openDrawer();
  }, [navigation]);

  return (
    <Stack.Navigator
      initialRouteName="flightSearch"
      screenOptions={{
        headerRight: (props) => (
          <DrawerToggleButton {...props} pressOpacity={undefined} />
        ),
      }}
      defaultScreenOptions={{
        animationTypeForReplace: "pop",
      }}
    >
      <Stack.Screen
        name="flightSearchList"
        options={{
          title: "Поиск рейса",
          headerRight: (_) => <DrawerToggleButton />,
        }}
        component={FlightSearch}
      />
      <Stack.Screen
        name="flightDetail"
        options={{
          title: "Список задач",
        }}
        component={FlightDetail}
      />
    </Stack.Navigator>
  );
};
