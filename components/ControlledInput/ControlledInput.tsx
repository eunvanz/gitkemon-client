import { Children, cloneElement } from "react";
import { useMemo } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { InputProps } from "../Input";

export interface ControlledInputProps<TFormValues>
  extends UseControllerProps<TFormValues> {
  inputProps: Omit<InputProps, "name" | "defaultValue" | "hasError" | "errorMessage">;
  children: React.ReactElement;
}

function ControlledInput<TFormValues>({
  inputProps,
  children,
  ...restProps
}: ControlledInputProps<TFormValues>) {
  const { field, fieldState } = useController(restProps);

  const enhancedChildren = useMemo(() => {
    return Children.map(children, (child) => {
      return cloneElement(child, {
        ...inputProps,
        ...field,
        hasError: fieldState.invalid,
        errorMessage: fieldState.error?.message,
      });
    });
  }, [children, field, fieldState.error?.message, fieldState.invalid, inputProps]);

  return enhancedChildren;
}

export default ControlledInput;
