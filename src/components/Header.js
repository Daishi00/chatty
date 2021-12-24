import React from "react"
import { View, Text, StyleSheet, TouchableOpacity } from "react-native"
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
          <TouchableOpacity>
            <Search height={44} width={44} style={styles.button} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Rooms height={44} width={44} style={styles.button} />
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity>
            <Phone height={44} width={44} style={styles.button} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Video height={44} width={44} style={styles.button} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
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

  roomTitleContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20,
  },

  roomTitle: {
    fontFamily: "Poppins-SemiBold",
    marginLeft: 10,
    color: `#5603AD`,
    fontSize: 14,
    textAlign: "center",
  },
})
