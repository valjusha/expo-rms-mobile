/**
 * Learn more about using TypeScript with React Navigation:
 * https://reactnavigation.org/docs/typescript/
 */

import { DrawerScreenProps } from "@react-navigation/drawer";
import {
  CompositeScreenProps,
  NavigatorScreenParams,
} from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TaskParamProps } from "@screens/Tasks/types";

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootDrawerTabParamList> | undefined;
  DetailTaskModal: NavigatorScreenParams<TaskParamProps>;
  CallRequestModal: undefined;
  ChoiceVehicleModal: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> =
  NativeStackScreenProps<RootStackParamList, Screen>;

export type RootDrawerTabParamList = {
  Tasks: NavigatorScreenParams<TasksTabParamList>;
  FlightSearch: NavigatorScreenParams<FlightSearchTabParamList>;
  Information: undefined;
};

export type RootDrawerProps<Screen extends keyof RootDrawerTabParamList> =
  CompositeScreenProps<
    DrawerScreenProps<RootDrawerTabParamList, Screen>,
    NativeStackScreenProps<RootStackParamList>
  >;

/**
 * Навигация по поиску рейсов
 */
export type FlightSearchTabParamList = {
  Search: undefined;
  Detail: {
    uuid: string;
  };
};

export type FlightSearchScreenProps<
  Screen extends keyof FlightSearchTabParamList
> = CompositeScreenProps<
  NativeStackScreenProps<FlightSearchTabParamList, Screen>,
  RootDrawerProps<keyof RootDrawerTabParamList>
>;

/**
 * Навигация по списку задач
 */
export type TasksTabParamList = {
  List: undefined;
  Task: TaskParamProps;
  Detail: TaskParamProps;
};

export type TasksTabScreenProps<Screen extends keyof TasksTabParamList> =
  CompositeScreenProps<
    NativeStackScreenProps<TasksTabParamList, Screen>,
    RootDrawerProps<keyof RootDrawerTabParamList>
  >;
