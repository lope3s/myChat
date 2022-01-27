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
import {useRegister} from '../../../App';
import {useSubscription, useLazyQuery} from '@apollo/client';
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
  const {chatRoomModal, userId, setChatRoomName} = useRegister();
  const {data, error} = useSubscription(WATCH_CHAT_ROOMS);
  const [query] = useLazyQuery(GET_CHAT_ROOMS);
  const [newChatRoomModalDisplay, setNewChatRoomModalDisplay] = useState(false);

  if (error) {
    Alert.alert('Erro ao criar a sala', error.message);
  }

  const sortArray = (array: IAllChatRooms[]) => {
    const myRoom = array.find(val => val.user.id === userId);

    if (myRoom) {
      return [myRoom, ...array.filter(val => val.user.id !== userId)];
    }

    return array;
  };

  useEffect(() => {
    query();
  }, [query]);

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
          data={data?.allChatRooms?.length ? sortArray(data?.allChatRooms) : []}
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
