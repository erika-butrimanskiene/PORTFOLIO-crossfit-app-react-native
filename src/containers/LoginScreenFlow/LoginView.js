import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {connect} from 'react-redux';
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

const LoginView = ({
  navigation,
  theme,
  error,
  onSync,
  handleErrorStateReset,
  handleLoginSaga,
  handleLoginFacebookThunk,
}) => {
  const {t} = useTranslation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const {login, fbLogin} = useContext(AuthContext);

  const navigateToForgotPassword = () => {
    navigation.navigate(ROUTES.Password);
  };

  useEffect(() => {
    handleErrorStateReset(t('authErrors:auth/reset-error'));
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
              handleLoginSaga(email, password, login);
            }}
          />
          {error !== '' && <Text>{t(`authErrors:${error}`)}</Text>}

          <SocialButtons>
            <SocialButton
              text="Facebook"
              btnType="facebook"
              iconColor="#4867aa"
              onPress={() => {
                handleLoginFacebookThunk(fbLogin, t);
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

const mapStateToProps = state => {
  return {
    onSync: state.user.onSync,
    user: state.user.user,
    error: state.user.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    handleLoginSaga: (email, password, login) =>
      dispatch(actions.user.getUser(email, password, login)),
    handleLoginFacebookThunk: (fbLogin, t) =>
      dispatch(handleLoginFacebook(fbLogin, t)),
    handleErrorStateReset: text => {
      dispatch(actions.user.setUserFailure(text));
    },
  };
};

const handleLogin = (email, password, login, t) => {
  return async dispatch => {
    if (email === '' || password === '') {
      dispatch(
        actions.user.setUserFailure(t('authErrors:fieldsCanNotBeEmpty')),
      );
      return;
    }

    dispatch(actions.user.initSetUser());
    const response = await login(email, password);

    if (response.status === true) {
      console.log(response);
      dispatch(
        actions.user.setUserSuccess({
          email: response.email,
          uid: response.uid,
          id: '',
        }),
      );
      dispatch(actions.user.setUserFailure(t('authErrors:auth/reset-error')));
    }

    if (response.status === false) {
      console.log(response);
      switch (response.code) {
        case 'auth/invalid-credential':
        case 'auth/invalid-email':
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          dispatch(
            actions.user.setUserFailure(t(`authErrors:${response.code}`)),
          );
          break;
        default:
          dispatch(actions.user.setUserFailure(t('authErrors:auth/unknown')));
      }
    }
  };
};

const handleLoginFacebook = (fbLogin, t) => {
  return async dispatch => {
    dispatch(actions.user.initSetUser());
    const response = await fbLogin();

    if (response.status === true) {
      console.log(response);
      dispatch(
        actions.user.setUserSuccess({
          email: response.email,
          uid: response.uid,
          id: '',
        }),
      );
    }

    if (response.status === false) {
      console.log(response);
      actions.user.setUserFailure(response.code); //Error not display. Facebook reload page.
    }
  };
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

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(LoginView));
