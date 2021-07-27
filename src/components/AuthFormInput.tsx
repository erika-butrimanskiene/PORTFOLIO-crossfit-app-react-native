import React, {useState} from 'react';
import styled, {withTheme} from 'styled-components/native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {DefaultTheme} from 'styled-components/native';

interface IAutFormInputProps {
  labelValue: string;
  placeholderText: string;
  iconType: string;
  bgColor: string;
  focus?: boolean;
  theme: DefaultTheme;
  onChangeText: any;
  keyboardType?: 'default' | 'email-address' | 'numeric' | 'phone-pad';
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
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
        placeholderTextColor={`${theme.appColors.textColorLightGray}`}
        onFocus={() => setIsInputActive(true)}
        onBlur={() => setIsInputActive(false)}
        {...rest}
      />
    </InputContainer>
  );
};

const InputContainer = styled.View<{bgColor: string; focus: boolean}>`
  width: 90%;
  height: 60px;
  margin: 10px 0px;
  background-color: ${({bgColor}) => bgColor};
  border-width: ${({focus}) => (focus ? '1px' : '0px')};
  border-color: ${({theme}) => theme.appColors.primaryColorLighter};
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
  color: ${({theme}) => theme.appColors.whiteColor};
  text-decoration: none;
`;

export default withTheme(AuthFormInput);
