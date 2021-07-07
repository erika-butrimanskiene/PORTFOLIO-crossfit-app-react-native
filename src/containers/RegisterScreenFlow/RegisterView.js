import React, {useContext, useState} from 'react';
import styled from 'styled-components';
import {View, Text, TouchableOpacity, StatusBar} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from "../../assets/styles/theme";

import ROUTES from '../../routes/Routes';
import {AuthContext} from '../../routes/AuthProvider';
import {useTranslation} from 'react-i18next';


import AuthFormInput from '../../components/AuthFormInput';
import SocialButton from '../../components/SocialButton';
import Button from '../../components/Button';

const RegisterContainer = styled(LinearGradient)`
  flex: 1;
  padding-top: 60px;
  font-size: 20px;
  align-items: center;
`;

const RegisterHeading = styled.Text`
  margin: 15px 0px 25px 0px;
  color: ${theme.appColors.whiteColor};
  font-size: 30px;
`;

const RegisterInputs = styled.View`
margin-bottom: 20px;
align-items: center;
`

const ConfirmRegistration = styled.View`
padding: 10px 0px;
width: 85%;
flex-direction: row;
flex-wrap: wrap;
justify-content: center;
`

const ConfirmRegistrationText = styled.Text`
color: ${theme.appColors.whiteColor};
`

const ConfirmRegistrationLink = styled.Text`
color: ${theme.appColors.darkAccentColor};
padding: 0px 4px;
font-weight: bold;
`

const SocialButtons = styled.View`
flex-direction: row;
margin-top: 30px;
align-items: center;
`



const RegisterView = ({navigation}) => {
  const {t} = useTranslation();

  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {register, fbLogin} = useContext(AuthContext);


  return (
    <RegisterContainer colors={[`${theme.appColors.darkAccentColor}`, `${theme.appColors.lightAccentColor}`]}>
     <StatusBar
        backgroundColor={`${theme.appColors.darkAccentColor}`}
      />
      <RegisterHeading>MyCrossfit</RegisterHeading>
      <RegisterInputs>
      <AuthFormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <AuthFormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <AuthFormInput
        labelValue={confirmPassword}
        onChangeText={userPassword => setCofirmPassword(confirmPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      /></RegisterInputs>

      <Button
         text={t('signup:SignUp')}
        bgColor={`${theme.appColors.darkAccentColor}`}
        onPress={() => register(email, password)}
      />

      <ConfirmRegistration>
        <ConfirmRegistrationText>By registering, you confirm that you accept our</ConfirmRegistrationText>
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
      /></SocialButtons>

    </RegisterContainer>
  );
};

export default RegisterView;
