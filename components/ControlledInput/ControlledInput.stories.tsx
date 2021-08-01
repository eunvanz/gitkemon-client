import type { ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";
import Input from "../Input";
import Select from "../Select";
import ControlledInput from "./ControlledInput";

export default {
  title: "components/ControlledInput",
  component: ControlledInput,
  args: {},
} as ComponentMeta<typeof ControlledInput>;

export const 컨테이너 = () => {
  const { control, reset } = useForm({
    defaultValues: {
      name: "",
      mon: undefined,
    },
    mode: "onChange",
  });

  return (
    <>
      <ControlledInput
        control={control}
        name="name"
        inputProps={{
          label: "Name",
          onClear: () => reset({ name: "" }),
        }}
        rules={{ required: "Name is required" }}
        input={Input}
        className="w-40"
      />
      <ControlledInput
        control={control}
        name="mon"
        inputProps={{
          label: "Mon",
          items: [
            { value: 1, displayValue: "이상해씨" },
            { value: 2, displayValue: "이상해풀" },
            { value: 3, displayValue: "이상해꽃" },
          ],
          className: "w-40",
        }}
        rules={{ required: "Mon is required" }}
        input={Select}
        className="mt-4"
      />
    </>
  );
};
