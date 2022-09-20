import React, { useEffect } from "react";
import { Button, Dimensions, FlatList, Image, StyleSheet } from "react-native";

import { Text, View } from "../components/Themed";
import { GameModeContext } from "../context/GameModeContext";
import { Employee, useFetchEmployees } from "../hooks/useFetchEmployees";
import { GameMode } from "../models/gameStateEnum";
import { RootTabScreenProps } from "../types";

const IMAGE_WIDTH = Dimensions.get("window").width;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.3;

export const TabTwoScreen = ({ navigation }: RootTabScreenProps<"TabTwo">) => {
  const employeeResult = useFetchEmployees();

  const {gameMode, setGameMode} = React.useContext(GameModeContext);


  useEffect(()=> {
    console.log("oppdaget endring i context", gameMode);
 if(gameMode=== GameMode.practice) console.log("practice")
 if(gameMode=== GameMode.evaluation) console.log("evaluation")


  }, [gameMode])

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
        <Button
  onPress={()=>setGameMode(GameMode.evaluation)}
  title="Learn More"
  color="#841584"
  accessibilityLabel="Learn more about this purple button"
/>
        <Button
  onPress={()=>setGameMode(GameMode.practice)}
  title="Learn More"
  color="#041584"
  accessibilityLabel="Learn more about this purple button"
/>


      </View>
    );
  };

  const keyExtractor = (employee: Employee) => employee.name;

  return (
    <View>
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
    </View>
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
