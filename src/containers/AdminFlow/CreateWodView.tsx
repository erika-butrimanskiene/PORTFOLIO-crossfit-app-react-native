import React, {useState, useEffect} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  GestureResponderEvent,
  View,
  Text,
} from 'react-native';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Formik} from 'formik';
import {Picker} from '@react-native-picker/picker';

import {createWodSchema, createTimeSchema} from '../../utils/formsValidations';
import ROUTES from '../../routes/Routes';
import {RootStackParamList} from 'src/routes/Interface';
import {actions} from '../../state/actions';
import {RootState} from '../../state/reducers';
import {createWod} from '../../utils/firebaseDatabaseAPI';
import {formatDateToDate} from '../../utils/dateFormating';
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
  const [wodsTimes, setWodsTimes] = useState([]);

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

  const handleDatesSet = (
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

  const handleCreateFormSubmit = () => {
    createWod(formatDateToDate(wodDate), wodsTimes, wod);
    dispatch(actions.messages.setSuccessMessage('successCreate'));
    setTimeout(() => {
      dispatch(actions.messages.clearMessages());
    }, 2000);
    dispatch(actions.workouts.clearSelectedWorkout());
  };

  return (
    <Container>
      <ScrollView>
        <Heading>{t('admin:createWod')}</Heading>
        <Formik
          enableReinitialize={true}
          initialValues={{
            wodDate: '',
            wodName: wod.data.name,
          }}
          validationSchema={createWodSchema}
          onSubmit={(values, {resetForm}) => {
            try {
              if (wodsTimes.length !== 0) {
                handleCreateFormSubmit();
                setWodsTimes([]);
                resetForm();
              } else {
                dispatch(actions.messages.setErrorMessage('You failed'));
              }
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
                    placeholderColor={theme.appColors.textColorDarkGray}
                    isInputWithAction={true}
                    bgColor={theme.appColors.accentColor}
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
                    placeholderColor={theme.appColors.textColorDarkGray}
                    isInputWithAction={true}
                    bgColor={theme.appColors.accentColor}
                    iconName={'add'}
                    onPress={showDateTimePicker}
                  />
                </TouchableOpacity>

                {formikProps.touched.wodDate && formikProps.errors.wodDate && (
                  <ErrorText>{formikProps.errors.wodDate}</ErrorText>
                )}

                {wodsTimes.map((item, index) => (
                  <View key={index}>
                    <Text>{item.wodTime}</Text>
                  </View>
                ))}

                <Formik
                  initialValues={{
                    wodTime: '',
                    coachName: '',
                    wodRoom: '',
                    attendeesNumber: '',
                  }}
                  validationSchema={createTimeSchema}
                  onSubmit={(values, {resetForm}) => {
                    handleDatesSet(
                      values.wodTime,
                      values.wodRoom,
                      values.coachName,
                      values.attendeesNumber,
                    );

                    formikProps.setFieldValue('wodTime', '');
                    formikProps.setFieldValue('wodRoom', '');
                    formikProps.setFieldValue('coachName', '');
                    formikProps.setFieldValue('attendeesNumber', '');

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
                          </StyledPicker>
                        </PickerWrapper>

                        {formikProps.touched.wodTime &&
                          formikProps.errors.wodTime && (
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

                        {formikProps.touched.wodRoom &&
                          formikProps.errors.wodRoom && (
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
                            <ErrorText>
                              {formikProps.errors.coachName}
                            </ErrorText>
                          )}

                        <FormInput
                          value={formikProps.values.attendeesNumber}
                          placeholderText={t('admin:typeAttendeesNumber')}
                          onChangeText={formikProps.handleChange(
                            'attendeesNumber',
                          )}
                          placeholderColor={theme.appColors.textColorLightGray}
                          isInputWithAction={false}
                          bgColor={theme.appColors.backgroundColorLighter}
                        />

                        {formikProps.touched.attendeesNumber &&
                          formikProps.errors.attendeesNumber && (
                            <ErrorText>
                              {formikProps.errors.attendeesNumber}
                            </ErrorText>
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

                <CreateButtonContainer>
                  <Button
                    text={t('admin:createBtn')}
                    bgColor={`${theme.appColors.primaryColorLighter}`}
                    onPress={formikProps.handleSubmit}
                  />
                </CreateButtonContainer>
                <DateTimePicker
                  mode={'date'}
                  isVisible={isDatePickerVisible}
                  onConfirm={date => {
                    handleDatePicked(date);
                    setWodDate(date);
                    formikProps.setFieldValue(
                      'wodDate',
                      formatDateToDate(date),
                    );
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
  padding-top: 50px;
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

const FlatListContainer = styled.View`
  width: 85%;
  margin-bottom: 180px;
`;
export default withTheme(CreateWodView);
