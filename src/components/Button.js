import React from 'react';
import styled from 'styled-components';
import {TouchableOpacity} from 'react-native';

const Button = ({text, onPress, bgColor}) => {
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
  padding-vertical: 14px;
  padding-horizontal: 10px;
`;

const Title = styled.Text`
  color: white;
  font-size: 20px;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
`;

export default Button;
