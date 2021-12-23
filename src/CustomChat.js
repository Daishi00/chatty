import { StyleSheet, View } from "react-native";
import {
  InputToolbar,
  Send,
  Composer,
  MessageText,
} from "react-native-gifted-chat";
import SendIcon from "../assets/send.svg";

function customSend(props) {
  return (
    <Send {...props}>
      <SendIcon />
    </Send>
  );
}

function customComposer(props) {
  return (
    <View style={styles.inputContainer}>
      <Composer {...props} placeholder=""></Composer>
    </View>
  );
}

export function customToolbar(props) {
  return (
    <InputToolbar
      containerStyle={styles.toolbar}
      {...props}
      renderSend={(props) => customSend(props)}
      renderComposer={(props) => customComposer(props)}
    />
  );
}

export function customFooter(props) {
  return <View style={{ height: 50 }} {...props}></View>;
}

export function customMessageText(props) {
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
