import React, {useState, useEffect} from 'react';
import {FlatList, Modal, ActivityIndicator, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';

//ROUTES
import ROUTES from '../../routes/Routes';
import {RootState} from 'src/state/reducers';
import {actions} from '../../state/actions';
import {RootStackParamList} from 'src/routes/Interface';
//UTILS
import {getUserPreviousWods} from '../../utils/getUserFilteredWods';
import {imagesURI} from '../../utils/workoutsImages';
//UTILS-DATABASE
import {getWorkoutById, addResult} from '../../utils/firebaseDatabaseAPI';
//INTERFACES
import {IuserWod} from 'src/state/user/userInterface';
//COMPONENTS
import Link from '../../components/Links/Link';

type ActivitiesHistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.ActivityBoard
>;
interface IActivitiesHistoryViewProps {
  theme: DefaultTheme;
  navigation: ActivitiesHistoryScreenNavigationProp;
}

const ActivitiesHistoryView: React.FC<IActivitiesHistoryViewProps> = ({
  theme,
  navigation,
}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  //STATES
  const userWods = useSelector((state: RootState) => state.user.userWods);
  const user = useSelector((state: RootState) => state.user.user);
  const onSync = useSelector((state: RootState) => state.ui.onSync);

  const [showModal, setShowModal] = useState(false);
  const [selectedUserWod, setSelectedUserWod] = useState<IuserWod>(null);
  const [wodResult, setWodResult] = useState('');
  const [enterResultError, setEnterResultError] = useState('');
  const [isResultEntered, setIsResultEntered] = useState([]);
  //VARIABLES
  const filteredWodsList: IuserWod[] = getUserPreviousWods(userWods);

  useEffect(() => {
    const checkIsResultEntered = async () => {
      let resultArray: boolean[] = [];
      filteredWodsList.forEach(item => {
        resultArray.push(false);
      });
      await Promise.all(
        filteredWodsList.map(async (item, index) => {
          const response = await isResultAlreadyEntered(
            item.workoutId,
            item.wodDate,
          );
          resultArray[index] = response;
        }),
      );
      setIsResultEntered([...resultArray]);
    };
    checkIsResultEntered();
    dispatch(actions.ui.setOnSync(false));
  }, [showModal]);

  //FUNCTIONS
  const handleWodResultSubmit = async (
    url: string,
    result: {
      attendeeId: string;
      attendeeName: string;
      attendeeSurname: string;
      result: string;
    },
  ) => {
    if (wodResult !== '') {
      await addResult(url, result);
      setShowModal(false);
      setWodResult('');
    } else {
      setEnterResultError('enterResult');
    }
  };

  const isResultAlreadyEntered = async (id: string, wodDate: string) => {
    const workoutForResults = await getWorkoutById(id);
    if (!workoutForResults.data.results) {
      return false;
    }
    if (workoutForResults.data.results[wodDate]) {
      const existResult = workoutForResults.data.results[wodDate].some(
        item => item.attendeeId === user.uid,
      );
      return existResult;
    } else {
      return false;
    }
  };

  const renderItem = ({item, index}: {item: IuserWod; index: number}) => {
    const imageIndex = index - Math.floor(index / 7) * 7;
    const image = imagesURI[imageIndex];

    return (
      <WodItem>
        <WodDate>{item.wodDate}</WodDate>
        <WodInfo>
          <WorkoutName>{item.workoutName}</WorkoutName>
          <ButtonContainer>
            {isResultEntered.length !== 0 && isResultEntered[index] ? (
              <ButtonDisabled disabled={true}>
                <ButtonText>{t('user:resultExist')}</ButtonText>
              </ButtonDisabled>
            ) : (
              <ButtonEnter
                onPress={() => {
                  setSelectedUserWod(item);
                  setShowModal(true);
                }}>
                <ButtonText>{t('user:enterResult')}</ButtonText>
              </ButtonEnter>
            )}
          </ButtonContainer>
        </WodInfo>
        <Actions>
          <Link
            theme={theme}
            text={t('wods:aboutWorkout')}
            onPress={async () => {
              let data = await getWorkoutById(item.workoutId);

              navigation.navigate(ROUTES.WodDetail, {
                workout: data,
                image: image,
              });
            }}
          />
          <Link
            theme={theme}
            text={t('wods:results')}
            onPress={async () => {
              let data = await getWorkoutById(item.workoutId);
              navigation.navigate(ROUTES.WorkoutResults, {
                workout: data,
              });
            }}
          />
        </Actions>
      </WodItem>
    );
  };

  if (!onSync) {
    return (
      <Container>
        <Title>{t('user:previousWods')}</Title>
        {filteredWodsList.length > 0 ? (
          <>
            <FlatListContainer>
              <FlatList
                data={filteredWodsList}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
              />
            </FlatListContainer>
            <Modal visible={showModal} transparent={true}>
              <ModalLayout>
                <ModalDisplay>
                  <ModalTitle>{t('user:enterResult')}</ModalTitle>
                  <ResultInput
                    value={wodResult}
                    onChangeText={text => setWodResult(text)}
                    selectionColor={theme.appColors.whiteColor}
                    underlineColorAndroid={'transparent'}></ResultInput>
                  {enterResultError !== '' && (
                    <EnterResultError>
                      *{t(`authErrors:${enterResultError}`)}
                    </EnterResultError>
                  )}
                  <ModalActions>
                    <CancelButton onPress={() => setShowModal(false)}>
                      <ModalBtnText>{t('user:cancel')}</ModalBtnText>
                    </CancelButton>
                    <SubmitButton
                      onPress={() => {
                        const URL = `/workouts/${selectedUserWod.workoutId}/results/${selectedUserWod.wodDate}`;
                        const result = {
                          attendeeId: user.uid,
                          attendeeName: user.name,
                          attendeeSurname: user.surname,
                          result: wodResult,
                        };
                        handleWodResultSubmit(URL, result);
                      }}>
                      <ModalBtnText>{t('user:submit')}</ModalBtnText>
                    </SubmitButton>
                  </ModalActions>
                </ModalDisplay>
              </ModalLayout>
            </Modal>
          </>
        ) : (
          <NoHistoryMessage>{t('user:noActivitiesHistory')}</NoHistoryMessage>
        )}
      </Container>
    );
  }

  return (
    <OnSyncContainer>
      <ActivityIndicator size={60} color="#ffffff" />
    </OnSyncContainer>
  );
};

const Container = styled.View`
  background-color: ${({theme}) => theme.appColors.backgroundColor};
  flex: 1;
  padding-top: 40px;
  font-size: 20px;
  align-items: center;
  justify-content: flex-start;
`;

const OnSyncContainer = styled.View`
  background-color: ${({theme}) => theme.appColors.backgroundColor};
  flex: 1;
  padding-top: 40px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
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

const FlatListContainer = styled.View`
  width: 85%;
  margin-bottom: 150px;
`;

const WodItem = styled.View`
  width: 100%;
  justify-content: center;
`;

const WodDate = styled.Text`
  width: 100%;
  text-align: center;
  margin: 20px 0px 0px 0px;
  border-radius: 5px;
  padding: 5px;
  font-size: 24px;
  font-weight: bold;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const WodInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin: 10px 0px;
  padding: 15px;
  border-radius: 5px;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
`;

const WorkoutName = styled.Text`
  font-size: 23px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const ButtonContainer = styled.View`
  max-width: 50%;
  justify-content: flex-end;
`;

const ButtonEnter = styled.TouchableOpacity`
  border-radius: 5px;
  padding: 5px;
  background-color: ${({theme}) => theme.appColors.accentColor};
  justify-content: center;
  align-items: center;
`;

const ButtonDisabled = styled.TouchableOpacity`
  border-radius: 5px;
  padding: 5px;
  background-color: ${({theme}) => theme.appColors.backgroundColor};
  justify-content: center;
  align-items: center;
`;

const ButtonText = styled.Text`
  font-size: 20px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const Actions = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ModalLayout = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: #00000099;
`;

const ModalDisplay = styled.View`
  padding: 20px 10px;
  height: 40%;
  width: 90%;
  justify-content: center;
  background-color: ${({theme}) => theme.appColors.whiteColor};
`;

const ModalTitle = styled.Text`
  font-size: 28px;
  text-align: center;
  color: ${({theme}) => theme.appColors.backgroundColor};
`;

const ResultInput = styled.TextInput`
  margin: 15px 10px 10px 10px;
  background-color: ${({theme}) => theme.appColors.accentColor};
  border-radius: 5px;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 25px;
`;

const EnterResultError = styled.Text`
  margin: 0px 10px;
  font-size: 15px;
  color: ${({theme}) => theme.appColors.backgroundColorDarken};
`;

const ModalActions = styled.View`
  margin: 10px 0px;
  flex-direction: row;
  justify-content: center;
`;

const CancelButton = styled.TouchableOpacity`
  margin: 0px 5px;
  width: 100px;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
  align-items: center;
  border-radius: 30px;
`;

const SubmitButton = styled.TouchableOpacity`
  margin: 0px 5px;
  width: 100px;
  background-color: ${({theme}) => theme.appColors.primaryColorLighter};
  align-items: center;
  border-radius: 30px;
`;

const ModalBtnText = styled.Text`
  padding: 5px;
  font-size: 21px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const NoHistoryMessage = styled.Text`
  margin: 25px;
  font-size: 21px;
  font-style: italic;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

export default withTheme(ActivitiesHistoryView);
