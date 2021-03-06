import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { DrawerToggleButton } from "@react-navigation/drawer";

import TasksList from "./TasksList";
import DetailTask from "./DetailTask";
import Task from "./Task";
import { TasksTabParamList } from "@navigation/types";
import { NavigationHeader } from "@components/NavigationHeader";

const TaskStack = createNativeStackNavigator<TasksTabParamList>();

export default () => (
  <TaskStack.Navigator
    screenOptions={{
      headerRight: (props) => <DrawerToggleButton {...props} />,
      headerTitle: (props) => <NavigationHeader {...props} />,
      headerTitleAlign: "center",
      headerShadowVisible: false,
      headerStyle: {
        backgroundColor: "transparent",
      },
    }}
  >
    <TaskStack.Screen
      name="List"
      options={{
        title: "Обзор задач",
      }}
      component={TasksList}
    />
    <TaskStack.Screen
      name="Task"
      options={{
        title: "Детали задачи",
      }}
      component={Task}
    />
    <TaskStack.Screen
      name="Detail"
      options={{
        title: "Информация о задачи",
      }}
      component={DetailTask}
    />
  </TaskStack.Navigator>
);
