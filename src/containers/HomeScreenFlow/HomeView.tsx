import React, {useContext} from 'react';
import {
  StatusBar,
  ActivityIndicator,
  TouchableOpacity,
  Text,
} from 'react-native';
import styled, {withTheme} from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootState} from 'src/state/reducers';

import {actions} from '../../state/actions';
import {AuthContext} from '../../routes/AuthProvider';
import {IDefaultTheme} from '../../assets/styles/interface';
import ROUTES from '../../routes/Routes';
import {RootStackParamList} from 'src/routes/Interface';

//COMPONENTS
import Button from '../../components/Button';

type HomeViewScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.Home
>;

interface IHomeViewProps {
  theme: IDefaultTheme;
  navigation: HomeViewScreenNavigationProp;
}

const HomeView: React.FC<IHomeViewProps> = ({theme, navigation}) => {
  const {t} = useTranslation();
  //const {logout} = useContext(AuthContext);

  const onSync = useSelector((state: RootState) => state.ui.authOnSync);
  const user = useSelector((state: RootState) => state.user.user);

  const dispatch = useDispatch();

  return (
    <HomeContainer>
      <StatusBar backgroundColor={`${theme.appColors.backgroundColor}`} />

      {onSync ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <Heading>Welcome To Home Page</Heading>
          <Heading>{user.email}</Heading>
          <Heading>{onSync}</Heading>
          <Button
            text="Logout"
            bgColor={`${theme.appColors.primaryColorLighter}`}
            onPress={() => dispatch(actions.user.logoutUser())}
          />

          <TouchableOpacity onPress={() => navigation.navigate(ROUTES.Profile)}>
            <Text>{t('user:userProfile')}</Text>
          </TouchableOpacity>
        </>
      )}
    </HomeContainer>
  );
};

const HomeContainer = styled.View`
  flex: 1;
  padding-top: 60px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}: IHomeViewProps) =>
    theme.appColors.backgroundColor};
`;

const Heading = styled.Text`
  color: ${({theme}: IHomeViewProps) => theme.appColors.whiteColor}; ;
`;

export default withTheme(HomeView);
