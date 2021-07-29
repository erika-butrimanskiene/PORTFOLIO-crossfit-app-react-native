import React, {useEffect} from 'react';
import {Button} from 'react-native';
import styled from 'styled-components/native';
import {useDispatch, useSelector} from 'react-redux';
import {RootState} from '../../state/reducers';
import {actions} from '../../state/actions';

import {database} from '../../utils/database';

interface IWorkoutsListViewProps {}

const WorkoutsListView: React.FC<IWorkoutsListViewProps> = () => {
  const dispatch = useDispatch();
  const id = useSelector((state: RootState) => state.workouts);
  useEffect(() => {
    dispatch(actions.workouts.getWorkoutsList());
  }, []);
  return (
    <Container>
      <Button
        title="state"
        onPress={() => {
          console.log(id);
        }}></Button>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${({theme}) => theme.appColors.backgroundColor};
  flex: 1;
  padding-top: 100px;
  font-size: 20px;
  align-items: center;
`;

export default WorkoutsListView;
