import * as yup from 'yup';
import i18n from 'i18next';

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
  workout: yup
    .string()
    .required(() => i18n.t('admin:formsErrors:workoutDefinitionRequired')),
});
