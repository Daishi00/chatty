import React, { useEffect, useState } from "react"
import { Text, StyleSheet, View } from "react-native"
import Profile from "../assets/images/profile.svg"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useQuery } from "@apollo/client"
import { GET_CHAT_MESSAGES } from "../graphql/Queries"

export const Room = ({ name, id, navigation }) => {
  const [timeAgo, setTimeAgo] = useState("")

  const { loading, error, data } = useQuery(GET_CHAT_MESSAGES, {
    variables: { id: id },
    pollInterval: 500,
  })

  useEffect(() => {
    if (!loading) diff(data.room.messages[0].insertedAt)
  })

  function diff(oldDate) {
    let date = oldDate.split("")
    date.splice(10, 1, "T")
    date.splice(date.length, 0, "Z")
    let dateFormat = date.join("")
    const date1 = new Date(dateFormat)
    const date2 = new Date()

    const diff = (date2.getTime() - date1.getTime()) / 1000

    if (diff > 82800) {
      setTimeAgo(Math.abs(Math.round(diff / 86400)) + "d")
    } else if (diff > 3540) {
      setTimeAgo(Math.abs(Math.round(diff / 3600)) + "h")
    } else {
      setTimeAgo(Math.abs(Math.round(diff / 60)) + "m")
    }
  }

  if (loading) return null
  if (error) return `Error! ${error}`
  return (
    <TouchableOpacity
      style={styles.roomContainer}
      key={id}
      onPress={() =>
        navigation.navigate("Chat", {
          data: data,
        })
      }
    >
      <Profile width={70} height={70} />
      <Text style={styles.timeAgo}>{timeAgo} ago </Text>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>
        <Text numberOfLines={1} style={styles.lastMessage}>
          {data.room.messages[0].body}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

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

  textContainer: {
    width: 260,
    marginLeft: 14,
  },

  name: {
    fontFamily: "Poppins-SemiBold",
    flex: 1,
    flexWrap: "wrap",
    width: 220,
  },
  lastMessage: {
    fontFamily: "Poppins-Regular",
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
})
