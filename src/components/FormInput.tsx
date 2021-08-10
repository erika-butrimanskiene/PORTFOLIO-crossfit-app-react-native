import React, {useState} from 'react';
import {GestureResponderEvent} from 'react-native';
import styled, {DefaultTheme, withTheme} from 'styled-components/native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

interface IFormInputProps {
  theme: DefaultTheme;
  value: string;
  placeholderText: string;
  onChangeText?: (text: string) => void;
  onPress?: ((event: GestureResponderEvent) => void) | any;
  isInputWithAction: boolean;
  bgColor: string;
  placeholderColor: string;
  iconName?: string;
  editable?: boolean;
}

const FormInput: React.FC<IFormInputProps> = ({
  theme,
  value,
  onChangeText,
  placeholderText,
  placeholderColor,
  onPress,
  isInputWithAction,
  bgColor,
  iconName,
  editable,
}) => {
  const [isInputActive, setIsInputActive] = useState(false);
  return (
    <InputContainer focus={isInputActive} bgColor={bgColor}>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholderText}
        placeholderTextColor={placeholderColor}
        onFocus={() => setIsInputActive(true)}
        onBlur={() => setIsInputActive(false)}
        autoCapitalize="none"
        autoCorrect={false}
        underlineColorAndroid="transparent"
        editable={editable}
      />
      {isInputWithAction && (
        <Icon onPress={onPress}>
          <MaterialIcons
            name={iconName}
            size={30}
            color={theme.appColors.whiteColor}
          />
        </Icon>
      )}
    </InputContainer>
  );
};

const InputContainer = styled.View<{focus: boolean; bgColor: string}>`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  background-color: ${({bgColor}) => bgColor};
  border-width: ${({focus}) => (focus ? '1px' : '0px')};
  margin-top: 10px;
  margin-bottom: 5px;
  border-color: ${({theme}) => theme.appColors.primaryColorLighter};
  border-radius: 10px;
  width: 90%;
`;

const Input = styled.TextInput`
  width: 85%;
  color: ${({theme}) => theme.appColors.whiteColor};
  text-decoration: none;
  padding-left: 10px;
  font-size: 20px;
`;

const Icon = styled.TouchableOpacity`
  padding: 0px 10px;
`;

export default withTheme(FormInput);
