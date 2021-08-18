import React, {useState} from 'react';
import styled from 'styled-components/native';
import {GestureResponderEvent} from 'react-native';
// import Animated, {
//   useSharedValue,
//   useAnimatedStyle,
//   withSpring,
//   withTiming,
// } from 'react-native-reanimated';

interface IHomeViewLinkProps {
  image: string;
  onPress: ((event: GestureResponderEvent) => void) | any;
  text: string;
  admin: boolean;
}

const HomeViewLink: React.FC<IHomeViewLinkProps> = ({
  image,
  onPress,
  text,
  admin,
}) => {
  const [isPressed, setIsPressed] = useState(false);

  // const scale = useSharedValue(1);

  // const reanimatedStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{scale: scale.value}],
  //   };
  // }, []);

  return (
    <ImageContainer
      source={{
        uri: image,
      }}
      resizeMode="cover">
      <Link
        admin={admin}
        onPress={onPress}
        // onPressIn={() => {
        //   scale.value = withSpring(1.5);
        //   setIsPressed(true);
        // }}
        // onPressOut={() => {
        //   scale.value = withSpring(1);
        //   setIsPressed(false);
        // }}
      >
        {/* <LinkText style={reanimatedStyle}>{text.toUpperCase()}</LinkText> */}
        <LinkText>{text.toUpperCase()}</LinkText>
      </Link>
    </ImageContainer>
  );
};

const Link = styled.TouchableOpacity<{admin: boolean}>`
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme, admin}) =>
    admin
      ? theme.appColors.backgroundColor_opacity80
      : theme.appColors.backgroundColor_opacity50};
`;

//const LinkText = styled(Animated.Text)`
const LinkText = styled.Text`
  width: 70%;
  text-align: center;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 22px;
  padding: 5px;
  font-weight: bold;

  /* border-radius: 5px;
  border-width: 1px;
  border-color: ${({theme}) => theme.appColors.whiteColor}; */
`;

const ImageContainer = styled.ImageBackground`
  border-radius: 5px;
  overflow: hidden;
  margin: 10px 0px;
  width: 90%;
  height: 100px;
`;

export default HomeViewLink;
