import { Button } from "native-base";
import { IAnyTypeTask } from "../types";

interface StateTaskProps {
  task: IAnyTypeTask;
}

const singleWorkFlow = [
  "Начать",
  "Посадка начата",
  "Посадка закончена",
  "Прибытие на МС/Гейт",
  "Высадка PAX",
  "Закончить",
];
const specialWorkFlow = ["Принять", "Начать", "Закончить"];

const getNextStep = (arr: string[], curr: string) => {
  const index = arr.indexOf(curr);

  if (index < 0) return undefined;

  return arr[index + 1];
};

export const StateTask = ({ task }: StateTaskProps) => {
  const { status, representationType } = task;

  const text =
    representationType == "single"
      ? getNextStep(singleWorkFlow, status) || "Принять"
      : getNextStep(specialWorkFlow, status) || "Принять";

  return (
    <Button size="sm" color="white">
      {text}
    </Button>
  );
};
