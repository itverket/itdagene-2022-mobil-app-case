import React, { useEffect } from "react";
import { Button, Dimensions, FlatList, Image, StyleSheet } from "react-native";
import GameModeToggleSwitch from "../components/gamemodetoggle";
import { Wrapper } from "../components/layout/Wrapper";

import { Text, View } from "../components/Themed";
import { GameModeContext } from "../context/GameModeContext";
import { Employee, useFetchEmployees } from "../hooks/useFetchEmployees";
import { GameMode } from "../models/gameStateEnum";
import { RootTabScreenProps } from "../types";

const IMAGE_WIDTH = Dimensions.get("window").width;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.3;

export const LeaderBoard = ({ navigation }: RootTabScreenProps<"LeaderBoard">) => {
  const employeeResult = useFetchEmployees();





  const renderEmployee = ({ item }: { item: Employee }) => {
    return (
      <View style={{ flexDirection: "column" }}>
        <Image
          style={styles.image}
          key={item.name}
          source={{ uri: item.image }}
          resizeMode="cover"
          />
        <Text> {item.gender}</Text>
       
          <GameModeToggleSwitch/>

      </View>
    );
  };

  const keyExtractor = (employee: Employee) => employee.name;

  return (
    <Wrapper>
      {employeeResult.error ? (
        <Text style={styles.title}>{employeeResult.error}</Text>
      ) : employeeResult.loading ? (
        <Text style={styles.title}>{"Laster..."}</Text>
      ) : (
        <FlatList
          data={employeeResult.employees}
          horizontal={true}
          renderItem={renderEmployee}
          keyExtractor={keyExtractor}
          snapToInterval={IMAGE_WIDTH}
        />
      )}
    </Wrapper>
  );
};

const styles = StyleSheet.create({
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_HEIGHT,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
