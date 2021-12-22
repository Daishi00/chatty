import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Search from "../assets/search.svg";
import Rooms from "../assets/rooms.svg";
export const Header = (props) => {
  console.log(props.children);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.children}</Text>
      <View style={styles.buttonContainer}>
        <Search style={styles.button} />
        <Rooms style={styles.button} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: "Poppins-Bold",
    color: "#5603AD",
  },

  buttonContainer: {
    flexDirection: "row",
  },
  button: {
    marginLeft: 8,
  },
});
