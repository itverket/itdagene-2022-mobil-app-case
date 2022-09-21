import { Feather } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native";
import { Pressable, View } from "react-native"
import { RootStackScreenProps } from "../../types";

const Header = () => {
    const navigation = useNavigation<RootStackScreenProps<"Game">['navigation']>();
    const handleBack = () => navigation.goBack();

    return (
        <View style={{top: 0, left: 0, flexDirection: "row", justifyContent: "flex-start", paddingRight: 16, paddingLeft: 16}}>
            <Pressable onPress={handleBack}>
                <Feather name="arrow-left" color="#BE185D" size={30}/>
            </Pressable>
        </View>
    );
}

export default Header;