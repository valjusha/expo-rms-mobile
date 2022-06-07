import { FlatList, Pressable, Switch } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { TasksDirection, fakeTasksData } from "./FakeDirection";

import {
  IMultiTripTask,
  ISingleTripTask,
  ISpecialTask,
  IStaticTask,
  IAnyTask,
} from "./types";
import { BaseShortTask } from "./Template";
import { TasksTabScreenProps } from "@navigation/types";
import { useTasks } from "./store";
import { getFakeDataMap } from "./utils";

export default ({ navigation }: TasksTabScreenProps<"List">) => {
  const { tasks, updateTasks } = useTasks();
  const [isDemo, changePreviewDataStatus] = useState(false);

  const handleChangePreviewStatus = useCallback(
    (value: boolean) => {
      changePreviewDataStatus(value);
    },
    [changePreviewDataStatus]
  );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Switch size="sm" ml="6" onValueChange={handleChangePreviewStatus} />
      ),
    });
    updateTasks(getFakeDataMap());
  }, []);

  const handleGoToDetail = useCallback(
    ({ uuid }: IAnyTask) => {
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
                <BaseShortTask item={item} backgroundColor="white" />
              </Pressable>
            )}
            keyExtractor={(item) => item.uuid}
          />
        </>
      )}
    </SafeAreaView>
  );
};
