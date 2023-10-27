import { Grid, TextField } from '@mui/material';

export default function GridTextField({
  required,
  sm,
  xs,
  md,
  labelParagraph,
  field,
  formik,
  ...props
}) {
  const { errors, touched, values, getFieldProps, setFieldValue } = formik;
  return (
    <Grid item sm={sm} xs={xs} md={md}>
      <TextField
        label={labelParagraph}
        required={required}
        size="medium"
        fullWidth
        onChange={(event) => setFieldValue(field, event.target.value)}
        error={Boolean(touched[field] && errors[field])}
        value={values[field] || ''}
        inputProps={{ style: { textAlign: 'center' } }}
        helperText={touched[field] && errors[field]}
        {...getFieldProps(field)}
        {...props}
      />
    </Grid>
  );
}
