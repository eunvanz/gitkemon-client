import { useController, UseControllerProps } from "react-hook-form";
import Input, { InputProps } from "../Input";

export interface ControlledInputProps<TFormValues>
  extends UseControllerProps<TFormValues> {
  inputProps?: Omit<InputProps, "name" | "defaultValue" | "hasError" | "errorMessage">;
}

function ControlledInput<TFormValues>({
  inputProps,
  ...restProps
}: ControlledInputProps<TFormValues>) {
  const { field, fieldState } = useController(restProps);

  return (
    <Input
      {...field}
      {...inputProps}
      hasError={fieldState.invalid}
      errorMessage={fieldState.error?.message}
    />
  );
}

export default ControlledInput;
