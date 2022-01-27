import React, {useEffect, useState} from 'react';
import {Container, InputBox, Input, MessagesBox} from './style';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackPramsList} from '../../../App';
import {
  TouchableHighlight,
  StyleSheet,
  View,
  FlatList,
  BackHandler,
} from 'react-native';
import SendIcon from 'react-native-vector-icons/Ionicons';
import {ChatMessageComponent} from '../../components';
import {useRegister} from '../../../App';
import {useQuery, useSubscription, useMutation} from '@apollo/client';
import {
  GET_ALL_CHAT_MESSAGES,
  WATCH_NEW_MESSAGES,
  SEND_MESSAGE,
} from '../../gqlSchemas';

type Props = NativeStackScreenProps<RootStackPramsList, 'Chat'>;

const Chat: React.FC<Props> = ({route}) => {
  const {setChatRoomName, username, imageUrl} = useRegister();
  const [inputValue, setInputValue] = useState('');
  const [numberOfLines, setNumberOfLines] = useState(1);
  const [chatMessages, setChatMessages] = useState<any[]>([]);
  const queryResults = useQuery(GET_ALL_CHAT_MESSAGES, {
    variables: {roomId: route.params.roomId},
  });
  const subResult = useSubscription(WATCH_NEW_MESSAGES, {
    onSubscriptionData: e => {
      setChatMessages([e.subscriptionData.data.newMessage, ...chatMessages]);
    },
  });
  const [sendMessage] = useMutation(SEND_MESSAGE);

  if (subResult.error) {
    console.log(subResult.error);
  }

  if (
    queryResults.data &&
    queryResults.data.getAllChatMessages.length &&
    !chatMessages.length
  ) {
    const data = [...queryResults.data.getAllChatMessages];
    setChatMessages(data.reverse());
  }

  const handleSubmit = () => {
    if (inputValue) {
      setInputValue('');
      sendMessage({
        variables: {
          message: inputValue,
          author: username,
          authorImage: imageUrl,
          roomId: route.params.roomId,
        },
      });
    }
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      setChatRoomName('');
      setChatMessages([]);
      return false;
    });
  }, []);

  return (
    <Container>
      <MessagesBox
        data={chatMessages}
        inverted={true}
        contentContainerStyle={{alignItems: 'flex-start'}}
        renderItem={({item}: any) => (
          <ChatMessageComponent
            item={item}
            isMyMessage={item.author === username}
          />
        )}
        ListHeaderComponent={() => <View style={{width: '100%', height: 85}} />}
      />
      <InputBox>
        <Input
          onChangeText={val => {
            setInputValue(val);
            const lines = val.match(/\n/g);
            if (lines) {
              setNumberOfLines(lines.length);
            }
          }}
          value={inputValue}
          multiline
          numberOfLines={numberOfLines < 6 ? numberOfLines : 6}
        />
        <TouchableHighlight style={style.Touchable} onPress={handleSubmit}>
          <SendIcon name="send-sharp" size={30} color="#fff" />
        </TouchableHighlight>
      </InputBox>
    </Container>
  );
};

const style = StyleSheet.create({
  Touchable: {
    height: 60,
    width: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2A9D8F',
    elevation: 5,
  },
});

export default Chat;
