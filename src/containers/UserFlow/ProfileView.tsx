import React from 'react';
import {StatusBar, ActivityIndicator} from 'react-native';
import styled, {withTheme} from 'styled-components/native';
import {useSelector} from 'react-redux';
import {RootState} from 'src/state/reducers';
import {IDefaultTheme} from '../../assets/styles/interface';

interface IProfileViewProps {
  theme: IDefaultTheme;
}

const ProfileView: React.FC<IProfileViewProps> = ({theme}) => {
  const onSync = useSelector((state: RootState) => state.ui.authOnSync);
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <Container>
      <StatusBar backgroundColor={`${theme.appColors.backgroundColor}`} />
      {onSync ? (
        <ActivityIndicator size="large" color="#ffffff" />
      ) : (
        <>
          <Heading>Welcome To Profile Page</Heading>
          <Heading>{user.email}</Heading>
          <Heading>{user.name}</Heading>
        </>
      )}
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 60px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}: IProfileViewProps) =>
    theme.appColors.backgroundColor};
`;

const Heading = styled.Text`
  color: ${({theme}: IProfileViewProps) => theme.appColors.whiteColor}; ;
`;

export default withTheme(ProfileView);
