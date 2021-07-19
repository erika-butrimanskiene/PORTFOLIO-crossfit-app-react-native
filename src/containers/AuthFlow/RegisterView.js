import React, {useContext, useState, useEffect} from 'react';
import {Text, StatusBar, ScrollView, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {useTranslation} from 'react-i18next';
import styled, {withTheme} from 'styled-components';
import {Formik} from 'formik';

import {actions} from '../../state/actions';
import {AuthContext} from '../../routes/AuthProvider';
import {registerSchema} from '../../utils/formsValidations';

//COMPONENTS
import AuthFormInput from '../../components/AuthFormInput';
import SocialButton from '../../components/SocialButton';
import Button from '../../components/Button';

const RegisterView = ({theme}) => {
  const {t} = useTranslation();

  // const [userName, setUserName] = useState('');
  // const [userSurname, setUserSurname] = useState('');
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [confirmPassword, setConfirmPassword] = useState('');

  const onSync = useSelector(state => state.ui.authOnSync);
  const error = useSelector(state => state.messages.authErrorMsg);

  const dispatch = useDispatch();

  const {register, fbLogin} = useContext(AuthContext);

  useEffect(() => {
    dispatch(actions.messages.clearMessages());
  }, []);

  return (
    <RegisterContainer
      colors={[
        `${theme.appColors.backgroundColor}`,
        `${theme.appColors.lightPrimaryColor}`,
      ]}>
      <StatusBar backgroundColor={`${theme.appColors.backgroundColor}`} />
      {onSync ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <ScrollView>
            <RegisterHeading>MyCrossfit</RegisterHeading>
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
                    register,
                  ),
                );
              }}>
              {formikProps => {
                return (
                  <>
                    <RegisterInputs>
                      <AuthFormInput
                        labelValue={formikProps.values.userName}
                        onChangeText={formikProps.handleChange('userName')}
                        placeholderText={t('signup:Name')}
                        iconType="user"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />

                      <Text>
                        {formikProps.touched.userName &&
                          formikProps.errors.userName}
                      </Text>

                      <AuthFormInput
                        labelValue={formikProps.values.userSurname}
                        onChangeText={formikProps.handleChange('userSurname')}
                        placeholderText={t('signup:Surname')}
                        iconType="user"
                        autoCapitalize="none"
                        autoCorrect={false}
                      />

                      <Text>
                        {formikProps.touched.userSurname &&
                          formikProps.errors.userSurname}
                      </Text>

                      <AuthFormInput
                        labelValue={formikProps.values.email}
                        onChangeText={formikProps.handleChange('email')}
                        placeholderText={t('signup:Email')}
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
                        placeholderText={t('signup:Password')}
                        iconType="lock"
                        secureTextEntry={true}
                      />

                      <Text>
                        {formikProps.touched.password &&
                          formikProps.errors.password}
                      </Text>

                      <AuthFormInput
                        labelValue={formikProps.values.passwordConfirm}
                        onChangeText={formikProps.handleChange(
                          'passwordConfirm',
                        )}
                        placeholderText={t('signup:ConfirmPassword')}
                        iconType="lock"
                        secureTextEntry={true}
                      />

                      <Text>
                        {formikProps.touched.passwordConfirm &&
                          formikProps.errors.passwordConfirm}
                      </Text>
                    </RegisterInputs>
                    {error !== '' && <Text>{t(`authErrors:${error}`)}</Text>}
                    <SignUpButtonContainer>
                      <Button
                        text={t('signup:SignUp')}
                        bgColor={`${theme.appColors.accentColor}`}
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
                bgColor={`${theme.appColors.whiteColor}`}
                onPress={() => {
                  dispatch(actions.user.getUserAtFbLogin(fbLogin));
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

export default withTheme(RegisterView);
