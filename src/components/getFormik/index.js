import { useFormik } from 'formik';

function NewFormikObject(InitialValues, schema, Submit) {
  const formik = useFormik({
    initialValues: InitialValues,
    enableReinitialize: true,
    validationSchema: schema,
    onSubmit: Submit
  });
  return formik;
}
export default NewFormikObject;
