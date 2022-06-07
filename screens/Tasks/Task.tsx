import {
  Box,
  Center,
  Divider,
  HStack,
  Icon,
  Pressable,
  Spacer,
  Text,
  View,
  VStack,
} from "native-base";
import { MaterialIcons, FontAwesome5 } from "@expo/vector-icons";
import { BaseShortTask } from "./Template";
import { IAnyTask, ISpecialTask } from "./types";
import { format } from "date-fns";
import { useCallback, useEffect, useMemo, useState } from "react";
import { AntDesign } from "@expo/vector-icons";
import { TasksTabScreenProps } from "@navigation/types";
import { useTasks } from "./store";

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
    <View>
      <BaseShortTask item={detail} />
      <Divider />
      <Pressable
        onPress={() => {
          handleGoToDetailInformationTask();
        }}
      >
        <StrategyTemplate item={detail} />
      </Pressable>
    </View>
  );
};

type StrategyTemplateProps = {
  item: IAnyTask;
};

const StrategyTemplate = ({ item }: StrategyTemplateProps) => (
  <HStack backgroundColor="white" alignItems="center" space={2}>
    {strategyRenderTemplate(item)}
    <Icon color="info.800" as={AntDesign} name="doubleright" size="md" />
  </HStack>
);

const strategyRenderTemplate = (data: IAnyTask) => {
  switch (data.type) {
    case "special":
      return <SpecialTaskTemplate {...data} />;
    case "multi":
    case "single":
    case "static":
    default:
      return null;
  }
};

const SpecialTaskTemplate = ({
  typeTask,
  workingDate,
  remark,
}: ISpecialTask) => (
  <VStack flex="1">
    <HStack space={2}>
      <Text mt="2" fontSize="sm" color="coolGray.500">
        Позиция
      </Text>
      <Spacer />
      <Text mt="2" fontSize="sm" color="coolGray.700">
        {typeTask}
      </Text>
    </HStack>
    <HStack space={2}>
      <Text mt="2" fontSize="sm" color="coolGray.500">
        Время начала
      </Text>
      <Spacer />
      <Text mt="2" fontSize="sm" color="coolGray.700">
        {format(workingDate[0], "hh:mm")}
      </Text>
    </HStack>
    <HStack space={2}>
      <Text mt="2" fontSize="sm" color="coolGray.500">
        Время окончания
      </Text>
      <Spacer />
      <Text mt="2" fontSize="sm" color="coolGray.700">
        {format(workingDate[1], "hh:mm")}
      </Text>
    </HStack>
    {remark && (
      <HStack space={2}>
        <Text mt="2" fontSize="sm" color="coolGray.500">
          Ремарка
        </Text>
        <Spacer />
        <Text mt="2" fontSize="sm" color="coolGray.700">
          {remark}
        </Text>
      </HStack>
    )}
  </VStack>
);
