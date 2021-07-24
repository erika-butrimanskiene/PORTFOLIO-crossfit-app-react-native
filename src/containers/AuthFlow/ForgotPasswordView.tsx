import React, {useState} from 'react';
import {
  View,
  NativeSyntheticEvent,
  TextInputChangeEventData,
} from 'react-native';
import styled, {withTheme} from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useTranslation} from 'react-i18next';
import {IDefaultTheme} from '../../assets/styles/interface';

//COMPONENTS
import Button from '../../components/Button';

interface IForgotPasswordViewProps {
  theme: IDefaultTheme;
}

const ForgotPasswordView: React.FC<IForgotPasswordViewProps> = ({theme}) => {
  const {t} = useTranslation();

  const [email, setEmail] = useState('');

  return (
    <ResetPasswordContainer>
      <View>
        <AntDesign
          name={'questioncircleo'}
          size={70}
          color={`${theme.appColors.accentColor}`}
        />
      </View>
      <ResetPasswordHeading>{t('forgotPassword:message')}</ResetPasswordHeading>
      <InputField
        value={email}
        numberOfLines={1}
        placeholder={t('forgotPassword:enterEmail')}
        placeholderTextColor={`${theme.appColors.accentColor}`}
        onChangeText={(value: string) => setEmail(value)}
      />
      <Button
        text={t('forgotPassword:continueBtn')}
        bgColor={`${theme.appColors.primaryColorLighter}`}
        onPress={() => alert('Reset password')}
      />
    </ResetPasswordContainer>
  );
};

const ResetPasswordContainer = styled.View`
  background-color: ${({theme}: IForgotPasswordViewProps) =>
    theme.appColors.backgroundColor};
  flex: 1;
  padding-top: 100px;
  font-size: 20px;
  align-items: center;
`;

const ResetPasswordHeading = styled.Text`
  width: 85%;
  margin: 15px 0px 25px 0px;
  color: ${({theme}: IForgotPasswordViewProps) => theme.appColors.whiteColor};
  font-size: 25px;
  text-align: center;
`;

const InputField = styled.TextInput`
  background-color: ${({theme}: IForgotPasswordViewProps) =>
    theme.appColors.whiteColor};
  margin-bottom: 50px;
  border-radius: 5px;
  padding: 0px 10px;
  width: 80%;
  height: 45px;
  font-size: 15px;
`;

export default withTheme(ForgotPasswordView);
