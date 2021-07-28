import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useTranslation} from 'react-i18next';
import {Formik, FieldArray} from 'formik';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import {database} from '../../utils/database';
import {createWorkoutSchema} from '../../utils/formsValidations';

import Button from '../../components/Button';
import FormInput from '../../components/FormInput';

interface ICreateWorkoutViewProps {
  theme: DefaultTheme;
}

const CreateWorkoutView: React.FC<ICreateWorkoutViewProps> = ({theme}) => {
  const {t, i18n} = useTranslation();

  return (
    <Container>
      <ScrollView>
        <Heading>{t('admin:createNewWorkout')}</Heading>
        <Formik
          initialValues={{
            workoutName: '',
            workoutWeights: '',
            countResultOf: '',
            workoutType: '',
            exercises: [''],
          }}
          validationSchema={createWorkoutSchema}
          onSubmit={(values, {resetForm}) => {
            const {
              workoutName,
              workoutWeights,
              workoutType,
              countResultOf,
              exercises,
            } = values;
            try {
              const newReference = database.ref('/workouts').push();
              newReference
                .set({
                  name: workoutName,
                  workoutType: workoutType,
                  countResultOf: countResultOf,
                  workoutWeights: workoutWeights,
                  exercises: exercises,
                })
                .then(() => console.log('Data updated.'));
              resetForm();
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
                    onChangeText={formikProps.handleChange('workoutName')}
                    placeholderText={t('admin:workoutName')}
                    placeholderColor={theme.appColors.backgroundColorDarken}
                    isListInput={false}
                    bgColor={theme.appColors.accentColor}
                  />

                  {formikProps.touched.workoutName &&
                    formikProps.errors.workoutName && (
                      <ErrorText>{formikProps.errors.workoutName}</ErrorText>
                    )}
                  <FormInput
                    value={formikProps.values.workoutWeights}
                    onChangeText={formikProps.handleChange('workoutWeights')}
                    placeholderText={t('admin:workoutWeights')}
                    placeholderColor={theme.appColors.textColorLightGray}
                    isListInput={false}
                    bgColor={theme.appColors.backgroundColorLighter}
                  />
                  {formikProps.touched.workoutWeights &&
                    formikProps.errors.workoutWeights && (
                      <ErrorText>{formikProps.errors.workoutWeights}</ErrorText>
                    )}
                  <FormInput
                    value={formikProps.values.workoutType}
                    onChangeText={formikProps.handleChange('workoutType')}
                    placeholderText={t('admin:workoutType')}
                    placeholderColor={theme.appColors.textColorLightGray}
                    isListInput={false}
                    bgColor={theme.appColors.backgroundColorLighter}
                  />
                  {formikProps.touched.workoutType &&
                    formikProps.errors.workoutType && (
                      <ErrorText>{formikProps.errors.workoutType}</ErrorText>
                    )}

                  <FormInput
                    value={formikProps.values.countResultOf}
                    onChangeText={formikProps.handleChange('countResultOf')}
                    placeholderText={t('admin:countResult')}
                    placeholderColor={theme.appColors.textColorLightGray}
                    isListInput={false}
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
                                onChangeText={formikProps.handleChange(
                                  `exercises[${index}]`,
                                )}
                                placeholderText={t('admin:exerciseDefinition')}
                                placeholderColor={
                                  theme.appColors.textColorLightGray
                                }
                                isListInput={true}
                                bgColor={theme.appColors.backgroundColorLighter}
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
                    text={'Create'}
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
  padding-top: 70px;
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
