import React from 'react';
import {ActivityIndicator, Text} from 'react-native';
import {Container} from './style';

const Loading: React.FC = () => {
  return (
    <Container>
      <ActivityIndicator size={100} color="#E76F51" />
      <Text style={{color: '#fff', fontSize: 15}}>Loading...</Text>
    </Container>
  );
};

export default Loading;
