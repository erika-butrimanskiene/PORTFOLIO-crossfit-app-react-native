import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import ROUTES from '../../routes/Routes';
import {AuthContext} from '../../routes/AuthProvider';
import {useTranslation} from 'react-i18next';
import styled, {withTheme} from 'styled-components';
import {actions} from '../../state/actions';

//COMPONENTS
import AuthFormInput from '../../components/AuthFormInput';
import SocialButton from '../../components/SocialButton';
import Button from '../../components/Button';

const LoginView = ({navigation, theme}) => {
  const {t} = useTranslation();
  const {login, fbLogin} = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onSync = useSelector(state => state.user.onSync);
  const error = useSelector(state => state.user.error);

  const dispatch = useDispatch();

  const navigateToForgotPassword = () => {
    navigation.navigate(ROUTES.Password);
  };

  useEffect(() => {
    dispatch(actions.user.setUserFailure(t('authErrors:auth/reset-error')));
  }, []);

  return (
    <LoginContainer
      colors={[
        `${theme.appColors.primaryColor}`,
        `${theme.appColors.lightAccentColor}`,
      ]}>
      <StatusBar backgroundColor={`#111924`} />
      {onSync ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
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

          <Button
            text={t('login:Start')}
            bgColor={`${theme.appColors.darkAccentColor}`}
            onPress={() => {
              dispatch(actions.user.getUserAtLogin(email, password, login));
            }}
          />
          {error !== '' && <Text>{t(`authErrors:${error}`)}</Text>}

          <SocialButtons>
            <SocialButton
              text="Facebook"
              btnType="facebook"
              iconColor="#4867aa"
              onPress={() => {
                dispatch(actions.user.getUserAtFbLogin(fbLogin));
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
        </>
      )}
    </LoginContainer>
  );
};

const LoginContainer = styled(LinearGradient)`
  flex: 1;
  padding-top: 60px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
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
