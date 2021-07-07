import React from 'react';
import {View, Text, ImageBackground, StyleSheet, StatusBar} from 'react-native';
import {theme} from "../../assets/styles/theme";

import ROUTES from '../../routes/Routes';
import Button from '../../components/Button';
import SwitchSelector from 'react-native-switch-selector';
import {useTranslation} from 'react-i18next';

const options = [
  {label: 'EN', value: 'en'},
  {label: 'LT', value: 'lt'},
];

const LandingView = ({navigation}) => {
  const {t, i18n} = useTranslation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <SwitchSelector
          options={options}
          hasPadding
          initial={0}
          buttonColor={theme.appColors.lightAccentColor}
          style={{width: 70}}
          onPress={(language) => {
            i18n.changeLanguage(language)
          }}
        />
      ),
    });
  }, [navigation]);

  const navigateToLogin = () => {
    navigation.navigate(ROUTES.Login);
  };

  const navigateToRegister = () => {
    navigation.navigate(ROUTES.Register);
  };

  return (
    <View style={styles.container}>
    <StatusBar
        backgroundColor={`${theme.appColors.blackColor}`}
      />
    <ImageBackground source={{ uri: "https://images.pexels.com/photos/7675412/pexels-photo-7675412.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" }} resizeMode="cover" style={styles.image}>
    <View style={styles.cover}>
    <Text style={styles.text}>MyCrossfit</Text>
      <Button
        text={t('login:SignIn')}
        onPress={navigateToLogin}
        bgColor={theme.appColors.darkAccentColor}
      />
      <Button text="Register" onPress={navigateToRegister} bgColor={theme.appColors.lightAccentColor} />
    </View>
    </ImageBackground>  
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center"
  },
  cover: {
    flex:1,
    paddingTop: 100,
    backgroundColor: "#000000b0",
    alignItems: "center"
  },
  text: {
    color: "white",
    fontSize: 30
  }
})

export default LandingView;
