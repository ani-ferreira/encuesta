import { TextField, MenuItem } from '@mui/material';
import { useField, FieldConfig } from 'formik';

interface Props extends FieldConfig {
  options: {
    value: string;
    label: string;
  }[];
  label: String;
}

const SelectField = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        fullWidth
        select
        sx={{ mt: 2 }}
        {...field}
        {...props}
        label={label}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
      >
        {props.options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
    </>
  );
};

export default SelectField;
