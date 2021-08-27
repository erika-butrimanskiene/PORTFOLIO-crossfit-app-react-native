import React from 'react';
import {StatusBar, ActivityIndicator, TouchableOpacity} from 'react-native';
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

  //GLOBAL STATES
  const onSync = useSelector((state: RootState) => state.ui.onSync);
  const user = useSelector((state: RootState) => state.user.user);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <HeaderLeft>
          <ImageContainer>
            <Image source={{uri: user.imageUrl}}></Image>
          </ImageContainer>

          <Logout onPress={() => dispatch(actions.user.logoutUser())}>
            <LogoutText>{t('user:logout')}</LogoutText>
          </Logout>
        </HeaderLeft>
      ),
      headerRight: () => (
        <HeaderRight>
          <SwitchLanguage
            options={options}
            hasPadding
            initial={0}
            buttonColor={theme.appColors.accentColor}
            onPress={(language: string) => {
              i18n.changeLanguage(language);
            }}
          />
        </HeaderRight>
      ),
    });
  }, [navigation, user]);

  return (
    <Container>
      <StatusBar backgroundColor={`${theme.appColors.backgroundColor}`} />

      {onSync ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <WelcomeMessage>
            <WelcomeText>{t('user:welcome')}, </WelcomeText>
            <WelcomeUser>{user.name}</WelcomeUser>
          </WelcomeMessage>
          <ScrollContent>
            <HomeViewLink
              image={imagesURI[1]}
              onPress={() => navigation.navigate(ROUTES.WodsList)}
              text={t('wods:wodsList')}
              admin={false}
              timeoutForAnimation={0}
            />

            <HomeViewLink
              image={imagesURI[6]}
              onPress={() => navigation.navigate(ROUTES.ActivityBoard)}
              text={t('user:activityBoard')}
              admin={false}
              timeoutForAnimation={400}
            />

            <HomeViewLink
              image={imagesURI[3]}
              onPress={() => {
                dispatch(actions.ui.setOnSync(true));
                navigation.navigate(ROUTES.ActivitiesHistory);
              }}
              text={t('user:activitiesHistory')}
              admin={false}
              timeoutForAnimation={800}
            />

            <HomeViewLink
              image={imagesURI[2]}
              onPress={() => navigation.navigate(ROUTES.Profile)}
              text={t('user:userProfile')}
              admin={false}
              timeoutForAnimation={1200}
            />

            {user.admin && (
              <>
                <HomeViewLink
                  image={imagesURI[5]}
                  onPress={() => navigation.navigate(ROUTES.CreateWorkout)}
                  text={t('admin:createWorkout')}
                  admin={true}
                  timeoutForAnimation={1600}
                />

                <HomeViewLink
                  image={imagesURI[0]}
                  onPress={() => navigation.navigate(ROUTES.WorkoutsList)}
                  text={t('admin:workoutsList')}
                  admin={true}
                  timeoutForAnimation={2000}
                />

                <HomeViewLink
                  image={imagesURI[4]}
                  onPress={() => navigation.navigate(ROUTES.CreateWod)}
                  text={t('admin:createWod')}
                  admin={true}
                  timeoutForAnimation={2400}
                />
              </>
            )}
          </ScrollContent>
        </>
      )}
    </Container>
  );
};

const HeaderRight = styled.View`
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

const HeaderLeft = styled.View`
  padding: 5px;
  flex-direction: row;
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

const SwitchLanguage = styled(SwitchSelector)`
  margin: 0px 15px;
  width: 70px;
`;

const ImageContainer = styled.View`
  margin-left: 15px;
  width: 40px;
  height: 40px;
  align-items: center;
  border-radius: 100px;
  border-width: 2px;
  border-color: ${({theme}) => theme.appColors.accentColor};
  overflow: hidden;
`;

const Image = styled.ImageBackground`
  border-radius: 100px;
  width: 40px;
  height: 40px;
`;

const Logout = styled(TouchableOpacity)`
  margin: 0px 10px;
`;

const LogoutText = styled.Text`
  font-size: 23px;

  font-style: italic;
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
  justify-content: center;
  padding: 10px;
  border-radius: 5px;
  width: 90%;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
  margin: 45px 0px 15px 0px;
`;

const WelcomeText = styled.Text`
  font-size: 20px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const WelcomeUser = styled.Text`
  font-size: 20px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const ScrollContent = styled.ScrollView.attrs(() => ({
  contentContainerStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}))`
  width: 100%;
  margin: 15px 0px 0px 0px;
`;

export default withTheme(HomeView);
