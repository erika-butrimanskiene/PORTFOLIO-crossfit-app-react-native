import React, {useState} from 'react';
import {FlatList, View, Text} from 'react-native';
import {useSelector} from 'react-redux';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import SwitchSelector from 'react-native-switch-selector';

//ROUTES
import {RootState} from 'src/state/reducers';
//INTERFACES
import {IWorkoutState} from 'src/state/workouts/workoutsInterface';

//VARIABLES
const options = [
  {label: 'Your', value: 'your'},
  {label: 'All', value: 'all'},
];

interface IWorkoutResultsViewProps {
  theme: DefaultTheme;
  route: any;
}

const WorkoutResultsView: React.FC<IWorkoutResultsViewProps> = ({
  theme,
  route,
}) => {
  const workout: IWorkoutState = route.params.workout;
  //GLOBAL STATES
  const user = useSelector((state: RootState) => state.user.user);
  //STATES
  const [isUserResults, setIsUserResults] = useState(false);

  const renderItem = ({item, index}: {item: string; index: number}) => {
    const userResults = workout.data.results[item].filter(
      result => result.attendeeId === user.uid,
    );

    if (isUserResults) {
      if (userResults.length > 0) {
        return (
          <ResultByDate>
            <Date>{item}</Date>
            {userResults.map(item => (
              <Result key={item.attendeeId}>
                <AttendeeInfo>
                  {item.attendeeName} {item.attendeeSurname}
                </AttendeeInfo>
                <AttendeeResult>{item.result}</AttendeeResult>
              </Result>
            ))}
          </ResultByDate>
        );
      }
    } else {
      return (
        <ResultByDate>
          <Date>{item}</Date>
          {workout.data.results[item].map(item => (
            <Result key={item.attendeeId}>
              <AttendeeInfo>
                {item.attendeeName} {item.attendeeSurname}
              </AttendeeInfo>
              <AttendeeResult>{item.result}</AttendeeResult>
            </Result>
          ))}
        </ResultByDate>
      );
    }
  };

  return (
    <Container>
      <WorkoutInfo>
        <Workout>
          <WorkoutName>{workout.data.name}</WorkoutName>
        </Workout>
        <CountResultOf>{workout.data.countResultOf}</CountResultOf>
      </WorkoutInfo>

      <SwitchResults>
        <SwitchSelector
          options={options}
          hasPadding
          valuePadding={5}
          fontSize={18}
          initial={1}
          borderRadius={2}
          textColor={theme.appColors.whiteColor}
          backgroundColor={theme.appColors.backgroundColorVeryLight}
          buttonColor={theme.appColors.primaryColorLighter}
          borderColor={theme.appColors.backgroundColorDarken}
          style={{width: 120}}
          onPress={() => {
            setIsUserResults(!isUserResults);
          }}
        />
      </SwitchResults>

      <ResultsList>
        {workout.data.results && (
          <FlatList
            data={Object.keys(workout.data.results).sort((a, b) => {
              return a > b ? -1 : 1;
            })}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        )}
      </ResultsList>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 50px;
  font-size: 20px;
  align-items: center;
  justify-content: flex-start;
  background-color: ${({theme}) => theme.appColors.backgroundColor};
`;

const WorkoutInfo = styled.View`
  width: 90%;
`;

const Workout = styled.View`
  padding: 5px;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
  width: 100%;
  justify-content: center;
  align-items: center;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
`;

const WorkoutName = styled.Text`
  color: ${({theme}) => theme.appColors.accentColor};
  font-size: 30px;
`;

const CountResultOf = styled.Text`
  text-align: center;
  width: 100%;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
  padding: 8px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  border-top-color: ${({theme}) => theme.appColors.accentColor};
  border-top-width: 3px;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 20px;
`;

const SwitchResults = styled.View`
  width: 90%;
  margin: 20px 0px 5px 0px;
  align-items: flex-end;
`;

const ResultsList = styled.View`
  flex: 1;
  width: 90%;
  margin-bottom: 20px;
`;

const ResultByDate = styled.View`
  width: 100%;
  margin: 20px 0px 10px 0px;
  justify-content: center;
`;

const Date = styled.Text`
  border-radius: 5px;
  margin: 5px 0px;
  padding: 3px;
  background-color: ${({theme}) => theme.appColors.backgroundColorDarken};
  text-align: center;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 20px;
  width: 100%;
`;

const Result = styled.View`
  border-radius: 5px;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
  margin: 5px 0px;
  padding: 5px 10px;
  flex-direction: row;
  justify-content: space-between;
`;

const AttendeeInfo = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 18px;
`;

const AttendeeResult = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 18px;
`;

export default withTheme(WorkoutResultsView);
