import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 70px;
  background-color: #2a9d8f;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

export const Image = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
`;

export const Title = styled.Text`
  font-weight: 600;
  font-size: 24px;
  color: #fff;
`;
