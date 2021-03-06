import { gql } from "@apollo/client"

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
`

export const GET_CHAT_MESSAGES = gql`
  query roomMessage($id: ID!) {
    room(id: $id) {
      messages {
        body
        insertedAt
        user {
          firstName
          id
        }
      }
      name
      id
      user {
        firstName
      }
    }
  }
`
