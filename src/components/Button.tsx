import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity, GestureResponderEvent} from 'react-native';

interface IButtonProps {
  text: string;
  onPress: ((event: GestureResponderEvent) => void) | any;
  bgColor: string;
}

const Button: React.FC<IButtonProps> = ({text, onPress, bgColor}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <CustomButton style={{backgroundColor: bgColor}}>
        <Title>{text}</Title>
      </CustomButton>
    </TouchableOpacity>
  );
};

const CustomButton = styled.View`
  margin: 10px 0px;
  width: 200px;
  border-radius: 50px;
  padding: 10px 14px;
`;

const Title = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
`;

export default Button;
