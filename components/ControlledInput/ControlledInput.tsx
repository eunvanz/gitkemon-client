import { useController, UseControllerProps } from "react-hook-form";

export interface ControlledInputProps<TInputProps, TFormValues>
  extends UseControllerProps<TFormValues> {
  inputProps?: Omit<
    TInputProps,
    "name" | "defaultValue" | "hasError" | "errorMessage" | "onChange"
  > & { onChange?: (value: any) => void };
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

  const { onChange: fieldOnChange, ...restField } = field;

  return (
    <div className={className}>
      {/* @ts-ignore */}
      <Input
        {...restField}
        {...inputProps}
        onChange={(value: any) => {
          fieldOnChange(value);
          inputProps?.onChange?.(value);
        }}
        hasError={fieldState.invalid}
        // @ts-ignore (to avoid fail in vercel)
        errorMessage={fieldState.error?.message}
      />
    </div>
  );
}

export default ControlledInput;
