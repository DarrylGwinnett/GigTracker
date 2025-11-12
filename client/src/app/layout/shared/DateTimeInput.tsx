import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from "react-hook-form";
import {
  DateTimePicker,
  type DateTimePickerProps,
} from "@mui/x-date-pickers/DateTimePicker";

type Props<T extends FieldValues> = {} & UseControllerProps<T> &
  DateTimePickerProps;

export default function DateTimeInput<T extends FieldValues>(props: Props<T>) {
  const { field, fieldState } = useController({ ...props });
  return (
    <DateTimePicker
      {...props}
      value={field.value ? new Date(field.value) : null}
      onChange={(date) => field.onChange(new Date(date!))}
      sx={{ width: "100%" }}
      
      slotProps={{
        textField: {
          onBlur: field.onBlur,
          error: !!fieldState.error && (fieldState.isTouched || fieldState.isDirty),
          helperText:
            (fieldState.isTouched || fieldState.isDirty) && fieldState.error
              ? fieldState.error.message
              : "",
        },
      }}
    />
  );
}
