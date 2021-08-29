import React from 'react';
import {IuserWod} from 'src/state/user/userInterface';
import styled, {DefaultTheme, withTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';

//ROUTES
import ROUTES from '../../routes/Routes';
import {RootStackParamList} from 'src/routes/Interface';
//UTILS
import {imagesURI} from '../../utils/workoutsImages';
//UTILS-DATABASE
import {getWorkoutById} from '../../utils/firebase/firebaseDatabaseAPI';
//COMPONENTS
import Link from '../../components/Links/Link';

type ActivitiesHistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.ActivitiesHistory
>;

interface IRenderItemToActivitiesHistory {
  item: IuserWod;
  index: number;
  theme: DefaultTheme;
  navigation: ActivitiesHistoryScreenNavigationProp;
  isResultEntered: boolean[];
  setSelectedUserWod: any;
  setShowModal: any;
}

const RenderItemToActivitiesHistory: React.FC<IRenderItemToActivitiesHistory> =
  ({
    item,
    index,
    theme,
    navigation,
    isResultEntered,
    setSelectedUserWod,
    setShowModal,
  }) => {
    const {t} = useTranslation();
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
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0px;
  padding: 15px;
  border-radius: 5px;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
`;

const WorkoutName = styled.Text`
  width: 60%;
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

export default withTheme(RenderItemToActivitiesHistory);
