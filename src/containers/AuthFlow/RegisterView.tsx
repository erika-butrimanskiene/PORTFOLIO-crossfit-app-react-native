import React, {useEffect} from 'react';
import {Text, StatusBar, ScrollView, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';

//LIBRARIES
import {Formik} from 'formik';
//ROUTES
import ROUTES from '../../routes/Routes';
import {actions} from '../../state/actions';
import {RootStackParamList} from 'src/routes/Interface';
import {RootState} from 'src/state/reducers';
//UTILS
import {registerSchema} from '../../utils/formsValidations';
//COMPONENTS
import AuthFormInput from '../../components/AuthFormInput';
import SocialButton from '../../components/SocialButton';
import Button from '../../components/Button';

type RegisterViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.Register
>;
interface IRegisterViewProps {
  theme: DefaultTheme;
  navigation: RegisterViewScreenNavigationProp;
}

const RegisterView: React.FC<IRegisterViewProps> = ({theme, navigation}) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();

  //STATES
  const onSync = useSelector((state: RootState) => state.ui.authOnSync);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      dispatch(actions.messages.clearMessages());
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <StatusBar backgroundColor={`${theme.appColors.backgroundColor}`} />
      {onSync ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <ScrollView>
            <Heading>{t('signup:SignUp')}</Heading>
            <Formik
              initialValues={{
                userName: '',
                userSurname: '',
                email: '',
                password: '',
                passwordConfirm: '',
              }}
              validationSchema={registerSchema}
              onSubmit={values => {
                const {
                  userName,
                  userSurname,
                  email,
                  password,
                  passwordConfirm,
                } = values;
                dispatch(
                  actions.user.getUserAtRegister(
                    email,
                    password,
                    passwordConfirm,
                    userName,
                    userSurname,
                  ),
                );
              }}>
              {formikProps => {
                return (
                  <>
                    <Inputs>
                      <AuthFormInput
                        labelValue={formikProps.values.userName}
                        bgColor={`${theme.appColors.backgroundColorDarken}`}
                        onChangeText={formikProps.handleChange('userName')}
                        placeholderText={t('signup:Name')}
                        iconType="user"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />

                      {formikProps.touched.userName &&
                        formikProps.errors.userName && (
                          <ErrorText>
                            {formikProps.touched.userName &&
                              formikProps.errors.userName}
                          </ErrorText>
                        )}

                      <AuthFormInput
                        labelValue={formikProps.values.userSurname}
                        bgColor={`${theme.appColors.backgroundColorDarken}`}
                        onChangeText={formikProps.handleChange('userSurname')}
                        placeholderText={t('signup:Surname')}
                        iconType="user"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />

                      {formikProps.touched.userSurname &&
                        formikProps.errors.userSurname && (
                          <ErrorText>
                            {formikProps.touched.userSurname &&
                              formikProps.errors.userSurname}
                          </ErrorText>
                        )}

                      <AuthFormInput
                        labelValue={formikProps.values.email}
                        bgColor={`${theme.appColors.backgroundColorDarken}`}
                        onChangeText={formikProps.handleChange('email')}
                        placeholderText={t('signup:Email')}
                        iconType="user"
                        keyboardType="email-address"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />
                      {formikProps.touched.email &&
                        formikProps.errors.email && (
                          <ErrorText>
                            {formikProps.touched.email &&
                              formikProps.errors.email}
                          </ErrorText>
                        )}

                      <AuthFormInput
                        labelValue={formikProps.values.password}
                        bgColor={`${theme.appColors.backgroundColorDarken}`}
                        onChangeText={formikProps.handleChange('password')}
                        placeholderText={t('signup:Password')}
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

                      <AuthFormInput
                        labelValue={formikProps.values.passwordConfirm}
                        bgColor={`${theme.appColors.backgroundColorDarken}`}
                        onChangeText={formikProps.handleChange(
                          'passwordConfirm',
                        )}
                        placeholderText={t('signup:ConfirmPassword')}
                        iconType="lock"
                        secureTextEntry={true}
                      />
                      {formikProps.touched.passwordConfirm &&
                        formikProps.errors.passwordConfirm && (
                          <ErrorText>
                            {formikProps.touched.passwordConfirm &&
                              formikProps.errors.passwordConfirm}
                          </ErrorText>
                        )}
                    </Inputs>
                    <SignUpButtonContainer>
                      <Button
                        text={t('signup:SignUp')}
                        bgColor={`${theme.appColors.primaryColorLighter}`}
                        onPress={formikProps.handleSubmit}
                      />
                    </SignUpButtonContainer>
                  </>
                );
              }}
            </Formik>
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
          </ScrollView>
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
  margin: 15px 0px 25px 0px;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 30px;
  text-align: center;
`;

const SignUpButtonContainer = styled.View`
  align-items: center;
  width: 100%;
`;

const Inputs = styled.View`
  margin-bottom: 20px;
  align-items: center;
`;
const SocialButtons = styled.View`
  flex-direction: row;
  margin: 30px 0px;
  align-items: center;
`;

const ErrorText = styled.Text`
  color: ${({theme}) => theme.appColors.accentColor};
  font-size: 17px;
  padding-bottom: 10px;
`;

export default withTheme(RegisterView);
