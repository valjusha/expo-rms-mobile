import React from "react";
import { Button, Container, Text, View } from "native-base";
import { RouteProps } from "../App";

/**
 * Инфа про авторизацию:
 * https://docs.expo.dev/versions/v45.0.0/sdk/auth-session/
 */
export interface SignInProps extends RouteProps {
  onNext: () => void;
}

export default ({ onNext }: SignInProps) => (
  <View>
    <Container>
      <Text>Страница авторизации</Text>
      <Button onPress={onNext}>
        <Text>Авторизуемся</Text>
      </Button>
    </Container>
  </View>
);
