import { useCallback, useState } from "react";
import type { ComponentMeta } from "@storybook/react";
import PokeBallImage from "../PokeBallImage";
import Shakeable from "./Shakeable";

export default {
  title: "components/Shakeable",
  component: Shakeable,
  args: {},
} as ComponentMeta<typeof Shakeable>;

export const Test = () => {
  const [isActive, setIsActive] = useState(true);

  const handleOnChangeDirection = useCallback((count: number) => {
    if (count === 10) {
      setIsActive(false);
    }
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Shakeable onChangeDirection={handleOnChangeDirection} isActive={isActive}>
        <PokeBallImage type="basic" />
      </Shakeable>
    </div>
  );
};
