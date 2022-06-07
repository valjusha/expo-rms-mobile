import React from "react";
import { View } from "native-base";
import * as Device from "expo-device";
import { StyleSheet } from "react-native";
import { DataListBox } from "@components/DataListBox";

const workerData = [
  ["Фио сотрудника", "{string}"],
  ["Табельный №", "{string}"],
  ["Начало смены", "{Date}"],
  ["Факт начала смены", "{Date}"],
  ["Окончание смены", "{Date}"],
];

export default () => (
  <View style={pageStyle.container}>
    <DataListBox title="Информация о сотруднике:" data={workerData} />
    <DataListBox
      title="Информация об устройстве:"
      data={[
        ["Device.manufacturer:", `${Device.manufacturer}`],
        ["Device.designName", `${Device.designName}`],
      ]}
    />
  </View>
);

const pageStyle = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "flex-start",
  },
  box: {},
});
