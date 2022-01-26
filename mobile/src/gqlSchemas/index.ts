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
    }
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
