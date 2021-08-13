import React, {useState} from 'react';
import {FlatList, Modal, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useSelector} from 'react-redux';

//ROUTES
import ROUTES from '../../routes/Routes';
import {RootState} from 'src/state/reducers';
import {RootStackParamList} from 'src/routes/Interface';
//UTILS
import {getUserPreviousWods} from '../../utils/getUserFilteredWods';
import {imagesURI} from '../../utils/workoutsImages';
//UTILS-DATABASE
import {getWorkoutById, addResult} from '../../utils/firebaseDatabaseAPI';
//INTERFACES
import {IuserWod} from 'src/state/user/userInterface';
//COMPONENTS
import Link from '../../components/Link';

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
  //STATES
  const userWods = useSelector((state: RootState) => state.user.userWods);
  const user = useSelector((state: RootState) => state.user.user);

  const [showModal, setShowModal] = useState(false);
  const [selectedUserWod, setSelectedUserWod] = useState<IuserWod>(null);
  const [wodResult, setWodResult] = useState('');
  //VARIABLES
  const filteredWodsList: IuserWod[] = getUserPreviousWods(userWods);

  //FUNCTIONS
  const handleWodResultSubmit = (
    url: string,
    result: {attendeeId: string; result: string},
  ) => {
    if (wodResult !== '') {
      addResult(url, result);
    }
  };

  const renderItem = ({item, index}: {item: IuserWod; index: number}) => {
    const imageIndex = index - Math.floor(index / 5) * 5;
    const image = imagesURI[imageIndex];
    return (
      <WodItem>
        <WodDate>{item.wodDate}</WodDate>
        <WodInfo>
          <WorkoutName>{item.workoutName}</WorkoutName>
          <ButtonContainer>
            <Button
              onPress={() => {
                console.log(item);
                setSelectedUserWod(item);
                setShowModal(true);
              }}>
              <ButtonText>{t('user:enterResult')}</ButtonText>
            </Button>
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
          <Link theme={theme} text={t('wods:results')} onPress={() => {}} />
        </Actions>
      </WodItem>
    );
  };

  return (
    <Container>
      <Title>{t('user:previousWods')}</Title>

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
            <ModalActions>
              <CancelButton onPress={() => setShowModal(false)}>
                <ModalBtnText>{t('user:cancel')}</ModalBtnText>
              </CancelButton>
              <SubmitButton
                onPress={() => {
                  const URL = `/workouts/${selectedUserWod.workoutId}/results/${selectedUserWod.wodDate}`;
                  const result = {attendeeId: user.uid, result: wodResult};
                  handleWodResultSubmit(URL, result);
                }}>
                <ModalBtnText>{t('user:submit')}</ModalBtnText>
              </SubmitButton>
            </ModalActions>
          </ModalDisplay>
        </ModalLayout>
      </Modal>
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
  font-size: 25px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const ButtonContainer = styled.View`
  max-width: 50%;
  justify-content: flex-end;
`;

const Button = styled.TouchableOpacity`
  border-radius: 5px;
  padding: 5px;
  background-color: ${({theme}) => theme.appColors.accentColor};
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
  margin: 15px 10px;
  background-color: ${({theme}) => theme.appColors.accentColor};
  border-radius: 5px;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 25px;
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

export default withTheme(ActivitiesHistoryView);
