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
import {Text, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {ImageSelector} from '../../components';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import type {RootStackPramsList} from '../../../App';
import {useMutation, useLazyQuery} from '@apollo/client';
import {REGISTER_USER, CHECK_USER_DATA} from '../../gqlSchemas';
import {useAppState} from '../../hook/AppState';
import {useAppNavigation} from '../../../App';

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
  const [register, {data, loading, error, reset}] = useMutation(REGISTER_USER);
  const [getUserData, checkUserData] =
    useLazyQuery<IGetUserData>(CHECK_USER_DATA);

  const {setImageUrl, setUsername, setUserId, username, imageUrl, modal} =
    useAppState();

  const {setNavigate} = useAppNavigation();

  if (error) {
    Alert.alert('Error in the registry', error.message);
    reset();
  }

  const triggerError = (value: string) => {
    if (!value) {
      return setError('Enter a username');
    }

    if (value.length <= 3) {
      return setError('Username needs at least 4 characters');
    }

    return setError('');
  };

  const handleSubmit = () => {
    triggerError(username);

    if (!imageUrl) {
      return setError('Select an image');
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
        Alert.alert('Internal error');
      });
  }, [getUserData, checkUserData.called, checkUserData.refetch]);

  useEffect(() => {
    if (data) {
      AsyncStorage.setItem('userId', JSON.stringify(data.registerUser.id));
      setUserId(data.registerUser.id);
      reset();
      setNavigate(true);
    }

    if (checkUserData?.data?.checkUserData) {
      setImageUrl(checkUserData.data.checkUserData?.imageUrl);
      setUsername(checkUserData.data.checkUserData?.username);
      setUserId(checkUserData.data.checkUserData?.id);
      setNavigate(true);
    }
  }, [checkUserData?.data?.checkUserData, data]);

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
