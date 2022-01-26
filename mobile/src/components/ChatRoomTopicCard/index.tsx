import React from 'react';
import {Container, Text} from './style';

interface IChatRoomTopicCard {
  item: any;
}

const ChatRoomTopicCard: React.FC<IChatRoomTopicCard> = ({item}) => {
  return (
    <Container>
      <Text>{item.name}</Text>
    </Container>
  );
};

export default ChatRoomTopicCard;
