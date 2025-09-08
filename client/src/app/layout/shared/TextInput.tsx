import { TextField, type TextFieldProps } from '@mui/material';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

type Props<T extends FieldValues> = {
} & UseControllerProps<T> & TextFieldProps;


export default function TextInput<T extends FieldValues>(props: Props<T>) {
const {field, fieldState} = useController({...props});

  return (
    <TextField  
    label={props.name.charAt(0).toUpperCase() + props.name.slice(1)}        
    {...props}
    {...field}
    fullWidth
    value={field.value || ''}
    variant='outlined'
    error={!!fieldState.error}
    helperText={fieldState.error?.message}
    />
  )}