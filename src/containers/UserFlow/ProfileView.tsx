import React, {useState, useEffect} from 'react';
import {
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import storage from '@react-native-firebase/storage';

//LIBRARIES
import AntDesign from 'react-native-vector-icons/AntDesign';
import {launchImageLibrary} from 'react-native-image-picker';
//ROUTES
import {actions} from '../../state/actions';
import {RootState} from 'src/state/reducers';
//UTILS-DATABASE
import {editUserProfilePhoto} from '../../utils/firebaseDatabaseAPI';

interface IProfileViewProps {
  theme: DefaultTheme;
}

const ProfileView: React.FC<IProfileViewProps> = ({theme}) => {
  const dispatch = useDispatch();

  //GLOBAL STATES
  const onSync = useSelector((state: RootState) => state.ui.onSync);
  const user = useSelector((state: RootState) => state.user.user);
  //STATES
  const [defaultImageFromStorage, setDefaultImageFromStorage] = useState('');

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
        await editUserProfilePhoto(user.uid, userPhotoUrl);
        dispatch(actions.messages.setSuccessMessage('successUpload'));
      }
    });
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
          <Heading>Welcome, {user.name}</Heading>
          <Text>{user.email}</Text>
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

const Heading = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 30px;
`;

const Text = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const ImageContainer = styled.View`
  width: 100px;
  height: 100px;
  background-color: ${({theme}) => theme.appColors.whiteColor};
  border-radius: 100px;
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

export default withTheme(ProfileView);
