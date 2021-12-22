import React from "react";
import { Text, Button } from "react-native";
import { Center } from "./Center";
import { useQuery } from "@apollo/client";
import { GET_ROOMS_QUERY } from "./graphql/Queries";

export const Rooms = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_ROOMS_QUERY);
  if (loading) return <Text>"Loading..."</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  console.log(data);
  return (
    <Center>
      <Text>Hello from Rooms</Text>
      <Button title="Chat" onPress={() => navigation.navigate("Chat")}></Button>
    </Center>
  );
};
