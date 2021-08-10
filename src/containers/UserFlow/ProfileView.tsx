import React from 'react';
import {
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  View,
} from 'react-native';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useSelector} from 'react-redux';

import AntDesign from 'react-native-vector-icons/AntDesign';
// import ImagePicker from 'react-native-new-image-picker';

import {RootState} from 'src/state/reducers';
interface IProfileViewProps {
  theme: DefaultTheme;
}

const ProfileView: React.FC<IProfileViewProps> = ({theme}) => {
  const onSync = useSelector((state: RootState) => state.ui.authOnSync);
  const user = useSelector((state: RootState) => state.user.user);

  const handleChoosePhoto = () => {
    return;
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then(image => {
    //   console.log(image);
    // });
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
              <ImageContainer></ImageContainer>
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
