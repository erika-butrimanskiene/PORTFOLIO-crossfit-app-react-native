import React from 'react';
import styled from 'styled-components';
import {TouchableOpacity, Text, View} from 'react-native';

const CustomButton = styled.View`
  width: 200px;
  border-radius: 50px;
  padding-vertical: 14px;
  padding-horizontal: 10px;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
`;

const Button = ({text, onPress, bgColor}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <CustomButton style={{backgroundColor: bgColor}}>
        <Title>{text}</Title>
      </CustomButton>
    </TouchableOpacity>
  );
};

export default Button;
