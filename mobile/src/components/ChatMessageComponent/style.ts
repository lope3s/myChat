import styled from 'styled-components/native';

interface IMessage {
  isMyMessage?: boolean;
}

export const Message = styled.View<IMessage>`
  width: 100%;
  flex-direction: row;
  justify-content: ${props => (props.isMyMessage ? 'flex-end' : 'flex-start')};
  margin: 10px 0;
  padding: 0 30px;
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
  align-self: flex-end;
  margin-right: 8px;
`;
