import React from 'react';
import {View, Text} from 'react-native';
import {StackNavigationProp} from '@react-navigation/stack';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';

//ROUTES
import ROUTES from '../../routes/Routes';
import {RootStackParamList} from 'src/routes/Interface';

type ActivitiesHistoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.ActivityBoard
>;

interface IActivitiesHistoryViewProps {
  theme: DefaultTheme;
  navigation: ActivitiesHistoryScreenNavigationProp;
}

const ActivitiesHistoryView: React.FC<IActivitiesHistoryViewProps> = ({
  theme,
  navigation,
}) => {
  return (
    <Container>
      <Title>Your WODs history</Title>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${({theme}) => theme.appColors.backgroundColor};
  flex: 1;
  padding-top: 40px;
  font-size: 20px;
  align-items: center;
`;

const Title = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 25px;
`;

export default withTheme(ActivitiesHistoryView);
