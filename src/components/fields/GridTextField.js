import { Grid, TextField } from '@mui/material';

export default function GridTextField({ required, sm, xs, md, labelParagraph, field, formik }) {
  const { errors, touched, values, getFieldProps, setFieldValue } = formik;
  return (
    <Grid item sm={sm} xs={xs} md={md} /* style={{ marginTop: '20px' }} */>
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
      />
    </Grid>
  );
}
