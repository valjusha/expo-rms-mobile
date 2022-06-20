import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  Badge,
  FlatList,
  HStack,
  Icon,
  Pressable,
  Switch,
  Text,
  VStack,
} from "native-base";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { TasksDirection, fakeTasksData } from "./FakeDirection";

import {
  IMultiTripTask,
  ISingleTripTask,
  ISpecialTask,
  IStaticTask,
  IAnyTypeTask,
} from "./types";
import { BaseShortTask } from "./Template";
import { TasksTabScreenProps } from "@navigation/types";
import { useTasks } from "./store";
import { ShortTask } from "./Templates";
import { SingleShort } from "./Templates/SingleShort";
import { SpecialShort } from "./Templates/SpecialShort";

const maybe = () => Math.round(Math.random());

export default ({ navigation }: TasksTabScreenProps<"List">) => {
  const iconV = maybe();
  const { tasks } = useTasks();
  const [isDemo, changePreviewDataStatus] = useState(false);

  const handleChangePreviewStatus = useCallback(
    (value: boolean) => {
      changePreviewDataStatus(value);
    },
    [changePreviewDataStatus]
  );

  // useEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <Switch size="sm" ml="6" onValueChange={handleChangePreviewStatus} />
  //     ),
  //   });
  // }, []);

  useEffect(() => {
    // navigation.navigate("ChoiceVehicleModal");
    // navigation.navigate("Detail", { uuid: [...tasks.keys()][1] });
  }, [tasks]);

  const handleGoToDetail = useCallback(
    ({ uuid }: IAnyTypeTask) => {
      navigation.navigate("Task", { uuid });
    },
    [navigation]
  );

  return (
    <SafeAreaView>
      {isDemo ? (
        <TasksDirection data={fakeTasksData} />
      ) : (
        <>
          <FlatList
            data={[...tasks.values()]}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  handleGoToDetail(item);
                }}
              >
                {item.representationType == "single" && (
                  <SingleShort task={item} backgroundColor="white" />
                )}
                {item.representationType == "special" && (
                  <SpecialShort task={item} backgroundColor="white" />
                )}
              </Pressable>
            )}
            keyExtractor={(item) => item.uuid}
          />
        </>
      )}
    </SafeAreaView>
  );
};
