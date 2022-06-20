import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from "@react-navigation/drawer";

import { Box, NativeBaseProvider, Text } from "native-base";

import { MainNavigationBar } from "./components/MainNavigationBar";

import Information from "./screens/Information";
import FlightSearch from "./screens/FlightSearch";
import CallRequest from "./screens/CallRequest";
import Tasks from "./screens/Tasks";
import ChoiceVehicle from "@screens/ChoiceVehicle";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import Navigation from "@navigation/index";
import useCachedResources from "@hooks/useCachedResources";
import TasksProvider from "@screens/Tasks/store";
import { getFakeDataMap } from "@screens/Tasks/fakeData";
import { VehicleProvider } from "@store/vehicle";

// todo arg typing?
export default () => {
  const isLoadingComplete = useCachedResources();

  return !isLoadingComplete ? null : (
    <VehicleProvider>
      <TasksProvider initialTasks={getFakeDataMap()}>
        <SafeAreaProvider>
          <NativeBaseProvider>
            <Navigation />
            <StatusBar />
          </NativeBaseProvider>
        </SafeAreaProvider>
      </TasksProvider>
    </VehicleProvider>
  );
};

// мусор ниже

const Drawer = createDrawerNavigator();

const RootStack = createNativeStackNavigator();

const RootStackScreen = () => (
  <RootStack.Navigator initialRouteName="information">
    <RootStack.Group>
      {/* <RootStack.Screen
        name="authorized"
        component={BaseAppDrawerPages}
        options={{ headerShown: false }}
      /> */}
      <RootStack.Screen
        name="flightSearch"
        options={{
          title: "Поиск рейса",
          headerShown: false,
        }}
        component={FlightSearch}
      />
      <RootStack.Screen
        name="tasks"
        options={{
          title: "Задачи на смену",
          headerShown: false,
        }}
        component={Tasks}
      />
      <RootStack.Screen
        name="choiceVehicle"
        options={{
          title: "Выбор ТС",
        }}
        component={ChoiceVehicle}
      />
      <RootStack.Screen
        name="information"
        options={{
          title: "Инф о сотруднике/устройстве",
        }}
        component={Information}
      />
    </RootStack.Group>
    <RootStack.Group screenOptions={{ presentation: "modal" }}>
      <RootStack.Screen
        name="callRequestModal"
        component={CallRequest}
        options={{ title: "Вызов диспетчера" }}
      />
    </RootStack.Group>
  </RootStack.Navigator>
);

const BaseAppDrawerPages = () => (
  <Box safeArea flex={1}>
    <Drawer.Navigator
      drawerContent={(props) => <MainNavigationBar {...props} />}
      screenOptions={{
        drawerPosition: "right",
        headerLeft: () => null,
        headerRight: (props) => <DrawerToggleButton {...props} />,
      }}
      initialRouteName="information"
    >
      <Drawer.Screen
        name="flightSearch"
        options={{
          title: "Поиск рейса",
          headerShown: false,
        }}
        component={FlightSearch}
      />
      <Drawer.Screen
        name="tasks"
        options={{
          title: "Задачи на смену",
          headerShown: false,
        }}
        component={Tasks}
      />
      <Drawer.Screen
        name="choiceVehicle"
        options={{
          title: "Выбор ТС",
        }}
        component={ChoiceVehicle}
      />
      <Drawer.Screen
        name="information"
        options={{
          title: "Инф о сотруднике/устройстве",
        }}
        component={Information}
      />
    </Drawer.Navigator>
  </Box>
);
