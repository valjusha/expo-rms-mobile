import { DataListBox } from "@components/DataListBox";
import { Heading, HStack, Spacer, Text, VStack } from "native-base";
import { IMultiTripTask } from "../types";

export interface MultiTripDetailTaskProps {
  task: IMultiTripTask;
}

export const MultiTripTask = ({
  task: { type, flights },
}: MultiTripDetailTaskProps) => (
  <VStack flex="1" m={3}>
    <Heading size="md">{type}</Heading>
    {flights.map((flight) => (
      <HStack space={2} key={flight.uuid}>
        <Text mt="2" fontSize="sm" color="coolGray.700">
          {flight.aircraftType} {flight.side}
        </Text>
        <Spacer />
        <Text mt="2" fontSize="sm" color="coolGray.500">
          {flight.time}
        </Text>
        <Spacer />
        <Text mt="2" fontSize="sm" color="coolGray.700">
          {flight.airportCode}
        </Text>
      </HStack>
    ))}
  </VStack>
);

export const MultiTripDetailTask = ({
  task: { type, requirementDescription, remark },
}: MultiTripDetailTaskProps) => (
  <DataListBox
    title="Информация о задаче"
    data={[
      ["Тип задачи", type || ""],
      ["Требование", requirementDescription],
      ["Ремарка", remark || ""],
    ]}
  />
);
