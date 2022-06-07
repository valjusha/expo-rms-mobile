import { View } from "native-base";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { DataListBox } from "@components/DataListBox";
import { TasksTabScreenProps } from "@navigation/types";
import { useTasks } from "./store";
import { useMemo } from "react";

const iconMap: { [key: string]: any } = {
  static: {
    as: FontAwesome5,
    name: "tasks",
  },
  "one-trip": {
    as: FontAwesome5,
    name: "tasks",
  },
  "multi-trip": {
    as: MaterialIcons,
    name: "multiple-stop",
  },
  "coffee-break": {
    as: MaterialIcons,
    name: "free-breakfast",
  },
};

export default ({ route }: TasksTabScreenProps<"Detail">) => {
  const { uuid } = route.params;
  const { tasks } = useTasks();
  const detail = useMemo(() => tasks.get(uuid), [uuid]);

  console.log(detail);
  return (
    <View>
      <DataListBox
        title="Информация о задаче"
        data={[["Тип задачи", detail!.typeTask]]}
      />
    </View>
  );
};
