import React from 'react';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';

//ROUTES
import ROUTES from '../../routes/Routes';
import {RootStackParamList} from 'src/routes/Interface';
//INTERFACES
import {IWorkoutState} from 'src/state/workouts/workoutsInterface';
//COMPONENTS
import Button from '../../components/Buttons/Button';

type WodDetailScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.WodDetail
>;
interface IWodDetailViewProps {
  theme: DefaultTheme;
  navigation: WodDetailScreenNavigationProp;
  route: any;
}

const WodDetailView: React.FC<IWodDetailViewProps> = ({
  theme,
  route,
  navigation,
}) => {
  const {t} = useTranslation();

  const workout: IWorkoutState = route.params.workout;
  const image: string = route.params.image;

  return (
    <Container>
      <Scroll>
        <WorkoutDetails>
          <ImageContainer>
            <Image
              source={{
                uri: image,
              }}
              resizeMode="cover">
              <WodInfo>
                <WodName>{workout.data.name}</WodName>
                <WodType>{workout.data.workoutType}</WodType>
              </WodInfo>
            </Image>
          </ImageContainer>

          <Info>
            <Title>{t('wods:weights')}</Title>
            <Weights>{workout.data.workoutWeights}</Weights>
            <Title>{t('wods:exercises')}</Title>
            <Exercises>
              {workout.data.exercises.map((item, index) => (
                <Exercise key={index}>{item}</Exercise>
              ))}
            </Exercises>
            <Title>{t('wods:result')}</Title>
            <Result>{workout.data.countResultOf}</Result>
          </Info>
        </WorkoutDetails>

        <ButtonContainer>
          <Button
            text={t('wods:seeResults')}
            onPress={() => {
              navigation.navigate(ROUTES.WorkoutResults, {
                workout: workout,
              });
            }}
            bgColor={theme.appColors.primaryColorLighter}
          />
        </ButtonContainer>
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

const Scroll = styled.ScrollView`
  width: 100%;
`;

const WorkoutDetails = styled.View`
  margin-bottom: 20px;
  width: 100%;
  align-items: center;
`;

const ImageContainer = styled.View`
  margin: 10px 0px 0px 0px;
  width: 90%;
`;

const Image = styled.ImageBackground`
  height: 170px;
  width: 100%;
  overflow: hidden;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const WodInfo = styled.View`
  background-color: ${({theme}) => theme.appColors.backgroundColor_opacity50};
  padding: 10px 20px;
  justify-content: flex-end;
  align-items: flex-start;
`;

const WodName = styled.Text`
  color: ${({theme}) => theme.appColors.accentColor};
  font-size: 27px;
  font-weight: bold;
`;

const WodType = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 16px;
`;

const Info = styled.View`
  width: 90%;
  padding: 20px 0px 10px 0px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  justify-content: center;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
  align-items: center;
`;

const Exercises = styled.View`
  width: 100%;
  padding: 10px 10px 25px 20px;
  align-items: flex-start;
`;

const Title = styled.Text`
  padding: 5px;
  border-radius: 5px;
  width: 60%;
  color: ${({theme}) => theme.appColors.whiteColor};
  background-color: ${({theme}) => theme.appColors.backgroundColor};
  font-size: 23px;
  text-align: center;
`;

const Weights = styled.Text`
  width: 100%;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 19px;
  padding: 10px 0px 25px 20px;
  text-align: left;
`;

const Exercise = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 19px;
  padding: 3px 0px;
`;

const Result = styled.Text`
  width: 100%;
  align-items: flex-start;
  justify-content: flex-start;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 19px;
  padding: 10px 0px 25px 20px;
`;

const ButtonContainer = styled.View`
  margin-bottom: 40px;
  align-items: center;
  width: 100%;
`;

export default withTheme(WodDetailView);
