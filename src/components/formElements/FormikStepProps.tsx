import { Field, Form, Formik, FormikConfig, FormikValues } from 'formik';

export default interface FormikStepProps
  extends Pick<FormikConfig<FormikValues>, 'children' | 'validationSchema'> {
  label: string;
}

