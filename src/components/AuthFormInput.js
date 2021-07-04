import React from 'react';
import styled from 'styled-components';
import {View, TextInput} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const InputContainer = styled.View`
  width: 90%;
  height: 40px;
  margin-top: 5px;
  margin-bottom: 10px;
  border-color: #ccc;
  border-radius: 3px;
  border-width: 1px;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
`;

const Icon = styled.View`
  padding: 10px;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-right-color: #ccc;
  border-right-width: 1px;
  width: 50px;
`;

const InputField = styled.TextInput`
  padding: 10px;
  margin-top: 5px;
  margin-bottom: 10px;
  width: 80%;
  height: 40px;
  font-size: 15px;
`;

const AuthFormInput = ({labelValue, placeholderText, iconType, ...rest}) => {
  return (
    <InputContainer>
      <Icon>
        <AntDesign name={iconType} size={20} color="#666" />
      </Icon>
      <InputField
        value={labelValue}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor="#666"
        {...rest}
      />
    </InputContainer>
  );
};

export default AuthFormInput;
