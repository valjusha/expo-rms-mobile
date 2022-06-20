import { uuidRandom } from "@utils/uuidRandom";
import {
  IAnyTypeTask,
  IMultiTripTask,
  ISingleTripTask,
  ISpecialTask,
  IStaticTask,
} from "./types";

const specials: ISpecialTask[] = [
  {
    uuid: uuidRandom(),
    representationType: "special",
    type: "ИНСТРУКТАЖ",
    // todo ?? почему мы не показываем это поля в "требованиях" в детальном описании задачи (Информация о задаче)
    requirementDescription: "ИНСТРУКТАЖ SB_RAMP_БАЗА_D",
    status: "Назначена",
    position: {
      starting: "База Аэромаш_АБ Термин...",
    },
    remark: "SB_УС_10:00-22:00",
    workingDate: ["08:55", "09:10"],
  },
  {
    uuid: uuidRandom(),
    representationType: "special",
    type: "Перерыв",
    requirementDescription: "Перерыв БАЗА_ОП_СТК",
    status: "Назначена",
    remark: "SB_YC_10:00-22:00 ????",
    position: {
      starting: "База Аэромаш_АБ Термин...",
    },
    workingDate: ["12:40", "13:15"],
  },
];

/*
 */

const singles: ISingleTripTask[] = [
  {
    uuid: uuidRandom(),
    representationType: "single",
    requirementDescription: "Сопровождение оружия по прилету",
    status: "Посадка начата",
    workingDate: ["09:29", "12:10"],
    scheduledTime: ["09:30", "09:25"],
    flightDirection: "arrival",
    remark: "1-й автобус",
    rylez: "Авт.Пас.1",
    assignedPosition: "105W - КПП_1Б",
    taskStatus: "На МС",
    MC_time: "09:27",
    position: {
      starting: "105W",
      final: "КПП_1Б",
    },
    arrivalFlight: {
      uuid: uuidRandom(),
      aircraftType: "FV",
      side: 6254,
      time: "09:27",
      airportCode: "GOJ",
      airportCity: "Н.Новгород",
      MC: "105W",
      exit: "BG111",
      terminal: "B",
      VC: "32A",
      PASS: "73766",
      TGOgate: "00:00",
      TGOlanding: "00:00",
      hasWeapons: true,
    },
    departureFlight: {
      uuid: uuidRandom(),
      aircraftType: "SU",
      side: 1357,
      time: "12:36 A???3",
      airportCode: "GSV",
      MC: "115",
      exit: "BG111",
      terminal: "B",
      VC: "32A",
      PASS: "73766",
      TGOgate: "00:00",
      TGOlanding: "00:00",
      hasWeapons: true,
    },
  },
  {
    uuid: uuidRandom(),
    representationType: "single",
    requirementDescription: "Инспектор 4 досм салона ВС",
    status: "Назначена",
    workingDate: ["14:41", "14:55"],
    scheduledTime: ["15:00"],
    flightDirection: "departure",
    remark: "1-й автобус",
    rylez: "Авт.Пас.1",
    assignedPosition: "105W - КПП_1Б",
    taskStatus: "Расчет",
    position: {
      starting: "T37",
      final: "GTB-BGA1",
    },
    arrivalFlight: {
      uuid: uuidRandom(),
      aircraftType: "FV",
      side: 6478,
      time: "12:49A???3",
      airportCode: "MMK",
      airportCity: "Мурманск",
      MC: "108E",
      exit: "BGA1",
      terminal: "B",
      VC: "SU9",
      PASS: "89130",
      TGOgate: "00:00",
      TGOlanding: "00:00",
      hasWeapons: false,
    },
    departureFlight: {
      uuid: uuidRandom(),
      aircraftType: "SU",
      side: 1231,
      time: "15:00",
      airportCode: "UFA",
      airportCity: "Уфа",
      MC: "137",
      exit: "BG111",
      terminal: "B",
      VC: "32A",
      PASS: "73766",
      TGOgate: "00:01",
      TGOlanding: "00:02",
      hasWeapons: true,
    },
  },
];

const multies: IMultiTripTask[] = [
  {
    uuid: uuidRandom(),
    representationType: "multi",
    requirementDescription: "Комплектовка RAMP",
    status: "назначена",
    workingDate: ["00:00", "00:00"],
    type: "Карусель B6",
    flights: [
      {
        uuid: uuidRandom(),
        aircraftType: "SU",
        side: 1710,
        time: "17:15S ???3",
        airportCode: "KHV",
        terminal: "B",
      },
    ],
  },
  {
    uuid: uuidRandom(),
    whoAmI: "B6_SORT ???2",
    representationType: "multi",
    requirementDescription: "Комплектовка RAMP",
    status: "назначена",
    workingDate: ["00:00", "00:00"],
    type: "Карусель B6",
    flights: [
      {
        uuid: uuidRandom(),
        aircraftType: "SU",
        side: 1882,
        time: "21:40S ???3",
        airportCode: "FRU",
        terminal: "B",
      },
      {
        uuid: uuidRandom(),
        aircraftType: "SU",
        side: 1870,
        time: "19:45S ???3",
        airportCode: "TAS",
        terminal: "B",
      },
    ],
  },
];

const statics: IStaticTask[] = [
  {
    uuid: uuidRandom(),
    status: "назначена",
    representationType: "static",
    type: "SECUTIRY",
    requirementDescription: "Инспектор ПД",
    // todo ??? .final requirement?
    position: {
      starting: "ПД вход (под 3 интроскоп...",
    },
    workingDate: ["00:00", "00:00"],
    whoAmI: "В1_ПД_BX3 ???1",
  },
];

const fakeData = [
  // specials[0],
  singles[0],
  specials[1],
  singles[1],
  // multies[0],
  // statics[0],
  // multies[1],
];

export const getFakeDataMap = (): [string, IAnyTypeTask][] =>
  fakeData.map((task) => [task.uuid, task]);
