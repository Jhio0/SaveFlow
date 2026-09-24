import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

// Initialize Apollo Client
export const client = new ApolloClient({
  link: new HttpLink({ uri: "http://192.168.1.163:5000/graphql" }),
  cache: new InMemoryCache(),
});
