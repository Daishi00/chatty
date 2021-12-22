import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Rooms } from "./Rooms";
import { Chat } from "./Chat";
const Stack = createStackNavigator();

export const Routes = () => {
  return (
    <NavigationContainer initialRouteName="Rooms">
      <Stack.Navigator>
        <Stack.Screen name="Rooms" component={Rooms} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
