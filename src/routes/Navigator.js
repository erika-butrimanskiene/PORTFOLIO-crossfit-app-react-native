import React, {useContext, useState, useEffect} from 'react';
import {theme} from "../../assets/styles/theme";

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';
import {AuthContext} from './AuthProvider';

import LandingView from '../containers/LandingScreenFlow/LandingView';
import LoginView from '../containers/LoginScreenFlow/LoginView';
import RegisterView from '../containers/RegisterScreenFlow/RegisterView';
import ForgotPasswordView from '../containers/ForgotPasswordFlow/ForgotPasswordView';
import HomeView from '../containers/HomeScreenFlow/HomeView';
import ROUTES from './Routes';

const Stack = createStackNavigator();

const Navigator = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;

  return (
    <NavigationContainer>
      {user ? (
        <Stack.Navigator screenOptions={{
              title: '',
              headerTransparent: true,
              headerStyle: {
                elevation: 0,
              },
              headerTintColor: "white"}}>
          <Stack.Screen
            name={ROUTES.Home}
            component={HomeView}
          />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator screenOptions={{
              title: '',
              headerTransparent: true,
              headerStyle: {
                elevation: 0,
              },
              headerTintColor: "white"}}>
          <Stack.Screen
            name={ROUTES.Landing}
            component={LandingView}
          />
          <Stack.Screen
            name={ROUTES.Login}
            component={LoginView}
          />
          <Stack.Screen
            name={ROUTES.Register}
            component={RegisterView}
          />
          <Stack.Screen
            name={ROUTES.Password}
            component={ForgotPasswordView}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default Navigator;
