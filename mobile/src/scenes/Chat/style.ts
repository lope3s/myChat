import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background-color: #264653;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const MessagesBox = styled.FlatList`
  width: 100%;
`;

export const InputBox = styled.View`
  position: absolute;
  bottom: 10px;
  width: 100%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Input = styled.TextInput`
  width: 70%;
  max-height: 150px;
  background-color: #fff;
  elevation: 5;
  border-radius: 25px;
  font-weight: 600;
  font-size: 18px;
`;
