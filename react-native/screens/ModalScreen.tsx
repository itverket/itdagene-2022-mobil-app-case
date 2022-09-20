import { StatusBar } from "expo-status-bar";
import React from "react";
import { Button, Platform, StyleSheet, Image } from "react-native";

import { Text, View } from "../components/Themed";
import { RootStackScreenProps } from "../types";

export const ModalScreen = ({
  navigation,
  route: {
    params: { employee },
  },
}: RootStackScreenProps<"Modal">) => {
  const goBack = () => navigation.goBack();

  return (
    <View style={styles.container}>
      <Text>{employee.name}</Text>
      <Image 
      style={styles.user_picture}
      source={{
        uri: `${employee.image}`,
        }} />

      <Button title="Tilbake" onPress={goBack} />
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  user_picture: {
    width: 250,
    height: 250,
  },
});
