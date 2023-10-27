import React from 'react';
import GridTextField from '../../../components/fields/GridTextField';

const FieldsMapper = ({ fields, formik, condition }) =>
  fields.map((f, index) => {
    return (
      <>
        {f.showField && condition && (
          <GridTextField
            key={index}
            sm={12}
            xs={12}
            md={f.md || 12}
            labelParagraph={f.labelParagraph}
            field={f.field}
            formik={formik}
          />
        )}
        {!condition && (
          <GridTextField
            key={index}
            sm={12}
            xs={12}
            md={f.md || 12}
            labelParagraph={f.labelParagraph}
            field={f.field}
            formik={formik}
          />
        )}
      </>
    );
  });

export default FieldsMapper;
