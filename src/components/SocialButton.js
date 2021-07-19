import React from 'react';
import styled from 'styled-components';
import {TouchableOpacity} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const SocialButton = ({text, btnType, iconColor, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <CustomButton>
        <IconWrapper>
          <FontAwesome name={btnType} size={22} color={iconColor} />
        </IconWrapper>
        <Title>{text}</Title>
      </CustomButton>
    </TouchableOpacity>
  );
};

const CustomButton = styled.View`
  margin: 10px;
  padding: 10px 0px;
  width: 160px;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.appColors.whiteColor};
`;

const Title = styled.Text`
  color: ${({theme}) => theme.appColors.textColorDarkGray};
  font-weight: bold;
  text-transform: uppercase;
  text-align: center;
`;

const IconWrapper = styled.View`
  width: 30px;
  justify-content: center;
  align-items: center;
`;

export default SocialButton;
