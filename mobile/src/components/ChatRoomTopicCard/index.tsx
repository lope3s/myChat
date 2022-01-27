import React, {useState} from 'react';
import {Container, Text} from './style';
import TrashIcon from 'react-native-vector-icons/Feather';
import {TouchableHighlight, StyleSheet, Alert} from 'react-native';
import {useMutation} from '@apollo/client';
import {DELETE_CHAT_ROOM} from '../../gqlSchemas';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RootStackPramsList} from '../../../App';

interface IChatRoomTopicCard {
  item: any;
  userId: string;
  navigation: NativeStackNavigationProp<RootStackPramsList, 'ChatRoom'>;
  setChatRoomName: React.Dispatch<React.SetStateAction<string>>;
}

const ChatRoomTopicCard: React.FC<IChatRoomTopicCard> = ({
  item,
  userId,
  navigation,
  setChatRoomName,
}) => {
  const [validation] = useState(userId === item.user.id);
  const [deleteChat, {error, reset}] = useMutation(DELETE_CHAT_ROOM);

  if (error) {
    Alert.alert('Erro in deleting chat room');
    reset();
  }

  return (
    <Container
      onPress={() => {
        navigation.navigate({name: 'Chat', params: {roomId: item.id}});
        setChatRoomName(item.roomName);
      }}>
      <Text>{item.roomName}</Text>
      {validation ? (
        <TouchableHighlight
          onPress={e => {
            e.stopPropagation();
            deleteChat({variables: {roomId: item.id}});
          }}
          underlayColor="#00000040"
          style={style.Touchable}>
          <TrashIcon name="trash-2" size={25} color="#E76F51" />
        </TouchableHighlight>
      ) : null}
    </Container>
  );
};

const style = StyleSheet.create({
  Touchable: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatRoomTopicCard;
