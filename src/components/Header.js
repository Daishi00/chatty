import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Search from "../assets/images/search.svg"
import Rooms from "../assets/images/rooms.svg"
import Video from "../assets/images/videocall.svg"
import Phone from "../assets/images/phone.svg"
import Profile from "../assets/images/profile.svg"
export const Header = props => {
  return (
    <View style={styles.container}>
      {props.children ? (
        <Text style={styles.title}>{props.children}</Text>
      ) : (
        <View style={styles.roomTitleContainer}>
          <Profile height={44} width={44} style={styles.avatar} />
          <Text style={styles.roomTitle}>{props.params.data.room.name}</Text>
        </View>
      )}
      {props.children === "Rooms" ? (
        <View style={styles.buttonContainer}>
          <Search height={44} width={44} style={styles.button} />
          <Rooms height={44} width={44} style={styles.button} />
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Phone height={44} width={44} style={styles.button} />
          <Video height={44} width={44} style={styles.button} />
        </View>
      )}
    </View>
  )
}

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
    marginLeft: 25,
  },
  button: {
    marginLeft: 8,
  },

  roomTitleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },

  roomTitle: {
    fontFamily: "Poppins-SemiBold",
    marginLeft: 10,
    color: `#5603AD`,
  },
  avatar: {},
})
