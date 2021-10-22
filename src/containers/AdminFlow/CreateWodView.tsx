import React, {useState, useEffect} from 'react';
import {TouchableOpacity, ScrollView} from 'react-native';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

//LIBRARIES
import DateTimePicker from 'react-native-modal-datetime-picker';
import {Formik} from 'formik';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//ROUTES
import ROUTES from '../../routes/Routes';
import {actions} from '../../state/actions';
import {RootState} from '../../state/reducers';
import {RootStackParamList} from 'src/routes/Interface';
//UTILS
import {createWodSchema} from '../../utils/formsValidations';
import {formatDateToDate} from '../../utils/dateFormating';
//UTILS-DATABASE
import {createWod} from '../../utils/firebase/firebaseDatabaseAPI';
//INTERFACES
import {InewWod} from 'src/state/wods/wodsInterface';
//COMPONENTS
import Button from '../../components/Buttons/Button';
import FormInput from '../../components/Inputs/FormInput';
import CreateWodTimesForm from '../../components/Formik/CreateWodTimesForm';

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
  const dispatch = useDispatch();

  //STATES
  const newWod: InewWod = useSelector((state: RootState) => state.wods.newWod);
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);

  //EFFECTS
  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      dispatch(actions.messages.clearMessages());
      dispatch(actions.wods.clearNewWod());
    });
    return unsubscribe;
  }, [navigation]);

  //FUNCTIONS:
  //DATE TIME PICKER
  const showDateTimePicker = () => {
    setIsDatePickerVisible(true);
  };

  const hideDateTimePicker = () => {
    setIsDatePickerVisible(false);
  };

  const handleDatePicked = (date: Date) => {
    hideDateTimePicker();
  };

  //FORM SUBMIT
  const handleCreateFormSubmit = () => {
    createWod(newWod.wodDate, newWod.wodTimes, {id: newWod.workoutId});
    dispatch(actions.messages.setSuccessMessage('successCreate'));
  };

  return (
    <Container>
      <ScrollView>
        <Heading>{t('admin:createWod')}</Heading>
        <Formik
          enableReinitialize={true}
          initialValues={{
            wodDate: newWod.wodDate,
            wodName: newWod.wod,
          }}
          validationSchema={createWodSchema}
          onSubmit={(values, {resetForm, setFieldValue}) => {
            try {
              if (newWod.wodTimes.length !== 0) {
                if (
                  newWod.attendeesNumber !== '' ||
                  newWod.coachName !== '' ||
                  newWod.wodRoom !== '' ||
                  newWod.wodTime !== ''
                ) {
                  dispatch(
                    actions.messages.setErrorMessage('leftWodTimeNotAdded'),
                  );
                } else {
                  handleCreateFormSubmit();
                  resetForm();
                  dispatch(actions.wods.clearNewWod());
                  setFieldValue('wodDate', '');
                  setFieldValue('wodName', '');
                }
              } else {
                dispatch(actions.messages.setErrorMessage('forgotWodTimes'));
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

                {newWod.wodTimes.map((item, index) => (
                  <WodTimeItem key={index}>
                    <WodTimeItemContent>
                      <WodTime>{item.wodTime}</WodTime>
                      <WodCoach>
                        {t('wod:coach')} {item.coachName},{' '}
                      </WodCoach>
                      <WodRoom>
                        {item.wodRoom} {t('wod:room')}
                      </WodRoom>
                    </WodTimeItemContent>
                    <DeleteTime
                      onPress={() => {
                        const newWodsTimes = [...newWod.wodTimes];

                        newWodsTimes.splice(index, 1);
                        dispatch(
                          actions.wods.setNewWod({
                            ...newWod,
                            wodTimes: [...newWodsTimes],
                          }),
                        );
                      }}>
                      <MaterialIcons
                        name={'close'}
                        size={30}
                        color={theme.appColors.backgroundColorLighter}
                      />
                    </DeleteTime>
                  </WodTimeItem>
                ))}

                <CreateWodTimesForm />

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
                    dispatch(
                      actions.wods.setNewWod({
                        ...newWod,
                        wodDate: formatDateToDate(date),
                      }),
                    );
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
  padding-top: 40px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
`;

const Heading = styled.Text`
  margin: 15px 0px 5px 0px;
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

const WodTimeItem = styled.View`
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  margin: 5px 0px;
  padding: 10px;
  border-radius: 10px;
  width: 90%;
  background-color: ${({theme}) => theme.appColors.whiteColor};
`;

const WodTimeItemContent = styled.View`
  width: 80%;
  flex-direction: row;
  align-items: center;
`;

const WodTime = styled.Text`
  padding-right: 10px;
  font-size: 20px;
  font-weight: bold;
`;

const WodCoach = styled.Text`
  font-size: 17px;
`;

const WodRoom = styled.Text`
  font-size: 17px;
`;

const DeleteTime = styled.TouchableOpacity`
  align-items: flex-end;
  width: 20%;
`;

export default withTheme(CreateWodView);
