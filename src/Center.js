import React from "react";
import { View } from "react-native";

export const Center = ({ children }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "flex-start",
        backgroundColor: "#F0F8FF",
        marginTop: 30,
        fontFamily: "Poppins",
      }}
    >
      {children}
    </View>
  );
};
