import React from 'react';
import {
  Container,
  TopicsContainer,
  TopicsContentContainer,
  AddButton,
} from './style';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackPramsList} from '../../../App';
import {ChatRoomTopicCard, ChatRoomImageSelectBox} from '../../components';
import {View, TouchableHighlight, StyleSheet} from 'react-native';
import AddIcon from 'react-native-vector-icons/Ionicons';
import {useRegister} from '../../../App';

type Props = NativeStackScreenProps<RootStackPramsList, 'ChatRoom'>;

const ChatRoom: React.FC<Props> = () => {
  const {chatRoomModal} = useRegister();

  return (
    <Container>
      {chatRoomModal ? <ChatRoomImageSelectBox /> : null}
      <TopicsContainer>
        <TopicsContentContainer
          data={[
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
            {name: 'asdf'},
          ]}
          renderItem={ChatRoomTopicCard}
          contentContainerStyle={{alignItems: 'center'}}
          ListFooterComponent={<View style={{width: '100%', height: 10}} />}
        />
      </TopicsContainer>
      <TouchableHighlight
        style={style.AddButton}
        onPress={() => console.log('aqui')}>
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
