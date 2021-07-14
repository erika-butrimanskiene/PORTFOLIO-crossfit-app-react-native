import React, {useContext, useState, useEffect} from 'react';
import {Text, StatusBar, ScrollView, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {AuthContext} from '../../routes/AuthProvider';
import {useTranslation} from 'react-i18next';
import styled, {withTheme} from 'styled-components';
import {actions} from '../../state/actions';

//COMPONENTS
import AuthFormInput from '../../components/AuthFormInput';
import SocialButton from '../../components/SocialButton';
import Button from '../../components/Button';

const RegisterView = ({
  theme,
  error,
  onSync,
  handleErrorStateReset,
  handleSignUpSaga,
  handleLoginFacebookSaga,
}) => {
  const {t} = useTranslation();

  const [userName, setUserName] = useState('');
  const [userSurname, setUserSurname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const {register, fbLogin} = useContext(AuthContext);

  useEffect(() => {
    handleErrorStateReset(t('authErrors:auth/reset-error'));
  }, []);

  return (
    <RegisterContainer
      colors={[
        `${theme.appColors.primaryColor}`,
        `${theme.appColors.lightAccentColor}`,
      ]}>
      <StatusBar backgroundColor={`${theme.appColors.primaryColor}`} />
      {onSync ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <ScrollView>
            <RegisterHeading>MyCrossfit</RegisterHeading>
            <RegisterInputs>
              <AuthFormInput
                labelValue={userName}
                onChangeText={username => setUserName(username)}
                placeholderText={t('signup:Name')}
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false}
              />

              <AuthFormInput
                labelValue={userSurname}
                onChangeText={usersurname => setUserSurname(usersurname)}
                placeholderText={t('signup:Surname')}
                iconType="user"
                autoCapitalize="none"
                autoCorrect={false}
              />

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
                onChangeText={confirmPassword =>
                  setConfirmPassword(confirmPassword)
                }
                placeholderText={t('signup:ConfirmPassword')}
                iconType="lock"
                secureTextEntry={true}
              />
            </RegisterInputs>
            {error !== '' && <Text>{t(`authErrors:${error}`)}</Text>}
            <SignUpButtonContainer>
              <Button
                text={t('signup:SignUp')}
                bgColor={`${theme.appColors.darkAccentColor}`}
                onPress={() =>
                  handleSignUpSaga(
                    email,
                    password,
                    confirmPassword,
                    userName,
                    userSurname,
                    register,
                  )
                }
              />
            </SignUpButtonContainer>
            <SocialButtons>
              <SocialButton
                text="Facebook"
                btnType="facebook"
                iconColor="#4867aa"
                bgColor={`${theme.appColors.whiteColor}`}
                onPress={() => {
                  handleLoginFacebookSaga(fbLogin);
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
          </ScrollView>
        </>
      )}
    </RegisterContainer>
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
    handleSignUpSaga: (
      email,
      password,
      confirmPassword,
      userName,
      userSurname,
      register,
    ) =>
      dispatch(
        actions.user.getUserAtRegister(
          email,
          password,
          confirmPassword,
          userName,
          userSurname,
          register,
        ),
      ),
    handleLoginFacebookSaga: fbLogin =>
      dispatch(actions.user.getUserAtFbLogin(fbLogin)),
    handleErrorStateReset: text => {
      dispatch(actions.user.setUserFailure(text));
    },
  };
};

const RegisterContainer = styled(LinearGradient)`
  flex: 1;
  padding-top: 60px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
`;

const RegisterHeading = styled.Text`
  margin: 15px 0px 25px 0px;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 30px;
  text-align: center;
`;

const SignUpButtonContainer = styled.View`
  align-items: center;
  width: 100%;
`;

const RegisterInputs = styled.View`
  margin-bottom: 20px;
  align-items: center;
`;
const SocialButtons = styled.View`
  flex-direction: row;
  margin: 30px 0px;
  align-items: center;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(RegisterView));
