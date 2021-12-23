import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";
import { Header } from "./Header";
import { API_TOKEN } from "@env";
import { RoomsList } from "./RoomsList.js";
import { Chat } from "./Chat";
import { TouchableOpacity } from "react-native-gesture-handler";
import Back from "../assets/back.svg";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

const getFonts = () =>
  Font.loadAsync({
    "Poppins-Regular": require("../assets/fonts/Poppins-Regular.ttf"),
    "Poppins-Bold": require("../assets/fonts/Poppins-Bold.ttf"),
    "Poppins-SemiBold": require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

import { setContext } from "@apollo/client/link/context";

const Stack = createStackNavigator();

export const Routes = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [tokenUser, setToken] = useState("");

  //Refactor later

  storeData = () => {
    AsyncStorageLib.setItem("token", API_TOKEN);
  };

  retrieveData = async () => {
    let token = await AsyncStorageLib.getItem("token");
    return token;
  };

  const httpLink = createHttpLink({
    uri: "https://chat.thewidlarzgroup.com/api/graphiql",
  });

  const authLink = setContext((_, { headers }) => {
    retrieveData().then((res) => setToken(res));

    return {
      headers: {
        ...headers,
        authorization: tokenUser ? `Bearer ${tokenUser}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  return (
    <ApolloProvider client={client}>
      <NavigationContainer initialRouteName="Rooms">
        {fontsLoaded ? (
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: "#B6DEFD",
                height: 120,
                borderBottomLeftRadius: 24,
                borderBottomRightRadius: 24,
              },
              headerTintColor: "#5603AD",
              headerTitleStyle: {
                fontWeight: "bold",
                fontSize: 28,
              },
            }}
          >
            <Stack.Screen
              name="Rooms"
              component={RoomsList}
              options={{ headerTitle: (props) => <Header {...props} /> }}
            />
            <Stack.Screen
              name="Chat"
              component={Chat}
              options={({ navigation, route }) => ({
                headerTitle: () => <Header {...route} />,
                headerLeft: () => (
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Rooms")}
                  >
                    <Back
                      color="#fff"
                      width={22}
                      height={22}
                      style={{ marginLeft: 15, marginTop: 15, marginRight: 15 }}
                    />
                  </TouchableOpacity>
                ),
              })}
            />
          </Stack.Navigator>
        ) : (
          <AppLoading
            startAsync={getFonts}
            onFinish={() => setFontsLoaded(true)}
            onError={() => console.log("error")}
          />
        )}
      </NavigationContainer>
    </ApolloProvider>
  );
};
