import * as React from 'react';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
import {Image, View, StyleSheet, ImageSourcePropType, Dimensions} from "react-native";


interface Card {
    cardTitle: string,
    imageURL: ImageSourcePropType,
    description: string,
    bgcolor: string
}

const IMAGE_WIDTH = Dimensions.get("window").width;
const IMAGE_HEIGHT = IMAGE_WIDTH * 1.3;



const GameCard = ({cardTitle, imageURL, description, bgcolor}: Card) => {
    const styles = StyleSheet.create({
        container: {
            margin: 8
        },
        logo: {
            marginTop: 8,
            width: "70%",
        },
        logoWrapper: {
            width: 10,
            height: 10
        },
        card: {
            margin: 12,
            width: 160,
            height: 160,
            backgroundColor: bgcolor,
            justifyContent: "center",
            borderRadius: 16
        },
        cardWrapper: {
            padding: 4,
            alignItems: "center"
        }
    });

    return (
            <Card style={styles.card}>
                <View style={styles.cardWrapper}>
                        <Image source={imageURL} resizeMode="contain" style={styles.logo}/>
                    <Card.Title title={cardTitle} />
                    <Card.Content>
                        <Paragraph >{description}</Paragraph>
                    </Card.Content>
                </View>
            </Card>
    )
};

export default GameCard;