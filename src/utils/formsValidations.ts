import * as yup from 'yup';
import i18n from 'i18next';
import {string} from 'yup/lib/locale';

export const loginSchema = yup.object({
  email: yup
    .string()
    .required(() => i18n.t('authErrors:emailRequired'))
    .email(() => i18n.t('authErrors:emailValid')),
  password: yup.string().required(() => i18n.t('authErrors:passwordRequired')),
});

export const registerSchema = yup.object({
  userName: yup.string().required(() => i18n.t('authErrors:nameRequired')),
  userSurname: yup
    .string()
    .required(() => i18n.t('authErrors:surnameRequired')),
  email: yup
    .string()
    .required(() => i18n.t('authErrors:emailRequired'))
    .email(() => i18n.t('authErrors:emailValid')),
  password: yup
    .string()
    .required(() => i18n.t('authErrors:passwordRequired'))
    .min(6, () => i18n.t('authErrors:passwordValid')),
  passwordConfirm: yup
    .string()
    .required(() => i18n.t('authErrors:passwordRequired'))
    .oneOf([yup.ref('password')], i18n.t('authErrors:passwordsMustMatch')),
});

export const createWorkoutSchema = yup.object({
  workoutName: yup
    .string()
    .required(() => i18n.t('admin:formsErrors:workoutNameRequired')),
  workoutWeights: yup
    .string()
    .required(() => i18n.t('admin:formsErrors:workoutWeightsRequired')),
  workoutType: yup
    .string()
    .required(() => i18n.t('admin:formsErrors:workoutTypeRequired')),
  countResultOf: yup
    .string()
    .required(() => i18n.t('admin:formsErrors:countResultOfRequired')),
  exercises: yup
    .array()
    .of(
      yup
        .string()
        .required(() => i18n.t('admin:formsErrors:exerciseDefinitionRequired')),
    )
    .min(1, () => 'required min 1')
    .max(10, () => 'required max'),
});

export const createWodSchema = yup.object({
  wodDate: yup
    .string()
    .required(() => i18n.t('admin:formsErrors:wodDateRequired')),
  couchName: yup
    .string()
    .required(() => i18n.t('admin:formsErrors:couchNameRequired')),
  wodRoom: yup
    .string()
    .required(() => i18n.t('admin:formsErrors:wodRoomRequired')),
  attendeesNumber: yup
    .string()
    .required(() => i18n.t('admin:formsErrors:attendeesNumberRequired')),
  wodName: yup
    .string()
    .required(() => i18n.t('admin:formsErrors:wodNameRequired')),
});
