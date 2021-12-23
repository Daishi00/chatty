import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { GET_ROOMS_QUERY } from "./graphql/Queries";
import { Room } from "./Room";

export const RoomsList = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_ROOMS_QUERY);
  if (loading) return <Text>"Loading..."</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  const rooms = data.usersRooms.rooms;

  return (
    <View style={styles.container}>
      {rooms.map((room) => {
        const { name, id } = room;
        return <Room name={name} id={id} navigation={navigation} key={id} />;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 36,
  },
});
