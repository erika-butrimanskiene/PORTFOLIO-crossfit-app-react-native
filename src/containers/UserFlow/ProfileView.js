import React, {useContext} from 'react';
import {StatusBar, ActivityIndicator} from 'react-native';
import styled, {withTheme} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';

import {actions} from '../../state/actions';

const ProfileView = ({theme}) => {
  const onSync = useSelector(state => state.ui.authOnSync);
  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch();

  return (
    <Container>
      <StatusBar backgroundColor={`${theme.appColors.backgroundColor}`} />
      {onSync ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <Heading>Welcome To Profile Page</Heading>
          <Heading>{user.email}</Heading>
          <Heading>{user.name}</Heading>
        </>
      )}
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
  color: ${({theme}) => theme.appColors.whiteColor}; ;
`;

export default withTheme(ProfileView);
