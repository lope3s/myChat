import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #e9c46a;
`;

export const Title = styled.Text`
  font-size: 28px;
  color: #2a9d8f;
  font-weight: 600;
`;

export const TextInput = styled.TextInput`
  width: 80%;
  height: 50px;
  border-bottom-width: 2px;
  border-bottom-color: #f4a261;
  padding-bottom: 0;
  color: #fff;
`;

interface IButtonContainer {
  deElevate: boolean;
}

export const ButtonContainer = styled.TouchableHighlight<IButtonContainer>`
  border-radius: 10px;
  width: 50%;
  height: 50px;
  overflow: hidden;
  margin-top: 50px;
  elevation: ${props => (!props.deElevate ? 5 : 0)};
`;

export const Button = styled.View`
  justify-content: center;
  align-items: center;
  background-color: #2a9d8f;
  width: 100%;
  height: 100%;
`;

export const ErrorMessage = styled.Text`
  color: #e76f51;
  font-size: 18px;
`;

export const Loading = styled.View`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #e9c46a;
  justify-content: center;
  align-items: center;
`;
