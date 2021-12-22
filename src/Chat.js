import React, { useState, useCallback, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GiftedChat } from "react-native-gifted-chat";
import { GET_CHAT_MESSAGES } from "./graphql/Queries";

export const Chat = ({ route }) => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "hello",
      createdAt: new Date(),
      user: {
        _id: 2,
        name: "React Native",
        avatar: "https://placeimg.com/140/140/any",
      },
    },
  ]);
  const [idRoom, setIdRoom] = useState(route.params.id);
  const { loading, error, data } = useQuery(GET_CHAT_MESSAGES, {
    variables: { id: idRoom },
  });

  useEffect(() => {
    if (!loading) setData(data);
  }, [loading]);

  const setData = (data) => {
    const { messages } = data.room;
    console.log(messages);
    setMessages(
      messages.map((item, value) => ({
        _id: value,
        text: item.body,
        createdAt: new Date(),
        user: {
          _id: value + 1,
          name: "Mark",
          avatar: "https://placeimg.com/140/140/any",
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
      user={{
        _id: 5,
      }}
    />
  );
};
