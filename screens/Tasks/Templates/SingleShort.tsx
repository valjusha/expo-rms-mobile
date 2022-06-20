import { Badge, HStack, Icon, Text, VStack } from "native-base";
import { Entypo } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
import { ISingleTripTask } from "../types";

export interface SingleShortProps {
  task: ISingleTripTask;
  backgroundColor?: string;
}

export const SingleShort = ({ task, backgroundColor }: SingleShortProps) => {
  const { flightDirection, rylez, position, taskStatus, status, workingDate, remark } = task;
  const flight =
    flightDirection === "arrival" ? task.arrivalFlight : task.departureFlight;

  return (
    <HStack
      space={2}
      p="4"
      backgroundColor={backgroundColor}
      borderBottomColor="gray.400"
      borderBottomWidth="1"
      flexWrap="wrap"
    >
      <VStack
        mr={5}
        direction="column"
        space={1}
        justifyContent="center"
        alignItems="center"
        width={10}
      >
        <Icon
          color={flightDirection == "arrival" ? "info.600" : "info.700"}
          as={Entypo}
          name={
            flightDirection == "arrival"
              ? "aircraft-landing"
              : "aircraft-take-off"
          }
          size="lg"
        />
        {flight?.MC && <Text>{flight.MC}</Text>}
        <Text>(B)</Text>
      </VStack>
      <VStack flex={1}>
        <Text bold>{`${flight.aircraftType} ${flight.side} ${flight.time} ${flight.airportCode}`}</Text>
        <Text bold>{`${position?.starting} - ${position?.final}`}</Text>
        <Text>{`${workingDate[0]} — ${workingDate[1]}`}</Text>
        {rylez && <Text>{rylez}</Text>}
        {flight?.airportCity && (
          <Text color="gray.600">{`${flight.airportCity} / Россия`}</Text>
        )}
      </VStack>
      <VStack style={styles.info} space={1}>
        <Text bold mb="auto">
          B
        </Text>
        <Text>{status}</Text>
        <Badge colorScheme="info" variant="solid">
          {taskStatus}
        </Badge>
        {remark && <Text bold>{remark}</Text>}
      </VStack>
    </HStack>
  );
};

const styles = StyleSheet.create({
  info: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
  },
});
