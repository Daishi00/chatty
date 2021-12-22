import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Center } from "./Center";
import { useQuery } from "@apollo/client";
import Profile from "../assets/profile.svg";
import { GET_ROOMS_QUERY } from "./graphql/Queries";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Rooms = ({ navigation }) => {
  const { loading, error, data } = useQuery(GET_ROOMS_QUERY);
  if (loading) return <Text>"Loading..."</Text>;
  if (error) return <Text>`Error! ${error.message}`</Text>;

  const rooms = data.usersRooms.rooms;
  return (
    <Center>
      {rooms.map((room) => {
        const { name, id } = room;
        return (
          <TouchableOpacity
            style={styles.container}
            key={id}
            onPress={() =>
              navigation.navigate("Chat", {
                id: id,
              })
            }
          >
            <Profile width={70} height={70} />
            <Text style={styles.timeAgo}>24 m ago</Text>
            <Text style={styles.name}>{name}</Text>
          </TouchableOpacity>
        );
      })}
    </Center>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    marginBottom: 15,
    borderRadius: 20,
  },
  image: {
    width: 100,
    height: 100,
  },
  name: {
    marginLeft: 15,
    fontFamily: "Poppins-Regular",
    flex: 1,
    flexWrap: "wrap",
  },
  timeAgo: {
    position: "absolute",
    color: "#9FA2B2",
    fontSize: 12,
    top: 0,
    right: 0,
    paddingTop: 8,
    paddingRight: 16,
    fontFamily: "Poppins-Regular",
  },
});
