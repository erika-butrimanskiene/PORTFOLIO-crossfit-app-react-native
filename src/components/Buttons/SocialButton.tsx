import React from 'react';
import styled, {DefaultTheme} from 'styled-components/native';
import {GestureResponderEvent} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface ISocialButtonProps {
  text: string;
  btnType: string;
  iconColor: string;
  onPress: (event: GestureResponderEvent) => void;
  theme?: DefaultTheme;
}

const SocialButton: React.FC<ISocialButtonProps> = ({
  text,
  btnType,
  iconColor,
  onPress,
}) => {
  return (
    <TouchableButton onPress={onPress}>
      <CustomButton>
        <IconWrapper>
          <FontAwesome name={btnType} size={22} color={iconColor} />
        </IconWrapper>
        <Title>{text}</Title>
      </CustomButton>
    </TouchableButton>
  );
};

const TouchableButton = styled.TouchableOpacity`
  width: 100%;
  justify-content: center;
  align-items: center;
`;

const CustomButton = styled.View`
  margin: 10px;
  padding: 15px 6px 15px 0px;
  width: 100%;
  border-radius: 5px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
`;

const Title = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-weight: bold;
  text-transform: uppercase;
`;

const IconWrapper = styled.View`
  width: 30px;
  justify-content: center;
  align-items: center;
`;

export default SocialButton;
