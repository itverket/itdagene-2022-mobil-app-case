import * as React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import {Image, View, StyleSheet, ImageSourcePropType} from "react-native";


interface Card {
    cardTitle: string,
    imageURL: ImageSourcePropType,
    description: string,
    bgcolor: string
}





const GameCard = ({cardTitle, imageURL, description, bgcolor}: Card) => {
    const styles = StyleSheet.create({
        container: {
            margin: 8
        },
        logo: {
            marginTop: 8,
        },
        card: {
            margin: 16,
            width: 150,
            height: 150,
            backgroundColor: bgcolor,
            justifyContent: "center"
        }
    });

    return (
            <Card style={styles.card}>
                <Image source={imageURL} style={styles.logo}/>
                <Card.Title title={cardTitle} />
                <Card.Content>
                    <Paragraph>{description}</Paragraph>
                </Card.Content>
            </Card>
    )
};

export default GameCard;