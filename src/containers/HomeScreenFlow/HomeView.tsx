import React, {useState} from 'react';
import {
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import SwitchSelector from 'react-native-switch-selector';

//ROUTES
import {RootState} from 'src/state/reducers';
import {actions} from '../../state/actions';
import ROUTES from '../../routes/Routes';
import {RootStackParamList} from 'src/routes/Interface';
//UTILS
import {imagesURI} from '../../utils/workoutsImages';
//COMPONENTS
import HomeViewLink from '../../components/Links/HomeViewLink';

//VARIABLES
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
  const dispatch = useDispatch();

  //STATES
  const onSync = useSelector((state: RootState) => state.ui.onSync);
  const user = useSelector((state: RootState) => state.user.user);

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

  return (
    <Container>
      <StatusBar backgroundColor={`${theme.appColors.backgroundColor}`} />

      {onSync ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <ScrollContent>
          <WelcomeMessage>
            <WelcomeText>Welcome, </WelcomeText>
            <WelcomeUser>{user.name}</WelcomeUser>
          </WelcomeMessage>
          <HomeViewLink
            image={imagesURI[1]}
            onPress={() => navigation.navigate(ROUTES.WodsList)}
            text={t('wods:wodsList')}
            admin={false}
          />

          <HomeViewLink
            image={imagesURI[6]}
            onPress={() => navigation.navigate(ROUTES.ActivityBoard)}
            text={t('user:activityBoard')}
            admin={false}
          />

          <HomeViewLink
            image={imagesURI[3]}
            onPress={() => {
              dispatch(actions.ui.setOnSync(true));
              navigation.navigate(ROUTES.ActivitiesHistory);
            }}
            text={t('user:activitiesHistory')}
            admin={false}
          />

          <HomeViewLink
            image={imagesURI[2]}
            onPress={() => navigation.navigate(ROUTES.Profile)}
            text={t('user:userProfile')}
            admin={false}
          />

          {user.admin && (
            <>
              <HomeViewLink
                image={imagesURI[5]}
                onPress={() => navigation.navigate(ROUTES.CreateWorkout)}
                text={t('admin:createWorkout')}
                admin={true}
              />

              <HomeViewLink
                image={imagesURI[0]}
                onPress={() => navigation.navigate(ROUTES.WorkoutsList)}
                text={t('admin:workoutsList')}
                admin={true}
              />

              <HomeViewLink
                image={imagesURI[4]}
                onPress={() => navigation.navigate(ROUTES.CreateWod)}
                text={t('admin:createWod')}
                admin={true}
              />
            </>
          )}
        </ScrollContent>
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
  padding-top: 40px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.appColors.backgroundColor};
`;

const WelcomeMessage = styled.View`
  flex-direction: row;
  margin: 15px 0px 25px 0px;
`;

const WelcomeText = styled.Text`
  font-size: 25px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const WelcomeUser = styled.Text`
  font-size: 25px;
  color: ${({theme}) => theme.appColors.accentColor};
  font-style: italic;
`;

const ScrollContent = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}))`
  width: 100%;
  margin: 30px 0px 40px 0px;
`;

export default withTheme(HomeView);
