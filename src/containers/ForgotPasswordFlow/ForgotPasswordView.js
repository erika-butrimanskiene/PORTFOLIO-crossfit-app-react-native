import React, {useState} from 'react';
import styled from 'styled-components';
import {View, Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import {theme} from "../../assets/styles/theme";

import Button from "../../components/Button"

const ResetPasswordContainer = styled(LinearGradient)`
  flex: 1;
  padding-top: 100px;
  font-size: 20px;
  align-items: center;
`;

const ResetPasswordHeading = styled.Text`
  width: 85%;
  margin: 15px 0px 25px 0px;
  color: ${theme.appColors.whiteColor};
  font-size: 25px;
  text-align: center;
`;

const InputField = styled.TextInput`
  background-color: ${theme.appColors.whiteColor};
  margin-bottom: 50px;
  border-radius: 5px;
  padding: 0px 10px;
  width: 80%;
  height: 45px;
  font-size: 15px;
`;

const ForgotPasswordView = () => {
  const [email, setEmail] = useState();
  return (
    <ResetPasswordContainer colors={[`${theme.appColors.darkAccentColor}`, `${theme.appColors.lightAccentColor}`]}>
      <View>
        <AntDesign name={'questioncircleo'} size={70} color="white" />
      </View>
      <ResetPasswordHeading>It's Okay! Reset your password</ResetPasswordHeading>
      <InputField
        value={email}
        numberOfLines={1}
        placeholder="Enter Your Email"
        placeholderTextColor={`${theme.appColors.darkAccentColor}`}
        onChangeText={userEmail => setEmail(userEmail)}
      />
      <Button
        text={"Continue"}
        bgColor={`${theme.appColors.darkAccentColor}`}
        onPress={() => alert("Reset password")}
      />
    </ResetPasswordContainer>
    
  );
};

export default ForgotPasswordView;
