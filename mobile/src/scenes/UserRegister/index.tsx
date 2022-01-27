import React, {useState, useEffect} from 'react';
import {
  Container,
  TextInput,
  ButtonContainer,
  Button,
  Title,
  ErrorMessage,
  Loading,
} from './style';
import {Text, StyleSheet, View, Alert, ActivityIndicator} from 'react-native';
import {ImageSelector} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackPramsList, IUserRegister} from '../../../App';
import {useRegister} from '../../../App';
import {useMutation, useLazyQuery} from '@apollo/client';
import {REGISTER_USER, CHECK_USER_DATA} from '../../gqlSchemas';

type Props = NativeStackScreenProps<RootStackPramsList, 'Register'>;

interface IGetUserData {
  checkUserData: {
    imageUrl: string;
    username: string;
    id: string;
  };
}

const UserRegister: React.FC<Props> = () => {
  const [formError, setError] = useState('');
  const {
    modal,
    imageUrl,
    setImageUrl,
    setModal,
    username,
    setUsername,
    setNavigate,
    setUserId,
  } = useRegister();
  const [register, {data, loading, error, reset}] = useMutation(REGISTER_USER);
  const [getUserData, checkUserData] =
    useLazyQuery<IGetUserData>(CHECK_USER_DATA);

  if (checkUserData?.data?.checkUserData) {
    setImageUrl(checkUserData.data.checkUserData?.imageUrl);
    setUsername(checkUserData.data.checkUserData?.username);
    setUserId(checkUserData.data.checkUserData?.id);
    setNavigate(true);
  }

  if (data) {
    AsyncStorage.setItem('userId', JSON.stringify(data.registerUser.id));
    setUserId(data.registerUser.id);
    reset();
    setNavigate(true);
  }

  if (error) {
    Alert.alert('Erro no registro', error.message);
    reset();
  }

  const triggerError = (value: string) => {
    if (!value) {
      return setError('Digite um username');
    }

    if (value.length <= 3) {
      return setError('Username precisa ter 4 caracteres ou mais');
    }

    return setError('');
  };

  const handleSubmit = () => {
    triggerError(username);

    if (!imageUrl) {
      return setError('Selecione uma Imagem');
    }

    register({variables: {imageUrl, username}});
  };

  useEffect(() => {
    AsyncStorage.getItem('userId')
      .then(async value => {
        if (value) {
          getUserData({variables: {id: JSON.parse(value)}});
        }
      })
      .catch(err => {
        Alert.alert('Erro Interno');
      });
  }, [getUserData, checkUserData.called, checkUserData.refetch]);

  return loading || checkUserData.loading ? (
    <Loading>
      <ActivityIndicator size={100} color="#E76F51" />
    </Loading>
  ) : (
    <Container>
      <Title>myChat</Title>
      <ImageSelector />
      <TextInput
        placeholder="Username"
        placeholderTextColor="#E76F51"
        onChangeText={val => {
          triggerError(val);
          setUsername(val);
        }}
      />
      {formError ? <ErrorMessage>{formError}</ErrorMessage> : null}
      <ButtonContainer
        deElevate={modal}
        onPress={handleSubmit}
        style={ButtonContainerStyles.ButtonContainer}>
        <Button>
          <Text style={{color: '#fff'}}>Start chating!</Text>
        </Button>
      </ButtonContainer>
    </Container>
  );
};

const ButtonContainerStyles = StyleSheet.create({
  ButtonContainer: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default UserRegister;
