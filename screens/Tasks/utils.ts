import { uuidRandom } from "@utils/uuidRandom";
import { IAnyTask } from "./types";

export const getFakeDataMap = (): [string, IAnyTask][] =>
  fakeData().map((task) => [task.uuid, task]);

export const fakeData: () => Array<IAnyTask> = () => [
  {
    uuid: uuidRandom(),
    type: "special",
    typeTask: "ИНСТРУКТАЖ",
    title: "ИНСТРУКТАЖ SB_RAMP_БАЗА_D",
    status: "назначена",
    position: "позиция",
    remark: "SB_УС_10:00-22:00",
    workingDate: [new Date(), new Date()],
  },
  {
    uuid: uuidRandom(),
    type: "single",
    typeTask: "Сопровождение оружия по прилету",
    title: "Сопровождение оружия по прилету",
    status: "назначена",
    workingDate: [new Date(), new Date()],
    MC: "114",
  },
  {
    uuid: uuidRandom(),
    type: "special",
    typeTask: "Перерыв",
    title: "Перерыв SB_RAMP_БАЗА_D",
    status: "назначена",
    position: "позиция",
    workingDate: [new Date(), new Date()],
  },
  {
    uuid: uuidRandom(),
    type: "single",
    title: "Инспектор 4 досм салона ВС",
    status: "назначена",
    workingDate: [new Date(), new Date()],
    typeTask: "???",
    MC: "333",
  },
  {
    uuid: uuidRandom(),
    type: "multi",
    title: "Комплектовка RAMP",
    status: "назначена",
    workingDate: [new Date(), new Date()],
    typeTask: "Карусель B6",
    subTask: ["subTask???"],
  },
  {
    uuid: uuidRandom(),
    type: "static",
    title: "Инспектор ПД",
    status: "назначена",
    workingDate: [new Date(), new Date()],
    typeTask: "SECURITY",
  },
  {
    uuid: uuidRandom(),
    type: "multi",
    title: "",
    status: "назначена",
    workingDate: [new Date(), new Date()],
    typeTask: "Карусель B6",
    subTask: ["subTask???", "subTask???"],
  },
];
