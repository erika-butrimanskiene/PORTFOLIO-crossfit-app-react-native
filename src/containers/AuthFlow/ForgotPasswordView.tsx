import React, {useState} from 'react';
import {View, Text, Keyboard} from 'react-native';
import {useDispatch} from 'react-redux';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';

//LIBRARIES
import AntDesign from 'react-native-vector-icons/AntDesign';
//ROUTES
import {actions} from '../../state/actions';
//UTILS-DATABASE
import {resetPasswordEmail} from '../../utils/firebase/firebaseAuthAPI';
//COMPONENTS
import Button from '../../components/Buttons/Button';

interface IForgotPasswordViewProps {
  theme: DefaultTheme;
}

const ForgotPasswordView: React.FC<IForgotPasswordViewProps> = ({theme}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [emailEmptyError, setEmailEmptyError] = useState('');

  const handlePasswordReset = async () => {
    if (email !== '') {
      const response = await resetPasswordEmail(email);
      if (response.status) {
        dispatch(actions.messages.setSuccessMessage('passwordReset'));
        setEmail('');
        Keyboard.dismiss();
      } else {
        dispatch(actions.messages.setErrorMessage(response.code));
      }
    } else {
      setEmailEmptyError('pleaseProvideEmail');
    }
  };

  return (
    <Container>
      <View>
        <AntDesign
          name={'questioncircleo'}
          size={70}
          color={`${theme.appColors.accentColor}`}
        />
      </View>
      <Heading>{t('forgotPassword:message')}</Heading>
      <InputField
        value={email}
        numberOfLines={1}
        placeholder={t('forgotPassword:enterEmail')}
        placeholderTextColor={`${theme.appColors.textColorLightGray}`}
        onChangeText={(value: string) => setEmail(value)}
      />
      {emailEmptyError !== '' && (
        <EmailEmptyError>*{t(`user:${emailEmptyError}`)}</EmailEmptyError>
      )}
      <ButtonContainer>
        <Button
          text={t('forgotPassword:continueBtn')}
          bgColor={`${theme.appColors.primaryColorLighter}`}
          onPress={handlePasswordReset}
        />
      </ButtonContainer>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${({theme}) => theme.appColors.backgroundColor};
  flex: 1;
  padding-top: 100px;
  font-size: 20px;
  align-items: center;
`;

const Heading = styled.Text`
  width: 85%;
  margin: 15px 0px 25px 0px;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 25px;
  text-align: center;
`;

const InputField = styled.TextInput`
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 20px;
  margin-bottom: 10px;
  border-radius: 5px;
  padding: 0px 10px;
  width: 80%;
  height: 45px;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
`;

const EmailEmptyError = styled.Text`
  color: ${({theme}) => theme.appColors.accentColor};
`;

export default withTheme(ForgotPasswordView);
