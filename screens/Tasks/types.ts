export type TaskParamProps = {
  uuid: string;
};

export type IAnyTask = IStaticTask | ISpecialTask | ISingleTripTask | IMultiTripTask;

export interface ITask {
  uuid: string;
  type: string;
  title: string;
  status: string;
  workingDate: [Date, Date];
}

export enum TaskType {
  STATIC = "static",
  SPECIAL = "special",
  SINGLE = "single",
  MULTI = "multi",
}

export interface IStaticTask extends ITask {
  type: "static";
  typeTask: string;
}

export interface ISpecialTask extends ITask {
  type: "special";
  typeTask: string;
  position: string;
  requirement?: string[];
  remark?: string;
}

export interface ISingleTripTask extends ITask {
  type: "single";
  typeTask: string;
  MC: string;
}

export interface IMultiTripTask extends ITask {
  type: "multi";
  typeTask: string;
  subTask: string[];
}
