import React, {useState, useContext} from 'react';
import {Text, TouchableOpacity, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import ROUTES from '../../routes/Routes';
import {AuthContext} from '../../routes/AuthProvider';
import {useTranslation} from 'react-i18next';
import styled, {withTheme} from 'styled-components';

//COMPONENTS
import AuthFormInput from '../../components/AuthFormInput';
import SocialButton from '../../components/SocialButton';
import Button from '../../components/Button';

const LoginView = ({navigation, theme}) => {
  const {t} = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [responseMsg, setResponseMsg] = useState('');

  const {login, fbLogin} = useContext(AuthContext);

  const handleLogin = async () => {
    if (email === '' || password === '') {
      setResponseMsg(t('authErrors:fieldsCanNotBeEmpty'));
      return;
    }

    const response = await login(email, password);
    if (response.status === false) {
      switch (response.code) {
        case 'auth/invalid-credential':
        case 'auth/invalid-email':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          setResponseMsg(t(`authErrors:${response.code}`));
          break;
        default:
          setResponseMsg(t('authErrors:auth/unknown'));
      }
    }
  };

  const navigateToForgotPassword = () => {
    navigation.navigate(ROUTES.Password);
  };

  return (
    <LoginContainer
      colors={[
        `${theme.appColors.primaryColor}`,
        `${theme.appColors.lightAccentColor}`,
      ]}>
      <StatusBar backgroundColor={`#111924`} />
      <LoginHeading>MyCrossfit</LoginHeading>
      <LoginInputs>
        <AuthFormInput
          labelValue={email}
          onChangeText={userEmail => setEmail(userEmail)}
          placeholderText={t('login:Email')}
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <AuthFormInput
          labelValue={password}
          onChangeText={userPassword => setPassword(userPassword)}
          placeholderText={t('login:Password')}
          iconType="lock"
          secureTextEntry={true}
        />

        <TouchableOpacity onPress={navigateToForgotPassword}>
          <ForgotPasswordText>{t('login:ForgotPsw')}</ForgotPasswordText>
        </TouchableOpacity>
      </LoginInputs>

      {responseMsg !== '' && <Text>{responseMsg}</Text>}

      <Button
        text={t('login:Start')}
        bgColor={`${theme.appColors.darkAccentColor}`}
        onPress={handleLogin}
      />

      <SocialButtons>
        <SocialButton
          text="Facebook"
          btnType="facebook"
          iconColor="#4867aa"
          onPress={() => {
            fbLogin();
          }}
        />

        <SocialButton
          text="Google"
          btnType="google"
          iconColor="#de4d41"
          onPress={() => {
            alert('Google Clicked');
          }}
        />
      </SocialButtons>
    </LoginContainer>
  );
};

const LoginContainer = styled(LinearGradient)`
  flex: 1;
  padding-top: 60px;
  font-size: 20px;
  align-items: center;
`;

const LoginHeading = styled.Text`
  margin: 15px 0px 25px 0px;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 30px;
`;

const LoginInputs = styled.View`
  margin-bottom: 20px;
  align-items: center;
`;
const ForgotPasswordText = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-style: italic;
  padding-bottom: 15px;
`;

const SocialButtons = styled.View`
  flex-direction: row;
  margin-top: 40px;
  align-items: center;
`;

export default withTheme(LoginView);
