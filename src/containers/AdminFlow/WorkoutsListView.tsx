import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import {useSelector} from 'react-redux';
import {RootState} from '../../state/reducers';
import {IWorkoutState} from 'src/state/workouts/workoutsInterface';
import {StackNavigationProp} from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import ROUTES from '../../routes/Routes';
import {RootStackParamList} from 'src/routes/Interface';

import Button from '../../components/Button';

type WorkoutsListViewNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.WorkoutsList
>;
interface IWorkoutsListViewProps {
  theme: DefaultTheme;
  navigation: WorkoutsListViewNavigationProp;
}

const WorkoutsListView: React.FC<IWorkoutsListViewProps> = ({
  theme,
  navigation,
}) => {
  const {t, i18n} = useTranslation();
  const workouts: IWorkoutState[] = useSelector(
    (state: RootState) => state.workouts.workouts,
  );
  const [search, setSearch] = useState('');
  const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);

  useEffect(() => {
    handleFilter(search);
  }, [workouts]);

  interface Iitem {
    item: IWorkoutState;
  }

  const handleFilter = (text: string) => {
    if (text) {
      const newData = workouts.filter(item => {
        return item.data.name.toUpperCase().indexOf(text.toUpperCase()) > -1;
      });
      setFilteredWorkouts(newData);
    } else {
      setFilteredWorkouts(workouts);
    }
    setSearch(text);
  };

  const renderItem = ({item}: Iitem) => {
    return (
      <WorkoutItem>
        <TextsContainer>
          <WorkoutName>{item.data.name}</WorkoutName>
          <WorkoutType>{item.data.workoutType}</WorkoutType>
          <SeeMore>{t('admin:details')}</SeeMore>
        </TextsContainer>
      </WorkoutItem>
    );
  };

  return (
    <Container>
      <InputContainer>
        <Input
          value={search}
          onChangeText={text => handleFilter(text)}
          placeholder={t('admin:search')}
          placeholderTextColor={theme.appColors.whiteColor}
          autoCapitalize="none"
          autoCorrect={false}
          underlineColorAndroid="transparent"
        />

        <Icon
          onPress={() => {
            return;
          }}>
          <MaterialIcons
            name={'search'}
            size={30}
            color={theme.appColors.primaryColorLighter}
          />
        </Icon>
      </InputContainer>
      <ButtonContainer>
        <Button
          text={t('admin:createNewWorkoutBtn')}
          bgColor={`${theme.appColors.primaryColorLighter}`}
          onPress={() => navigation.navigate(ROUTES.CreateWorkout)}
        />
      </ButtonContainer>

      <FlatListContainer>
        <FlatList
          data={filteredWorkouts}
          keyExtractor={item => item.id}
          renderItem={renderItem}
        />
      </FlatListContainer>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${({theme}) => theme.appColors.backgroundColor};
  flex: 1;
  padding-top: 70px;
  font-size: 20px;
  align-items: center;
`;

const InputContainer = styled.View`
  margin-bottom: 10px;
  padding: 0px 5px;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  width: 75%;
`;

const Input = styled.TextInput`
  font-size: 20px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const Icon = styled.TouchableOpacity``;

const ButtonContainer = styled.View`
  margin: 15px 0px;
`;

const FlatListContainer = styled.View`
  width: 85%;
  margin-bottom: 180px;
`;

const WorkoutItem = styled.View`
  margin: 10px 0px;
  border-radius: 3px;
  border-left-width: 10px;
  border-left-color: ${({theme}) => theme.appColors.accentColor};
  min-height: 100px;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
`;

const TextsContainer = styled.View`
  width: 80%;
  padding: 10px 10px 10px 15px;
`;

const WorkoutName = styled.Text`
  font-size: 23px;
  font-weight: bold;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const WorkoutType = styled.Text`
  font-size: 16px;
  color: ${({theme}) => theme.appColors.whiteColor};
  padding-bottom: 10px;
`;

const SeeMore = styled.Text`
  font-size: 17px;
  color: ${({theme}) => theme.appColors.textColorLightGray};
`;

export default withTheme(WorkoutsListView);
