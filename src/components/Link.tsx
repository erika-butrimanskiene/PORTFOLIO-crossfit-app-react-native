import React from 'react';
import styled, {DefaultTheme} from 'styled-components/native';
import {GestureResponderEvent} from 'react-native';

//LIBRARIES
import AntDesign from 'react-native-vector-icons/AntDesign';

interface ILinkProps {
  theme: DefaultTheme;
  onPress: ((event: GestureResponderEvent) => void) | any;
  text: string;
}

const Link: React.FC<ILinkProps> = ({theme, onPress, text}) => {
  return (
    <AboutWorkoutLink onPress={onPress}>
      <About>{text}</About>
      <AntDesign
        name={'right'}
        size={20}
        color={theme.appColors.primaryColorLighter}
      />
    </AboutWorkoutLink>
  );
};

const AboutWorkoutLink = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: flex-end;
  align-items: flex-end;
`;

const About = styled.Text`
  padding-left: 5px;
  font-size: 18px;
  color: ${({theme}) => theme.appColors.primaryColorLighter};
`;

export default Link;
