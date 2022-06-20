import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Icon,
  Pressable,
  Spacer,
  Text,
  View,
  VStack,
} from "native-base";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { IAnyTypeTask, ISpecialTask } from "./types";
import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { TasksTabScreenProps } from "@navigation/types";
import { useTasks } from "./store";
import {
  MultiTripTask,
  ShortTask,
  SingleTask,
  SpecialTask,
  StaticTask,
} from "./Templates";
import { SingleShort } from "./Templates/SingleShort";
import { SpecialShort } from "./Templates/SpecialShort";
import { StateTask } from "./Templates/StateTask";

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

export default ({ route, navigation }: TasksTabScreenProps<"Task">) => {
  const { uuid } = route.params;
  const { tasks } = useTasks();
  const detail = useMemo(() => tasks.get(uuid), [uuid]);

  const handleGoToDetailInformationTask = useCallback(() => {
    navigation.navigate("Detail", { uuid });
  }, [uuid]);

  return !detail ? null : (
    <View flex={1}>
      <Box>
        {detail.representationType == "single" && (
          <SingleShort task={detail} backgroundColor="transparent" />
        )}
        {detail.representationType == "special" && (
          <SpecialShort
            task={detail}
            numberOfLines={1}
            backgroundColor="transparent"
          />
        )}
      </Box>
      <Divider />

      <Pressable
        onPress={() => {
          handleGoToDetailInformationTask();
        }}
      >
        <StrategyTemplate item={detail} />
      </Pressable>

      <Center mt="auto" backgroundColor="white" p={3} pb={5}>
        <StateTask task={detail} />
      </Center>
    </View>
  );
};

type StrategyTemplateProps = {
  item: IAnyTypeTask;
};

const StrategyTemplate = ({ item }: StrategyTemplateProps) => (
  <HStack backgroundColor="white" alignItems="center" space={2}>
    {strategyRenderTemplate(item)}
    <Icon color="info.800" as={AntDesign} name="doubleright" size="md" />
  </HStack>
);

const strategyRenderTemplate = (data: IAnyTypeTask) => {
  switch (data.representationType) {
    case "special":
      return <SpecialTask task={data} />;
    // case "multi":
    //   return <MultiTripTask task={data} />;
    case "single":
      return <SingleTask task={data} />;
    // case "static":
    //   return <StaticTask task={data} />;
    default:
      return null;
  }
};
