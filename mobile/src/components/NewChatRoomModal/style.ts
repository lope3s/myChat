import styled from 'styled-components/native';

export const Container = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

export const Content = styled.View`
  width: 95%;
  min-height: 270px;
  height: 40%;
  border-radius: 30px;
  background-color: #fff;
  elevation: 10;
  justify-content: center;
  align-items: center;
`;

export const Input = styled.TextInput`
  width: 80%;
  height: 50px;
  elevation: 5;
  background-color: #f4f4f4f4;
  padding-left: 10px;
  border-radius: 10px;
`;

export const Button = styled.View`
  flex: 1;
  background-color: #2a9d8f;
  elevation: 5;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 18px;
`;

export const ErrorMessage = styled.Text`
  color: #e76f51;
  font-size: 18px;
`;
