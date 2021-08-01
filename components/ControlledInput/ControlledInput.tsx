import { useController, UseControllerProps } from "react-hook-form";

export interface ControlledInputProps<TInputProps, TFormValues>
  extends UseControllerProps<TFormValues> {
  inputProps?: Omit<
    TInputProps,
    "name" | "defaultValue" | "hasError" | "errorMessage" | "onChange"
  >;
  input: React.FC<TInputProps>;
  className?: string;
}

function ControlledInput<TInputProps, TFormValues>({
  inputProps,
  input: Input,
  className,
  ...restProps
}: ControlledInputProps<TInputProps, TFormValues>) {
  const { field, fieldState } = useController(restProps);

  return (
    <div className={className}>
      {/* @ts-ignore */}
      <Input
        {...field}
        {...inputProps}
        hasError={fieldState.invalid}
        errorMessage={fieldState.error?.message}
      />
    </div>
  );
}

export default ControlledInput;
