import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {showAlert, closeAlert} from 'react-native-customisable-alert';

//ROUTES
import {RootState} from 'src/state/reducers';
import ROUTES from '../../routes/Routes';
import {RootStackParamList} from 'src/routes/Interface';
//UTILS
import {getUserUpcomingWods} from '../../utils/getUserFilteredWods';
import {imagesURI} from '../../utils/workoutsImages';
//UTILS-DATABASE
import {getWorkoutById} from '../../utils/firebase/firebaseDatabaseAPI';
import {removeAattendee} from '../../utils/firebase/firebaseDatabaseAPI';
//INTERFACES
import {IWodState} from 'src/state/wods/wodsInterface';
import {IuserWod} from 'src/state/user/userInterface';
//COMPONENTS
import ConfirmationModal from '../../components/Modals/ConfirmationModal';
import WodTimeInfo from '../../components/WodTimeInfo';
import Link from '../../components/Links/Link';

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

  //GLOBAL STATES
  const wods = useSelector((state: RootState) => state.wods.wods);
  const userWods = useSelector((state: RootState) => state.user.userWods);
  const user = useSelector((state: RootState) => state.user.user);

  //VARIABLES
  const filteredWodsList: IuserWod[] = getUserUpcomingWods(userWods);

  const handleUnregister = (
    wodDate: string,
    workoutType: string,
    timeIndex: number,
  ) => {
    showAlert({
      alertType: 'custom',
      customAlert: (
        <ConfirmationModal
          confirmText={t('wods:yesCancel')}
          alertText={t('wods:willBeUnregister')}
          onCancelPress={() => closeAlert()}
          onConfirmPress={() => {
            const url = `/WODs/${wodDate}/${workoutType}/times/${timeIndex}/attendees`;
            removeAattendee(url, user.uid);
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

  return (
    <Container>
      <Title>{t('user:upcomingWods')}</Title>
      {filteredWodsList.length > 0 ? (
        <Scroll>
          <Wods>
            {filteredWodsList.map((wod, index) => {
              const imageIndex = index - Math.floor(index / 7) * 7;
              const image = imagesURI[imageIndex];

              if (wod.wodTimes.length !== 0) {
                return (
                  <Wod key={index}>
                    <WodDate>{wod.wodDate}</WodDate>
                    <WodTimes>
                      {wod.wodTimes.map((item, index) => (
                        <WodTime key={index}>
                          <WodTimeInfo
                            wodTime={item.wodTime}
                            coachName={item.coachName}
                            wodRoom={item.wodRoom}
                          />
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
                              );
                            }}>
                            <UnregisterText>{t('wods:cancel')}</UnregisterText>
                          </UnregisterBtn>
                        </WodTime>
                      ))}
                    </WodTimes>
                    <LinkContainer>
                      <Link
                        theme={theme}
                        text={t('wods:aboutWorkout')}
                        onPress={async () => {
                          let data = await getWorkoutById(wod.workoutId);

                          navigation.navigate(ROUTES.WodDetail, {
                            workout: data,
                            image: image,
                          });
                        }}
                      />
                    </LinkContainer>
                  </Wod>
                );
              }
            })}
          </Wods>
        </Scroll>
      ) : (
        <NoActivitiesMessage>{t('user:noActivities')}</NoActivitiesMessage>
      )}
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
  justify-content: center;
  align-items: center;
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
  align-items: center;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
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

const LinkContainer = styled.View`
  width: 100%;
  justify-content: center;
`;

const NoActivitiesMessage = styled.Text`
  margin: 25px;
  font-size: 21px;
  font-style: italic;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

export default withTheme(ActivityBoardView);
