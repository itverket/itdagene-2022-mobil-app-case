import { Feather } from "@expo/vector-icons";
import { FC } from "react";
import { Pressable, StyleSheet } from "react-native";
import Colors from "../../constants/Colors";

const styles = StyleSheet.create({
    container: {
        width: 75,
        height: 75,
        borderRadius: 75 / 2,
        backgroundColor: Colors.bg,
        justifyContent: "center",
        alignItems: "center",
        margin: 10,
    },
});

type CardActionButtonProps = {
    onPress: () => void;
    icon: React.ComponentProps<typeof Feather>["name"];
    color: string;
}

const CardActionButton: FC<CardActionButtonProps> = ({icon, onPress, color}) => (
    <Pressable style={styles.container}>
        <Feather name={icon} size={30} color={color} onPress={onPress} />
    </Pressable>
);

export default CardActionButton;