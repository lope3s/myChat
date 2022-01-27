import React, {useState} from 'react';
import {
  Container,
  Content,
  Image,
  ImageContainer,
  Button,
  ButtonContent,
  ButtonContentBox,
  ImageContainerButtonBox,
} from './style';
import {useAppState} from '../../hook/AppState';
import {Loading} from '..';
import {useQuery, useMutation} from '@apollo/client';
import {GET_CHARACTERS_IMAGES, UPDATE_USER_IMAGE} from '../../gqlSchemas';
import {Alert} from 'react-native';

interface ICharacter {
  __typename: string;
  image: string;
  name: string;
}

const ChatRoomImageSelectBox: React.FC = () => {
  const {setChatRoomModal, setImageUrl, username} = useAppState();
  const [maxPage, setMaxPage] = useState();
  const [pageCounter, setPageCounter] = useState(1);
  const {data, loading, error, refetch} = useQuery(GET_CHARACTERS_IMAGES, {
    variables: {page: pageCounter},
  });
  const [updateImage, updateImageResponse] = useMutation(UPDATE_USER_IMAGE);

  if (error) {
    Alert.alert('Requisition error', error.message);
  }

  if (updateImageResponse.error) {
    Alert.alert(
      'Error while updating image ',
      updateImageResponse.error.message,
    );
    updateImageResponse.reset();
  }

  if (updateImageResponse?.data?.updateUserImage) {
    updateImageResponse.reset();
  }

  if (data && !maxPage) {
    setMaxPage(data.getPaginatedCharactersData.info.pages);
  }

  return (
    <Container
      onPress={() => {
        setChatRoomModal(false);
      }}>
      <Content
        onStartShouldSetResponder={e => {
          e.stopPropagation();
          return false;
        }}>
        {loading ? (
          <Loading />
        ) : (
          <>
            {React.Children.toArray(
              data?.getPaginatedCharactersData.results.map(
                (val: ICharacter) => (
                  <ImageContainer
                    onPress={() => {
                      setImageUrl(val.image);
                      setChatRoomModal(false);
                      updateImage({variables: {username, imageUrl: val.image}});
                    }}>
                    <Image source={{uri: val.image}} />
                  </ImageContainer>
                ),
              ),
            )}
            <ImageContainerButtonBox>
              {pageCounter > 1 ? (
                <Button onPress={() => setPageCounter(pageCounter - 1)}>
                  <ButtonContentBox>
                    <ButtonContent>{'<'}</ButtonContent>
                  </ButtonContentBox>
                </Button>
              ) : null}
              {pageCounter === maxPage ? null : (
                <Button onPress={() => setPageCounter(pageCounter + 1)}>
                  <ButtonContentBox>
                    <ButtonContent>{'>'}</ButtonContent>
                  </ButtonContentBox>
                </Button>
              )}
            </ImageContainerButtonBox>
          </>
        )}
      </Content>
    </Container>
  );
};

export default ChatRoomImageSelectBox;
