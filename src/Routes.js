import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorageLib from "@react-native-async-storage/async-storage";
import { API_TOKEN } from "@env";

import { Rooms } from "./Rooms";
import { Chat } from "./Chat";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

const Stack = createStackNavigator();

export const Routes = () => {
  const [tokenUser, setToken] = useState("");

  //Refactor later

  storeData = () => {
    AsyncStorageLib.setItem("token", API_TOKEN);
  };

  retrieveData = async () => {
    let token = await AsyncStorageLib.getItem("token");
    return token;
  };

  console.log(retrieveData());
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
        <Stack.Navigator>
          <Stack.Screen name="Rooms" component={Rooms} />
          <Stack.Screen name="Chat" component={Chat} />
        </Stack.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
};
