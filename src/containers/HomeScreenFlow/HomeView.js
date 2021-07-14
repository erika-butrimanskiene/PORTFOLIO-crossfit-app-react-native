import React, {useContext} from 'react';
import {StatusBar} from 'react-native';
import {AuthContext} from '../../routes/AuthProvider';
import styled, {withTheme} from 'styled-components';
import {connect} from 'react-redux';
import {actions} from '../../state/actions';

//COMPONENTS
import Button from '../../components/Button';

const HomeView = ({theme, user, onSync, handleLogoutThunk}) => {
  const {logout} = useContext(AuthContext);

  return (
    <HomeContainer>
      <StatusBar backgroundColor={`${theme.appColors.primaryColor}`} />
      <Heading>Welcome To Home Page</Heading>
      <Heading>{user.email}</Heading>
      <Heading>{onSync}</Heading>
      <Button
        text="Logout"
        bgColor={`${theme.appColors.lightAccentColor}`}
        onPress={() => logout()}
      />
    </HomeContainer>
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
    handleLogoutThunk: logout => dispatch(handleLogout(logout)),
  };
};

// const handleLogout = (logout) => {
//  return async dispatch => {
//    const response = logout();
//    if(response.status === true){
//      dispatch(actions.user.SET_USER_CLEAR())
//    }
//  }
// }

const HomeContainer = styled.View`
  flex: 1;
  padding-top: 60px;
  font-size: 20px;
  align-items: center;
  background-color: ${({theme}) => theme.appColors.primaryColor};
`;

const Heading = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor}; ;
`;

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withTheme(HomeView));
