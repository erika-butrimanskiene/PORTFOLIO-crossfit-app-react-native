import React from 'react';
import styled from 'styled-components';
import {TouchableOpacity} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

const CustomButton = styled.View`
  width: 250px;
  border-radius: 20px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Title = styled.Text`
  color: white;
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
`;

const IconWrapper = styled.View`
  width: 30px;
  justify-content: center;
  align-items: center;
`;

const SocialButton = ({text, btnType, iconColor, onPress, bgColor}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <CustomButton style={{backgroundColor: bgColor}}>
        <IconWrapper>
          <FontAwesome name={btnType} size={22} color={iconColor} />
        </IconWrapper>
        <Title style={{color: iconColor}}>{text}</Title>
      </CustomButton>
    </TouchableOpacity>
  );
};

export default SocialButton;
