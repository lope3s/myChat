import styled from 'styled-components/native';

export const Container = styled.Pressable`
  width: 300px;
  height: 50px;
  background-color: #264653;
  border-radius: 10px;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
  flex-direction: row;
  padding: 0 30px;
  elevation: 10;
`;

export const Text = styled.Text`
  font-weight: 600;
  font-size: 18px;
  color: #fff;
`;
