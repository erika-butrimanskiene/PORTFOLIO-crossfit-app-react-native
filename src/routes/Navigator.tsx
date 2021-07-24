import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import {RootState} from 'src/state/reducers';

import ROUTES from './Routes';
import {actions} from '../state/actions';
import {database} from '../utils/database';

import LandingView from '../containers/LandingScreenFlow/LandingView';
import LoginView from '../containers/AuthFlow/LoginView';
import RegisterView from '../containers/AuthFlow/RegisterView';
import ForgotPasswordView from '../containers/AuthFlow/ForgotPasswordView';
import HomeView from '../containers/HomeScreenFlow/HomeView';
import ProfileView from '../containers/UserFlow/ProfileView';

import {RootStackParamList} from './Interface';

const Stack = createStackNavigator<RootStackParamList>();

const Navigator: React.FC = () => {
  const {t} = useTranslation();
  const [initializing, setInitializing] = useState(true);
  const [isError, setIsError] = useState(false);

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

  useEffect(() => {
    if (errorText !== '') {
      setIsError(true);
    } else {
      setIsError(false);
    }
  }, [errorText]);

  if (initializing) return null;
  console.log(user);

  return (
    <NavigationContainer>
      {isError && (
        <View>
          <Text>{errorText}</Text>
        </View>
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

export default Navigator;
