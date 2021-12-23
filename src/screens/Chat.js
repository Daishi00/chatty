import React, { useState, useCallback, useEffect } from "react"
import { GiftedChat } from "react-native-gifted-chat"
import {
  customToolbar,
  customFooter,
  customMessageText,
} from "../components/CustomChat"
import { SEND_MESSAGE } from "../graphql/Mutations"
import { GET_CHAT_MESSAGES } from "../graphql/Queries"
import { useMutation, useQuery } from "@apollo/client"
export const Chat = ({ route }) => {
  const myId = "250f4cab-065b-44fe-a927-506215a1b1a4"
  const [messages, setMessages] = useState([])

  const [sendMessage, { data, loading, error }] = useMutation(SEND_MESSAGE)

  //need here due to polling

  const {
    loading: messageLoading,
    error: messageError,
    data: messageData,
  } = useQuery(GET_CHAT_MESSAGES, {
    variables: { id: route.params.data.room.id },
    pollInterval: 500,
  })

  useEffect(() => {
    setData(messageData)
  }, [messageData])

  const setData = data => {
    const { messages } = data.room
    setMessages(
      messages.map((item, value) => ({
        _id: value,
        text: item.body,
        createdAt: new Date(),
        user: {
          _id: item.user.id,
          name: item.user.firstName,
        },
      }))
    )
  }
  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    )
    sendMessage({
      variables: {
        body: `${messages[0].text}`,
        roomId: route.params.data.room.id,
      },
    })
  }, [])

  if (messageError) return <Text>Loading error {error.message}</Text>
  if (error) return <Text>Submission error! {error.message}</Text>

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      renderAvatar={null}
      renderBubble={props => customMessageText(props)}
      renderInputToolbar={props => customToolbar(props)}
      alwaysShowSend={true}
      renderDay={() => null}
      user={{
        _id: myId,
      }}
      renderChatFooter={props => customFooter(props)}
      renderTime={() => null}
    />
  )
}
