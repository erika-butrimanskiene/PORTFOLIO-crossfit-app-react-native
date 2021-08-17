import React from 'react';
import {FlatList, View, Text} from 'react-native';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';

//INTERFACES
import {IWorkoutState} from 'src/state/workouts/workoutsInterface';

interface IWorkoutResultsViewProps {
  theme: DefaultTheme;
  route: any;
}

const WorkoutResultsView: React.FC<IWorkoutResultsViewProps> = ({
  theme,
  route,
}) => {
  const workout: IWorkoutState = route.params.workout;
  console.log(workout.data.results);

  const renderItem = ({item, index}: {item: string; index: number}) => {
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
  };

  return (
    <Container>
      <WorkoutInfo>
        <Workout>
          <WorkoutName>{workout.data.name}</WorkoutName>
          <WorkoutType>{workout.data.workoutType}</WorkoutType>
        </Workout>
        <CountResultOf>{workout.data.countResultOf}</CountResultOf>
      </WorkoutInfo>

      <ResultsList>
        {workout.data.results && (
          <FlatList
            data={Object.keys(workout.data.results)}
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
  padding: 10px;
  /* background-color: ${({theme}) =>
    theme.appColors.backgroundColorLighter}; */
  width: 100%;
  justify-content: center;
  align-items: center;
  border-top-color: ${({theme}) => theme.appColors.primaryColorLighter};

  border-top-width: 2px;
`;

const WorkoutName = styled.Text`
  color: ${({theme}) => theme.appColors.accentColor};
  font-size: 25px;
`;

const WorkoutType = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 14px;
`;

const CountResultOf = styled.Text`
  text-align: center;
  width: 100%;
  background-color: ${({theme}) => theme.appColors.primaryColorLighter};
  padding: 5px;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 20px;
`;

const ResultsList = styled.View`
  width: 90%;
  margin-bottom: 360px;
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
