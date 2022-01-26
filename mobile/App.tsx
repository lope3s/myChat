import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  SetStateAction,
} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatRoom, UserRegister} from './src/scenes';
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client';
import {Header} from './src/components';

export interface IUserRegister {
  modal: boolean;
  imageUrl: string;
  username: string;
  chatRoomModal: boolean;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setChatRoomModal: React.Dispatch<React.SetStateAction<boolean>>;
  setNavigate: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserRegisterContext = createContext({} as IUserRegister);

export const useRegister = () => {
  const userRegister = useContext(UserRegisterContext);
  return userRegister;
};

export type RootStackPramsList = {
  Register: {navigate: boolean};
  ChatRoom: undefined;
};

const Stack = createNativeStackNavigator<RootStackPramsList>();

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const App: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [username, setUsername] = useState('');
  const [navigate, setNavigate] = useState(false);
  const [chatRoomModal, setChatRoomModal] = useState(false);

  return (
    <UserRegisterContext.Provider
      value={{
        modal,
        imageUrl,
        username,
        chatRoomModal,
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
            <Stack.Navigator screenOptions={{header: () => <Header />}}>
              <Stack.Screen name="ChatRoom" component={ChatRoom} />
            </Stack.Navigator>
          )}
        </NavigationContainer>
      </ApolloProvider>
    </UserRegisterContext.Provider>
  );
};

export default App;
