import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Search from "../assets/search.svg";
import Rooms from "../assets/rooms.svg";
import Video from "../assets/videocall.svg";
import Phone from "../assets/phone.svg";
export const Header = (props) => {
  console.log(props);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{props.children}</Text>
      {props.children === "Rooms" ? (
        <View style={styles.buttonContainer}>
          <Search style={styles.button} />
          <Rooms style={styles.button} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Video style={styles.button} />
          <Phone style={styles.button} />
        </View>
      )}
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
