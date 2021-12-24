import React from "react"
import { Text, StyleSheet, View } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"

export const AuthSwitch = ({ text, buttonText, onPress }) => {
  return (
    <View style={styles.alreadyContainer}>
      <Text style={styles.alreadyText}>{text}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.login}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  alreadyContainer: {
    marginTop: 32,
    width: "100%",
    justifyContent: "space-evenly",
    flexDirection: "row",
  },
  alreadyText: {
    fontFamily: "Poppins-Regular",
    textAlign: "center",
    color: "#fff",
  },
  login: {
    fontFamily: "Poppins-SemiBold",
    color: "#5603AD",
  },
})
