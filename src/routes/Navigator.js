import React, {useContext, useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import {theme} from '../../assets/styles/theme';
import {View, Text} from 'react-native';
import {useTranslation} from 'react-i18next';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';

import LandingView from '../containers/LandingScreenFlow/LandingView';
import LoginView from '../containers/AuthFlow/LoginView';
import RegisterView from '../containers/AuthFlow/RegisterView';
import ForgotPasswordView from '../containers/AuthFlow/ForgotPasswordView';
import HomeView from '../containers/HomeScreenFlow/HomeView';
import ROUTES from './Routes';

const Stack = createStackNavigator();

const Navigator = () => {
  const {t} = useTranslation();
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);
  const [isError, setIsError] = useState(false);
  const error = useSelector(state => state.messages.authErrorMsg);
  console.log(error);
  const errorText = t(`authErrors:${error}`);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    if (errorText !== '') {
      setIsError(true);
    } else {
      setIsError(false);
    }
    return subscriber;
  }, [errorText]);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {isError && (
        <View>
          <Text>{errorText}</Text>
        </View>
      )}
      {user ? (
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
