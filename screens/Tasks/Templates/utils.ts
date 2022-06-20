import { ISingleTripTask } from "../types";

export const getFlightFromDirection = (task: ISingleTripTask) =>
  task.flightDirection === "arrival"
    ? task.arrivalFlight
    : task.departureFlight;
