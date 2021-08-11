import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import styled, {DefaultTheme, withTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {showAlert, closeAlert} from 'react-native-customisable-alert';

//LIBRARIES
import AntDesign from 'react-native-vector-icons/AntDesign';
//ROUTES
import {RootState} from 'src/state/reducers';
import ROUTES from '../../routes/Routes';
import {actions} from '../../state/actions';
import {RootStackParamList} from 'src/routes/Interface';
//UTILS
import {imagesURI} from '../../utils/workoutsImages';
import {formatDateToDate, formatDateToTime} from '../../utils/dateFormating';
//UTILS-DATABASE
import {addAttendee, removeAattendee} from '../../utils/firebaseDatabaseAPI';
//INTERFACES
import {IWodTime} from 'src/state/wods/wodsInterface';
//COMPONENTS
import ConfirmationModal from '../../components/ConfirmationModal';
import WodTimeInfo from '../../components/WodTimeInfo';

type WodsListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.WodsList
>;
interface IWodsListViewProps {
  theme: DefaultTheme;
  navigation: WodsListScreenNavigationProp;
}
interface Iitem {
  item: IWodTime;
  index: number;
}

const WodsListView: React.FC<IWodsListViewProps> = ({theme, navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  //STATES
  const user = useSelector((state: RootState) => state.user.user);
  const wods = useSelector((state: RootState) => state.wods.wods);

  const [disabledLeft, setDisabledLeft] = useState(false);
  const [disabledRight, setDisabledRight] = useState(false);
  const [disabledRegisterOrCancel, setDisabledRegisterOrCancel] =
    useState(false);
  //VARIABLES
  const today = new Date();
  const todayDate = formatDateToDate(today);
  const todayTime = formatDateToTime(today);
  const sortedWodsByDate = wods.sort((a, b) => {
    return a.date < b.date ? -1 : 1;
  });
  const todayWod = wods.filter(wod => wod.date.includes(todayDate));
  const todayWodIndex = sortedWodsByDate.indexOf(todayWod[0]);
  const [showWodIndex, setShowWodIndex] = useState(todayWodIndex);
  const imageIndex = showWodIndex - Math.floor(showWodIndex / 5) * 5;

  useEffect(() => {
    setDisabledRegisterOrCancel(false);
    if (sortedWodsByDate[showWodIndex].date < todayDate) {
      setDisabledRegisterOrCancel(true);
    }
  }, [showWodIndex]);

  const handleRegister = (index: number) => {
    showAlert({
      alertType: 'custom',
      customAlert: (
        <ConfirmationModal
          confirmText={t('wods:register')}
          alertText={t('wods:willBeRegister')}
          onCancelPress={() => closeAlert()}
          onConfirmPress={() => {
            const url = `/WODs/${sortedWodsByDate[showWodIndex].date}/${sortedWodsByDate[showWodIndex].data.type}/times/${index}/attendees`;
            addAttendee(url, {
              uid: user.uid,
              name: user.name,
              surname: user.surname,
            });
            closeAlert();
          }}
        />
      ),
    });
  };

  const handleUnregister = (index: number) => {
    showAlert({
      alertType: 'custom',
      customAlert: (
        <ConfirmationModal
          confirmText={t('wods:yesCancel')}
          alertText={t('wods:willBeUnregister')}
          onCancelPress={() => closeAlert()}
          onConfirmPress={() => {
            const deleteAttendeeObjectAtArray = Object.values(
              sortedWodsByDate[showWodIndex].data.times[index].attendees,
            ).filter(item => item.uid === user.uid);
            const deleteAttendeeId = deleteAttendeeObjectAtArray[0].attendeeId;
            const url = `/WODs/${sortedWodsByDate[showWodIndex].date}/${sortedWodsByDate[showWodIndex].data.type}/times/${index}/attendees/${deleteAttendeeId}`;
            removeAattendee(url);
            closeAlert();
          }}
        />
      ),
    });
  };

  const renderItem = ({item, index}: Iitem) => {
    return (
      <ScheduleItem>
        <WodTimeInfo
          wodTime={item.wodTime}
          coachName={item.coachName}
          wodRoom={item.wodRoom}
        />
        <ScheduleActions>
          {Object.values(
            sortedWodsByDate[showWodIndex].data.times[index].attendees,
          ).filter(item => item.uid === user.uid).length === 0 ? (
            <RegisterBtn
              onPress={() => {
                if (
                  disabledRegisterOrCancel ||
                  (sortedWodsByDate[showWodIndex].date === todayDate &&
                    sortedWodsByDate[showWodIndex].data.times[index].wodTime +
                      1 <
                      todayTime)
                ) {
                  dispatch(actions.messages.setErrorMessage('wodTimeIsPassed'));
                } else {
                  handleRegister(index);
                }
              }}>
              <RegisterText>{t('wods:register')}</RegisterText>
            </RegisterBtn>
          ) : (
            <UnregisterBtn
              onPress={() => {
                if (
                  disabledRegisterOrCancel ||
                  (sortedWodsByDate[showWodIndex].date === todayDate &&
                    sortedWodsByDate[showWodIndex].data.times[index].wodTime +
                      1 <
                      todayTime)
                ) {
                  dispatch(actions.messages.setErrorMessage('wodTimeIsPassed'));
                } else {
                  handleUnregister(index);
                }
              }}>
              <UnregisterText>{t('wods:cancel')}</UnregisterText>
            </UnregisterBtn>
          )}

          {user.admin && (
            <AdminBtn>
              <AdminText>Admin</AdminText>
            </AdminBtn>
          )}
        </ScheduleActions>
      </ScheduleItem>
    );
  };

  return (
    <Container>
      <Heading>{t('wods:todayWod')}</Heading>
      <NavigateDayContainer>
        <NavigateIcon
          disabled={disabledLeft}
          onPress={() => {
            setDisabledRight(false);
            if (showWodIndex > 0) {
              setShowWodIndex(showWodIndex - 1);
            } else {
              setDisabledLeft(true);
            }
          }}>
          <AntDesign
            name={'left'}
            size={30}
            color={theme.appColors.accentColor}
          />
        </NavigateIcon>
        <Day>{sortedWodsByDate[showWodIndex].date}</Day>
        <NavigateIcon
          disabled={disabledRight}
          onPress={() => {
            setDisabledLeft(false);
            if (showWodIndex < sortedWodsByDate.length - 1) {
              setShowWodIndex(showWodIndex + 1);
            } else {
              setDisabledRight(true);
            }
          }}>
          <AntDesign
            name={'right'}
            size={30}
            color={theme.appColors.accentColor}
          />
        </NavigateIcon>
      </NavigateDayContainer>
      <ImageContainer>
        <Image
          source={{
            uri: imagesURI[imageIndex],
          }}
          resizeMode="cover">
          <ImageOverlay>
            <WodInfo>
              <WodName>
                {sortedWodsByDate[showWodIndex].data.workout.data.name}
              </WodName>
              <WodType>
                {sortedWodsByDate[showWodIndex].data.workout.data.workoutType}
              </WodType>
            </WodInfo>
            <Actions>
              <DetailsBtn
                onPress={() => {
                  let data = sortedWodsByDate[showWodIndex].data.workout;
                  navigation.navigate(ROUTES.WodDetail, {
                    workout: data,
                    image: imagesURI[imageIndex],
                  });
                }}>
                <DetailsText>Details</DetailsText>
              </DetailsBtn>
            </Actions>
          </ImageOverlay>
        </Image>
      </ImageContainer>
      <ScheduleList>
        <FlatList
          data={sortedWodsByDate[showWodIndex].data.times}
          keyExtractor={item => item.wodTime}
          renderItem={renderItem}
        />
      </ScheduleList>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${({theme}) => theme.appColors.backgroundColor};
  flex: 1;
  padding-top: 50px;
  font-size: 20px;
  align-items: center;
`;

const Heading = styled.Text`
  margin: 0px 0px 15px 0px;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 22px;
  text-align: center;
`;

const NavigateDayContainer = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const NavigateIcon = styled.TouchableOpacity`
  padding: 0px 10px;
`;

const Day = styled.Text`
  padding: 10px 15px;
  font-size: 22px;
  border-radius: 10px;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const ImageContainer = styled.View`
  margin: 30px 0px;
  width: 90%;
`;

const Image = styled.ImageBackground`
  height: 170px;
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
`;

const ImageOverlay = styled.View`
  flex-direction: row;
  height: 100%;
  width: 100%;
  background-color: ${({theme}) => theme.appColors.backgroundColor_opacity20};
`;

const WodInfo = styled.View`
  padding: 0px 0px 15px 15px;
  height: 100%;
  width: 60%;
  justify-content: flex-end;
`;

const WodName = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 25px;
  font-weight: bold;
`;

const WodType = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 15px;
`;

const Actions = styled.View`
  width: 40%;
`;

const DetailsBtn = styled.TouchableOpacity`
  border-radius: 5px;
  margin: 10px;
  background-color: ${({theme}) => theme.appColors.accentColor_opacity50};
  justify-content: center;
  align-items: center;
`;

const DetailsText = styled.Text`
  font-size: 17px;
  padding: 5px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const ScheduleList = styled.View`
  width: 90%;
  margin-bottom: 360px;
`;

const ScheduleItem = styled.View`
  margin: 10px 0px;
  padding: 15px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
  width: 100%;
`;

const ScheduleActions = styled.View``;

const RegisterBtn = styled.TouchableOpacity`
  margin: 7px 0px;
  border-radius: 30px;
  padding: 5px 15px;
  background-color: ${({theme}) => theme.appColors.primaryColorLighter};
`;

const UnregisterBtn = styled.TouchableOpacity`
  margin: 7px 0px;
  border-radius: 30px;
  padding: 5px 15px;
  background-color: ${({theme}) => theme.appColors.backgroundColor_opacity50};
  border-width: 2px;
  border-color: ${({theme}) => theme.appColors.accentColor_opacity50};
`;

const AdminBtn = styled.TouchableOpacity`
  margin: 7px 0px;
  border-radius: 30px;
  padding: 5px 15px;
  background-color: ${({theme}) => theme.appColors.primaryColorDarken};
`;

const RegisterText = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const UnregisterText = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const AdminText = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

export default withTheme(WodsListView);
