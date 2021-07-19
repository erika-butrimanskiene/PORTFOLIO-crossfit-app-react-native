import React, {useState} from 'react';
import {View} from 'react-native';
import styled, {withTheme} from 'styled-components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';

//COMPONENTS
import Button from '../../components/Button';

const ForgotPasswordView = ({theme}) => {
  const {t} = useTranslation();

  const [email, setEmail] = useState();

  return (
    <ResetPasswordContainer
      colors={[
        `${theme.appColors.backgroundColor}`,
        `${theme.appColors.lightPrimaryColor}`,
      ]}>
      <View>
        <AntDesign name={'questioncircleo'} size={70} color="white" />
      </View>
      <ResetPasswordHeading>{t('forgotPassword:message')}</ResetPasswordHeading>
      <InputField
        value={email}
        numberOfLines={1}
        placeholder={t('forgotPassword:enterEmail')}
        placeholderTextColor={`${theme.appColors.accentColor}`}
        onChangeText={userEmail => setEmail(userEmail)}
      />
      <Button
        text={t('forgotPassword:continueBtn')}
        bgColor={`${theme.appColors.accentColor}`}
        onPress={() => alert('Reset password')}
      />
    </ResetPasswordContainer>
  );
};

const ResetPasswordContainer = styled(LinearGradient)`
  flex: 1;
  padding-top: 100px;
  font-size: 20px;
  align-items: center;
`;

const ResetPasswordHeading = styled.Text`
  width: 85%;
  margin: 15px 0px 25px 0px;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 25px;
  text-align: center;
`;

const InputField = styled.TextInput`
  background-color: ${({theme}) => theme.appColors.whiteColor};
  margin-bottom: 50px;
  border-radius: 5px;
  padding: 0px 10px;
  width: 80%;
  height: 45px;
  font-size: 15px;
`;

export default withTheme(ForgotPasswordView);
