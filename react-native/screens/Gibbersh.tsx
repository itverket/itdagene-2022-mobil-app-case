import { useNavigation } from "@react-navigation/native";
import React, { useContext, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  Dimensions,
  TextInput,
  KeyboardAvoidingView,
} from "react-native";
import { Button } from "react-native-paper";
import GibberishLetterInput from "../components/gibbershletterinput";
import PriceCounter from "../components/pointscounter";
import { CurrentScoreContext } from "../context/currentscore/CurrentScoreContext";
import { GameContext } from "../context/GameContext";
import { Employee } from "../hooks/useFetchEmployees";
import { GameMode } from "../models/gameStateEnum";
import Navigation from "../navigation";
import { RootStackScreenProps, RootTabScreenProps } from "../types";

const IMAGE_WIDTH = Dimensions.get("window").width;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.3;
let currentNameSize = 10;

function shuffleString(str: string) {
  let a = str.split(""),
    n = a.length;

  for (let i = n - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a.join("");
}




export type GibberishScreenProps = {
  employees: Employee[];
}

export const GibbershScreen = ({employees}:GibberishScreenProps) => {
  const navigation = useNavigation<RootStackScreenProps<"Game">['navigation']>();


  const [currentEmployee, setCurrentEmployee] = React.useState<Employee>(
    employees[0]
  ); 
  const [currentEmployeeIndex, setCurrentEmployeeIndex] =
    React.useState<number>(1);
  const [currentEmployeeFirstName, setCurrentEmployeeFirstName] =
    React.useState<string>(currentEmployee.name.split(" ")[0]);
  const [currentNameShuffle, setCurrentNameShuffle] = React.useState<string>(
    currentEmployee.name.split(" ")[0]
  );

  const { currentScore, setCurrentScore } =
    React.useContext(CurrentScoreContext);

  const [userInputDict, setUserInputDict] = React.useState<Map<number, string>>(
    new Map<number, string>()
  );

  // console.log(employees)
  
  
  const [health, setHealth] = React.useState<number>(3);

  function addToUserInputDict(letterIndex: number, letter: string) {
    setUserInputDict(new Map(userInputDict.set(letterIndex, letter)));
  }

  function checkIfCorrectAnswer(): boolean {
    {
      // return Array.from(userInputDict.values()).some(
      //   (value: string, key: number) =>
      //   {

      //     value.toUpperCase() === currentEmployeeFirstName[key].toUpperCase()
      //     console.log(value.toUpperCase() === currentEmployeeFirstName[key].toUpperCase(), value, currentEmployeeFirstName[key])
      //   }
      // );

    //   userInputDict.forEach((value: string, key: number) => {
    //     if (value.toUpperCase() !== currentEmployeeFirstName[key].toUpperCase()) return false;
    //   }) 
    //     return true;
      
    // 
    let nameInput = ""
    for (let i=0; i<userInputDict.size; i++) { 
      nameInput += userInputDict.get(i)
    }
    console.log(nameInput, currentEmployeeFirstName, "JHIHKs", nameInput.trim().toUpperCase() === currentEmployeeFirstName.trim().toUpperCase())
    return nameInput.trim().toUpperCase() === currentEmployeeFirstName.trim().toUpperCase()
  }
  
      
  }

  useEffect(() => {
    if (health === 0) {
      setCurrentEmployeeIndex(0);
      setUserInputDict(new Map<number, string>());
      setCurrentScore(0);
      navigation.goBack();
    }
  }, [health, setHealth]);

  useEffect(() => {
    console.log("tirgger");
    if (userInputDict.size == currentEmployeeFirstName.length) {
      // console.log(userInputDict, currentEmployeeFirstName);
      let correct = checkIfCorrectAnswer();
      console.log(
        "correct",
        correct,
        currentEmployeeFirstName,
        userInputDict.values()
      );
      if (correct) {
        setCurrentScore(currentScore + 1);
      } else {

        setHealth(health - 1);
      }
      setNextEmployee();
      setUserInputDict(new Map<number, string>());
    }
  }, [userInputDict]);

  useEffect(() => {
    setCurrentNameShuffle(shuffleString(currentEmployeeFirstName));
    currentNameSize = currentEmployeeFirstName.length;
  }, [currentEmployeeFirstName]);

  useEffect(() => {
    setCurrentEmployeeFirstName(
      currentEmployee.name.split(" ")[0].toUpperCase()
    );
  }, [currentEmployee]);

  const setNextEmployee = () => {
    if (currentEmployeeIndex < employees.length - 1) {
      setCurrentEmployeeIndex(currentEmployeeIndex + 1);
      setCurrentEmployee(employees[currentEmployeeIndex + 1]);
      setCurrentEmployeeFirstName(
        currentEmployee.name.split(" ")[0].toUpperCase()
      );
      // setUserInput("");
      setUserInputDict(new Map<number, string>());
    }
  };

  console.log(currentEmployeeFirstName, currentNameShuffle);



  return (
    employees.length>0 && currentEmployee ?(
      <>
      

    
    <KeyboardAvoidingView style={styles.container}>
      <PriceCounter />
      <Text style={styles.text_lives}>Gjenstående forsøk: {health}</Text>

      {currentEmployeeIndex === employees.length - 1 ? (
        <>
          <Image
            style={styles.image}
            key={currentEmployee.name}
            source={{
              uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Done.png/640px-Done.png",
            }}
            resizeMode="cover"
          />
          <Text style={styles.title}>"Spillet er ferdig"</Text>

        </>
      ) : (
        <>
          <Image
            style={styles.image}
            key={currentEmployee.name}
            source={{ uri: currentEmployee.image }}
            resizeMode="cover"
          />

          <Text style={styles.title}>{currentNameShuffle}</Text>
        </>
      )}

      <View style={{ flexDirection: "row" }}>
        {currentEmployeeFirstName.split("").map((letter, index) => {
          return (
            <GibberishLetterInput
              currentNameSize={currentNameSize}
              key={currentEmployeeFirstName + index}
              letterIndex={index}
              addToUserInputDict={addToUserInputDict}
            />
          );
        })}
      </View>

    </KeyboardAvoidingView>
    </>
    ):
    <>
    <Text>
      Ingen ansatte funnet!
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 35,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  image: {
    width: 250,
    height: 250,
  },
  text_lives: {
    fontSize: 20,
    fontWeight: "bold",
    color: "red",
    marginRight: 10,
  },
});
