import React from 'react';
import {View, Text, FlatList} from 'react-native';
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
import {getWorkoutById} from '../../utils/firebaseDatabaseAPI';
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
  //VARIABLES
  const filteredWodsList: IuserWod[] = getUserPreviousWods(userWods);

  const renderItem = ({item, index}: {item: IuserWod; index: number}) => {
    const imageIndex = index - Math.floor(index / 5) * 5;
    const image = imagesURI[imageIndex];
    return (
      <WodItem>
        <WodDate>{item.wodDate}</WodDate>
        <WodInfo>
          <WorkoutName>{item.workoutName}</WorkoutName>
          <ButtonContainer>
            <Button>
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

export default withTheme(ActivitiesHistoryView);
