import React, { Dispatch, useState } from "react";

import { StyleSheet, Switch, Text } from "react-native";
import { View } from "react-native";
import { CurrentScoreContext } from "../../context/currentscore/CurrentScoreContext";





export default function PriceCounter() {

    const {currentScore} = React.useContext(CurrentScoreContext);

    // function incremantScore() { 
    //     setCurrentScore(currentScore + 1)
    // }



  
    return (
      <View style={styles.container}>
            
        <Text style={styles.text}> {currentScore}</Text>

      
        
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
    color: "white",
    marginRight: 10,

    }

    
  });
