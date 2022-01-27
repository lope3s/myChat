import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  SetStateAction,
} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatRoom, UserRegister, Chat} from './src/scenes';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {Header} from './src/components';
import {WebSocketLink} from '@apollo/client/link/ws';

export interface IUserRegister {
  modal: boolean;
  imageUrl: string;
  username: string;
  chatRoomModal: boolean;
  userId: string;
  chatRoomName: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setChatRoomModal: React.Dispatch<React.SetStateAction<boolean>>;
  setNavigate: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setChatRoomName: React.Dispatch<React.SetStateAction<string>>;
}

const UserRegisterContext = createContext({} as IUserRegister);

export const useRegister = () => {
  const userRegister = useContext(UserRegisterContext);
  return userRegister;
};

export type RootStackPramsList = {
  Register: {navigate: boolean};
  ChatRoom: undefined;
  Chat: {roomId: string};
};

const Stack = createNativeStackNavigator<RootStackPramsList>();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/',
});

const wsLink = new WebSocketLink({
  uri: 'ws://localhost:4000/graphql',
  options: {
    reconnect: true,
  },
});

const splitLink = split(
  ({query}) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    );
  },
  wsLink,
  httpLink,
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [username, setUsername] = useState('');
  const [navigate, setNavigate] = useState(false);
  const [chatRoomModal, setChatRoomModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [chatRoomName, setChatRoomName] = useState('');

  return (
    <UserRegisterContext.Provider
      value={{
        modal,
        imageUrl,
        username,
        chatRoomModal,
        userId,
        chatRoomName,
        setChatRoomName,
        setUserId,
        setChatRoomModal,
        setUsername,
        setImageUrl,
        setModal,
        setNavigate,
      }}>
      <ApolloProvider client={client}>
        <NavigationContainer>
          {!navigate ? (
            <Stack.Navigator screenOptions={{headerShown: false}}>
              <Stack.Screen
                name="Register"
                component={UserRegister}
                initialParams={{navigate}}
              />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator
              screenOptions={{header: props => <Header {...props} />}}>
              <Stack.Screen name="ChatRoom" component={ChatRoom} />
              <Stack.Screen name="Chat" component={Chat} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </ApolloProvider>
    </UserRegisterContext.Provider>
  );
};

export default App;
