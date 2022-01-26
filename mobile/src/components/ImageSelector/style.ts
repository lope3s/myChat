import styled from 'styled-components/native';

export const Container = styled.Pressable`
  width: 150px;
  height: 150px;
  border-radius: 75px;
  border: 2px solid #2a9d8f;
  margin: 50px 0;
  justify-content: center;
  align-items: center;
  position: relative;
  z-index: 1;
`;

export const AvailableImages = styled.View`
  width: 350px;
  height: 275px;
  background-color: #fff;
  position: absolute;
  top: 110%;
  border-radius: 10px;
  elevation: 10;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.TouchableHighlight`
  width: 60px;
  height: 60px;
  margin: 4px 4px;
  border-radius: 30px;
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
