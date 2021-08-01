import type { ComponentStory, ComponentMeta } from "@storybook/react";
import { useForm } from "react-hook-form";
import ControlledInput from "./ControlledInput";

export default {
  title: "components/ControlledInput",
  component: ControlledInput,
  args: {},
} as ComponentMeta<typeof ControlledInput>;

const Template: ComponentStory<typeof ControlledInput> = (args) => (
  <ControlledInput {...args} />
);

export const 컨테이너 = () => {
  const { control } = useForm({
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  return (
    <ControlledInput
      control={control}
      name="name"
      inputProps={{
        label: "Name",
      }}
      rules={{ required: "Name is required" }}
    />
  );
};
