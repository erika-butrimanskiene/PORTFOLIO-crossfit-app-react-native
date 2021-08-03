import React, {useState, useEffect} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';

import {createWodSchema} from '../../utils/formsValidations';
import ROUTES from '../../routes/Routes';
import {RootStackParamList} from 'src/routes/Interface';
import {actions} from '../../state/actions';
import {RootState} from '../../state/reducers';
import {createWod} from '../../utils/firebaseDatabaseAPI';
import {
  formatDate,
  formatDateToDate,
  formatDateToTime,
} from '../../utils/dateFormating';
import {IWorkoutState} from '../../state/workouts/workoutsInterface';

import Button from '../../components/Button';
import FormInput from '../../components/FormInput';

type CreateWodScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.CreateWod
>;

interface ICreateWodViewProps {
  theme: DefaultTheme;
  navigation: CreateWodScreenNavigationProp;
}

const CreateWodView: React.FC<ICreateWodViewProps> = ({theme, navigation}) => {
  const {t} = useTranslation();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [wodDate, setWodDate] = useState(null);

  const wod: IWorkoutState = useSelector(
    (state: RootState) => state.workouts.selectedWorkout,
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      dispatch(actions.workouts.clearSelectedWorkout());
    });

    return unsubscribe;
  }, [navigation]);

  const showDateTimePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleDatePicked = (date: Date) => {
    console.log('A date has been picked: ', date);
    hideDateTimePicker();
  };

  return (
    <Container>
      <ScrollView>
        <Heading>{t('admin:createWod')}</Heading>
        <Formik
          enableReinitialize={true}
          initialValues={{
            wodDate: '',
            coachName: '',
            wodRoom: '',
            attendeesNumber: '',
            wodName: wod.data.name,
          }}
          validationSchema={createWodSchema}
          onSubmit={(values, {resetForm}) => {
            const {coachName, wodRoom, attendeesNumber} = values;
            try {
              createWod(
                formatDateToDate(wodDate),
                coachName,
                attendeesNumber,
                wodRoom,
                formatDateToTime(wodDate),
                wod,
              );
              dispatch(actions.messages.setSuccessMessage('successCreate'));
              setTimeout(() => {
                dispatch(actions.messages.clearMessages());
              }, 2000);
              dispatch(actions.workouts.clearSelectedWorkout());
              resetForm();
            } catch (e) {
              console.log(e);
            }
          }}>
          {formikProps => {
            return (
              <Form>
                <TouchableOpacity
                  onPress={() => {
                    dispatch(actions.workouts.initWorkoutSelection(true));
                    navigation.navigate(ROUTES.WorkoutsList);
                  }}>
                  <FormInput
                    editable={false}
                    value={formikProps.values.wodName}
                    placeholderText={t('admin:selectWod')}
                    placeholderColor={theme.appColors.textColorLightGray}
                    isInputWithAction={true}
                    bgColor={theme.appColors.backgroundColorLighter}
                    iconName={'add'}
                    onPress={() => {
                      dispatch(actions.workouts.initWorkoutSelection(true));
                      navigation.navigate(ROUTES.WorkoutsList);
                    }}
                  />
                </TouchableOpacity>

                {formikProps.touched.wodName && formikProps.errors.wodName && (
                  <ErrorText>{formikProps.errors.wodName}</ErrorText>
                )}

                <TouchableOpacity onPress={showDateTimePicker}>
                  <FormInput
                    editable={false}
                    value={formikProps.values.wodDate}
                    placeholderText={t('admin:selectWodDate')}
                    placeholderColor={theme.appColors.textColorLightGray}
                    isInputWithAction={true}
                    bgColor={theme.appColors.backgroundColorLighter}
                    iconName={'add'}
                    onPress={showDateTimePicker}
                  />
                </TouchableOpacity>

                {formikProps.touched.wodDate && formikProps.errors.wodDate && (
                  <ErrorText>{formikProps.errors.wodDate}</ErrorText>
                )}

                <PickerWrapper>
                  <StyledPicker
                    selectedValue={formikProps.values.wodRoom}
                    dropdownIconColor={'#ffffff'}
                    // changing value in formik
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

                {formikProps.touched.coachName &&
                  formikProps.errors.coachName && (
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

                <CreateButtonContainer>
                  <Button
                    text={t('admin:createBtn')}
                    bgColor={`${theme.appColors.primaryColorLighter}`}
                    onPress={formikProps.handleSubmit}
                  />
                </CreateButtonContainer>
                <DateTimePicker
                  mode={'datetime'}
                  isVisible={isDatePickerVisible}
                  onConfirm={date => {
                    handleDatePicked(date);
                    setWodDate(date);
                    formikProps.setFieldValue('wodDate', formatDate(date));
                  }}
                  onCancel={hideDateTimePicker}
                />
              </Form>
            );
          }}
        </Formik>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  background-color: ${({theme}) => theme.appColors.backgroundColor};
  flex: 1;
  padding-top: 100px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.Text`
  margin: 15px 0px;
  color: ${({theme}) => theme.appColors.whiteColor};
  font-size: 30px;
  text-align: center;
`;

const Form = styled.View`
  margin: 30px 0px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const CreateButtonContainer = styled.View`
  margin-top: 25px;
  align-items: center;
  width: 100%;
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
export default withTheme(CreateWodView);
