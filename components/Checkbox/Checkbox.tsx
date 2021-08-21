import cx from "classnames";

export interface CheckboxProps {
  label: string;
  name: string;
  checked?: boolean;
  onChange: (checked: boolean) => void;
  id?: string;
  className?: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  checked,
  onChange,
  id,
  className,
}) => {
  return (
    <div className={cx("items-center", className)}>
      <input
        id={id || name}
        name={name}
        onChange={(e) => onChange(e.target.checked)}
        type="checkbox"
        checked={checked}
        className="h-4 w-4 border-gray-300 rounded text-blue-500"
      />
      <label htmlFor={id || name} className="ml-1 text-sm text-gray-600">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
