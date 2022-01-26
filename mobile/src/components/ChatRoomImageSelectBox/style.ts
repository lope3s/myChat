import styled from 'styled-components/native';

export const Container = styled.Pressable`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  //background-color: #000;
  z-index: 1;
`;

export const Content = styled.View`
  width: 95%;
  height: 70%;
  border-radius: 30px;
  background-color: #fff;
  elevation: 10;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

export const ImageContainer = styled.TouchableHighlight`
  width: 70px;
  height: 70px;
  margin: 4px 4px;
  border-radius: 35px;
  overflow: hidden;
`;

export const Image = styled.Image`
  width: 100%;
  height: 100%;
  border-radius: 75px;
`;
export const ImageContainerButtonBox = styled.View`
  width: 100%;
  height: 60px;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
`;

export const Button = styled.TouchableHighlight`
  width: 20%;
  height: 40px;
  border-radius: 20px;
  overflow: hidden;
  elevation: 5;
`;

export const ButtonContentBox = styled.View`
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color: #2a9d8f;
`;

export const ButtonContent = styled.Text`
  color: #fff;
  font-weight: 600;
  font-size: 22px;
`;
