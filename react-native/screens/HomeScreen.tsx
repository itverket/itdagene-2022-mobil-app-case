import React from "react";
import { Wrapper } from "../components/layout/Wrapper";

import { Text } from "../components/Themed";
import { RootTabScreenProps } from "../types";

export const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {

  return (
    <Wrapper>
      <Text>Home Screen</Text>
    </Wrapper>
  );
};
