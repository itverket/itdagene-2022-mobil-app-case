import React, { useEffect } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { Employee } from "../hooks/useFetchEmployees";
import { RootStackScreenProps, RootTabParamList, RootTabScreenProps } from "../types";

export type GameProp = {
    employees: Employee[];
}

function shuffleString(str: string) {
    let a = str.split(""),
        n = a.length;

    for(let i = n - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a.join("");
}


export const GibbershScreen = ({employees}:GameProp) => {
    const [currentEmployee, setCurrentEmployee] = React.useState<Employee>(employees[0]);
    const [currentEmployeeIndex, setCurrentEmployeeIndex] = React.useState<number>(0);
    const [currentEmployeeFirstName, setCurrentEmployeeFirstName] = React.useState<string>(currentEmployee.name.split(' ')[0]);
    const [currentNameShuffle, setCurrentNameShuffle] = React.useState<string>(currentEmployee.name.split(' ')[0]);
    

    useEffect(() => {
        setCurrentNameShuffle(shuffleString(currentEmployeeFirstName))
    
    }, [currentEmployeeFirstName])

useEffect(() => {
    setCurrentEmployeeFirstName(currentEmployee.name.split(' ')[0].toUpperCase())

}, [currentEmployee])

    const setNextEmployee = () => {
        if(currentEmployeeIndex < employees.length-1){
        setCurrentEmployeeIndex(currentEmployeeIndex + 1)
        setCurrentEmployee(employees[currentEmployeeIndex + 1])
        setCurrentEmployeeFirstName(currentEmployee.name.split(' ')[0].toUpperCase())
        }
    }

    const restart = () => { 

        setCurrentEmployeeIndex(0)
        setCurrentEmployee(employees[0])
    }



    return (
      <View style={styles.container}>
        {currentEmployeeIndex === employees.length -1 
        ? 
        <>
        <Text style={styles.title}>"Spillet er ferdig"</Text>
        <Button onPress={()=> {}}>Avslutt</Button>
        </>

        :
        <>
        <Text style={styles.title}>{currentEmployeeFirstName}</Text>
        <Button onPress={setNextEmployee}>Neste</Button>
        <Text style={styles.title}>{currentNameShuffle}</Text>
        </>
    
    }
        <View></View>

    <Button onPress={restart}>Restart</Button>
        
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
      marginTop: 55,
    },
    link: {
      marginTop: 15,
      paddingVertical: 15,
    },
    linkText: {
      fontSize: 14,
      color: "#2e78b7",
    },
  });
  