import React, { Dispatch, useContext, useEffect, useState } from "react";

import { Dimensions, StyleSheet, Switch, Text, TextInput } from "react-native";
import { View } from "react-native";
import { CurrentScoreContext } from "../../context/currentscore/CurrentScoreContext";

const IMAGE_WIDTH = Dimensions.get("window").width;
const IMAGE_HEIGHT = Dimensions.get("window").height;

interface LetterInputProp {
    letterIndex: number;
    addToUserInputDict: (index:number, input:string) => void;
    currentNameSize: number;
  }
  


export default function GibberishLetterInput({letterIndex, addToUserInputDict, currentNameSize}: LetterInputProp) {

    const [userInput, setUserInput] = useState<string>("");






function handleInput(letter: string) {
    setUserInput(letter);
    addToUserInputDict(letterIndex, letter)
}
    const widthOfBox = (IMAGE_WIDTH - (10 + (currentNameSize * 10))) / currentNameSize;

    return (
      <View style={styles.container}>
            
        <TextInput
        style={{ 
          height: 40,
          width: widthOfBox,
          margin: 5,
          borderWidth: 1,}}
        onChangeText={(input:string) => handleInput(input)}
        value={userInput}
        maxLength={1}
        autoFocus={letterIndex === 0}
      />

      
        
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flexDirection:"row",
      alignItems: "center",
      justifyContent: "center",

    },
    text: {
        fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginRight: 10,

    },
  

    
  });
