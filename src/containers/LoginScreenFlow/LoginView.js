import React, {useState, useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ROUTES from '../../routes/Routes';
import AuthFormInput from '../../components/AuthFormInput';
import SocialButton from '../../components/SocialButton';
import Button from '../../components/Button';
import {AuthContext} from '../../routes/AuthProvider';

const LoginView = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const {login, fbLogin} = useContext(AuthContext);

  const navigateToForgotPassword = () => {
    navigation.navigate(ROUTES.Password);
  };

  const navigateToSignUp = () => {
    navigation.navigate(ROUTES.Register);
  };

  return (
    <View>
      <Text>Login Page</Text>
      <AuthFormInput
        labelValue={email}
        onChangeText={userEmail => setEmail(userEmail)}
        placeholderText="Email"
        iconType="user"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <AuthFormInput
        labelValue={password}
        onChangeText={userPassword => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <Button
        text="Sign In"
        bgColor="blue"
        onPress={() => login(email, password)}
      />

      <TouchableOpacity onPress={navigateToForgotPassword}>
        <Text>Forgot your password?</Text>
      </TouchableOpacity>

      <SocialButton
        text="Sign In with Facebook"
        btnType="facebook"
        iconColor="#4867aa"
        bgColor="#e6eaf4"
        onPress={() => {
          fbLogin();
        }}
      />

      <SocialButton
        text="Sign In with Google"
        btnType="google"
        iconColor="#de4d41"
        bgColor="#5e7ea"
        onPress={() => {
          alert('Google Clicked');
        }}
      />

      <TouchableOpacity onPress={navigateToSignUp}>
        <Text>Do not have account? Create here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginView;
