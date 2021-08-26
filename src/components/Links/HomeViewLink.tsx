import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {GestureResponderEvent} from 'react-native';

//LIBRARIES
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
} from 'react-native-reanimated';

interface IHomeViewLinkProps {
  image: string;
  onPress: ((event: GestureResponderEvent) => void) | any;
  text: string;
  admin: boolean;
  timeoutForAnimation: number;
}

const HomeViewLink: React.FC<IHomeViewLinkProps> = ({
  image,
  onPress,
  text,
  admin,
  timeoutForAnimation,
}) => {
  const scale = useSharedValue(1);
  const scale1 = useSharedValue(0.5);
  const opacity = useSharedValue(0);

  const reanimatedStyleText = useAnimatedStyle(() => {
    return {
      transform: [{scale: scale.value}],
    };
  }, []);

  const reanimatedStyleContainer = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{scale: scale1.value}],
    };
  }, []);

  useEffect(() => {
    setTimeout(() => {
      opacity.value = withTiming(1, {duration: 3000});
      scale1.value = withTiming(1, {duration: 900});
    }, timeoutForAnimation);
  }, []);

  return (
    <AnimatedView style={reanimatedStyleContainer}>
      <ImageContainer
        source={{
          uri: image,
        }}
        resizeMode="cover">
        <Link
          admin={admin}
          onPress={onPress}
          onPressIn={() => {
            scale.value = withSpring(1.5);
          }}
          onPressOut={() => {
            scale.value = withSpring(1);
          }}>
          <LinkText admin={admin} style={reanimatedStyleText}>
            {text.toUpperCase()}
          </LinkText>
        </Link>
      </ImageContainer>
    </AnimatedView>
  );
};
const AnimatedView = styled(Animated.View)`
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Link = styled.TouchableOpacity<{admin: boolean}>`
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  background-color: ${({theme, admin}) =>
    admin
      ? theme.appColors.backgroundColor_opacity80
      : theme.appColors.backgroundColor_opacity20};
`;

const LinkText = styled(Animated.Text)<{admin: boolean}>`
  width: 70%;
  text-align: center;
  color: ${({theme, admin}) =>
    admin ? theme.appColors.whiteColor : theme.appColors.whiteColor};
  font-size: 22px;
  padding: 5px;
  font-weight: bold;
`;

const ImageContainer = styled.ImageBackground`
  border-radius: 5px;
  overflow: hidden;
  margin: 10px 0px;
  width: 90%;
  height: 100px;
`;

export default HomeViewLink;
