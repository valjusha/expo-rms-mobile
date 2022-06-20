import { createContext, useCallback, useContext, useState } from "react";
import { IAnyTypeTask } from "./types";

export interface ITasksContext {
  tasks: ReadonlyMap<string, IAnyTypeTask>;
  updateTasks(task: IAnyTypeTask): void;
  updateTasks(data: [string, IAnyTypeTask][]): void;
}

export const TaskContext = createContext<ITasksContext | null>(null);

type InitialProps = {
  initialTasks?: [string, IAnyTypeTask][];
};

const TasksProvider: React.FC<InitialProps> = ({ initialTasks, children }) => {
  const [tasks, upTasks] = useState(
    new Map<string, IAnyTypeTask>(initialTasks)
  );

  const updateTasks = useCallback(
    (data: [string, IAnyTypeTask][] | IAnyTypeTask) => {
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
  const context = useContext(TaskContext) as ITasksContext;

  if (context == undefined) {
    throw new Error("useTasks must be used within a TaskProvider");
  }

  return context;
}

export default TasksProvider;
