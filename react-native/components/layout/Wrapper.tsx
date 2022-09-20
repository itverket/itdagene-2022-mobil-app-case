import { FC } from "react";
import { SafeAreaView } from "react-native";
import layoutStyles from "./style";

type WrapperProps = {
    children: React.ReactNode;
}
export const Wrapper: FC<WrapperProps> = ({ children }) => (
    <SafeAreaView style={layoutStyles.wrapper}>
        {children}
    </SafeAreaView>
);
