import React, { ReactElement } from "react";
import { Field } from "react-final-form";
import { BaseTextFieldProps, TextField } from "@material-ui/core";

interface iProps extends BaseTextFieldProps {
  name: string;
  label: string;
  type?: string;
  fullWidth?: boolean;
  initialValue?: string;
  disabled?: boolean;
  required?: boolean;
}
const Index = (props: iProps): ReactElement => {
  return (
    <Field name={props.name}>
      {(fieldProps) => (
        <div>
          <TextField
            {...props}
            className={props.className}
            label={props.label}
            name={fieldProps.input.name}
            value={fieldProps.input.value}
            onChange={fieldProps.input.onChange}
            variant="outlined"
            color="secondary"
            fullWidth
            required={props.required}
          />
        </div>
      )}
    </Field>
  );
};

export default Index;
