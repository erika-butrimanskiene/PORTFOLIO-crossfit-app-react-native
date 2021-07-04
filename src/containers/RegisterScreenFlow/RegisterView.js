import React, {useContext, useState} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import ROUTES from '../../routes/Routes';
import AuthFormInput from '../../components/AuthFormInput';
import SocialButton from '../../components/SocialButton';
import Button from '../../components/Button';
import {AuthContext} from '../../routes/AuthProvider';

const RegisterView = ({navigation}) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const {register} = useContext(AuthContext);

  const navigateToSignIn = () => {
    navigation.navigate(ROUTES.Login);
  };

  return (
    <View>
      <Text>Register Page</Text>
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

      <AuthFormInput
        labelValue={confirmPassword}
        onChangeText={userPassword => setCofirmPassword(confirmPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <Button
        text="Sign Up"
        bgColor="blue"
        onPress={() => register(email, password)}
      />

      <View>
        <Text>By registering, you confirm that you accept our</Text>
        <TouchableOpacity>
          <Text>Terms of Service</Text>
        </TouchableOpacity>
        <Text>and</Text>
        <TouchableOpacity>
          <Text>Privacy Policy</Text>
        </TouchableOpacity>
      </View>

      <SocialButton
        text="Sign Up with Facebook"
        btnType="facebook"
        iconColor="#4867aa"
        bgColor="#e6eaf4"
        onPress={() => {
          alert('Fb Clicked');
        }}
      />

      <SocialButton
        text="Sign Up with Google"
        btnType="google"
        iconColor="#de4d41"
        bgColor="#5e7ea"
        onPress={() => {
          alert('Google Clicked');
        }}
      />

      <TouchableOpacity onPress={navigateToSignIn}>
        <Text>Have an account? Sign In here</Text>
      </TouchableOpacity>
    </View>
  );
};

export default RegisterView;
