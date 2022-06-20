// @ts-nocheck
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Box, Divider, HStack, Pressable, Text, VStack } from "native-base";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from "react";
import { useVehicle } from "@store/vehicle";
import * as Linking from "expo-linking";

type RouteParams = {
  key: string;
  name: string;
  title: string;
};

// жуть
// лучше замена https://reactnavigation.org/docs/screen-options-resolution
// пример getHeaderTitle()
const getRoutesSchema = ({
  state,
  descriptors,
}: DrawerContentComponentProps): RouteParams[] =>
  state.routes.reduce((parsedRoutes, { key, name }) => {
    parsedRoutes.push({
      key,
      name,
      title: descriptors[key].options.title ?? name,
    });
    return parsedRoutes;
  }, [] as RouteParams[]);

export const MainNavigationBar = (props: DrawerContentComponentProps) => {
  const { current, resetVehicle } = useVehicle();
  // const routesSchema = useMemo(() => getRoutesSchema(props), [props]);

  return (
    <DrawerContentScrollView {...props}>
      <VStack space="6" my="2" mx="1">
        {/*<Box px="4">
          <Text bold color="gray.700">
            {`{ ФИО пользователя}`}
          </Text>
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            {`Виджет информации о смене сотрудника \n (статус, даты и тп?)`}
          </Text>
        </Box> */}
        <VStack divider={<Divider />} space="4">
          <VStack space="3">
            {getRoutesSchema(props).map(({ key, name, title }, index) => (
              <Pressable
                key={key}
                px="5"
                py="3"
                rounded="md"
                bg={
                  index === props.state.index
                    ? "rgba(6, 182, 212, 0.1)"
                    : "transparent"
                }
                onPress={() => props.navigation.navigate(name)}
              >
                <HStack space="7" alignItems="center">
                  <Text
                    fontWeight="500"
                    color={
                      index == props.state.index ? "primary.500" : "gray.700"
                    }
                  >
                    {title}
                  </Text>
                </HStack>
              </Pressable>
            ))}
          </VStack>
          <VStack space="3">
            {current ? (
              <CloseVehicle
                navigation={props.navigation}
                resetVehicle={resetVehicle}
              />
            ) : (
              <OpenVehicleModal
                navigation={props.navigation}
                resetVehicle={resetVehicle}
              />
            )}
            <Pressable
              px="5"
              py="3"
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate("CallRequestModal");
              }}
            >
              <HStack space="7" alignItems="center">
                <Text color="gray.500" fontWeight="500">
                  Запрос вызова
                </Text>
              </HStack>
            </Pressable>
            <Pressable
              px="5"
              py="3"
              onPress={() =>
                Linking.openURL(
                  "https://us04web.zoom.us/j/6237197770?pwd=NnM1elI3cU9oRk9wOE1pMHQzbVBaZz09"
                )
              }
            >
              <HStack space="7" alignItems="center">
                <Text color="gray.300" fontWeight="500">
                  Телефонная книга
                </Text>
              </HStack>
            </Pressable>
            <Pressable
              px="5"
              py="3"
              onPress={() =>
                Linking.openURL(
                  "https://us02web.zoom.us/j/82539173670?pwd=NFhXVldsQXB2ZDAvc3EvMDlYdVhCQT09"
                )
              }
            >
              <HStack space="7" alignItems="center">
                <Text color="gray.300" fontWeight="500">
                  Выход из устройства
                </Text>
              </HStack>
            </Pressable>
          </VStack>
        </VStack>
      </VStack>
    </DrawerContentScrollView>
  );
};

interface VehicleItemProps {
  navigation: any;
  resetVehicle: () => void;
}

const OpenVehicleModal = ({ navigation }: VehicleItemProps) => (
  <Pressable
    px="5"
    py="3"
    onPress={() => {
      navigation.closeDrawer();
      navigation.navigate("ChoiceVehicleModal");
    }}
  >
    <HStack space="7" alignItems="center">
      <Text color="gray.500" fontWeight="500">
        Выбрать ТС
      </Text>
    </HStack>
  </Pressable>
);

const CloseVehicle = ({ resetVehicle }: VehicleItemProps) => {
  return (
    <Pressable
      px="5"
      py="3"
      onPress={() => {
        resetVehicle();
      }}
    >
      <HStack space="7" alignItems="center">
        <Text color="gray.500" fontWeight="500">
          Сдать ТС
        </Text>
      </HStack>
    </Pressable>
  );
};
