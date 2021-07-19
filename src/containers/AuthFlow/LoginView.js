import React, {useState, useContext, useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import styled, {withTheme} from 'styled-components';
import {Formik} from 'formik';

import ROUTES from '../../routes/Routes';
import {AuthContext} from '../../routes/AuthProvider';
import {actions} from '../../state/actions';
import {loginSchema} from '../../utils/formsValidations';

//COMPONENTS
import AuthFormInput from '../../components/AuthFormInput';
import SocialButton from '../../components/SocialButton';
import Button from '../../components/Button';

const LoginView = ({navigation, theme}) => {
  const {t} = useTranslation();
  const {login, fbLogin} = useContext(AuthContext);

  const onSync = useSelector(state => state.ui.authOnSync);
  const error = useSelector(state => state.messages.authErrorMsg);

  const dispatch = useDispatch();

  const navigateToForgotPassword = () => {
    navigation.navigate(ROUTES.Password);
  };

  useEffect(() => {
    dispatch(actions.messages.clearMessages());
  }, []);

  return (
    <LoginContainer>
      <StatusBar backgroundColor={`#212121`} />
      {onSync ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <LoginHeading>MyCrossfit</LoginHeading>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={loginSchema}
            onSubmit={values => {
              const {email, password} = values;
              dispatch(actions.user.getUserAtLogin(email, password, login));
            }}>
            {formikProps => {
              return (
                <>
                  <LoginInputs>
                    <AuthFormInput
                      labelValue={formikProps.values.email}
                      onChangeText={formikProps.handleChange('email')}
                      placeholderText={t('login:Email')}
                      iconType="user"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />

                    <Text>
                      {formikProps.touched.email && formikProps.errors.email}
                    </Text>

                    <AuthFormInput
                      labelValue={formikProps.values.password}
                      onChangeText={formikProps.handleChange('password')}
                      placeholderText={t('login:Password')}
                      iconType="lock"
                      secureTextEntry={true}
                    />

                    <Text>
                      {formikProps.touched.password &&
                        formikProps.errors.password}
                    </Text>

                    <TouchableOpacity onPress={navigateToForgotPassword}>
                      <ForgotPasswordText>
                        {t('login:ForgotPsw')}
                      </ForgotPasswordText>
                    </TouchableOpacity>
                  </LoginInputs>

                  <Button
                    text={t('login:Start')}
                    bgColor={`${theme.appColors.accentColor}`}
                    onPress={formikProps.handleSubmit}
                  />
                </>
              );
            }}
          </Formik>

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

const LoginContainer = styled.View`
  background-color: ${({theme}) => theme.appColors.backgroundColor};
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
