import React, {useEffect} from 'react';
import {TouchableOpacity, StatusBar, ActivityIndicator} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {StackNavigationProp} from '@react-navigation/stack';
import SwitchSelector from 'react-native-switch-selector';

//LIBRARIES
import {Formik} from 'formik';
//ROUTES
import ROUTES from '../../routes/Routes';
import {actions} from '../../state/actions';
import {RootStackParamList} from 'src/routes/Interface';
import {RootState} from 'src/state/reducers';
//UTILS
import {loginSchema} from '../../utils/formsValidations';
//COMPONENTS
import AuthFormInput from '../../components/Inputs/AuthFormInput';
import SocialButton from '../../components/Buttons/SocialButton';
import Button from '../../components/Buttons/Button';

//VARIABLES
const options = [
  {label: 'EN', value: 'en'},
  {label: 'LT', value: 'lt'},
];

type LoginViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.Login
>;
interface ILoginViewProps {
  theme: DefaultTheme;
  navigation: LoginViewScreenNavigationProp;
}

const LoginView: React.FC<ILoginViewProps> = ({navigation, theme}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();

  //STATES
  const onSync = useSelector((state: RootState) => state.ui.onSync);
  const user = useSelector((state: RootState) => state.user.user);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderRight>
          <SwitchLanguage
            options={options}
            hasPadding
            initial={0}
            buttonColor={theme.appColors.accentColor}
            onPress={(language: string) => {
              i18n.changeLanguage(language);
            }}
          />
        </HeaderRight>
      ),
    });
  }, [navigation, user]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      dispatch(actions.messages.clearMessages());
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <StatusBar backgroundColor={`#212121`} />
      {onSync || Object.keys(user).length !== 0 ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <LoginForm>
          <Heading>{t('login:SignIn')}</Heading>
          <Formik
            initialValues={{email: '', password: ''}}
            validationSchema={loginSchema}
            onSubmit={values => {
              const {email, password} = values;
              dispatch(actions.ui.setOnSync(true));
              dispatch(actions.user.getUserAtLogin(email, password));
            }}>
            {formikProps => {
              return (
                <LoginWithEmail>
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

                  <ButtonContainer>
                    <Button
                      text={t('login:Start')}
                      bgColor={`${theme.appColors.primaryColorLighter}`}
                      onPress={formikProps.handleSubmit}
                    />
                  </ButtonContainer>
                </LoginWithEmail>
              );
            }}
          </Formik>

          <SocialButtons>
            <SocialButton
              text={t('login:FacebookLogin')}
              btnType="facebook"
              iconColor="#4867aa"
              onPress={() => {
                dispatch(actions.user.getUserAtFbLogin());
              }}
            />
          </SocialButtons>
        </LoginForm>
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

const HeaderRight = styled.View`
  margin-top: 20px;
  align-items: center;
  justify-content: center;
`;

const SwitchLanguage = styled(SwitchSelector)`
  margin: 0px 15px;
  width: 70px;
`;

const LoginForm = styled.View`
  width: 100%;
  height: 85%;
  justify-content: space-between;
  align-items: center;
`;

const Heading = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 35px;
  font-weight: bold;
`;

const LoginWithEmail = styled.View`
  margin: 30px 0px;
  align-items: center;
  justify-content: center;
`;

const Inputs = styled.View`
  align-items: center;
`;
const ForgotPasswordText = styled.Text`
  padding-bottom: 25px;
  color: ${({theme}) => theme.appColors.textColorLightGray};
  font-style: italic;
  font-size: 15px;
`;

const ButtonContainer = styled.View`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const SocialButtons = styled.View`
  align-items: center;
  justify-content: center;
  width: 85%;
`;

const ErrorText = styled.Text`
  color: ${({theme}) => theme.appColors.accentColor};
  font-size: 17px;
  padding-bottom: 10px;
`;

export default withTheme(LoginView);
