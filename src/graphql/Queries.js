import { gql } from "@apollo/client";

export const GET_ROOMS_QUERY = gql`
  query UserRooms {
    usersRooms {
      user {
        email
        firstName
        lastName
        id
        role
      }
      rooms {
        id
        name
      }
    }
  }
`;
