import React from 'react';
import styled from 'styled-components/native';
import {TouchableOpacity, GestureResponderEvent} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
interface INotificationModalProps {
  notificationIcon: string;
  errorText: string;
  bgColor: string;
  onPress?: ((event: GestureResponderEvent) => void) | any;
}

const NotificationModal: React.FC<INotificationModalProps> = ({
  notificationIcon,
  errorText,
  bgColor,
  onPress,
}) => {
  return (
    <ErrorBar bgColor={bgColor}>
      <IconContainer bgColor={bgColor}>
        <MaterialIcons name={notificationIcon} size={35} color={'#ffffff'} />
      </IconContainer>
      <ErrorText>{errorText}</ErrorText>
      <TouchableOpacity onPress={onPress}>
        <MaterialIcons name={'close'} size={27} color={'#ffffff'} />
      </TouchableOpacity>
    </ErrorBar>
  );
};

const ErrorBar = styled.View<{bgColor: string}>`
  flex-direction: row;
  height: 55px;
  padding-right: 10px;
  background-color: ${({bgColor}) => bgColor};
  font-size: 17px;
  align-items: center;
  justify-content: space-between;
`;

const IconContainer = styled.View<{bgColor: string}>`
  padding: 10px;
  background-color: ${({bgColor}) => bgColor};
`;

const ErrorText = styled.Text`
  font-size: 17px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

export default NotificationModal;
