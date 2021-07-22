import React, {useContext} from 'react';
import {
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import styled, {withTheme} from 'styled-components';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';

import {actions} from '../../state/actions';
import {AuthContext} from '../../routes/AuthProvider';
import ROUTES from '../../routes/Routes';

//COMPONENTS
import Button from '../../components/Button';

const HomeView = ({theme, navigation}) => {
  const {t} = useTranslation();
  const {logout} = useContext(AuthContext);

  const onSync = useSelector(state => state.ui.authOnSync);
  const user = useSelector(state => state.user.user);

  const dispatch = useDispatch();

  return (
    <HomeContainer>
      <StatusBar backgroundColor={`${theme.appColors.backgroundColor}`} />

      {onSync ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <Heading>Welcome To Home Page</Heading>
          <Heading>{user.email}</Heading>
          <Heading>{onSync}</Heading>
          <Button
            text="Logout"
            bgColor={`${theme.appColors.lightPrimaryColor}`}
            onPress={() => dispatch(actions.user.logoutUser(logout))}
          />

          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.Profile)}>
            <Text>{t('user:userProfile')}</Text>
          </TouchableOpacity>
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
  background-color: ${({theme}) => theme.appColors.backgroundColor};
`;

const Heading = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor}; ;
`;

export default withTheme(HomeView);
