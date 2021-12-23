import React, { useState, useCallback, useEffect } from "react";
import { GiftedChat } from "react-native-gifted-chat";
import { customToolbar, customFooter, customMessageText } from "./CustomChat";

export const Chat = ({ route }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const data = route.params.data;
    setData(data);
  }, []);

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
