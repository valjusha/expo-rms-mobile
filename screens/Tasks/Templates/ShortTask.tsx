import React from "react";
import {
  Badge,
  Heading,
  HStack,
  Text,
  Flex,
  VStack,
  Box,
  Icon,
} from "native-base";
import { IAnyTypeTask, ISingleTripTask } from "../types";
import { Feather } from "@expo/vector-icons";
import { getFlightFromDirection } from "./utils";
import { DataListBox } from "@components/DataListBox";

interface ShortTaskProps {
  task: IAnyTypeTask;
  backgroundColor?: string;
  numberOfLines?: number;
}

export const ShortTask = ({
  task,
  backgroundColor,
  numberOfLines,
}: ShortTaskProps) => {
  const { requirementDescription, workingDate, status, representationType } =
    task;

  return (
    <HStack
      space={2}
      p="4"
      backgroundColor={backgroundColor}
      borderBottomColor="gray.400"
      borderBottomWidth="1"
      flexWrap="wrap"
    >
      <VStack
        mr={5}
        direction="column"
        space={1}
        justifyContent="center"
        alignItems="center"
        width={10}
      >
        <Icon as={Feather} name="coffee" size="lg" />
      </VStack>
      <VStack flex={1}>
        <Text bold>{requirementDescription}</Text>
        <Flex
          direction="row"
          flex={1}
          justifyContent="space-between"
          alignItems="flex-end"
          mt="2"
        >
          <Flex direction="column">
            {representationType === "single" && !!task.position && (
              <Text>
                {task.position.starting}
                {" → "}
                {task.position.final || task.position.starting}
              </Text>
            )}
            <Text>
              {workingDate[0]}
              {" — "}
              {workingDate[1]}
            </Text>
            {representationType === "single" && (
              <Text color="gray.400">{`${task.arrivalFlight.MC} ${task.arrivalFlight.side} ${task.arrivalFlight.time} ${task.arrivalFlight.airportCode}`}</Text>
            )}
          </Flex>
          <Badge colorScheme="info" variant="solid">
            {status}
          </Badge>
        </Flex>
      </VStack>
    </HStack>
  );
};

interface BadgeTerminalProps {
  task: ISingleTripTask;
}

const BadgeTerminal = ({ task }: BadgeTerminalProps) => {
  const value = getFlightFromDirection(task).terminal ?? null;

  return value ? (
    <Badge colorSchema="info" alignSelf="center" variant="outline">
      {value}
    </Badge>
  ) : null;
};

const BadgeMC = ({ task }: BadgeTerminalProps) => {
  const value = getFlightFromDirection(task).MC ?? null;
  return value ? (
    <Badge colorSchema="info" alignSelf="center" variant="outline">
      {value}
    </Badge>
  ) : null;
};

export const DetailTask = ({ task }: ShortTaskProps) => (
  <DataListBox title="Информация о задаче" data={[]} />
);
