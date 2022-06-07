import {
  Badge,
  Box,
  Divider,
  HStack,
  Icon,
  Spacer,
  Text,
  View,
  VStack,
} from "native-base";
import {
  IAnyTask,
  IMultiTripTask,
  ISingleTripTask,
  ISpecialTask,
  IStaticTask,
  ITask,
} from "./types";
import { format } from "date-fns";
import { StyleSheet } from "react-native";

interface BaseShortTaskProps {
  item: IAnyTask;
  backgroundColor?: string;
}

export const BaseShortTask = ({
  item: { type, title, workingDate, status },
  backgroundColor = undefined,
}: BaseShortTaskProps) => (
  <HStack
    space={2}
    p="2.5"
    backgroundColor={backgroundColor}
    justifyContent="flex-start"
    alignItems="center"
  >
    <Box style={styles.type}>
      <Badge variant="outline">{type}</Badge>
    </Box>
    <Divider thickness="2" mx="2" orientation="vertical" />
    <VStack>
      <Text>{title}</Text>
      <Text>
        {format(workingDate[0], "hh:mm")}
        {" - "}
        {format(workingDate[1], "hh:mm")}
      </Text>
      <Spacer />
    </VStack>
    <Spacer />
    <Badge colorScheme="info" variant="solid">
      {status}
    </Badge>
  </HStack>
);

const styles = StyleSheet.create({
  type: {
    minWidth: "72px",
    alignItems: "center",
  },
});

export const StaticShortTask = ({}: IStaticTask) => (
  <Box>
    <VStack space={4}>
      <Badge variant="outline"></Badge>
    </VStack>
  </Box>
);

/*
export const SpecialShortTask = ({}: ISpecialTask) => ();

export const SingleShortTask = ({}: ISingleTripTask) => ();

export const MultiShortTask = ({}: IMultiTripTask) => ();
*/
