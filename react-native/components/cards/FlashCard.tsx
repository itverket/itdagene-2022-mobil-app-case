import { FC } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Card, Title } from "react-native-paper";
import Colors from "../../constants/Colors";
import { Employee } from "../../hooks/useFetchEmployees";
import CardActionButton from "../buttons/CardActionButton";

type FlashCardProps = {
    employee: Employee;
    forceYup: () => void;
    forceNope: () => void;
    handleNope: (card: Employee) => void;
}

const {width} = Dimensions.get("window");

export const FlashCard: FC<FlashCardProps> = ({employee, forceNope, forceYup, handleNope}) => {

    return (
        <Card style={cardStyles.card}>
            <Card.Cover source={{ uri: employee.image }} resizeMode="contain" style={{backgroundColor: Colors.bg}}/>
            <Card.Content style={cardStyles.content}>
                <Title style={cardStyles.title}>{employee.name}</Title>
            </Card.Content>
            <Card.Actions style={cardStyles.actions}>
                <CardActionButton 
                    onPress={() => {
                        forceNope();
                        handleNope(employee);
                    }} 
                    icon="thumbs-down" 
                    color="red" 
                />
                <CardActionButton onPress={forceYup} icon="thumbs-up" color="green" />
            </Card.Actions>
        </Card>
    );
};

const cardStyles = StyleSheet.create({
    card: {
        minHeight: 400,
        width: width - 100,
        justifyContent: "space-evenly",
    },
    content: {
        margin: 8,
    },
    title: {
        marginTop: 20,
        textAlign: "center",
    },
    text: {
        textAlign: "center",
        fontWeight: "bold",
        fontSize: 16,
    },
    actions: {
        justifyContent: "center",
        alignItems: "flex-end",
        marginTop: 'auto',
        marginBottom: 'auto',
    }
})