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
import { ISpecialTask } from "../types";
import { Feather } from "@expo/vector-icons";
import { getFlightFromDirection } from "./utils";
import { DataListBox } from "@components/DataListBox";
import { StyleSheet } from "react-native";

interface SpecialShortProps {
  task: ISpecialTask;
  backgroundColor?: string;
  numberOfLines?: number;
}

export const SpecialShort = ({ task, backgroundColor }: SpecialShortProps) => {
  const { type, requirementDescription, workingDate, status } = task;

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
          <Text>
            {workingDate[0]}
            {" — "}
            {workingDate[1]}
          </Text>
        </Flex>
      </VStack>
      <VStack style={styles.info} space={1}>
        <Text>{status}</Text>
      </VStack>
    </HStack>
  );
};

const styles = StyleSheet.create({
  info: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
