import { FormControl, FormHelperText, InputLabel, MenuItem, Select } from '@mui/material';
import type { SelectInputProps } from '@mui/material/Select/SelectInput';
import { useController, type FieldValues, type UseControllerProps } from 'react-hook-form';

type Props<T extends FieldValues> = {
    items: { text: string; value: string }[];
} & UseControllerProps<T> & Partial<SelectInputProps>;


export default function SelectInput<T extends FieldValues>(props: Props<T>) {
const {field, fieldState} = useController({...props});
const label = props.name.charAt(0).toUpperCase() + props.name.slice(1);
  return (
    <FormControl 
    fullWidth 
    error={!!fieldState.error}
    >
        <InputLabel>{label}</InputLabel>
        <Select value={field.value || ''}
        label={label}
        onChange={field.onChange}>
            {props.items.map(item => (
               <MenuItem key={item.value} value={item.value}>{item.text}</MenuItem>
            ))}
        </Select>
        <FormHelperText>{fieldState.error?.message}</FormHelperText>
    </FormControl>
  )}