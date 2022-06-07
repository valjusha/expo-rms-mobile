import { Box, HStack, Spacer, Text } from "native-base";

interface DataListBoxProps {
  title: string;
  data: Array<string[]>;
}

export const DataListBox = ({ title, data }: DataListBoxProps) => (
  <Box
    borderWidth="1"
    borderColor="coolGray.300"
    shadow="3"
    bg="white"
    p="5"
    m="15"
    rounded="8"
  >
    <Text color="coolGray.800" fontWeight="medium" fontSize="xl">
      {title}
    </Text>
    {data.map(([title, value], index) => (
      <HStack key={index}>
        <Text mt="2" fontSize="sm" color="coolGray.500">
          {title}
        </Text>
        <Spacer />
        <Text mt="2" fontSize="sm" color="coolGray.700">
          {value}
        </Text>
      </HStack>
    ))}
  </Box>
);
