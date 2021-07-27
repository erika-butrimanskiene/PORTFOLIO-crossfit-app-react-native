import React from 'react';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {RootState} from 'src/state/reducers';

import {actions} from '../../state/actions';
import ROUTES from '../../routes/Routes';
import {RootStackParamList} from 'src/routes/Interface';

interface ICreateWorkoutViewProps {
  theme: DefaultTheme;
}

const CreateWorkoutView: React.FC<ICreateWorkoutViewProps> = ({theme}) => {
  const {t, i18n} = useTranslation();

  const onSync = useSelector((state: RootState) => state.ui.authOnSync);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  return (
    <Container>
      <Heading>Workout screen</Heading>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 60px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.appColors.backgroundColor};
`;

const Heading = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
`;

export default withTheme(CreateWorkoutView);
