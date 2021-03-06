import React, {useState, useEffect, useMemo} from 'react';
import {FlatList, Modal, ActivityIndicator} from 'react-native';
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
//UTILS-DATABASE
import {
  getWorkoutById,
  addResult,
} from '../../utils/firebase/firebaseDatabaseAPI';
//INTERFACES
import {IuserWod} from 'src/state/user/userInterface';
//COMPONENTS
import Link from '../../components/Links/Link';
import RenderItemToActivitiesHistory from '../../components/RenderItems/RenderItemToActivitiesHistory';

type ActivitiesHistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.ActivitiesHistory
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
  //GLOBAL STATES
  const userWods = useSelector((state: RootState) => state.user.userWods);
  const user = useSelector((state: RootState) => state.user.user);
  const onSync = useSelector((state: RootState) => state.ui.onSync);

  //STATES
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
      dispatch(actions.ui.setOnSync(false));
    };
    checkIsResultEntered();
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
    return (
      <RenderItemToActivitiesHistory
        item={item}
        index={index}
        navigation={navigation}
        setShowModal={setShowModal}
        setSelectedUserWod={setSelectedUserWod}
        isResultEntered={isResultEntered}
      />
    );
  };

  //USEMEMO
  const memoizedValue = useMemo(() => renderItem, [filteredWodsList]);

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
                renderItem={memoizedValue}
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
      <ActivityIndicator size={40} color="#ffffff" />
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
  border-radius: 10px;
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
