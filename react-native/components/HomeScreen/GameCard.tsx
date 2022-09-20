import * as React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import {Image, View, StyleSheet} from "react-native";


interface Card {
    cardTitle: string,
    imageURL: string,
    description: string,
    bgcolor: string
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
    },
    tinyLogo: {
        width: "100%",
        height: "50%",
    },
    logo: {
        width: 66,
        height: 58,
    },
});



const GameCard = ({cardTitle, imageURL, description, bgcolor}: Card) => (
    <View>
        <Card style={{backgroundColor: bgcolor}}>
            <Image source={imageURL} />
            <Card.Title title={cardTitle} />
            <Card.Content>
                <Paragraph>{description}</Paragraph>
            </Card.Content>
        </Card>
    </View>
);

export default GameCard;