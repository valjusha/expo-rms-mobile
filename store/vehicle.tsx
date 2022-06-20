/**
 * Стора для хранения транспортного средства
 */

import React, { createContext, useCallback, useContext, useState } from "react";

const responseData = [
  "Cobus 2-16",
  "Cobus 2-28",
  "Cobus 2-31",
  "Cobus 2-33",
  "Cobus 2-60",
  "Neoplan 335",
  "Neoplan 421",
  "Neoplan 782",
];

const groupByFirstLetter = (arr: string[]) => {
  const result: { [key: string]: string[] } = {};
  for (let index = 0; index < arr.length; index++) {
    const element = arr[index];
    const firstLetter = element[0];

    if (!result[firstLetter]) {
      result[firstLetter] = [];
    }

    if (result[firstLetter].indexOf(element) < 0) {
      result[firstLetter].push(element);
    }
  }
  return Object.entries(result).map(([key, value]) => ({
    title: key,
    data: value,
  }));
};

interface IVehicleData {
  title: string;
  data: string[];
}

type IVehicle = string;

export interface IVehicleContext {
  list: IVehicleData[];
  current: IVehicle | null;
  choiceVehicle: (value: string) => void;
  resetVehicle: () => void;
}

export const VehicleContext = createContext<IVehicleContext | null>(null);

export const VehicleProvider: React.FC = ({ children }) => {
  const [list] = useState<IVehicleData[]>(groupByFirstLetter(responseData));
  const [current, setCurrent] = useState<IVehicle | null>(null);

  const choiceVehicle = useCallback(
    (value: string) => {
      setCurrent(value);
    },
    [list]
  );

  const resetVehicle = useCallback(() => setCurrent(null), []);

  return (
    <VehicleContext.Provider
      value={{ list, current, choiceVehicle, resetVehicle }}
      children={children}
    />
  );
};

export const useVehicle = () => {
  const context = useContext(VehicleContext) as IVehicleContext;

  if (context == undefined) {
    throw new Error("useVehicle must be used within a VehicleProvider");
  }

  return context;
};
