import React from 'react';
import {View, Text} from 'react-native';

import ROUTES from '../../routes/Routes';
import Button from '../../components/Button';

const LandingView = ({navigation}) => {
  const navigateToLogin = () => {
    navigation.navigate(ROUTES.Login);
  };

  const navigateToRegister = () => {
    navigation.navigate(ROUTES.Register);
  };

  return (
    <View>
      <Text>Landing Page</Text>
      <Button text="Login" onPress={navigateToLogin} bgColor="blue" />
      <Button text="Register" onPress={navigateToRegister} bgColor="green" />
    </View>
  );
};

export default LandingView;
