import React from 'react';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

import {RootState} from 'src/state/reducers';
import {getUserUpcomingWods} from '../../utils/getUserUpcomingWods';
import Button from '../../components/Button';
import {getWorkoutById} from '../../utils/firebaseDatabaseAPI';
import ROUTES from '../../routes/Routes';
import {RootStackParamList} from 'src/routes/Interface';
import {imagesURI} from '../../utils/workoutsImages';

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
  const userWods = useSelector((state: RootState) => state.user.userWods);

  const filteredWodsList = getUserUpcomingWods(userWods);
  console.log(filteredWodsList);

  return (
    <Container>
      <Title>{t('user:upcomingWods')}</Title>
      <Wods>
        {filteredWodsList.map((wod, index) => {
          const imageIndex = index - Math.floor(index / 5) * 5;
          const image = imagesURI[imageIndex];

          if (wod.wodTimes.length !== 0) {
            return (
              <WodInfo key={index}>
                <WodDate>{wod.wodDate}</WodDate>
                <WodName>{wod.workoutName}</WodName>
                <Button
                  text={'test'}
                  onPress={async () => {
                    let data = await getWorkoutById(wod.workoutId);
                    console.log(data);

                    navigation.navigate(ROUTES.WodDetail, {
                      workout: data,
                      date: wod.wodDate,
                      image: image,
                    });
                  }}
                  bgColor={theme.appColors.accentColor}></Button>
              </WodInfo>
            );
          }
        })}
      </Wods>
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

const Title = styled.Text`
  margin: 5px 0px 15px 0px;
  background-color: ${({theme}) => theme.appColors.accentColor_opacity50};
  border-radius: 5px;
  padding: 10px;
  width: 90%;
  font-size: 25px;
  color: ${({theme}) => theme.appColors.whiteColor};
  text-align: center;
`;

const Wods = styled.View`
  width: 90%;
`;

const WodInfo = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin: 10px 0px;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
`;

const WodDate = styled.Text`
  padding: 10px;
  font-size: 20px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const WodName = styled.Text`
  padding: 10px;
  font-size: 20px;
  color: ${({theme}) => theme.appColors.accentColor};
`;

export default withTheme(ActivityBoardView);
