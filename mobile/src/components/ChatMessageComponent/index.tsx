import React from 'react';
import {Message, Text, Author, TextBox} from './style';

interface IChatMessageComponent {
  item: {message: string; author: string; authorImage: string};
  isMyMessage: boolean;
}

const ChatMessageComponent: React.FC<IChatMessageComponent> = ({
  item,
  isMyMessage,
}) => {
  return (
    <Message isMyMessage={isMyMessage}>
      <TextBox>
        <Author isMyMessage={isMyMessage}> {item.author} </Author>
        <Text>{item.message}</Text>
      </TextBox>
    </Message>
  );
};

export default ChatMessageComponent;
