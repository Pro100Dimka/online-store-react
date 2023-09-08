import { Grid, Select, InputLabel, FormControl, OutlinedInput } from '@mui/material';

export default function GridSelect({
  sm,
  xs,
  md,
  labelParagraph,
  field,
  formik,
  option,
  multiple
}) {
  const { setFieldValue, touched, errors, values } = formik;
  return (
    <Grid item sm={sm} xs={xs} md={md}>
      <FormControl fullWidth>
        <InputLabel shrink id="labelParagraph">
          {labelParagraph}
        </InputLabel>
        <Select
          multiple={multiple}
          label={labelParagraph}
          input={<OutlinedInput notched label={labelParagraph} />}
          labelId="labelParagraph"
          size="medium"
          fullWidth
          value={values[field]}
          onChange={(event) => {
            setFieldValue(field, event.target.value);
          }}
        >
          {option}
        </Select>
        {touched[field] && errors[field] && <div className="output-error">{errors[field]}</div>}
      </FormControl>
    </Grid>
  );
}
