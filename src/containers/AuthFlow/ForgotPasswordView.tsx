import React, {useState} from 'react';
import {View} from 'react-native';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';

//LIBRARIES
import AntDesign from 'react-native-vector-icons/AntDesign';
//COMPONENTS
import Button from '../../components/Button';

interface IForgotPasswordViewProps {
  theme: DefaultTheme;
}

const ForgotPasswordView: React.FC<IForgotPasswordViewProps> = ({theme}) => {
  const {t} = useTranslation();

  const [email, setEmail] = useState('');

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
        placeholderTextColor={`${theme.appColors.accentColor}`}
        onChangeText={(value: string) => setEmail(value)}
      />
      <Button
        text={t('forgotPassword:continueBtn')}
        bgColor={`${theme.appColors.primaryColorLighter}`}
        onPress={() => alert('Reset password')}
      />
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
  background-color: ${({theme}) => theme.appColors.whiteColor};
  margin-bottom: 50px;
  border-radius: 5px;
  padding: 0px 10px;
  width: 80%;
  height: 45px;
  font-size: 15px;
`;

export default withTheme(ForgotPasswordView);
