import React, {useState, useEffect, useRef} from 'react';
import {
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import storage from '@react-native-firebase/storage';

//LIBRARIES
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {launchImageLibrary} from 'react-native-image-picker';
import {AreaChart, XAxis, YAxis, Grid} from 'react-native-svg-charts';
import * as shape from 'd3-shape';

//ROUTES
import {actions} from '../../state/actions';
import {RootState} from 'src/state/reducers';
//UTILS
import {
  getLastTwelveEveryMonthWodsLenght,
  getThisYearFromAnyMonthWodsLenght,
} from '../../utils/getUserFilteredWods';
//UTILS-DATABASE
import {
  editUserProfilePhoto,
  editUserInfo,
} from '../../utils/firebase/firebaseDatabaseAPI';
//COMPONENTS
import SmallButton from '../../components/Buttons/SmallBtn';
import {Keyboard} from 'react-native';
import {join} from 'lodash';

interface IProfileViewProps {
  theme: DefaultTheme;
}

const ProfileView: React.FC<IProfileViewProps> = ({theme}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  //GLOBAL STATES
  const onSync = useSelector((state: RootState) => state.ui.onSync);
  const user = useSelector((state: RootState) => state.user.user);
  const userWods = useSelector((state: RootState) => state.user.userWods);

  //LOCAL STATES
  const [isInputActive, setIsInputActive] = useState(false);
  const [userName, setUserName] = useState(user.name);
  const [userSurname, setUserSurname] = useState(user.surname);
  const [savingError, setSavingError] = useState('');
  const [lastTwelveEveryMonthWodsLenght, setLastTwelveMonthsWodsLenght] =
    useState([]);
  const [thisYearWodsLength, setThisYearWodsLength] = useState(null);
  const [thisMonthWodsLength, setThisMonthWodsLength] = useState(null);

  useEffect(() => {
    setLastTwelveMonthsWodsLenght(getLastTwelveEveryMonthWodsLenght(userWods));
    setThisYearWodsLength(getThisYearFromAnyMonthWodsLenght(userWods, '01'));
    setThisMonthWodsLength(
      getThisYearFromAnyMonthWodsLenght(
        userWods,
        (new Date().getMonth() + 1).toString(),
      ),
    );
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
          <User>
            <View>
              <TouchableOpacity onPress={handleChoosePhoto}>
                <ImageContainer>
                  {user.imageUrl !== '' && (
                    <Image
                      source={{
                        uri: user.imageUrl,
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
                  onPress={() => setIsInputActive(true)}
                  size={20}
                  color={`${theme.appColors.textColorLightGray}`}
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
                  onPress={() => {
                    setIsInputActive(true);
                  }}
                  size={20}
                  color={`${theme.appColors.textColorLightGray}`}
                />
              </UserInfoItem>
              {savingError !== '' && <ErrorMsg>{savingError}</ErrorMsg>}
            </UserInfo>
            {isInputActive && (
              <ButtonContainer>
                <SmallButton
                  border={false}
                  text={t('user:save')}
                  bgColor={theme.appColors.accentColor}
                  onPress={handleSave}
                />
              </ButtonContainer>
            )}
          </User>
          <Activity>
            <YearAndMonthActivity>
              <WodsNumber>
                <MaterialCommunityIcons
                  name={'weight-lifter'}
                  size={35}
                  color={`${theme.appColors.primaryColorLighter}`}
                />

                <WodsNumberText>
                  {thisYearWodsLength} wods this year
                </WodsNumberText>
              </WodsNumber>
              <WodsNumber>
                <MaterialCommunityIcons
                  name={'kettlebell'}
                  size={35}
                  color={`${theme.appColors.primaryColorLighter}`}
                />

                <WodsNumberText>
                  {thisMonthWodsLength} wods this month
                </WodsNumberText>
              </WodsNumber>
            </YearAndMonthActivity>
            <ActivityChart>
              <YAxis
                style={{height: 100}}
                data={lastTwelveEveryMonthWodsLenght}
                numberOfTicks={3}
                min={0}
                formatLabel={(value, index) => value}
                contentInset={{top: 15, bottom: 10}}
                svg={{
                  fontSize: 15,
                  fill: theme.appColors.textColorLightGray,
                }}
              />
              <AreaChart
                style={{
                  height: 100,
                  width: 270,
                  marginLeft: 10,
                  marginBottom: 10,
                }}
                data={lastTwelveEveryMonthWodsLenght}
                contentInset={{top: 15, bottom: 15}}
                curve={shape.curveNatural}
                svg={{
                  fill: theme.appColors.primaryColorLighter,
                }}></AreaChart>
            </ActivityChart>
            <ActivityChartTitle>
              wods number of last 12 months/per month
            </ActivityChartTitle>
          </Activity>
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
  justify-content: flex-start;
  background-color: ${({theme}) => theme.appColors.backgroundColor};
`;

const User = styled.View`
  width: 80%;
  border-radius: 30px;
  padding: 20px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme}) => theme.appColors.backgroundColorDarken};
`;

const ImageContainer = styled.View`
  width: 120px;
  height: 120px;
  background-color: ${({theme}) => theme.appColors.whiteColor};
  border-radius: 100px;
  border-width: 2px;
  border-color: ${({theme}) => theme.appColors.accentColor};
  overflow: hidden;
`;

const Image = styled.ImageBackground`
  width: 115px;
  height: 130px;
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
  width: 90%;
  margin: 20px 0px;
  align-items: center;
`;

const UserInfoItem = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-bottom-width: 1.5px;
  border-bottom-color: ${({theme}) => theme.appColors.backgroundColorLighter};
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
  width: 50%;
`;

const Activity = styled.View`
  width: 90%;
  justify-content: center;
  align-items: center;
`;

const ActivityChart = styled.View`
  margin-top: 10px;
  padding-top: 30px;
  margin-right: 20px;
  flex-direction: row;
`;

const ActivityChartTitle = styled.Text`
  width: 80%;
  color: ${({theme}) => theme.appColors.textColorLightGray};
  font-size: 16px;
  text-align: center;
`;

const YearAndMonthActivity = styled.View`
  width: 70%;
  padding-top: 30px;
`;
const WodsNumber = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const WodsNumberText = styled.Text`
  padding-left: 10px;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 19px;
`;

export default withTheme(ProfileView);
