import { TextField } from '@mui/material';
import { useField, FieldConfig } from 'formik';

/* https://formik.org/docs/api/useField */

interface Props extends FieldConfig {
  label: String;
}

const InputField = ({ label, ...props }: Props) => {
  const [field, meta] = useField(props);
  return (
    <>
      <TextField
        fullWidth
        sx={{ mt: 2 }}
        {...field}
        {...props}
        label={label}
        error={meta.touched && Boolean(meta.error)}
        helperText={meta.touched && meta.error}
      />
    </>
  );
};

export default InputField;
