/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from "@expo/vector-icons";
import {
  createDrawerNavigator,
  DrawerToggleButton,
} from "@react-navigation/drawer";
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from "@react-navigation/native";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Information from "@screens/Information";
import Tasks from "@screens/Tasks";
import * as React from "react";
import { Pressable, StyleSheet, Text } from "react-native";

import CallRequestModal from "../screens/CallRequest";

import {
  RootDrawerTabParamList,
  RootDrawerProps,
  RootStackParamList,
} from "./types";
import LinkingConfiguration from "./LinkingConfiguration";
import { MainNavigationBar } from "@components/MainNavigationBar";

export default function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Root"
        component={DrawerTabNavigation}
        options={{ headerShown: false }}
      />
      <Stack.Group screenOptions={{ presentation: "modal" }}>
        <Stack.Screen name="CallRequestModal" component={CallRequestModal} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

const DrawerTab = createDrawerNavigator<RootDrawerTabParamList>();

const DrawerTabNavigation = () => (
  <DrawerTab.Navigator
    drawerContent={(props) => <MainNavigationBar {...props} />}
    screenOptions={{
      drawerPosition: "right",
      headerLeft: () => null,
      headerRight: (props) => <DrawerToggleButton {...props} />,
      headerStyle: {
        backgroundColor: "transparent",
        borderBottomColor: "transparent",
      },
    }}
    initialRouteName="Tasks"
  >
    <DrawerTab.Screen
      name="Tasks"
      component={Tasks}
      options={{
        headerShown: false,
      }}
    />
    <DrawerTab.Screen
      name="Information"
      component={Information}
      options={{ title: "Инф о сотруднике/устройстве" }}
    />
  </DrawerTab.Navigator>
);

const st = StyleSheet.create({
  headerBackground: {
    backgroundColor: "transparent",
  },
});
/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 *
const BottomTab = createBottomTabNavigator<RootTabParamList>();

function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="TabOne"
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme].tint,
      }}
    >
      <BottomTab.Screen
        name="TabOne"
        component={TabOneScreen}
        options={({ navigation }: RootDrawerProps<"Home">) => ({
          title: "Tab One",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
          headerRight: () => (
            <Pressable
              onPress={() => navigation.navigate("Home")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
              })}
            >
              <FontAwesome
                name="info-circle"
                size={25}
                color={Colors[colorScheme].text}
                style={{ marginRight: 15 }}
              />
            </Pressable>
          ),
        })}
      />
      <BottomTab.Screen
        name="TabTwo"
        component={TabTwoScreen}
        options={{
          title: "Tab Two",
          tabBarIcon: ({ color }) => <TabBarIcon name="code" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}
*/
/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>["name"];
  color: string;
}) {
  return <FontAwesome size={30} style={{ marginBottom: -3 }} {...props} />;
}
