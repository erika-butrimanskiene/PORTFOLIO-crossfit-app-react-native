import React, {useContext, useState} from 'react';
import {Text, TouchableOpacity, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styled, {withTheme} from 'styled-components';
import {AuthContext} from '../../routes/AuthProvider';
import {useTranslation} from 'react-i18next';

//COMPONENTS
import AuthFormInput from '../../components/AuthFormInput';
import SocialButton from '../../components/SocialButton';
import Button from '../../components/Button';

const RegisterView = ({theme}) => {
  const {t} = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [responseMsg, setResponseMsg] = useState('');

  const {register, fbLogin} = useContext(AuthContext);

  const handleRegistration = async () => {
    if (email === '' || password === '' || confirmPassword === '') {
      setResponseMsg(t('authErrors:fieldsCanNotBeEmpty'));
      return;
    }

    if (password.length < 6) {
      setResponseMsg(t('authErrors:passwordLength'));
      return;
    }

    if (password !== confirmPassword) {
      setResponseMsg(t('authErrors:passwordsNotMatch'));
      return;
    }

    const response = await register(email, password);
    if (response.status === false) {
      console.log('status===false');
      switch (response.code) {
        case 'auth/account-exists-with-different-credential':
        case 'auth/credential-already-in-use':
        case 'auth/email-already-in-use':
        case 'auth/invalid-credential':
        case 'auth/invalid-email':
        case 'auth/weak-password':
          setResponseMsg(t(`authErrors:${response.code}`));
          break;
        default:
          setResponseMsg(t('authErrors:auth/unknown'));
      }
    }
  };

  return (
    <RegisterContainer
      colors={[
        `${theme.appColors.primaryColor}`,
        `${theme.appColors.lightAccentColor}`,
      ]}>
      <StatusBar backgroundColor={`${theme.appColors.primaryColor}`} />
      <RegisterHeading>MyCrossfit</RegisterHeading>
      <RegisterInputs>
        <AuthFormInput
          labelValue={email}
          onChangeText={userEmail => setEmail(userEmail)}
          placeholderText={t('signup:Email')}
          iconType="user"
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />

        <AuthFormInput
          labelValue={password}
          onChangeText={userPassword => setPassword(userPassword)}
          placeholderText={t('signup:Password')}
          iconType="lock"
          secureTextEntry={true}
        />

        <AuthFormInput
          labelValue={confirmPassword}
          onChangeText={confirmPassword => setConfirmPassword(confirmPassword)}
          placeholderText={t('signup:ConfirmPassword')}
          iconType="lock"
          secureTextEntry={true}
        />
      </RegisterInputs>

      {responseMsg !== '' && <Text>{responseMsg}</Text>}

      <Button
        text={t('signup:SignUp')}
        bgColor={`${theme.appColors.darkAccentColor}`}
        onPress={handleRegistration}
      />

      <ConfirmRegistration>
        <ConfirmRegistrationText>
          By registering, you confirm that you accept our
        </ConfirmRegistrationText>
        <TouchableOpacity>
          <ConfirmRegistrationLink>Terms of Service</ConfirmRegistrationLink>
        </TouchableOpacity>
        <ConfirmRegistrationText>and</ConfirmRegistrationText>
        <TouchableOpacity>
          <ConfirmRegistrationLink>Privacy Policy</ConfirmRegistrationLink>
        </TouchableOpacity>
      </ConfirmRegistration>

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
    </RegisterContainer>
  );
};

const RegisterContainer = styled(LinearGradient)`
  flex: 1;
  padding-top: 60px;
  font-size: 20px;
  align-items: center;
`;

const RegisterHeading = styled.Text`
  margin: 15px 0px 25px 0px;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 30px;
`;

const RegisterInputs = styled.View`
  margin-bottom: 20px;
  align-items: center;
`;

const ConfirmRegistration = styled.View`
  padding: 10px 0px;
  width: 85%;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const ConfirmRegistrationText = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
`;

const ConfirmRegistrationLink = styled.Text`
  color: ${({theme}) => theme.appColors.darkAccentColor};
  padding: 0px 4px;
  font-weight: bold;
`;

const SocialButtons = styled.View`
  flex-direction: row;
  margin-top: 30px;
  align-items: center;
`;

export default withTheme(RegisterView);
