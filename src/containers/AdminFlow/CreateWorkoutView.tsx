import React, {useEffect} from 'react';
import {ScrollView} from 'react-native';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import {useDispatch, useSelector} from 'react-redux';
import {StackNavigationProp} from '@react-navigation/stack';

//LIBRARIES
import {Formik, FieldArray} from 'formik';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
//ROUTES
import ROUTES from '../../routes/Routes';
import {actions} from '../../state/actions';
import {RootState} from '../../state/reducers';
import {RootStackParamList} from 'src/routes/Interface';
//UTILS
import {createWorkoutSchema} from '../../utils/formsValidations';
//UTILS-DATABASE
import {createWorkout} from '../../utils/firebase/firebaseDatabaseAPI';
//COMPONENTS
import Button from '../../components/Buttons/Button';
import FormInput from '../../components/Inputs/FormInput';
import {InewWorkout} from 'src/state/workouts/workoutsInterface';

type CreateWorkoutViewNavigationProp = StackNavigationProp<
  RootStackParamList,
  ROUTES.CreateWorkout
>;
interface ICreateWorkoutViewProps {
  theme: DefaultTheme;
  navigation: CreateWorkoutViewNavigationProp;
}

const CreateWorkoutView: React.FC<ICreateWorkoutViewProps> = ({
  theme,
  navigation,
}) => {
  const {t, i18n} = useTranslation();
  const dispatch = useDispatch();

  //STATES
  const newWorkout: InewWorkout = useSelector(
    (state: RootState) => state.workouts.newWorkout,
  );

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', () => {
      dispatch(actions.messages.clearMessages());
      dispatch(actions.workouts.clearNewWorkout());
    });
    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <ScrollView>
        <Heading>{t('admin:createNewWorkout')}</Heading>
        <Formik
          initialValues={{
            workoutName: newWorkout.workoutName,
            workoutWeights: newWorkout.workoutWeights,
            countResultOf: newWorkout.countResultOf,
            workoutType: newWorkout.workoutType,
            exercises: newWorkout.exercises,
          }}
          validationSchema={createWorkoutSchema}
          onSubmit={(values, {resetForm, setFieldValue}) => {
            const {
              workoutName,
              workoutWeights,
              workoutType,
              countResultOf,
              exercises,
            } = values;
            try {
              createWorkout(
                workoutName,
                workoutType,
                countResultOf,
                workoutWeights,
                exercises,
              );
              dispatch(actions.messages.setSuccessMessage('successCreate'));
              resetForm();
              dispatch(actions.workouts.clearNewWorkout());

              setFieldValue('workoutName', '');
              setFieldValue('workoutType', '');
              setFieldValue('countResultOf', '');
              setFieldValue('workoutWeights', '');
              setFieldValue('exercises', ['']);
            } catch (e) {
              console.log(e);
            }
          }}>
          {formikProps => {
            return (
              <>
                <Form>
                  <FormInput
                    value={formikProps.values.workoutName}
                    onChangeText={(text: string) => {
                      dispatch(
                        actions.workouts.setNewWorkout({
                          ...newWorkout,
                          workoutName: text,
                        }),
                      );

                      return formikProps.setFieldValue('workoutName', text);
                    }}
                    placeholderText={t('admin:workoutName')}
                    placeholderColor={theme.appColors.backgroundColorDarken}
                    isInputWithAction={false}
                    bgColor={theme.appColors.accentColor}
                  />

                  {formikProps.touched.workoutName &&
                    formikProps.errors.workoutName && (
                      <ErrorText>{formikProps.errors.workoutName}</ErrorText>
                    )}
                  <FormInput
                    value={formikProps.values.workoutWeights}
                    onChangeText={(text: string) => {
                      dispatch(
                        actions.workouts.setNewWorkout({
                          ...newWorkout,
                          workoutWeights: text,
                        }),
                      );
                      return formikProps.setFieldValue('workoutWeights', text);
                    }}
                    placeholderText={t('admin:workoutWeights')}
                    placeholderColor={theme.appColors.textColorLightGray}
                    isInputWithAction={false}
                    bgColor={theme.appColors.backgroundColorLighter}
                  />
                  {formikProps.touched.workoutWeights &&
                    formikProps.errors.workoutWeights && (
                      <ErrorText>{formikProps.errors.workoutWeights}</ErrorText>
                    )}
                  <FormInput
                    value={formikProps.values.workoutType}
                    onChangeText={(text: string) => {
                      dispatch(
                        actions.workouts.setNewWorkout({
                          ...newWorkout,
                          workoutType: text,
                        }),
                      );
                      return formikProps.setFieldValue('workoutType', text);
                    }}
                    placeholderText={t('admin:workoutType')}
                    placeholderColor={theme.appColors.textColorLightGray}
                    isInputWithAction={false}
                    bgColor={theme.appColors.backgroundColorLighter}
                  />
                  {formikProps.touched.workoutType &&
                    formikProps.errors.workoutType && (
                      <ErrorText>{formikProps.errors.workoutType}</ErrorText>
                    )}

                  <FormInput
                    value={formikProps.values.countResultOf}
                    onChangeText={(text: string) => {
                      dispatch(
                        actions.workouts.setNewWorkout({
                          ...newWorkout,
                          countResultOf: text,
                        }),
                      );
                      return formikProps.setFieldValue('countResultOf', text);
                    }}
                    placeholderText={t('admin:countResult')}
                    placeholderColor={theme.appColors.textColorLightGray}
                    isInputWithAction={false}
                    bgColor={theme.appColors.backgroundColorLighter}
                  />
                  {formikProps.touched.countResultOf &&
                    formikProps.errors.countResultOf && (
                      <ErrorText>{formikProps.errors.countResultOf}</ErrorText>
                    )}

                  <FieldArray name="exercises">
                    {fieldArrayProps => {
                      const {push, remove, form} = fieldArrayProps;
                      const {values} = form;
                      const {exercises} = values;
                      return (
                        <ExercisesInputs>
                          {exercises.map((exercise: string, index: number) => (
                            <ExerciseInput key={index}>
                              <FormInput
                                value={formikProps.values.exercises[index]}
                                onChangeText={(text: string) => {
                                  let newExercises = [...exercises];
                                  newExercises[index] = text;

                                  dispatch(
                                    actions.workouts.setNewWorkout({
                                      ...newWorkout,
                                      exercises: [...newExercises],
                                    }),
                                  );
                                  return formikProps.setFieldValue(
                                    `exercises[${index}]`,
                                    text,
                                  );
                                }}
                                placeholderText={t('admin:exerciseDefinition')}
                                placeholderColor={
                                  theme.appColors.textColorLightGray
                                }
                                isInputWithAction={true}
                                bgColor={theme.appColors.backgroundColorLighter}
                                iconName={'close'}
                                onPress={() => {
                                  if (exercises.length > 1) remove(index);
                                }}
                              />
                              {formikProps.touched.exercises &&
                                formikProps.errors.exercises && (
                                  <ErrorText>
                                    {formikProps.errors.exercises[index]}
                                  </ErrorText>
                                )}
                            </ExerciseInput>
                          ))}
                          <AddExerciseBtnContainer>
                            <AddExerciseBtn onPress={() => push('')}>
                              <MaterialIcons
                                name={'add'}
                                size={35}
                                color={theme.appColors.whiteColor}
                              />
                            </AddExerciseBtn>
                          </AddExerciseBtnContainer>
                        </ExercisesInputs>
                      );
                    }}
                  </FieldArray>
                </Form>
                <CreateButtonContainer>
                  <Button
                    text={t('admin:createBtn')}
                    bgColor={`${theme.appColors.primaryColorLighter}`}
                    onPress={formikProps.handleSubmit}
                  />
                </CreateButtonContainer>
              </>
            );
          }}
        </Formik>
      </ScrollView>
    </Container>
  );
};

const Container = styled.View`
  flex: 1;
  padding-top: 60px;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.appColors.backgroundColor};
`;

const Heading = styled.Text`
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

const ExercisesInputs = styled.View`
  align-items: center;
  width: 100%;
`;

const ExerciseInput = styled.View`
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const ErrorText = styled.Text`
  color: ${({theme}) => theme.appColors.accentColor};
  font-size: 17px;
  padding-bottom: 15px;
`;

const CreateButtonContainer = styled.View`
  margin-bottom: 60px;
  align-items: center;
  width: 100%;
`;
const AddExerciseBtnContainer = styled.TouchableOpacity`
  width: 90%;
  align-items: center;
`;
const AddExerciseBtn = styled.TouchableOpacity`
  margin: 20px 0px 10px 0px;
  height: 40px;
  width: 60px;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  background-color: ${({theme}) => theme.appColors.backgroundColorVeryLight};
`;

export default withTheme(CreateWorkoutView);
