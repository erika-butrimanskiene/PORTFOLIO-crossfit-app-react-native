import React from 'react';
import styled from 'styled-components/native';
import {GestureResponderEvent} from 'react-native';

interface ISmallButtonProps {
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | any;
  bgColor: string;
  border: boolean;
}

const SmallBtn: React.FC<ISmallButtonProps> = ({
  text,
  onPress,
  bgColor,
  border,
}) => {
  return (
    <Button bgColor={bgColor} border={border} onPress={onPress}>
      <ButtonText>{text}</ButtonText>
    </Button>
  );
};

const Button = styled.TouchableOpacity<{bgColor: string; border: boolean}>`
  margin: 7px 0px;
  border-radius: 30px;
  padding: 5px 10px;
  background-color: ${({bgColor}) => bgColor};
  border-width: ${({border}) => (border ? 1 : 0)}px;
  border-color: ${({theme}) => theme.appColors.accentColor};
`;

const ButtonText = styled.Text`
  font-size: 17px;
  text-align: center;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

export default SmallBtn;
