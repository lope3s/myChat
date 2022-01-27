import React, {useState, useEffect} from 'react';
import {
  Container,
  TopicsContainer,
  TopicsContentContainer,
  AddButton,
} from './style';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackPramsList} from '../../../App';
import {
  ChatRoomTopicCard,
  ChatRoomImageSelectBox,
  NewChatRoomModal,
} from '../../components';
import {View, TouchableHighlight, StyleSheet, Alert} from 'react-native';
import AddIcon from 'react-native-vector-icons/Ionicons';
import {useAppState} from '../../hook/AppState';
import {useSubscription, useQuery} from '@apollo/client';
import {WATCH_CHAT_ROOMS, GET_CHAT_ROOMS} from '../../gqlSchemas';

type Props = NativeStackScreenProps<RootStackPramsList, 'ChatRoom'>;

interface IAllChatRooms {
  id: string;
  roomName: string;
  user: {
    id: string;
  };
}

const ChatRoom: React.FC<Props> = ({navigation}) => {
  const {chatRoomModal, userId, setChatRoomName} = useAppState();
  const [chatRooms, setChatRooms] = useState([]);
  const {data, error} = useSubscription(WATCH_CHAT_ROOMS, {
    onSubscriptionData: ({subscriptionData}) => {
      console.log('aqui');
      setChatRooms(subscriptionData.data.allChatRooms);
    },
  });
  const queryState = useQuery(GET_CHAT_ROOMS);
  const [newChatRoomModalDisplay, setNewChatRoomModalDisplay] = useState(false);

  if (error) {
    Alert.alert('Error at creating a new chat room', error.message);
  }

  const sortArray = (array: IAllChatRooms[]) => {
    const myRoom = array.find(val => val.user.id === userId);

    if (myRoom) {
      return [myRoom, ...array.filter(val => val.user.id !== userId)];
    }

    return array;
  };

  useEffect(() => {
    if (queryState.data && !chatRooms.length && !data) {
      setChatRooms(queryState.data.getChatRooms);
    }
  }, [queryState]);

  return (
    <Container>
      {chatRoomModal ? <ChatRoomImageSelectBox /> : null}
      {newChatRoomModalDisplay ? (
        <NewChatRoomModal
          setNewChatRoomModalDisplay={setNewChatRoomModalDisplay}
        />
      ) : null}
      <TopicsContainer>
        <TopicsContentContainer
          data={sortArray(chatRooms)}
          renderItem={({item}) => (
            <ChatRoomTopicCard
              item={item}
              userId={userId}
              navigation={navigation}
              setChatRoomName={setChatRoomName}
            />
          )}
          contentContainerStyle={{alignItems: 'center'}}
          ListFooterComponent={<View style={{width: '100%', height: 10}} />}
        />
      </TopicsContainer>
      <TouchableHighlight
        style={style.AddButton}
        onPress={() => setNewChatRoomModalDisplay(true)}>
        <AddButton>
          <AddIcon name="add" size={44} />
        </AddButton>
      </TouchableHighlight>
    </Container>
  );
};

const style = StyleSheet.create({
  AddButton: {
    marginTop: 30,
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
  },
});

export default ChatRoom;
