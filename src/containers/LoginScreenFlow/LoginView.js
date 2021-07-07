import React, {useState, useContext} from 'react';
import styled from 'styled-components';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from "../../assets/styles/theme";

import ROUTES from '../../routes/Routes';
import {AuthContext} from '../../routes/AuthProvider';
import {useTranslation} from 'react-i18next';

//COMPONENTS
import AuthFormInput from '../../components/AuthFormInput';
import SocialButton from '../../components/SocialButton';
import Button from '../../components/Button';

const LoginContainer = styled(LinearGradient)`
  flex: 1;
  padding-top: 60px;
  font-size: 20px;
  align-items: center;
`;

const LoginHeading = styled.Text`
  margin: 15px 0px 25px 0px;
  color: ${theme.appColors.whiteColor};
  font-size: 30px;
`;

const LoginInputs = styled.View`
margin-bottom: 20px;
align-items: center;
`
const ForgotPasswordText = styled.Text`
color: ${theme.appColors.whiteColor};
font-style: italic;
padding-bottom: 15px;
`

const SocialButtons = styled.View`
flex-direction: row;
margin-top: 40px;
align-items: center;
`


const LoginView = ({navigation}) => {
  const {t} = useTranslation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login, fbLogin} = useContext(AuthContext);

  const navigateToForgotPassword = () => {
    navigation.navigate(ROUTES.Password);
  };


  return (
    <LoginContainer colors={[`${theme.appColors.darkAccentColor}`, `${theme.appColors.lightAccentColor}`]}>
    <StatusBar
        backgroundColor={`${theme.appColors.darkAccentColor}`}
      />
      <LoginHeading>MyCrossfit</LoginHeading>
      <LoginInputs>
      <AuthFormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText={t("login:Email")}
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <AuthFormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText={t("login:Password")}
        iconType="lock"
        secureTextEntry={true}
      />

      <TouchableOpacity onPress={navigateToForgotPassword}>
        <ForgotPasswordText>{t("login:ForgotPsw")}</ForgotPasswordText>
      </TouchableOpacity>

      </LoginInputs>

      <Button
        text={t('login:Start')}
        bgColor={`${theme.appColors.darkAccentColor}`}
        onPress={() => login(email, password)}
      />


      <SocialButtons>
      <SocialButton
        text="Facebook"
        btnType="facebook"
        iconColor="#4867aa"
        bgColor={`${theme.appColors.whiteColor}`}
        onPress={() => {
          fbLogin();
        }}
      />

      <SocialButton
        text="Google"
        btnType="google"
        iconColor="#de4d41"
        bgColor={`${theme.appColors.whiteColor}`}
        onPress={() => {
          alert('Google Clicked');
        }}
      />
      </SocialButtons>

    </LoginContainer>
  );
};

export default LoginView;
