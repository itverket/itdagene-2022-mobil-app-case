import React, { useEffect } from "react";
import { View, StyleSheet, Text, Image, Dimensions, TextInput } from "react-native";
import { Button } from "react-native-paper";
import { Employee } from "../hooks/useFetchEmployees";


export type GameProp = {
    employees: Employee[];
}

const IMAGE_WIDTH = Dimensions.get("window").width;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.3;

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
    const [userInput, setUserInput] = React.useState<string>("");


useEffect(() => {
    if(userInput.toUpperCase() == currentEmployeeFirstName) setNextEmployee();
},[userInput])
    

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
        setUserInput("");
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
           <Image
          style={styles.image}
          key={currentEmployee.name}
          source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/Done.png/640px-Done.png" }}
          resizeMode="cover"
          />
        <Text style={styles.title}>"Spillet er ferdig"</Text>
        <Button onPress={()=> {}}>Avslutt</Button>
        </>

        :
        <>
    <Image
          style={styles.image}
          key={currentEmployee.name}
          source={{ uri: currentEmployee.image }}
          resizeMode="cover"
          />

        <Text style={styles.title}>{currentEmployeeFirstName}</Text>
        <TextInput
        style={styles.input}
        onChangeText={(input:string) => setUserInput(input)}
        value={userInput}
      />
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


        input: {
            height: 40,
            margin: 12,
            borderWidth: 1,
            padding: 10,
          
        },
      }
  );
  