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

export const GET_CHAT_MESSAGES = gql`
query roomMessage(){
  room(id: $id){
    messages {
      body
		user {
  	id
		}
    }
    name
    id
  }
`;
