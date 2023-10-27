import * as Yup from 'yup';
import { emailRegExp } from '../../../../utils/emailRegExp';

const Schema = (isLogin) => {
  const schema = Yup.object()
    .shape({
      email: Yup.string()
        .matches(emailRegExp, 'Введіть коректну електронну пошту')
        .nullable()
        .required("Це поле обов'язкове"),
      password: Yup.string().required("Це поле обов'язкове")
    })
    .when((_values, schema) => {
      if (!isLogin) {
        return schema.shape({
          name: Yup.string()
            .min(2, `Мінімальна довжина ${2} символи`)
            .max(20, `Максимальна довжина ${20} символів`)
            .required("Це поле обов'язкове")
            .nullable(),
          surname: Yup.string()
            .min(2, `Мінімальна довжина ${2} символи`)
            .max(20, `Максимальна довжина ${20} символів`)
            .required("Це поле обов'язкове")
            .nullable(),
          phone: Yup.string()
            .matches(/^[0-9]*$/, 'Тільки цифри')
            .min(3, `Мінімальна довжина ${3} символи`)
            .max(12, `Максимальна довжина ${12} символів`)
            .required("Це поле обов'язкове")
            .nullable()
        });
      }
      return schema.shape({});
    });
  return schema;
};

export default Schema;
