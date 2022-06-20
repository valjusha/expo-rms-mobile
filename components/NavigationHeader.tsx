import { useVehicle } from "@store/vehicle";
import { Center, Heading, Text } from "native-base";
import React from "react";

export const NavigationHeader: React.FC = ({ children }) => {
  const { current } = useVehicle();
  const title = `Вознюк В.В.${current ? " / " + current : ""}`;

  return (
    <Center>
      <Heading size="sm">{title}</Heading>
      {children && <Text>{children}</Text>}
    </Center>
  );
};
