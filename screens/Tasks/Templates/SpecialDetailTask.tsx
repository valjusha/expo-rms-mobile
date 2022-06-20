import { DataListBox } from "@components/DataListBox";
import { format } from "date-fns";
import { HStack, Spacer, Text, VStack } from "native-base";
import { ISpecialTask } from "../types";

export interface SpecialDetailTaskProps {
  task: ISpecialTask;
}
export const SpecialTask = ({
  task: { type, workingDate, remark },
}: SpecialDetailTaskProps) => (
  <VStack flex="1">
    <HStack space={2}>
      <Text mt="2" fontSize="sm" color="coolGray.500">
        Позиция
      </Text>
      <Spacer />
      <Text mt="2" fontSize="sm" color="coolGray.700">
        {type}
      </Text>
    </HStack>
    <HStack space={2}>
      <Text mt="2" fontSize="sm" color="coolGray.500">
        Время начала
      </Text>
      <Spacer />
      <Text mt="2" fontSize="sm" color="coolGray.700">
        {workingDate[0]}
      </Text>
    </HStack>
    <HStack space={2}>
      <Text mt="2" fontSize="sm" color="coolGray.500">
        Время окончания
      </Text>
      <Spacer />
      <Text mt="2" fontSize="sm" color="coolGray.700">
        {workingDate[1]}
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

export const SpecialDetailTask = ({
  task: { type, remark },
}: SpecialDetailTaskProps) => (
  <DataListBox
    title="Информация о задаче"
    data={[
      ["Тип задачи", type || ""],
      ["Требование", ""],
      ["Ремарка", remark || ""],
    ]}
  />
);
