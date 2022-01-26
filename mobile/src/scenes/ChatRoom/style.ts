import styled from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 100%;
  background-color: #e9c46a;
  align-items: center;
`;

export const TopicsContainer = styled.View`
  width: 90%;
  height: 80%;
  border-radius: 10px;
  overflow: hidden;
  margin-top: 20px;
`;

export const TopicsContentContainer = styled.FlatList`
  width: 100%;
  background-color: #f4a261;
`;

export const AddButton = styled.View`
  width: 100%;
  height: 100%
  background-color: #fff;
  align-items: center;
  justify-content: center;
  padding-left: 2.5px;
`;
