import React from 'react';
import {Message, Text, Author, TextBox, Image} from './style';

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
      {!isMyMessage ? <Image source={{uri: item.authorImage}} /> : null}
      <TextBox>
        <Author isMyMessage={isMyMessage}> {item.author} </Author>
        <Text>{item.message}</Text>
      </TextBox>
      {isMyMessage ? (
        <Image source={{uri: item.authorImage}} isMyMessage={isMyMessage} />
      ) : null}
    </Message>
  );
};

export default ChatMessageComponent;
