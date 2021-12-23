import React, { useState, useCallback, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GiftedChat } from "react-native-gifted-chat";
import { GET_CHAT_MESSAGES } from "./graphql/Queries";
import { StyleSheet } from "react-native";
import { customToolbar, customFooter, customMessageText } from "./CustomChat";

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
