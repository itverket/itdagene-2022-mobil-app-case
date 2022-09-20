import React, { Dispatch, useContext, useEffect, useState } from "react";

import { StyleSheet, Switch, Text, TextInput } from "react-native";
import { View } from "react-native";
import { CurrentScoreContext } from "../../context/currentscore/CurrentScoreContext";

interface LetterInputProp {
    letterIndex: number;
    addToUserInputDict: (index:number, input:string) => void;
  }
  

export default function GibberishLetterInput({letterIndex, addToUserInputDict}: LetterInputProp) {

    const [userInput, setUserInput] = useState<string>("");


function handleInput(letter: string) {
    setUserInput(letter);
    addToUserInputDict(letterIndex, letter)
}
  
    return (
      <View style={styles.container}>
            
        <TextInput
        style={styles.input}
        onChangeText={(input:string) => handleInput(input)}
        value={userInput}
        maxLength={1}
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
    input: {
        height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
    }

    
  });
