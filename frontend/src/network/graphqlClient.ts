import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import * as SecureStore from "expo-secure-store";

const TOKEN_KEY = "auth_token";

const httpLink = new HttpLink({
  uri: "http://192.168.1.163:5000/graphql",
});

const authLink = new SetContextLink(async (prevContext) => {
  const token = await SecureStore.getItemAsync(TOKEN_KEY);

  return {
    headers: {
      ...prevContext.headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
