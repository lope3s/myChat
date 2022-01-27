import styled from 'styled-components/native';

interface IMessage {
  isMyMessage?: boolean;
}

export const Message = styled.View<IMessage>`
  width: 100%;
  flex-direction: row;
  justify-content: ${props => (props.isMyMessage ? 'flex-end' : 'flex-start')};
  margin: 10px 0;
  padding: 0 10px;
  align-items: center;
`;

export const TextBox = styled.View`
  background-color: #2a9d8f;
  max-width: 250px;
  border-radius: 10px;
`;

export const Text = styled.Text`
  color: #fff;
  font-weight: 600;
  padding: 10px;
`;

export const Author = styled.Text<IMessage>`
  color: ${props => (props.isMyMessage ? '#E9C46A' : '#E76F51')};
  font-size: 14px;
  font-weight: 600;
  align-self: flex-start;
  margin-left: 8px;
`;

export const Image = styled.Image<IMessage>`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-right: ${props => (!props.isMyMessage ? '10px' : '0px')};
  margin-left: ${props => (props.isMyMessage ? '10px' : '0px')};
`;
