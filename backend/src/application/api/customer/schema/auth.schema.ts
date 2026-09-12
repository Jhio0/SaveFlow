import gql from "graphql-tag";

export const authSchema = gql`
  # AuthPayload is what signup and login return.
  # token: the JWT the client must store and send with future requests
  # user: basic info about who just logged in
  type AuthPayload {
    token: String!
    user: User!
  }
`;
