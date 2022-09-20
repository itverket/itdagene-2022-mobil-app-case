import React from "react";
import { Wrapper } from "../components/layout/Wrapper";

import { Text } from "../components/Themed";
import { useFetchEmployees } from "../hooks/useFetchEmployees";
import { RootTabScreenProps } from "../types";
import { GibbershScreen } from "./Gibbersh";

export const HomeScreen = ({ navigation }: RootTabScreenProps<"Home">) => {

  const {employees} = useFetchEmployees()

  //first ten employees
  let employeesToList = employees?.slice(0,11)

  return (
    employeesToList != undefined && employeesToList?.length>=0 &&
    <Wrapper>
      {/* <Text>Home Sscreen</Text> */}
      <GibbershScreen employees={employeesToList}/>
    </Wrapper>
  );
};
