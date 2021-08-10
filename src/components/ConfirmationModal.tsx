import React from 'react';
import styled from 'styled-components/native';
import {GestureResponderEvent} from 'react-native';
import {useTranslation} from 'react-i18next';

interface IConfirmationModalProps {
  alertText: string;
  onCancelPress?: ((event: GestureResponderEvent) => void) | any;
  onConfirmPress?: ((event: GestureResponderEvent) => void) | any;
  confirmText: string;
}

const ConfirmationModal: React.FC<IConfirmationModalProps> = ({
  alertText,
  onCancelPress,
  onConfirmPress,
  confirmText,
}) => {
  const {t} = useTranslation();
  return (
    <ConfirmationAlert>
      <Title>{t('confirmationModal:areSure')}</Title>
      <AlertText>{alertText}</AlertText>
      <AlertButtonsContainer>
        <CancelButton onPress={onCancelPress}>
          <AlertBtnText>Cancel</AlertBtnText>
        </CancelButton>
        <DeleteButton onPress={onConfirmPress}>
          <AlertBtnText>{confirmText}</AlertBtnText>
        </DeleteButton>
      </AlertButtonsContainer>
    </ConfirmationAlert>
  );
};

const ConfirmationAlert = styled.View`
  background-color: ${({theme}) => theme.appColors.whiteColor};
  padding: 20px;
  width: 85%;
  border-radius: 10px;
`;
const Title = styled.Text`
  text-align: center;
  font-size: 22px;
  margin-bottom: 20px;
  font-weight: bold;
  color: ${({theme}) => theme.appColors.backgroundColor};
`;

const AlertText = styled.Text`
  text-align: center;
  font-size: 18px;
  margin-bottom: 20px;
  color: ${({theme}) => theme.appColors.backgroundColor};
`;

const AlertButtonsContainer = styled.View`
  flex-direction: row;
  justify-content: center;
`;

const CancelButton = styled.TouchableOpacity`
  margin: 0px 5px;
  width: 100px;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
  align-items: center;
  border-radius: 30px;
`;

const DeleteButton = styled.TouchableOpacity`
  margin: 0px 5px;
  width: 100px;
  background-color: ${({theme}) => theme.appColors.primaryColorLighter};
  align-items: center;
  border-radius: 30px;
`;

const AlertBtnText = styled.Text`
  padding: 5px;
  font-size: 20px;
  color: ${({theme}) => theme.appColors.whiteColor};
`;

export default ConfirmationModal;
