import cx from "classnames";
import { colors } from "~/constants/styles";
import { SelectProps } from "../Select";

export interface SelectButtonProps<T>
  extends Pick<SelectProps<T>, "value" | "onChange" | "items"> {}

const SelectButton: React.FC<SelectButtonProps<any>> = ({ value, onChange, items }) => {
  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      {items.map((item, index) => (
        <button
          key={item.value}
          type="button"
          className={cx(
            index === 0 ? "rounded-l-md" : "-ml-px",
            index === items.length - 1 ? "rounded-r-md" : undefined,
            index > 0 && value === items[index - 1].value ? "border-l-0" : undefined,
            value === item.value
              ? `bg-${colors.PRIMARY_COLOR} text-white border-${colors.PRIMARY_COLOR}`
              : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50",
            "relative inline-flex items-center px-4 py-2 border text-sm font-medium",
          )}
          onClick={() => onChange(item.value)}
        >
          {item.displayValue}
        </button>
      ))}
    </span>
  );
};

export default SelectButton;
