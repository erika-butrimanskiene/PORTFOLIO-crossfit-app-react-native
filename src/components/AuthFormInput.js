import React from 'react';
import styled from 'styled-components';
import {View, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {theme} from "../assets/styles/theme";

const InputContainer = styled.View`
  width: 90%;
  height: 60px;
  margin: 15px 0px;
  border-color: ${theme.appColors.whiteColor};
  border-radius: 50px;
  border-width: 1px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Icon = styled.View`
  padding: 0px 10px;
  height: 100%;
  justify-content: center;
  align-items: center;
  width: 50px;
`;

const InputField = styled.TextInput`
  padding: 0px 10px;
  width: 80%;
  height: 40px;
  font-size: 20px;
  color: ${theme.appColors.whiteColor};
  text-decoration: none;
`;

const AuthFormInput = ({labelValue, placeholderText, iconType, ...rest}) => {
  return (
    <InputContainer>
      <Icon>
        <AntDesign name={iconType} size={25} color="white" />
      </Icon>
      <InputField
        value={labelValue}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="white"
        {...rest}
      />
    </InputContainer>
  );
};

export default AuthFormInput;
