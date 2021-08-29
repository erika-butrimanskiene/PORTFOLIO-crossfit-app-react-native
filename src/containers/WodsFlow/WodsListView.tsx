import React, {useState, useEffect} from 'react';
import {FlatList, Modal} from 'react-native';
import {useSelector} from 'react-redux';
import styled, {DefaultTheme, withTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {ScrollView} from 'react-native-gesture-handler';

//LIBRARIES
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

//ROUTES
import {RootState} from 'src/state/reducers';
import ROUTES from '../../routes/Routes';
import {RootStackParamList} from 'src/routes/Interface';
//UTILS
import {imagesURI} from '../../utils/workoutsImages';
import {formatDateToDate} from '../../utils/dateFormating';
//COMPONENTS
import RenderItemToWorkoutsList from '../../components/RenderItems/RenderItemToWorkoutsList';

type WodsListScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.WodsList
>;
interface IWodsListViewProps {
  theme: DefaultTheme;
  navigation: WodsListScreenNavigationProp;
}

const WodsListView: React.FC<IWodsListViewProps> = ({theme, navigation}) => {
  const {t} = useTranslation();

  //GLOBAL STATES
  const wods = useSelector((state: RootState) => state.wods.wods);

  //LOCAL STATES
  const [disabledRegisterOrCancel, setDisabledRegisterOrCancel] =
    useState(false);
  const [scheduleDate, setScheduleDate] = useState(new Date());
  const [showModal, setShowModal] = useState(false);
  const [wodAttendees, setWodAttendees] = useState([]);

  //VARIABLES
  let today = new Date();
  const todayDate = formatDateToDate(today);

  const sortedWodsByDate = wods.sort((a, b) => {
    return a.date < b.date ? -1 : 1;
  });
  const showWod = wods.filter(wod =>
    wod.date.includes(formatDateToDate(scheduleDate)),
  );
  const showWodIndex = sortedWodsByDate.indexOf(showWod[0]);
  const imageIndex = showWodIndex - Math.floor(showWodIndex / 7) * 7;

  //REANIMATED

  const opacityDate = useSharedValue(1);
  const opacityContent = useSharedValue(1);

  const reanimatedStyleDate = useAnimatedStyle(() => {
    return {
      opacity: opacityDate.value,
    };
  }, []);

  const reanimatedStyleContent = useAnimatedStyle(() => {
    return {
      opacity: opacityContent.value,
    };
  }, []);

  //USE-EFFECTS
  useEffect(() => {
    setDisabledRegisterOrCancel(false);
    if (showWodIndex >= 0) {
      if (sortedWodsByDate[showWodIndex].date < todayDate) {
        setDisabledRegisterOrCancel(true);
      }
    }
  }, [showWodIndex]);

  useEffect(() => {}, [wodAttendees]);

  return (
    <Container>
      <Heading>{t('wods:todayWod')}</Heading>
      <NavigateDayContainer>
        <NavigateIcon
          onPress={() => {
            let currentDate = new Date(scheduleDate);
            currentDate.setDate(currentDate.getDate() - 1);
            if (scheduleDate !== currentDate) {
              setScheduleDate(currentDate);
              opacityDate.value = withTiming(0, {duration: 400}, () => {
                opacityDate.value = withTiming(1, {duration: 600});
              });
              opacityContent.value = withTiming(0, {duration: 400}, () => {
                opacityContent.value = withTiming(1, {duration: 600});
              });
            }
          }}>
          <AntDesign
            name={'left'}
            size={30}
            color={theme.appColors.accentColor}
          />
        </NavigateIcon>
        <DayContainer>
          <Day style={reanimatedStyleDate}>
            {formatDateToDate(scheduleDate)}
          </Day>
        </DayContainer>

        <NavigateIcon
          onPress={() => {
            let currentDate = new Date(scheduleDate);
            currentDate.setDate(currentDate.getDate() + 1);
            if (scheduleDate !== currentDate) {
              setScheduleDate(currentDate);
              opacityDate.value = withTiming(0, {duration: 400}, () => {
                opacityDate.value = withTiming(1, {duration: 600});
              });
              opacityContent.value = withTiming(0, {duration: 400}, () => {
                opacityContent.value = withTiming(1, {duration: 600});
              });
            }
          }}>
          <AntDesign
            name={'right'}
            size={30}
            color={theme.appColors.accentColor}
          />
        </NavigateIcon>
      </NavigateDayContainer>

      {showWodIndex >= 0 ? (
        <ScheduledWods style={reanimatedStyleContent}>
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
                    {
                      sortedWodsByDate[showWodIndex].data.workout.data
                        .workoutType
                    }
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
              renderItem={({item, index}) => (
                <RenderItemToWorkoutsList
                  item={item}
                  index={index}
                  sortedWodByDate={sortedWodsByDate[showWodIndex]}
                  disabledRegisterOrCancel={disabledRegisterOrCancel}
                  setShowModal={setShowModal}
                  setWodAttendees={setWodAttendees}
                />
              )}
            />
          </ScheduleList>
          <Modal visible={showModal} transparent={true}>
            <ModalLayout>
              <ModalDisplay>
                <ModalActions>
                  <MaterialIcons
                    name={'close'}
                    size={27}
                    color={theme.appColors.accentColor}
                    onPress={() => {
                      setWodAttendees([]);
                      setShowModal(false);
                    }}
                  />
                </ModalActions>
                {wodAttendees.length > 0 ? (
                  <ScrollView>
                    {wodAttendees.map(
                      (
                        attendee: {
                          uid: string;
                          name: string;
                          surname: string;
                          imageUrl: string;
                        },
                        index,
                      ) => (
                        <WodAttendee key={index}>
                          <WodAttendeeImageContainer>
                            <WodAttendeImage
                              source={{uri: attendee.imageUrl}}
                            />
                          </WodAttendeeImageContainer>

                          <WodAttendeeName>
                            {attendee.name} {attendee.surname}
                          </WodAttendeeName>
                        </WodAttendee>
                      ),
                    )}
                  </ScrollView>
                ) : (
                  <NoAttendeesMessage>
                    {t('admin:noAttendees')}
                  </NoAttendeesMessage>
                )}
              </ModalDisplay>
            </ModalLayout>
          </Modal>
        </ScheduledWods>
      ) : (
        <NoWodsMessage>{t('wods:noWodsToday')}</NoWodsMessage>
      )}
    </Container>
  );
};

const Container = styled.View`
  background-color: ${({theme}) => theme.appColors.backgroundColor};
  flex: 1;
  padding-top: 60px;
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

const DayContainer = styled.View`
  border-radius: 10px;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
`;

const Day = styled(Animated.Text)`
  padding: 10px 15px;
  font-size: 22px;

  color: ${({theme}) => theme.appColors.whiteColor};
`;

const ScheduledWods = styled(Animated.View)`
  flex: 1;
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
  flex: 1;
  width: 90%;
`;

const ModalLayout = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00000089;
`;

const ModalDisplay = styled.View`
  padding: 20px;
  height: 85%;
  width: 90%;
  border-radius: 10px;
  justify-content: flex-start;
  background-color: ${({theme}) => theme.appColors.backgroundColor};
`;

const ModalActions = styled.View`
  margin-bottom: 15px;
  width: 100%;
  align-items: flex-end;
`;

const WodAttendee = styled.View`
  margin: 5px;
  padding: 8px 12px;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
  border-radius: 10px;
`;

const WodAttendeeImageContainer = styled.View`
  width: 50px;
  height: 50px;
  align-items: center;
  border-radius: 100px;
  border-width: 2px;
  border-color: ${({theme}) => theme.appColors.accentColor};
  overflow: hidden;
`;

const WodAttendeImage = styled.ImageBackground`
  border-radius: 100px;
  width: 50px;
  height: 50px;
`;

const WodAttendeeName = styled.Text`
  font-size: 20px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const NoAttendeesMessage = styled.Text`
  font-size: 20px;
  text-align: center;
  color: ${({theme}) => theme.appColors.textColorLightGray};
`;

const NoWodsMessage = styled.Text`
  margin-top: 40px;
  font-size: 20px;
  text-align: center;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

export default withTheme(WodsListView);
