import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { common } from "@styles/common";
import { Box, Button, Radio, Text, View } from "native-base";
import React, { useCallback, useState } from "react";
import { Alert } from "react-native";

export default ({ navigation }: NativeStackScreenProps<{}>) => {
  const [value, setValue] = useState<string>();

  const createSuccessAlert = useCallback(
    () =>
      Alert.alert(
        "Информация",
        "Запрос обратного вызова выполнен успешно. Диспетчер скоро вам позвонит.",
        [{ text: "OK", onPress: () => navigation.goBack() }]
      ),
    [navigation]
  );

  return (
    <View style={common.container}>
      <Radio.Group
        name="callRequest"
        accessibilityLabel="pick call request"
        onChange={(nextValue) => setValue(nextValue)}
      >
        <Box m={2}>
          <Radio value="urgent" my={1}>
            Срочный вызов
          </Radio>
        </Box>
        <Box m={2}>
          <Radio value="usual" my={1}>
            Вызов
          </Radio>
        </Box>
        <Box m={2}>
          <Radio value="non-urgent" my={1}>
            Несрочный вызов
          </Radio>
        </Box>
      </Radio.Group>
      <Box m={2} h={51}>
        {!!value && (
          <>
            <Button mt="2" onPress={createSuccessAlert}>
              <Text color="white">{value}</Text>
            </Button>
          </>
        )}
      </Box>
    </View>
  );
};
