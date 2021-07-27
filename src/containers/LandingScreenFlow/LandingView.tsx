import React, {useEffect} from 'react';
import {StatusBar, ActivityIndicator} from 'react-native';
import {useTranslation} from 'react-i18next';
import SwitchSelector from 'react-native-switch-selector';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootState} from 'src/state/reducers';

import ROUTES from '../../routes/Routes';
import {actions} from '../../state/actions';
import {RootStackParamList} from 'src/routes/Interface';

//COMPONENTS
import Button from '../../components/Button';

const options = [
  {label: 'EN', value: 'en'},
  {label: 'LT', value: 'lt'},
];

type LandingViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.Landing
>;

interface ILandingViewProps {
  theme: DefaultTheme;
  navigation: LandingViewScreenNavigationProp;
}

const LandingView: React.FC<ILandingViewProps> = ({navigation, theme}) => {
  const {t, i18n} = useTranslation();
  const onSync = useSelector((state: RootState) => state.ui.authOnSync);
  const dispatch = useDispatch();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <>
          {!onSync && (
            <SwitchSelector
              options={options}
              hasPadding
              initial={0}
              buttonColor={theme.appColors.accentColor}
              style={{width: 70}}
              onPress={(language: string) => {
                i18n.changeLanguage(language);
              }}
            />
          )}
        </>
      ),
    });
  }, [navigation]);

  const navigateToLogin = () => {
    navigation.navigate(ROUTES.Login);
  };

  const navigateToRegister = () => {
    navigation.navigate(ROUTES.Register);
  };

  return (
    <LandingContainer>
      <StatusBar backgroundColor={`${theme.appColors.backgroundColor}`} />
      {onSync ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <Image
          source={{
            uri: 'https://images.pexels.com/photos/7676553/pexels-photo-7676553.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          }}
          resizeMode="cover">
          <ImageCover>
            <Heading>MyCrossFit</Heading>
            <TextMessagesContainer>
              <TextMessage>{t('landing:firstMessage')}</TextMessage>
              <TextMessage>{t('landing:secondMessage')}</TextMessage>
            </TextMessagesContainer>
            <Buttons>
              <Button
                text={t('login:SignIn')}
                onPress={navigateToLogin}
                bgColor={theme.appColors.primaryColorDarken}
              />
              <Button
                text={t('signup:SignUp')}
                onPress={navigateToRegister}
                bgColor={theme.appColors.primaryColorLighter}
              />
            </Buttons>
          </ImageCover>
        </Image>
      )}
    </LandingContainer>
  );
};

const LandingContainer = styled.View`
  flex: 1;
  justify-content: center;
  background-color: ${({theme}) => theme.appColors.backgroundColor};
`;

const Image = styled.ImageBackground`
  flex: 1;
  justify-content: center;
`;

const ImageCover = styled.View`
  flex: 1;
  padding-top: 70px;
  background-color: #212121a0;
  align-items: center;
`;

const Heading = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 35px;
  font-weight: bold;
`;
const TextMessagesContainer = styled.View`
  border-radius: 10px;
  margin: 20px 0px 250px 0px;
  padding: 5px 20px;
  justify-content: center;
`;

const TextMessage = styled.Text`
  font-size: 22px;
  padding: 4px 0px;
  color: ${({theme}) => theme.appColors.whiteColor};
  text-align: center;
`;

const Buttons = styled.View`
  margin: 30px 0px 0px 0px;
`;

export default withTheme(LandingView);
