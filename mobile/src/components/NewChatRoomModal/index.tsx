import React, {useState, useEffect} from 'react';
import {Container, Content, Input, Button, Text, ErrorMessage} from './style';
import {useMutation} from '@apollo/client';
import {REGISTER_CHAT_ROOM} from '../../gqlSchemas';
import {TouchableHighlight, StyleSheet, Alert, Keyboard} from 'react-native';
import {useAppState} from '../../hook/AppState';

interface INewChatRoomModal {
  setNewChatRoomModalDisplay: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewChatRoomModal: React.FC<INewChatRoomModal> = ({
  setNewChatRoomModalDisplay,
}) => {
  const {userId} = useAppState();
  const [inputValue, setInputValue] = useState('');
  const [inputError, setInputError] = useState('');
  const [registerChatRoom, {data, error, reset}] =
    useMutation(REGISTER_CHAT_ROOM);

  if (error) {
    Alert.alert('Error while creating chat room', error.message);
    reset();
  }

  const handleSubmit = () => {
    if (!inputValue) {
      setInputError('Set a subject to the room');
      return;
    }

    Keyboard.dismiss();
    setInputError('');
    registerChatRoom({variables: {userId, roomName: inputValue}});
  };

  useEffect(() => {
    if (data) {
      setNewChatRoomModalDisplay(false);
      reset();
    }
  }, [data]);

  return (
    <Container onPress={() => setNewChatRoomModalDisplay(false)}>
      <Content
        onStartShouldSetResponder={e => {
          e.stopPropagation();
          return false;
        }}>
        <Input
          placeholder="Set the room topic"
          onChangeText={val => {
            setInputValue(val);
            setInputError('');
          }}
          value={inputValue}
        />
        {inputError ? <ErrorMessage>{inputError}</ErrorMessage> : null}
        <TouchableHighlight style={style.Touchable} onPress={handleSubmit}>
          <Button>
            <Text>Create room</Text>
          </Button>
        </TouchableHighlight>
      </Content>
    </Container>
  );
};

const style = StyleSheet.create({
  Touchable: {
    width: '50%',
    minHeight: 45,
    borderRaiuds: 10,
    marginTop: 20,
  },
});

export default NewChatRoomModal;
