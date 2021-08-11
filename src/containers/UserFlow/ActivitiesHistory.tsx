import React from 'react';
import {View, Text, FlatList} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useSelector} from 'react-redux';

//ROUTES
import ROUTES from '../../routes/Routes';
import {RootState} from 'src/state/reducers';
import {RootStackParamList} from 'src/routes/Interface';
//UTILS
import {getUserPreviousWods} from '../../utils/getUserFilteredWods';
//INTERFACES
import {IuserWod} from 'src/state/user/userInterface';

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
  //STATES
  const userWods = useSelector((state: RootState) => state.user.userWods);
  //VARIABLES
  const filteredWodsList: IuserWod[] = getUserPreviousWods(userWods);

  const renderItem = ({item, index}: {item: IuserWod; index: number}) => {
    return (
      <WodItem>
        <WodDate>{item.wodDate}</WodDate>
        <WodInfo>
          <WorkoutName>{item.workoutName}</WorkoutName>
        </WodInfo>
      </WodItem>
    );
  };

  return (
    <Container>
      <Title>Your WODs history</Title>

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

const WodItem = styled.View``;

const WodDate = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const WodInfo = styled.View`
  margin: 10px 0px;
  padding: 10px;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
`;

const WorkoutName = styled.Text`
  font-size: 23px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

export default withTheme(ActivitiesHistoryView);
