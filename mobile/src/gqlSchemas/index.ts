import {gql} from '@apollo/client';

export const GET_CHARACTERS_IMAGES = gql`
  query GetCharacters($page: Int!) {
    getPaginatedCharactersData(page: $page) {
      info {
        pages
      }
      results {
        name
        image
      }
    }
  }
`;

export const CHECK_USER_DATA = gql`
  query CheckUserData($id: String!) {
    checkUserData(id: $id) {
      imageUrl
      username
      id
    }
  }
`;

export const GET_CHAT_ROOMS = gql`
  query GetChatRoms {
    getChatRooms
  }
`;

export const GET_ALL_CHAT_MESSAGES = gql`
  query GetAllChatMessages($roomId: String!) {
    getAllChatMessages(roomId: $roomId) {
      author
      authorImage
      message
    }
  }
`;

export const DELETE_CHAT_ROOM = gql`
  mutation DeleteChatRoom($roomId: String!) {
    deleteChatRoom(roomId: $roomId)
  }
`;

export const REGISTER_USER = gql`
  mutation ResgisterUser($imageUrl: String!, $username: String!) {
    registerUser(imageUrl: $imageUrl, username: $username) {
      id
    }
  }
`;

export const UPDATE_USER_IMAGE = gql`
  mutation UpdateUserImage($imageUrl: String!, $username: String!) {
    updateUserImage(imageUrl: $imageUrl, username: $username) {
      imageUrl
    }
  }
`;

export const REGISTER_CHAT_ROOM = gql`
  mutation RegisterChatRoom($userId: String!, $roomName: String!) {
    registerChatRoom(userId: $userId, roomName: $roomName) {
      id
      roomName
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation SendMessage(
    $authorImage: String!
    $author: String!
    $roomId: String!
    $message: String!
  ) {
    postMessage(
      authorImage: $authorImage
      author: $author
      roomId: $roomId
      message: $message
    ) {
      author
      authorImage
      message
    }
  }
`;

export const WATCH_CHAT_ROOMS = gql`
  subscription OnChatRoomAdded {
    allChatRooms {
      id
      roomName
      user {
        id
      }
    }
  }
`;

export const WATCH_NEW_MESSAGES = gql`
  subscription OnNewMessage {
    newMessage {
      author
      authorImage
      message
    }
  }
`;
