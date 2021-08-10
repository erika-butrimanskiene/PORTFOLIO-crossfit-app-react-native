import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {showAlert, closeAlert} from 'react-native-customisable-alert';

import {RootState} from 'src/state/reducers';
import {getUserUpcomingWods} from '../../utils/getUserUpcomingWods';
import {getWorkoutById} from '../../utils/firebaseDatabaseAPI';
import ROUTES from '../../routes/Routes';
import {RootStackParamList} from 'src/routes/Interface';
import {imagesURI} from '../../utils/workoutsImages';
import {removeAattendee} from '../../utils/firebaseDatabaseAPI';

import ConfirmationModal from '../../components/ConfirmationModal';
import {IWodState} from 'src/state/wods/wodsInterface';

type ActivityBoardtScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.ActivityBoard
>;

interface IActivityBoardViewProps {
  theme: DefaultTheme;
  navigation: ActivityBoardtScreenNavigationProp;
}

const ActivityBoardView: React.FC<IActivityBoardViewProps> = ({
  theme,
  navigation,
}) => {
  const {t} = useTranslation();
  const wods = useSelector((state: RootState) => state.wods.wods);
  const userWods = useSelector((state: RootState) => state.user.userWods);
  const user = useSelector((state: RootState) => state.user.user);
  console.log(userWods);

  const filteredWodsList = getUserUpcomingWods(userWods);
  console.log(filteredWodsList);

  const handleUnregister = (
    wodDate: string,
    workoutType: string,
    timeIndex: number,
    deleteAttendeeId: string,
  ) => {
    showAlert({
      alertType: 'custom',
      customAlert: (
        <ConfirmationModal
          confirmText={t('wods:yesCancel')}
          alertText={t('wods:willBeUnregister')}
          onCancelPress={() => closeAlert()}
          onConfirmPress={() => {
            const url = `/WODs/${wodDate}/${workoutType}/times/${timeIndex}/attendees/${deleteAttendeeId}`;
            console.log(url);
            removeAattendee(url);
            closeAlert();
          }}
        />
      ),
    });
  };

  const findWodTimeIndex = (wodByDate: IWodState[], wodTime: string) => {
    const indexOfTime = wodByDate[0].data.times
      .map(time => time.wodTime)
      .indexOf(wodTime);
    return indexOfTime;
  };

  const findDeleteAttendeeId = (wodByDate: IWodState[], timeIndex: number) => {
    const deletAttendeeObjectAtArray = Object.values(
      wodByDate[0].data.times[timeIndex].attendees,
    ).filter(item => item.uid === user.uid);

    return deletAttendeeObjectAtArray[0].attendeeId;
  };

  return (
    <Container>
      <Title>{t('user:upcomingWods')}</Title>
      <Scroll>
        <Wods>
          {filteredWodsList.map((wod, index) => {
            const imageIndex = index - Math.floor(index / 5) * 5;
            const image = imagesURI[imageIndex];

            if (wod.wodTimes.length !== 0) {
              return (
                <Wod key={index}>
                  <WodDate>{wod.wodDate}</WodDate>
                  <WodTimes>
                    {wod.wodTimes.map((item, index) => (
                      <WodTime key={index}>
                        <Info>
                          <Time>{item.wodTime}</Time>
                          <CouchInfo>
                            <CouchName>
                              {t('wods:coach')} {item.coachName},
                            </CouchName>
                            <Room>
                              {item.wodRoom} {t('wods:room')}
                            </Room>
                          </CouchInfo>
                        </Info>
                        <UnregisterBtn
                          onPress={() => {
                            const wodByDate = wods.filter(
                              item => item.date === wod.wodDate,
                            );
                            let timeIndex = findWodTimeIndex(
                              wodByDate,
                              item.wodTime,
                            );
                            handleUnregister(
                              wod.wodDate,
                              wod.wodType,
                              timeIndex,
                              findDeleteAttendeeId(wodByDate, timeIndex),
                            );
                          }}>
                          <UnregisterText>{t('wods:cancel')}</UnregisterText>
                        </UnregisterBtn>
                      </WodTime>
                    ))}
                  </WodTimes>
                  <AboutWorkoutLink
                    onPress={async () => {
                      let data = await getWorkoutById(wod.workoutId);

                      navigation.navigate(ROUTES.WodDetail, {
                        workout: data,
                        date: wod.wodDate,
                        image: image,
                      });
                    }}>
                    <About>About workout</About>
                    <AntDesign
                      name={'right'}
                      size={20}
                      color={theme.appColors.primaryColorLighter}
                    />
                  </AboutWorkoutLink>
                </Wod>
              );
            }
          })}
        </Wods>
      </Scroll>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${({theme}) => theme.appColors.backgroundColor};
  flex: 1;
  padding-top: 40px;
  font-size: 20px;
  align-items: center;
`;

const Title = styled.Text`
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  width: 90%;
  font-size: 25px;
  color: ${({theme}) => theme.appColors.whiteColor};
  text-align: center;
`;

const Scroll = styled.ScrollView`
  width: 90%;
`;

const Wods = styled.View`
  width: 100%;
`;

const Wod = styled.View`
  align-items: center;
  justify-content: center;
  width: 100%;
  margin: 5px 0px;
`;

const WodDate = styled.Text`
  margin: 20px 0px 10px 0px;
  border-radius: 5px;
  padding: 6px;
  font-size: 24px;
  font-weight: bold;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const WodTimes = styled.View`
  width: 100%;
  color: ${({theme}) => theme.appColors.backgroundColorLighter};
`;

const WodTime = styled.View`
  width: 100%;
  border-radius: 5px;
  margin: 5px;
  padding: 10px;
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
`;

const Info = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Time = styled.Text`
  border-radius: 5px;
  padding: 5px 10px;
  font-size: 23px;
  font-weight: bold;
  background-color: ${({theme}) => theme.appColors.backgroundColor};
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const CouchInfo = styled.View`
  padding: 0px 15px;
  justify-content: center;
`;

const CouchName = styled.Text`
  font-size: 15px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const Room = styled.Text`
  font-size: 15px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const UnregisterBtn = styled.TouchableOpacity`
  margin: 7px 5px;
  border-radius: 30px;
  padding: 5px 15px;
  background-color: ${({theme}) => theme.appColors.backgroundColor_opacity50};
  border-width: 2px;
  border-color: ${({theme}) => theme.appColors.accentColor_opacity50};
`;

const UnregisterText = styled.Text`
  font-size: 18px;
  text-align: center;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const AboutWorkoutLink = styled.TouchableOpacity`
  flex-direction: row;
  width: 100%;
  justify-content: flex-end;
  align-items: flex-end;
`;

const About = styled.Text`
  padding-left: 5px;
  font-size: 18px;
  color: ${({theme}) => theme.appColors.primaryColorLighter};
`;

export default withTheme(ActivityBoardView);
