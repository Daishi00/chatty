import React, { useState, useCallback, useEffect } from "react";
import { useQuery } from "@apollo/client";
import {
  GiftedChat,
  InputToolbar,
  Send,
  MessageText,
  Composer,
} from "react-native-gifted-chat";
import { GET_CHAT_MESSAGES } from "./graphql/Queries";
import { StyleSheet } from "react-native";
import SendIcon from "../assets/send.svg";
import { View } from "react-native";

function customMessageText(props) {
  return (
    <MessageText
      {...props}
      containerStyle={{
        left: {
          backgroundColor: "#fff",
          padding: 6,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderBottomRightRadius: 15,
          marginLeft: 52,
          marginBottom: 12,
          width: 245,
        },
        right: {
          backgroundColor: "#993AFC",
          padding: 6,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderBottomLeftRadius: 15,
          width: 245,
        },
      }}
      textStyle={{
        left: {
          fontFamily: "Poppins-Regular",
        },
        right: { fontFamily: "Poppins-Regular" },
      }}
    ></MessageText>
  );
}
function customSend(props) {
  return (
    <Send {...props}>
      <SendIcon />
    </Send>
  );
}
function customFooter(props) {
  return <View style={{ height: 50 }} {...props}></View>;
}
function customComposer(props) {
  return (
    <View style={styles.inputContainer}>
      <Composer
        {...props}
        textInputStyle={{ backgroundColor: "" }}
        placeholder=""
      ></Composer>
    </View>
  );
}

function customToolbar(props) {
  return (
    <InputToolbar
      containerStyle={styles.toolbar}
      {...props}
      renderSend={(props) => customSend(props)}
      renderComposer={(props) => customComposer(props)}
    />
  );
}

export const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);
  const [idRoom, setIdRoom] = useState(route.params.id);
  const { loading, error, data } = useQuery(GET_CHAT_MESSAGES, {
    variables: { id: idRoom },
  });

  useEffect(() => {
    if (!loading) setData(data);
  }, [loading]);

  const setData = (data) => {
    const { messages } = data.room;
    setMessages(
      messages.map((item, value) => ({
        _id: value,
        text: item.body,
        user: {
          name: "mark",
        },
      }))
    );
  };

  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
  }, []);

  if (loading) return null;
  if (error) return `Error! ${error}`;

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      renderAvatar={null}
      renderMessageText={(props) => customMessageText(props)}
      renderInputToolbar={(props) => customToolbar(props)}
      alwaysShowSend={true}
      user={{
        _id: 5,
      }}
      renderChatFooter={(props) => customFooter(props)}
      renderTime={() => null}
    />
  );
};

const styles = StyleSheet.create({
  toolbar: {
    height: 100,
    backgroundColor: "#B6DEFD",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    justifyContent: "center",
  },
  inputContainer: {
    backgroundColor: "#fff",
    width: "75%",
    height: 50,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    marginLeft: 20,
    marginBottom: 30,
    marginRight: 10,
  },
});
