import React from 'react';
import {GestureResponderEvent} from 'react-native';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';

import {createTimeSchema} from '../../utils/formsValidations';

import FormInput from '../../components/FormInput';
interface ICreateWodTimesFormProps {
  theme: DefaultTheme;
  setWodsTimes: any;
  wodsTimes: object[];
}

const CreateWodTimesForm: React.FC<ICreateWodTimesFormProps> = ({
  theme,
  setWodsTimes,
  wodsTimes,
}) => {
  const {t} = useTranslation();

  const handleTimesSet = (
    wodTime: string,
    wodRoom: string,
    coachName: string,
    attendeesNumber: string,
  ) => {
    setWodsTimes([
      ...wodsTimes,
      {wodTime, wodRoom, coachName, attendeesNumber},
    ]);
  };

  return (
    <Formik
      initialValues={{
        wodTime: '',
        coachName: '',
        wodRoom: '',
        attendeesNumber: '',
      }}
      validationSchema={createTimeSchema}
      onSubmit={(values, {resetForm, setFieldValue}) => {
        handleTimesSet(
          values.wodTime,
          values.wodRoom,
          values.coachName,
          values.attendeesNumber,
        );

        setFieldValue('wodTime', '');
        setFieldValue('wodRoom', '');
        setFieldValue('coachName', '');
        setFieldValue('attendeesNumber', '');

        resetForm();
      }}>
      {formikProps => {
        return (
          <>
            <PickerWrapper>
              <StyledPicker
                selectedValue={formikProps.values.wodTime}
                dropdownIconColor={'#ffffff'}
                onValueChange={itemValue =>
                  formikProps.setFieldValue('wodTime', itemValue)
                }>
                <Picker.Item
                  style={{fontSize: 20}}
                  label={t('admin:selectWodTime')}
                  value={''}
                  key={0}
                />
                <Picker.Item
                  style={{fontSize: 18}}
                  label="06:00"
                  value={'06:00'}
                  key={1}
                />
                <Picker.Item
                  style={{fontSize: 18}}
                  label="07:00"
                  value={'07:00'}
                  key={2}
                />
                <Picker.Item
                  style={{fontSize: 18}}
                  label="12:00"
                  value={'12:00'}
                  key={3}
                />
                <Picker.Item
                  style={{fontSize: 18}}
                  label="17:00"
                  value={'17:00'}
                  key={3}
                />
                <Picker.Item
                  style={{fontSize: 18}}
                  label="18:00"
                  value={'18:00'}
                  key={3}
                />
                <Picker.Item
                  style={{fontSize: 18}}
                  label="19:00"
                  value={'19:00'}
                  key={3}
                />
              </StyledPicker>
            </PickerWrapper>

            {formikProps.touched.wodTime && formikProps.errors.wodTime && (
              <ErrorText>{formikProps.errors.wodTime}</ErrorText>
            )}

            <PickerWrapper>
              <StyledPicker
                selectedValue={formikProps.values.wodRoom}
                dropdownIconColor={'#ffffff'}
                onValueChange={itemValue =>
                  formikProps.setFieldValue('wodRoom', itemValue)
                }>
                <Picker.Item
                  style={{fontSize: 20}}
                  label={t('admin:selectRoom')}
                  value={''}
                  key={0}
                />
                <Picker.Item
                  style={{fontSize: 18}}
                  label="1"
                  value={'1'}
                  key={1}
                />
                <Picker.Item
                  style={{fontSize: 18}}
                  label="2"
                  value={'2'}
                  key={2}
                />
                <Picker.Item
                  style={{fontSize: 18}}
                  label="3"
                  value={'3'}
                  key={3}
                />
              </StyledPicker>
            </PickerWrapper>

            {formikProps.touched.wodRoom && formikProps.errors.wodRoom && (
              <ErrorText>{formikProps.errors.wodRoom}</ErrorText>
            )}

            <FormInput
              value={formikProps.values.coachName}
              placeholderText={t('admin:typeCoachName')}
              onChangeText={formikProps.handleChange('coachName')}
              placeholderColor={theme.appColors.textColorLightGray}
              isInputWithAction={false}
              bgColor={theme.appColors.backgroundColorLighter}
            />

            {formikProps.touched.coachName && formikProps.errors.coachName && (
              <ErrorText>{formikProps.errors.coachName}</ErrorText>
            )}

            <FormInput
              value={formikProps.values.attendeesNumber}
              placeholderText={t('admin:typeAttendeesNumber')}
              onChangeText={formikProps.handleChange('attendeesNumber')}
              placeholderColor={theme.appColors.textColorLightGray}
              isInputWithAction={false}
              bgColor={theme.appColors.backgroundColorLighter}
            />

            {formikProps.touched.attendeesNumber &&
              formikProps.errors.attendeesNumber && (
                <ErrorText>{formikProps.errors.attendeesNumber}</ErrorText>
              )}

            <AddButtonContainer
              onPress={
                formikProps.handleSubmit as unknown as (
                  event: GestureResponderEvent,
                ) => void
              }>
              <AddText>{t('admin:addTimeBtn')}</AddText>
            </AddButtonContainer>
          </>
        );
      }}
    </Formik>
  );
};

const AddButtonContainer = styled.TouchableOpacity`
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
  margin-top: 15px;
  align-items: center;
  padding: 10px;
  border-radius: 5px;
`;

const AddText = styled.Text`
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 20px;
`;

const ErrorText = styled.Text`
  color: ${({theme}) => theme.appColors.accentColor};
  font-size: 17px;
  padding-bottom: 15px;
`;

const PickerWrapper = styled.View`
  margin-top: 10px;
  margin-bottom: 5px;
  justify-content: center;
  align-items: center;
  width: 90%;
  background-color: ${({theme}) => theme.appColors.backgroundColorLighter};
  border-radius: 10px;
`;

const StyledPicker = styled(Picker)`
  height: 45px;
  color: ${({theme}) => theme.appColors.textColorLightGray};
  font-size: 30px;
  width: 100%;
`;
export default withTheme(CreateWodTimesForm);
