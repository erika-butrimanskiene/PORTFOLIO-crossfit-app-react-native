import React, {useState} from 'react';
import styled from 'styled-components';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {theme} from '../assets/styles/theme';

const AuthFormInput = ({
  labelValue,
  placeholderText,
  iconType,
  bgColor,
  ...rest
}) => {
  const [isInputActive, setIsInputActive] = useState(false);
  return (
    <InputContainer bgColor={bgColor} focus={isInputActive}>
      <Icon>
        <AntDesign
          name={iconType}
          size={25}
          color={`${theme.appColors.whiteColor}`}
        />
      </Icon>
      <InputField
        value={labelValue}
        numberOfLines={1}
        placeholder={placeholderText}
        placeholderTextColor={`${theme.appColors.whiteColor}`}
        onFocus={() => setIsInputActive(true)}
        onBlur={() => setIsInputActive(false)}
        {...rest}
      />
    </InputContainer>
  );
};

const InputContainer = styled.View`
  width: 90%;
  height: 60px;
  margin: 10px 0px;
  background-color: ${props => props.bgColor};
  border-width: ${props => (props.focus ? '1px' : '0px')};
  border-color: ${theme.appColors.primaryColorLighter};
  border-radius: 10px;
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

export default AuthFormInput;
