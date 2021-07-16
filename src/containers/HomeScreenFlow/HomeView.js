import React, {useContext} from 'react';
import {StatusBar, ActivityIndicator} from 'react-native';
import {AuthContext} from '../../routes/AuthProvider';
import styled, {withTheme} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {actions} from '../../state/actions';

//COMPONENTS
import Button from '../../components/Button';

const HomeView = ({theme}) => {
  const {logout} = useContext(AuthContext);

  const onSync = useSelector(state => state.ui.authOnSync);
  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch();

  return (
    <HomeContainer>
      <StatusBar backgroundColor={`${theme.appColors.primaryColor}`} />

      {onSync ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <Heading>Welcome To Home Page</Heading>
          <Heading>{user.email}</Heading>
          <Heading>{onSync}</Heading>
          <Button
            text="Logout"
            bgColor={`${theme.appColors.lightAccentColor}`}
            onPress={() => dispatch(actions.user.logoutUser(logout))}
          />
        </>
      )}
    </HomeContainer>
  );
};

const HomeContainer = styled.View`
  flex: 1;
  padding-top: 60px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.appColors.primaryColor};
`;

const Heading = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor}; ;
`;

export default withTheme(HomeView);
