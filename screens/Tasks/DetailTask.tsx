import { ScrollView, View } from "native-base";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { DataListBox } from "@components/DataListBox";
import { TasksTabScreenProps } from "@navigation/types";
import { useTasks } from "./store";
import { useMemo } from "react";
import {
  MultiTripDetailTask,
  SingleDetailTask,
  SpecialDetailTask,
  StaticDetailTask,
} from "./Templates";
import { IAnyTypeTask } from "./types";

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

  return !detail ? null : (
    <ScrollView>{strategyRenderTemplate(detail)}</ScrollView>
  );
};

const strategyRenderTemplate = (task: IAnyTypeTask) => {
  switch (task.representationType) {
    case "multi":
      return <MultiTripDetailTask task={task} />;
    case "single":
      return <SingleDetailTask task={task} />;
    case "special":
      return <SpecialDetailTask task={task} />;
    case "static":
      return <StaticDetailTask task={task} />;
    default:
      return null;
  }
};
