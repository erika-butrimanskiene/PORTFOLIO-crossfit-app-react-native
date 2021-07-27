import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {RootState} from 'src/state/reducers';
import styled from 'styled-components/native';

import ROUTES from './Routes';
import {actions} from '../state/actions';
import {database} from '../utils/database';
import {RootStackParamList} from './Interface';

import LandingView from '../containers/LandingScreenFlow/LandingView';
import LoginView from '../containers/AuthFlow/LoginView';
import RegisterView from '../containers/AuthFlow/RegisterView';
import ForgotPasswordView from '../containers/AuthFlow/ForgotPasswordView';
import HomeView from '../containers/HomeScreenFlow/HomeView';
import ProfileView from '../containers/UserFlow/ProfileView';
import CreateWorkoutView from '../containers/AdminFlow/CreateWorkoutView';

import NotificationModal from '../components/NotificationModal';

const Stack = createStackNavigator<RootStackParamList>();

const Navigator: React.FC = () => {
  const {t} = useTranslation();
  const [initializing, setInitializing] = useState(true);

  const dispatch = useDispatch();
  const error = useSelector((state: RootState) => state.messages.authErrorMsg);
  const user = useSelector((state: RootState) => state.user.user);

  const errorText = t(`authErrors:${error}`);

  const onAuthStateChanged = (authUser: any) => {
    if (authUser) {
      dispatch(actions.ui.setOnSync(true));
      database
        .ref(`/users/${authUser.uid}`)
        .once('value')
        .then(snapshot => {
          dispatch(
            actions.user.setUserSuccess({
              name: snapshot.val().name,
              surname: snapshot.val().surname,
              email: snapshot.val().email,
              admin: snapshot.val().admin,
              uid: authUser.uid,
            }),
          );
          dispatch(actions.ui.setOnSync(false));
        })
        .catch(e => {
          console.log(e);
          dispatch(actions.ui.setOnSync(false));
        });
    }

    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  console.log(user);

  return (
    <NavigationContainer>
      {errorText !== '' && (
        <NotificationModal
          notificationIcon={'error-outline'}
          bgColor={'#B22430'}
          errorText={errorText}
          onPress={() => dispatch(actions.messages.clearMessages())}
        />
      )}
      {Object.keys(user).length !== 0 ? (
        <Stack.Navigator
          screenOptions={{
            title: '',
            headerTransparent: true,
            headerStyle: {
              elevation: 0,
            },
            headerTintColor: 'white',
          }}>
          <Stack.Screen name={ROUTES.Home} component={HomeView} />
          <Stack.Screen name={ROUTES.Profile} component={ProfileView} />
          <Stack.Screen
            name={ROUTES.CreateWorkout}
            component={CreateWorkoutView}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          screenOptions={{
            title: '',
            headerTransparent: true,
            headerStyle: {
              elevation: 0,
            },
            headerTintColor: 'white',
          }}>
          <Stack.Screen name={ROUTES.Landing} component={LandingView} />
          <Stack.Screen name={ROUTES.Login} component={LoginView} />
          <Stack.Screen name={ROUTES.Register} component={RegisterView} />
          <Stack.Screen name={ROUTES.Password} component={ForgotPasswordView} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const ErrorBar = styled.View`
  flex-direction: row;
  padding: 10px 10px;
  background-color: #bf283b;
  font-size: 17px;
  align-items: center;
  justify-content: space-between;
`;

const ErrorText = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
`;

export default Navigator;
