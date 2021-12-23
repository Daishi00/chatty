import React from "react";
import { Text, StyleSheet } from "react-native";
import Profile from "../assets/profile.svg";
import { TouchableOpacity } from "react-native-gesture-handler";

export const Room = ({ name, id, navigation }) => {
  return (
    <TouchableOpacity
      style={styles.roomContainer}
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
      <Text style={styles.lastMessage}>last message</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  roomContainer: {
    width: "100%",
    height: 90,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    padding: 20,
    marginTop: 15,
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
