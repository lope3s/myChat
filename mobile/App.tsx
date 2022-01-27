import React, {useState, createContext, useContext} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {ChatRoom, UserRegister, Chat} from './src/scenes';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
  from,
} from '@apollo/client';
import {getMainDefinition} from '@apollo/client/utilities';
import {Header} from './src/components';
import {WebSocketLink} from '@apollo/client/link/ws';
import {onError} from '@apollo/client/link/error';
import {AppStateProvider} from './src/hook';

export type RootStackPramsList = {
  Register: {navigate: boolean};
  ChatRoom: undefined;
  Chat: {roomId: string};
};

const Stack = createNativeStackNavigator<RootStackPramsList>();

const httpLink = new HttpLink({
  uri: 'http://localhost:4000/',
});

const errorLink = onError(val => {
  console.log('err: ', val);
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
  link: from([errorLink, splitLink]),
  cache: new InMemoryCache({
    typePolicies: {
      Subscription: {
        fields: {
          allChatRooms: {
            merge(previous, incoming) {
              return incoming;
            },
          },
        },
      },
    },
  }),
});

interface IAppNavigationState {
  setNavigate: React.Dispatch<React.SetStateAction<boolean>>;
}

const AppNavigationState = createContext({} as IAppNavigationState);

export const useAppNavigation = () => {
  return useContext(AppNavigationState);
};

const App: React.FC = () => {
  const [navigate, setNavigate] = useState(false);

  return (
    <AppNavigationState.Provider value={{setNavigate}}>
      <AppStateProvider>
        <ApolloProvider client={client}>
          <NavigationContainer>
            {!navigate ? (
              <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Register" component={UserRegister} />
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
      </AppStateProvider>
    </AppNavigationState.Provider>
  );
};

export default App;
