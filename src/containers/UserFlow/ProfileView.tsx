import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import storage from '@react-native-firebase/storage';

//LIBRARIES
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
//ROUTES
import {actions} from '../../state/actions';
import {RootState} from 'src/state/reducers';
//UTILS-DATABASE
import {
  editUserProfilePhoto,
  editUserInfo,
} from '../../utils/firebaseDatabaseAPI';
//COMPONENTS
import SmallButton from '../../components/Buttons/SmallBtn';
import {Keyboard} from 'react-native';

interface IProfileViewProps {
  theme: DefaultTheme;
}

const ProfileView: React.FC<IProfileViewProps> = ({theme}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  //GLOBAL STATES
  const onSync = useSelector((state: RootState) => state.ui.onSync);
  const user = useSelector((state: RootState) => state.user.user);
  //LOCAL STATES
  const [defaultImageFromStorage, setDefaultImageFromStorage] = useState('');
  const [isInputActive, setIsInputActive] = useState(false);
  const [userName, setUserName] = useState(user.name);
  const [userSurname, setUserSurname] = useState(user.surname);
  const [savingError, setSavingError] = useState('');

  useEffect(() => {
    const getUrl = async () => {
      const defaultPhoto = await storage()
        .ref(`usersPhotos/defaultPhoto.png`)
        .getDownloadURL();
      setDefaultImageFromStorage(defaultPhoto);
    };
    getUrl();
  }, []);

  const handleChoosePhoto = () => {
    launchImageLibrary({mediaType: 'photo'}, async image => {
      const reference = storage().ref(`usersPhotos/${user.uid}.jpeg`);
      // path to existing file on filesystem
      const pathToFile = image.assets[0].uri;
      // uploads file
      const task = await reference.putFile(pathToFile);
      if (task.state === 'success') {
        const userPhotoUrl = await storage()
          .ref(`usersPhotos/${user.uid}.jpeg`)
          .getDownloadURL();
        editUserProfilePhoto(user.uid, userPhotoUrl);
        dispatch(actions.messages.setSuccessMessage('successUpload'));
      }
    });
  };

  const handleSave = () => {
    if (userName !== '' && userSurname !== '') {
      editUserInfo(user.uid, userName, userSurname);
      setIsInputActive(false);
      Keyboard.dismiss();
    } else {
      setSavingError(t('user:inputEmpty'));
    }
  };

  return (
    <Container>
      <StatusBar backgroundColor={`${theme.appColors.backgroundColor}`} />
      {onSync ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <View>
            <TouchableOpacity onPress={handleChoosePhoto}>
              <ImageContainer>
                {user.imageUrl !== '' && (
                  <Image
                    source={{
                      uri: user.imageUrl,
                    }}></Image>
                )}
                {defaultImageFromStorage !== '' && (
                  <Image
                    source={{
                      uri: defaultImageFromStorage,
                    }}></Image>
                )}
              </ImageContainer>
              <Add>
                <AntDesign name="plus" size={25} color="#ffffff" />
              </Add>
            </TouchableOpacity>
          </View>
          <UserInfo>
            <UserInfoItem>
              <UserNameSurname
                value={userName}
                onFocus={() => setIsInputActive(true)}
                onChangeText={text => setUserName(text)}
              />
              <MaterialCommunityIcons
                name={'account-edit'}
                size={20}
                color={`${theme.appColors.whiteColor}`}
              />
            </UserInfoItem>
            <UserInfoItem>
              <UserNameSurname
                value={userSurname}
                onFocus={() => setIsInputActive(true)}
                onChangeText={text => setUserSurname(text)}
              />
              <MaterialCommunityIcons
                name={'account-edit'}
                size={20}
                color={`${theme.appColors.whiteColor}`}
              />
            </UserInfoItem>
            {savingError !== '' && <ErrorMsg>{savingError}</ErrorMsg>}
          </UserInfo>
          {isInputActive && (
            <ButtonContainer>
              <SmallButton
                border={false}
                text={t('user:save')}
                bgColor={theme.appColors.primaryColorLighter}
                onPress={handleSave}
              />
            </ButtonContainer>
          )}
        </>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 60px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.appColors.backgroundColor};
`;

const ImageContainer = styled.View`
  width: 100px;
  height: 100px;
  background-color: ${({theme}) => theme.appColors.whiteColor};
  border-radius: 100px;
  border-width: 1px;
  border-color: ${({theme}) => theme.appColors.whiteColor};
  overflow: hidden;
`;

const Image = styled.ImageBackground`
  width: 100px;
  height: 110px;
`;

const Add = styled.View`
  background-color: ${({theme}) => theme.appColors.accentColor};
  position: absolute;
  bottom: 0;
  right: 10px;
  width: 30px;
  height: 30px;
  border-radius: 30px;
  align-items: center;
  justify-content: center;
`;

const UserInfo = styled.View`
  width: 60%;
  margin: 20px 0px;
  align-items: center;
`;

const UserInfoItem = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.appColors.backgroundColorVeryLight};
`;

const UserNameSurname = styled.TextInput`
  width: 80%;
  margin: 5px;
  padding: 3px;
  color: ${({theme}) => theme.appColors.whiteColor};
  text-align: center;
  font-size: 20px;
`;

const ErrorMsg = styled.Text`
  padding: 5px 0px;
  font-style: italic;
  color: ${({theme}) => theme.appColors.accentColor};
`;

const ButtonContainer = styled.View`
  width: 20%;
`;

export default withTheme(ProfileView);
