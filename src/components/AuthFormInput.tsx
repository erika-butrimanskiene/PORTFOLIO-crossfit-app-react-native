import React, {useState} from 'react';
import styled, {withTheme} from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {IDefaultTheme} from '../assets/styles/interface';

interface IAutFormInputProps {
  labelValue: string;
  placeholderText: string;
  iconType: string;
  bgColor: string;
  focus?: boolean;
  theme?: IDefaultTheme;
  onChangeText?: any;
  keyboardType?: string;
  autoCapitalize?: string;
  autoCorrect?: boolean;
  secureTextEntry?: boolean;
}

const AuthFormInput: React.FC<IAutFormInputProps> = ({
  labelValue,
  placeholderText,
  iconType,
  bgColor,
  theme,
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
  background-color: ${({bgColor}: IAutFormInputProps) => bgColor};
  border-width: ${({focus}: IAutFormInputProps) => (focus ? '1px' : '0px')};
  border-color: ${({theme}: IAutFormInputProps) =>
    theme.appColors.primaryColorLighter};
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
  color: ${({theme}: IAutFormInputProps) => theme.appColors.whiteColor};
  text-decoration: none;
`;

export default withTheme(AuthFormInput);
