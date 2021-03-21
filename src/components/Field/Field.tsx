import React, { ReactElement } from 'react';

// COMPONENTS
import { Field as FinalField } from 'react-final-form';
import { BaseTextFieldProps, TextField } from '@material-ui/core';

interface iProps extends BaseTextFieldProps {
  name: string;
  label: string;
  type?: string;
  validate?: (value: any) => undefined | string;
  fullWidth?: boolean;
  initialValue?: string;
  disabled?: boolean;
  required?: boolean;
}
const Field = (props: iProps): ReactElement => {
  return (
    <FinalField name={props.name} label={props.label} validate={props.validate}>
      {(fieldProps) => {
        const p = { ...props };
        delete p.validate;
        return (
          <TextField
            {...p}
            className={props.className}
            label={props.label}
            name={fieldProps.input.name}
            value={fieldProps.input.value}
            onChange={fieldProps.input.onChange}
            variant="outlined"
            color="secondary"
            fullWidth
            required={props.required}
            error={!fieldProps.meta.pristine && fieldProps.meta.error}
            helperText={!fieldProps.meta.pristine && fieldProps.meta.error}
          />
        );
      }}
    </FinalField>
  );
};

export default Field;
