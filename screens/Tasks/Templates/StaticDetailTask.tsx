import { DataListBox } from "@components/DataListBox";
import { format } from "date-fns";
import { Heading, HStack, Text, VStack } from "native-base";
import { IStaticTask } from "../types";
import { TextLine } from "./SingleDetailTask";

export interface StaticDetailTaskProps {
  task: IStaticTask;
}
export const StaticTask = ({
  task: { type, position, workingDate },
}: StaticDetailTaskProps) => (
  <VStack flex="1" m={3}>
    {type && <Heading size="md">{type}</Heading>}
    <TextLine title="Позиция" value={position.starting} />
    <TextLine title="Время начала" value={workingDate[0]} />
    <TextLine title="Время окончания" value={workingDate[1]} />
  </VStack>
);

export const StaticDetailTask = ({
  task: { type, requirementDescription, remark },
}: StaticDetailTaskProps) => (
  <DataListBox
    title="Информация о задаче"
    data={[
      ["Тип задачи", type || ""],
      ["Требование", requirementDescription],
      ["Ремарка", remark || ""],
    ]}
  />
);
