import React, {useState, useEffect} from 'react';
import {FlatList} from 'react-native';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

//LIBRARIES
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {showAlert, closeAlert} from 'react-native-customisable-alert';
//ROUTES
import ROUTES from '../../routes/Routes';
import {actions} from '../../state/actions';
import {RootState} from '../../state/reducers';
import {RootStackParamList} from 'src/routes/Interface';
//UTILS
import {imagesURI} from '../../utils/workoutsImages';
//UTILS-DATABASE
import {getWorkoutById} from '../../utils/firebaseDatabaseAPI';
import {deleteWorkout} from '../../utils/firebaseDatabaseAPI';
//INTERFACES
import {IWorkoutState} from 'src/state/workouts/workoutsInterface';
//COMPONENTS
import Button from '../../components/Buttons/Button';
import ConfirmationModal from '../../components/Modals/ConfirmationModal';

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
  const dispatch = useDispatch();

  //STATES
  const workouts: IWorkoutState[] = useSelector(
    (state: RootState) => state.workouts.workouts,
  );
  const isWorkoutSelection: boolean = useSelector(
    (state: RootState) => state.workouts.initSelection,
  );

  const [search, setSearch] = useState('');
  const [filteredWorkouts, setFilteredWorkouts] = useState(workouts);

  useEffect(() => {
    handleFilter(search);
  }, [workouts]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      dispatch(actions.workouts.initWorkoutSelection(false));
    });
    return unsubscribe;
  }, [navigation]);

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

  const handleDelete = (id: string) => {
    showAlert({
      alertType: 'custom',
      customAlert: (
        <ConfirmationModal
          confirmText={t('admin:delete')}
          alertText={t('admin:workoutDelete')}
          onCancelPress={() => closeAlert()}
          onConfirmPress={() => {
            deleteWorkout(id);
            closeAlert();
          }}
        />
      ),
    });
  };

  const renderItem = ({item, index}: {item: IWorkoutState; index: number}) => {
    const imageIndex = index - Math.floor(index / 7) * 7;
    const image = imagesURI[imageIndex];
    return (
      <WorkoutItem>
        <TextsContainer>
          <WorkoutName>{item.data.name}</WorkoutName>
          <WorkoutType>{item.data.workoutType}</WorkoutType>
          <Actions>
            <SeeMoreLink
              onPress={async () => {
                let data = await getWorkoutById(item.id);

                navigation.navigate(ROUTES.WodDetail, {
                  workout: data,
                  image: image,
                });
              }}>
              <SeeMore>{t('admin:details')}</SeeMore>
            </SeeMoreLink>
            <DeleteAction onPress={() => handleDelete(item.id)}>
              <Delete>{t('admin:delete').toUpperCase()}</Delete>
            </DeleteAction>
          </Actions>
        </TextsContainer>
        {isWorkoutSelection && (
          <Icon
            onPress={() => {
              console.log(item);
              dispatch(actions.workouts.selectWorkout(item));
              navigation.navigate(ROUTES.CreateWod);
            }}>
            <MaterialIcons
              name={'add'}
              size={30}
              color={theme.appColors.accentColor}
            />
            <IconText>WOD</IconText>
          </Icon>
        )}
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

const Icon = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
`;

const IconText = styled.Text`
  font-size: 18px;
  color: ${({theme}) => theme.appColors.primaryColorLighter};
`;

const ButtonContainer = styled.View`
  margin: 15px 0px;
`;

const FlatListContainer = styled.View`
  width: 85%;
  margin-bottom: 180px;
`;

const WorkoutItem = styled.View`
  flex-direction: row;
  align-items: center;
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

const Actions = styled.View`
  flex-direction: row;
`;

const SeeMoreLink = styled.TouchableOpacity``;

const SeeMore = styled.Text`
  padding-right: 17px;
  font-size: 17px;
  color: ${({theme}) => theme.appColors.textColorLightGray};
`;

const DeleteAction = styled.TouchableOpacity``;

const Delete = styled.Text`
  font-size: 17px;
  color: ${({theme}) => theme.appColors.textColorLightGray};
`;

export default withTheme(WorkoutsListView);
