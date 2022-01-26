import React from 'react';
import {TouchableHighlight, StyleSheet} from 'react-native';
import {Container, Title, Image} from './style';
import {useRegister} from '../../../App';

const Header: React.FC = () => {
  const {username, imageUrl, setChatRoomModal, chatRoomModal} = useRegister();

  return (
    <Container>
      <Title>{username}</Title>
      <TouchableHighlight
        onPress={() => setChatRoomModal(!chatRoomModal)}
        style={style.Touchable}>
        <Image source={{uri: imageUrl}} />
      </TouchableHighlight>
    </Container>
  );
};

const style = StyleSheet.create({
  Touchable: {
    borderRadius: 30,
  },
});

export default Header;
