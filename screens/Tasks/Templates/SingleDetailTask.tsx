import { DataListBox } from "@components/DataListBox";
import { format } from "date-fns";
import { HStack, Spacer, Text, VStack } from "native-base";
import { IFlight, ISingleTripTask } from "../types";
import { getFlightFromDirection } from "./utils";

export interface SingleDetailTaskProps {
  task: ISingleTripTask;
}

export const SingleTask = ({ task }: SingleDetailTaskProps) => {
  const { VC, MC, side, exit } = getFlightFromDirection(task);
  const { scheduledTime, MC_time } = task;

  return (
    <VStack flex="1" flexDirection="row" m={3}>
      <VStack>
        {VC && <TextLine title="ВС" value={VC} />}
        {MC && <TextLine title="МС" value={MC} />}
      </VStack>
      <Spacer />
      <VStack>
        {side && <TextLine title="Борт №" value={side} />}
        {exit && <TextLine title="Выход" value={exit} />}
      </VStack>
      <Spacer />
      {scheduledTime && (
        <VStack>
          {scheduledTime[0] && (
            <TextLine title="План." value={scheduledTime[0]} />
          )}
          {scheduledTime[1] && (
            <TextLine title="Расч." value={scheduledTime[1]} />
          )}
          {MC_time && (
            <TextLine title="На МС" value={MC_time} />
          )}
        </VStack>
      )}
    </VStack>
  );
};

interface TextLineProps {
  title: string;
  value: string | number;
}

export const TextLine = ({ title, value }: TextLineProps) => (
  <HStack space={2}>
    <Text mt="2" fontSize="sm" color="coolGray.500">
      {title}
    </Text>
    <Spacer />
    <Text mt="2" fontSize="sm" color="coolGray.700">
      {value}
    </Text>
  </HStack>
);

export const SingleDetailTask = ({
  task: {
    requirementDescription,
    remark = "",
    workingDate,
    position,
    arrivalFlight,
    departureFlight,
  },
}: SingleDetailTaskProps) => (
  <>
    <DataListBox
      title="Информация о задаче"
      data={[
        ["Требование", requirementDescription],
        ["Ремарка", remark],
        ["Время начала", workingDate[0]],
        ["Время окончания", workingDate[1]],
        ["Начальная позиция", position?.starting || ""],
        ["Конечная позиция", position?.final || ""],
      ]}
    />
    <FlightDetail titleBox="Детали прилетного рейса" flight={arrivalFlight} />
    <FlightDetail titleBox="Детали вылетного рейса" flight={departureFlight} />
  </>
);

interface FlightDetailProps {
  titleBox: string;
  flight: IFlight;
}

const FlightDetail = ({
  titleBox,
  flight: {
    aircraftType,
    side,
    MC = "",
    exit = "",
    time,
    terminal,
    airportCode,
    airportCity,
    VC = "",
    PASS = "",
    TGOgate,
    TGOlanding,
    hasWeapons,
    hasLandingAeromar,
    cargoInspected,
  },
}: FlightDetailProps) => {
  return (
    <DataListBox
      title={titleBox}
      data={[
        ["Рейс", `${aircraftType} ${side}`],
        ["МС", MC],
        ["Выход", exit],
        ["Время рейса", time],
        ["Терминал", terminal],
        ["Маршрут", `${airportCode} ${airportCity ? " / " + airportCity : ""}`],
        ["ВС тип / Борт №", `${VC} ${PASS}`],
        ["ПАС", PASS],
        ["ТГО посадка гейт", TGOgate ? TGOgate : ""],
        ["ТГО посадка ВС", TGOlanding ? TGOlanding : ""],
        ["Оружие на рейсе", getValueByBoolean(hasWeapons)],
        ["Посадка с Аэромар", getValueByBoolean(hasLandingAeromar)],
        ["Груз досмотрен", getValueByBoolean(cargoInspected)],
      ]}
    />
  );
};

const getValueByBoolean = (value: boolean | undefined) => {
  if (typeof value === "undefined") return "";
  return value ? "1" : "0";
};
