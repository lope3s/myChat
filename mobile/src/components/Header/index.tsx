import React from 'react';
import {TouchableHighlight, StyleSheet} from 'react-native';
import {Container, Title, Image} from './style';
import {useRegister} from '../../../App';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import ArrowIcon from 'react-native-vector-icons/AntDesign';

type Props = NativeStackHeaderProps;

const Header: React.FC<Props> = ({route, navigation}) => {
  const {
    username,
    imageUrl,
    setChatRoomModal,
    chatRoomModal,
    chatRoomName,
    setChatRoomName,
  } = useRegister();

  return (
    <Container>
      {route.name === 'Chat' ? (
        <TouchableHighlight
          style={style.ArrowTouch}
          underlayColor="#00000040"
          onPress={() => {
            setChatRoomName('');
            navigation.goBack();
          }}>
          <ArrowIcon name="arrowleft" size={30} color="#264653" />
        </TouchableHighlight>
      ) : null}
      <Title>{chatRoomName ? chatRoomName : username}</Title>
      <TouchableHighlight
        onPress={() => {
          if (route.name === 'ChatRoom') {
            setChatRoomModal(!chatRoomModal);
          }
        }}
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
  ArrowTouch: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Header;
