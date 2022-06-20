export type TaskParamProps = {
  uuid: string;
};

export type IAnyTypeTask =
  // | IStaticTask
  | ISpecialTask
  | ISingleTripTask
  // | IMultiTripTask
  ;

export enum RepresentationTypeTask {
  STATIC = "static",
  SPECIAL = "special",
  SINGLE = "single",
  MULTI = "multi",
}

export interface ITask {
  uuid: string;

  // статус задачи
  status: string;
  // enum RepresentationTypeTask
  representationType: string;

  /**
   * Информация о задаче
   */
  // тип задачи
  type?: string;
  // (требование) тип задачи (что нужно сделать, указывается в заголовке)
  requirementDescription: string;
  // ремарка
  remark?: string;
  // время начала/окончания задачи
  workingDate: [string, string];
  // (начальная/конечная позиция)
  position?: ITaskPosition;
}

interface ITaskPosition {
  starting: string;
  final?: string;
}

export interface IStaticTask extends ITask {
  representationType: "static";

  // начальная позиция задачи
  position: ITaskPosition;
  // описание требования задачи
  requirements?: string[];
  // плановое время начала/окончания задачи
  scheduledTime?: [string, string];

  whoAmI?: string; // ????
}

export interface ISpecialTask extends ITask {
  representationType: "special";

  requirement?: string[];
  remark?: string;
}

export interface ISingleTripTask extends ITask {
  representationType: "single";
  
  flightDirection: "arrival" | "departure";
  // плановое время начала/окончания задачи
  scheduledTime?: [string, string?];

  // детали прилетного рейса
  arrivalFlight: IFlight;
  // детали вылетного рейса
  departureFlight: IFlight;
  /**
   * dodo
   */
  rylez?: string;
  assignedPosition: string;
  taskStatus: string;
  MC_time?: string;
}

export interface IMultiTripTask extends ITask {
  representationType: "multi";
  flights: IFlight[];
  whoAmI?: string; // ????
}

// данные рейса для мультирейсовых задач:
export interface IFlight {
  uuid: string;

  // MC
  MC?: string;
  // тип ВС
  aircraftType: string;
  // бортовой номер №
  side: number;
  // время рейса
  // todo что за буква на конце?
  time: string;
  // маршрут
  airportCode: string;
  airportCity?: string;
  // выход
  exit?: string;
  // терминал
  terminal: "B" | "C" | "E" | "F"; // enum ??

  // ВС тип
  // todo наверное это какие то отдельные справочники к рейсу [key, value]
  VC?: string;
  // ПАС
  PASS?: string;
  // ТГО посадка гейт
  TGOgate?: string;
  // ТГО посадка ВС
  TGOlanding?: string;
  // Оружие на рейсе
  hasWeapons?: boolean;
  // посадка с Аэромар
  hasLandingAeromar?: boolean;
  // груз досмотрен
  cargoInspected?: boolean;
}
