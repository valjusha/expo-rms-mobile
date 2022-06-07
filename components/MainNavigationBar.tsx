// @ts-nocheck
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
} from "@react-navigation/drawer";
import { Box, Divider, HStack, Pressable, Text, VStack } from "native-base";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import React from "react";

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
  // const routesSchema = useMemo(() => getRoutesSchema(props), [props]);

  return (
    <DrawerContentScrollView {...props}>
      <VStack space="6" my="2" mx="1">
        <Box px="4">
          <Text bold color="gray.700">
            {`{ ФИО пользователя}`}
          </Text>
          <Text fontSize="14" mt="1" color="gray.500" fontWeight="500">
            {`Виджет информации о смене сотрудника \n (статус, даты и тп?)`}
          </Text>
        </Box>
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
            <Pressable
              px="5"
              py="3"
              onPress={() => {
                props.navigation.closeDrawer();
                props.navigation.navigate("callRequestModal");
              }}
            >
              <HStack space="7" alignItems="center">
                <Text color="gray.500" fontWeight="500">
                  Запрос вызова
                </Text>
              </HStack>
            </Pressable>
            <Pressable px="5" py="3">
              <HStack space="7" alignItems="center">
                <Text color="gray.300" fontWeight="500">
                  Телефонная книга
                </Text>
              </HStack>
            </Pressable>
            <Pressable px="5" py="3">
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

function useWhyDidYouUpdate(
  name: any,
  props: { [x: string]: any } | undefined
) {
  // Get a mutable ref object where we can store props ...
  // ... for comparison next time this hook runs.
  const previousProps = useRef();
  useEffect(() => {
    if (previousProps.current) {
      // Get all keys from previous and current props
      const allKeys = Object.keys({ ...previousProps.current, ...props });
      // Use this object to keep track of changed props
      const changesObj = {};
      // Iterate through keys
      allKeys.forEach((key) => {
        // If previous is different from current
        if (previousProps.current[key] !== props[key]) {
          // Add to changesObj
          changesObj[key] = {
            from: previousProps.current[key],
            to: props[key],
          };
        }
      });
      // If changesObj not empty then output to console
      if (Object.keys(changesObj).length) {
        console.log("[why-did-you-update]", name, changesObj);
      }
    }
    // Finally update previousProps with current props for next hook call
    previousProps.current = props;
  });
}
