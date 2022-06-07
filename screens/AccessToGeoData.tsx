import React, { useEffect, useState } from "react";
import { Button, Container, Text, View } from "native-base";
import { RouteProps } from "../App";
import * as TaskManager from "expo-task-manager";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, StyleSheet } from "react-native";

const LOCATION_TASK_NAME = "firstTask";

type LocationPermission = keyof typeof Location.PermissionStatus; // | undefined;

export default ({ navigation }: RouteProps) => {
  const [locationPermission, setPermissionStatus] = useState(
    Location.PermissionStatus.UNDETERMINED
  );
  const [errorMsg, setErrorMsg] = useState<string>();

  let buttonText = "Следующий шаг - авторизация";

  useEffect(() => {
    (async () => {
      const { status: foregroundStatus } =
        await Location.requestForegroundPermissionsAsync();
      const { status: backgroundStatus } =
        await Location.requestBackgroundPermissionsAsync();

      console.log(
        "foregroundStatus: ",
        foregroundStatus,
        " / backgroundStatus: ",
        backgroundStatus
      );

      if (foregroundStatus !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      // setLocation(location);
      console.log('????', location);
      // await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, { accuracy: Location.Accuracy.Balanced });
    })();
  }, []);

  return (
    <View style={styles.horizontal}>
      <Container style={styles.horizontal}>
        <ActivityIndicator size="large" style={{ margin: 'auto' }} />

        <Text>Инструкция по включению доступа к гео-данным телефона</Text>
        <Button onPress={() => navigation.push("SingIn")}>
          <Text style={{ color: "white" }}>{buttonText}</Text>
        </Button>
        <StatusBar />
      </Container>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    height: '100%',
  },
  horizontal: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: 'center',
    padding: 10,
  },
});

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.error(`${LOCATION_TASK_NAME}::error`, error.message, error);
    // Error occurred - check `error.message` for more details.
    return;
  }
  if (data) {
    const { locations } = data as any;
    console.log("locations: ", locations);
  }
});

/**
 * нахожусь в впн
 * просить цод кроме впн юзерс добавить меня в впн рдп
 * 
 * в маше 2 впн группы
 * дать обе группы не можем (не безопасно)
 * могу ток впн юзер использовать (сначала мой комп, от туда все сервисы)
 */