import React, {useEffect} from 'react';
import {
  Text,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {Formik} from 'formik';
import {StackNavigationProp} from '@react-navigation/stack';

import ROUTES from '../../routes/Routes';
import {actions} from '../../state/actions';
import {loginSchema} from '../../utils/formsValidations';
import {RootStackParamList} from 'src/routes/Interface';
import {RootState} from 'src/state/reducers';

//COMPONENTS
import AuthFormInput from '../../components/AuthFormInput';
import SocialButton from '../../components/SocialButton';
import Button from '../../components/Button';

type LoginViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.Login
>;

interface ILoginViewProps {
  theme: DefaultTheme;
  navigation: LoginViewScreenNavigationProp;
}

const LoginView: React.FC<ILoginViewProps> = ({navigation, theme}) => {
  const {t} = useTranslation();

  const onSync = useSelector((state: RootState) => state.ui.authOnSync);
  const error = useSelector((state: RootState) => state.messages.authErrorMsg);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.messages.clearMessages());
  }, []);

  return (
    <Container>
      <StatusBar backgroundColor={`#212121`} />
      {onSync ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <Heading>MyCrossfit</Heading>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={loginSchema}
            onSubmit={values => {
              console.log('login btn clicked');
              const {email, password} = values;
              dispatch(actions.user.getUserAtLogin(email, password));
            }}>
            {formikProps => {
              return (
                <>
                  <Inputs>
                    <AuthFormInput
                      labelValue={formikProps.values.email}
                      onChangeText={formikProps.handleChange('email')}
                      bgColor={`${theme.appColors.backgroundColorDarken}`}
                      placeholderText={t('login:Email')}
                      iconType="mail"
                      keyboardType="email-address"
                      autoCapitalize="none"
                      autoCorrect={false}
                    />

                    {formikProps.touched.email && formikProps.errors.email && (
                      <ErrorText>
                        {formikProps.touched.email && formikProps.errors.email}
                      </ErrorText>
                    )}

                    <AuthFormInput
                      labelValue={formikProps.values.password}
                      bgColor={`${theme.appColors.backgroundColorDarken}`}
                      onChangeText={formikProps.handleChange('password')}
                      placeholderText={t('login:Password')}
                      iconType="lock"
                      secureTextEntry={true}
                    />

                    {formikProps.touched.password &&
                      formikProps.errors.password && (
                        <ErrorText>
                          {formikProps.touched.password &&
                            formikProps.errors.password}
                        </ErrorText>
                      )}

                    <TouchableOpacity
                      onPress={() => navigation.navigate(ROUTES.Password)}>
                      <ForgotPasswordText>
                        {t('login:ForgotPsw')}
                      </ForgotPasswordText>
                    </TouchableOpacity>
                  </Inputs>

                  <Button
                    text={t('login:Start')}
                    bgColor={`${theme.appColors.primaryColorLighter}`}
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
                dispatch(actions.user.getUserAtFbLogin());
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
    </Container>
  );
};

const Container = styled.View`
  background-color: ${({theme}) => theme.appColors.backgroundColor};
  flex: 1;
  padding-top: 60px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.Text`
  margin: 10px 0px 80px 0px;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 35px;
  font-weight: bold;
`;

const Inputs = styled.View`
  margin-bottom: 20px;
  align-items: center;
`;
const ForgotPasswordText = styled.Text`
  color: ${({theme}) => theme.appColors.textColorLightGray};
  font-style: italic;
  font-size: 15px;
  padding-bottom: 25px;
`;

const SocialButtons = styled.View`
  flex-direction: row;
  margin-top: 40px;
  align-items: center;
`;

const ErrorText = styled.Text`
  color: ${({theme}) => theme.appColors.accentColor};
  font-size: 17px;
  padding-bottom: 10px;
`;

export default withTheme(LoginView);
