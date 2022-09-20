import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Button } from "react-native-paper";
import { Employee } from "../hooks/useFetchEmployees";
import { RootStackScreenProps, RootTabParamList, RootTabScreenProps } from "../types";

export type GameProp = {
    employees: Employee[];
}


export const GibbershScreen = ({employees}:GameProp) => {
    const [currentEmployee, setCurrentEmployee] = React.useState<Employee>(employees[0]);
    const [currentEmployeeIndex, setCurrentEmployeeIndex] = React.useState<number>(0);
    

    const setNextEmployee = () => {
        if(currentEmployeeIndex < employees.length-1){
        setCurrentEmployeeIndex(currentEmployeeIndex + 1)
        setCurrentEmployee(employees[currentEmployeeIndex + 1])
        }
    }


    return (
      <View style={styles.container}>
        <Text style={styles.title}>{currentEmployeeIndex === employees.length -1 ? "Spillet er ferdig" :currentEmployee.name}</Text>
        {currentEmployeeIndex === employees.length -1 ? 
        <Button onPress={()=> {}}>Avslutt</Button>
        :
        <Button onPress={setNextEmployee}>Neste</Button>
    }
        
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
  