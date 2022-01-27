import React, {useContext, createContext, useState} from 'react';

export interface IUserRegister {
  modal: boolean;
  imageUrl: string;
  username: string;
  chatRoomModal: boolean;
  userId: string;
  chatRoomName: string;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setChatRoomModal: React.Dispatch<React.SetStateAction<boolean>>;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  setChatRoomName: React.Dispatch<React.SetStateAction<string>>;
}

const UserRegisterContext = createContext({} as IUserRegister);

export const useAppState = () => {
  const userRegister = useContext(UserRegisterContext);
  return userRegister;
};

export const AppStateProvider: React.FC = ({children}) => {
  const [modal, setModal] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  const [username, setUsername] = useState('');
  const [chatRoomModal, setChatRoomModal] = useState(false);
  const [userId, setUserId] = useState('');
  const [chatRoomName, setChatRoomName] = useState('');
  return (
    <UserRegisterContext.Provider
      value={{
        modal,
        imageUrl,
        username,
        chatRoomModal,
        userId,
        chatRoomName,
        setChatRoomName,
        setUserId,
        setChatRoomModal,
        setUsername,
        setImageUrl,
        setModal,
      }}>
      {children}
    </UserRegisterContext.Provider>
  );
};

export default AppStateProvider;
