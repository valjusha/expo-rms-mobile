import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Container,
  Divider,
  Fab,
  FlatList,
  HStack,
  Icon,
  IconButton,
  Input,
  Text,
} from "native-base";
import { AntDesign, Entypo } from "@expo/vector-icons";
import {
  Pressable,
  PressableProps,
  StatusBar,
  StyleSheet,
  TextInputProps,
  View,
} from "react-native";
import { common } from "@styles/common";
import { FlightSearchRouteProps } from ".";
import { IFlight } from "./types";
import { uuidRandom } from "@utils/uuidRandom";

export default ({ navigation }: FlightSearchRouteProps) => {
  const [search, setSearchValue] = useState<IFlight[]>([]);

  const handleChangeInputValue = useCallback(
    (value: string) => {
      setSearchValue(
        Array.from<IFlight>({ length: value.length }).map(() => ({
          uuid: uuidRandom(),
        }))
      );
    },
    [setSearchValue]
  );

  const handleGoToDetail = useCallback(
    (uuid: string) => {
      navigation.push("flightDetail", { uuid });
    },
    [navigation]
  );

  return (
    <View style={containerStyles}>
      <SearchBar onChangeText={handleChangeInputValue} />
      <Box style={page.content}>
        {!!search.length ? (
          <FlatList
            data={search}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => {
                  handleGoToDetail(item.uuid);
                }}
              >
                <FlightItem {...item} />
              </Pressable>
            )}
            keyExtractor={(item) => item.uuid}
          />
        ) : (
          <Direction />
        )}
        <Fab
          renderInPortal={false}
          shadow={2}
          size="sm"
          icon={<Icon color="white" as={AntDesign} name="info" size="lg" />}
        />
      </Box>
    </View>
  );
};

const page = StyleSheet.create({
  container: {
    display: "flex",
    padding: 24,
    alignItems: "stretch",
  },
  search: {
    marginTop: 6,
    // flex: 1,
    // flexShrink: 0,
    // flexBasis: 42,
    // width: "100%",
  },
  content: {
    flex: 1,
    flexShrink: 0,
    flexBasis: "100%",
    width: "100%",
    alignItems: "stretch",
  },
});

const containerStyles = StyleSheet.flatten([page.container, common.container]);

const maybe = () => Math.round(Math.random());

const FlightItem = ({ uuid }: IFlight) => {
  const iconV = maybe();

  return (
    <HStack
      w="100%"
      p="4"
      backgroundColor="white"
      justifyContent="space-between"
      alignItems="center"
    >
      <Icon
        color={iconV ? "info.600" : "info.700"}
        as={Entypo}
        name={iconV ? "aircraft-landing" : "aircraft-take-off"}
        size="md"
      />
      <Text>{maybe() ? "SU 1288 (ULV)" : "FV 6075 (ULV)"}</Text>
      <Text>{JSON.stringify(uuid)}</Text>
      <Icon color="info.800" as={AntDesign} name="doubleright" size="md" />
    </HStack>
  );
};

interface SearchBarProps {
  onChangeText?: TextInputProps["onChangeText"];
  onPress?: PressableProps["onPress"];
}

export const SearchBar = ({ onChangeText, onPress }: SearchBarProps) => (
  <View style={page.search}>
    <HStack alignItems="center">
      <Input variant="outline" flex={1} onChangeText={onChangeText} />
      <IconButton
        colorScheme="indigo"
        variant="ghost"
        _icon={{
          as: AntDesign,
          name: "search1",
        }}
        onPress={onPress}
      />
    </HStack>
  </View>
);

const Direction = () => (
  <>
    <Box style={common.code}>
      <Text fontSize="md">
        В данном окне должна быть предусмотрена возможность поиска рейса.
      </Text>
    </Box>
    <Box style={common.code}>
      <Text fontSize="sm">
        После выбора рейса из списка должен отобразиться весь перечень задач
        отдела “SB” по соответствующему рейсу с настройками для сортировки задач
        по плановому времени начала.
      </Text>
    </Box>
  </>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {},
});
