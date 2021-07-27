import React, {useState} from 'react';
import styled, {withTheme, DefaultTheme} from 'styled-components/native';
import {useSelector, useDispatch} from 'react-redux';
import {useTranslation} from 'react-i18next';
import {RootState} from 'src/state/reducers';
import {Formik, useFormik} from 'formik';
import {database} from '../../utils/database';

import {createWorkoutSchema} from '../../utils/formsValidations';
import {actions} from '../../state/actions';

import Button from '../../components/Button';

interface ICreateWorkoutViewProps {
  theme: DefaultTheme;
}

const CreateWorkoutView: React.FC<ICreateWorkoutViewProps> = ({theme}) => {
  const {t, i18n} = useTranslation();

  const [isNameInputActive, setIsNameInputActive] = useState<boolean>(false);
  const [isDefinitionInputActive, setIsDefinitionInputActive] =
    useState<boolean>(false);

  return (
    <Container>
      <Heading>{t('admin:createNewWorkout')}</Heading>
      <Formik
        initialValues={{workoutName: '', workout: ''}}
        validationSchema={createWorkoutSchema}
        onSubmit={(values, {resetForm}) => {
          const {workoutName, workout} = values;
          try {
            const newReference = database.ref('/workouts').push();
            newReference
              .set({
                name: workoutName,
                definition: workout,
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
                <Input
                  focus={isNameInputActive}
                  value={formikProps.values.workoutName}
                  onChangeText={formikProps.handleChange('workoutName')}
                  placeholder={t('admin:workoutName')}
                  placeholderTextColor={theme.appColors.textColorLightGray}
                  onFocus={() => setIsNameInputActive(true)}
                  onBlur={() => setIsNameInputActive(false)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                />

                {formikProps.touched.workoutName &&
                  formikProps.errors.workoutName && (
                    <ErrorText>
                      {formikProps.touched.workoutName &&
                        formikProps.errors.workoutName}
                    </ErrorText>
                  )}
                <TextArea
                  focus={isDefinitionInputActive}
                  multiline={true}
                  numberOfLines={8}
                  value={formikProps.values.workout}
                  onChangeText={formikProps.handleChange('workout')}
                  placeholder={t('admin:workoutDefinition')}
                  placeholderTextColor={theme.appColors.textColorLightGray}
                  onFocus={() => setIsDefinitionInputActive(true)}
                  onBlur={() => setIsDefinitionInputActive(false)}
                  autoCapitalize="none"
                  autoCorrect={false}
                  underlineColorAndroid="transparent"
                />

                {formikProps.touched.workout && formikProps.errors.workout && (
                  <ErrorText>
                    {formikProps.touched.workout && formikProps.errors.workout}
                  </ErrorText>
                )}
              </Form>

              <Button
                text={'Create'}
                bgColor={`${theme.appColors.primaryColorLighter}`}
                onPress={formikProps.handleSubmit}
              />
            </>
          );
        }}
      </Formik>
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
`;

const Form = styled.View`
  margin: 30px 0px;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Input = styled.TextInput<{focus: boolean}>`
  color: ${({theme}) => theme.appColors.whiteColor};
  background-color: ${({theme}) => theme.appColors.backgroundColorDarken};
  border-width: ${({focus}) => (focus ? '1px' : '0px')};
  border-color: ${({theme}) => theme.appColors.primaryColorLighter};
  text-decoration: none;
  margin-top: 10px;
  padding-left: 10px;
  width: 90%;
  font-size: 20px;
  border-radius: 10px;
`;

const TextArea = styled.TextInput<{focus: boolean}>`
  text-align-vertical: top;
  color: ${({theme}) => theme.appColors.whiteColor};
  background-color: ${({theme}) => theme.appColors.backgroundColorDarken};
  border-width: ${({focus}) => (focus ? '1px' : '0px')};
  border-color: ${({theme}) => theme.appColors.primaryColorLighter};
  margin-top: 10px;
  padding-left: 10px;
  width: 90%;
  font-size: 20px;
  border-radius: 10px;
`;

const ErrorText = styled.Text`
  color: ${({theme}) => theme.appColors.accentColor};
  font-size: 17px;
  padding-bottom: 15px;
`;

export default withTheme(CreateWorkoutView);
