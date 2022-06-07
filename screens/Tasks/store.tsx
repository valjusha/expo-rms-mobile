import { createContext, useCallback, useContext, useState } from "react";
import { IAnyTask } from "./types";

export interface ITaskContext {
  tasks: ReadonlyMap<string, IAnyTask>;
  updateTasks(task: IAnyTask): void;
  updateTasks(data: [string, IAnyTask][]): void;
}

export const TaskContext = createContext<ITaskContext | null>(null);

const TaskProvider: React.FC<React.ReactNode> = ({ children }) => {
  const [tasks, upTasks] = useState(new Map<string, IAnyTask>());

  const updateTasks = useCallback(
    (data: [string, IAnyTask][] | IAnyTask) => {
      if (Array.isArray(data)) {
        upTasks((prev) => new Map([...prev, ...data]));
      } else {
        upTasks(new Map(tasks.set(data.uuid, data)));
      }
    },
    [tasks]
  );

  return (
    <TaskContext.Provider value={{ tasks, updateTasks }} children={children} />
  );
};

export function useTasks() {
  const context = useContext(TaskContext) as ITaskContext;

  if (context == undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  return context;
}

export default TaskProvider;
