import React from 'react';
import {StatusBar, ActivityIndicator, TouchableOpacity} from 'react-native';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootState} from 'src/state/reducers';
import SwitchSelector from 'react-native-switch-selector';

import {actions} from '../../state/actions';
import ROUTES from '../../routes/Routes';
import {RootStackParamList} from 'src/routes/Interface';

const options = [
  {label: 'EN', value: 'en'},
  {label: 'LT', value: 'lt'},
];

type HomeViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.Home
>;

interface IHomeViewProps {
  theme: DefaultTheme;
  navigation: HomeViewScreenNavigationProp;
}

const HomeView: React.FC<IHomeViewProps> = ({theme, navigation}) => {
  const {t, i18n} = useTranslation();

  const onSync = useSelector((state: RootState) => state.ui.authOnSync);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          <HeaderActions>
            <Logout onPress={() => dispatch(actions.user.logoutUser())}>
              <LogoutText>LOGOUT</LogoutText>
            </Logout>
            <SwitchSelector
              options={options}
              hasPadding
              initial={0}
              buttonColor={theme.appColors.accentColor}
              style={{width: 70}}
              onPress={(language: string) => {
                i18n.changeLanguage(language);
              }}
            />
          </HeaderActions>
        </>
      ),
    });
  }, [navigation]);

  const seeWorkoutsList = () => {
    dispatch(actions.workouts.getWorkoutsList());
    navigation.navigate(ROUTES.WorkoutsList);
  };

  return (
    <Container>
      <StatusBar backgroundColor={`${theme.appColors.backgroundColor}`} />

      {onSync ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <Heading>Welcome To Home Page</Heading>
          <Heading>{user.email}</Heading>
          <Heading>{onSync}</Heading>
          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.Profile)}>
            <LinkText>{t('user:userProfile')}</LinkText>
          </TouchableOpacity>
          {user.admin && (
            <>
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.CreateWorkout)}>
                <LinkText>{t('admin:createWorkout')}</LinkText>
              </TouchableOpacity>
              <TouchableOpacity onPress={seeWorkoutsList}>
                <LinkText>{t('admin:workoutsList')}</LinkText>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.CreateWod)}>
                <LinkText>{t('admin:createWod')}</LinkText>
              </TouchableOpacity>
            </>
          )}
        </>
      )}
    </Container>
  );
};

const HeaderActions = styled.View`
  flex-direction: row;
  align-items: center;
`;

const Logout = styled(TouchableOpacity)`
  padding-right: 20px;
`;

const LogoutText = styled.Text`
  font-size: 20px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

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

const LinkText = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 25px;
`;

export default withTheme(HomeView);
