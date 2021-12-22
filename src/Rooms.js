import React from "react";
import { Text, Button } from "react-native";
import { Center } from "./Center";

export const Rooms = ({ navigation }) => {
  return (
    <Center>
      <Text>Hello from Rooms</Text>
      <Button title="Chat" onPress={() => navigation.navigate("Chat")}></Button>
    </Center>
  );
};
