import {
  Container,
  AvailableImages,
  Image,
  ImageContainer,
  ImageContainerButtonBox,
  Button,
  ButtonContentBox,
  ButtonContent,
} from './style';
import {Loading} from '..';
import React, {useState} from 'react';
import {useRegister} from '../../../App';
import {useLazyQuery} from '@apollo/client';
import {GET_CHARACTERS_IMAGES} from '../../gqlSchemas';
import {Alert} from 'react-native';

import PersonIcon from 'react-native-vector-icons/Ionicons';

interface ICharacter {
  __typename: string;
  image: string;
  name: string;
}

const ImageSelector: React.FC = () => {
  const [maxPage, setMaxPage] = useState();
  const [pageCounter, setPageCounter] = useState(1);
  const {modal, imageUrl, setImageUrl, setModal} = useRegister();
  const [getCharactersImages, {data, loading, error}] = useLazyQuery(
    GET_CHARACTERS_IMAGES,
    {variables: {page: pageCounter}},
  );

  if (error) {
    Alert.alert('Erro de requisição', error.message);
  }

  if (data && !maxPage) {
    setMaxPage(data.getPaginatedCharactersData.info.pages);
  }

  return (
    <Container
      onPress={() => {
        getCharactersImages();
        setModal(!modal);
      }}>
      {imageUrl ? (
        <Image source={{uri: imageUrl}} />
      ) : (
        <PersonIcon name="ios-person" size={110} color="#264653" />
      )}
      {modal ? (
        <AvailableImages>
          {loading ? (
            <Loading>loading...</Loading>
          ) : (
            <>
              {React.Children.toArray(
                data?.getPaginatedCharactersData.results.map(
                  (val: ICharacter) => (
                    <ImageContainer
                      onPress={() => {
                        setImageUrl(val.image);
                        setModal(false);
                      }}>
                      <Image source={{uri: val.image}} />
                    </ImageContainer>
                  ),
                ),
              )}
              <ImageContainerButtonBox>
                {pageCounter ? (
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
        </AvailableImages>
      ) : null}
    </Container>
  );
};

export default ImageSelector;
