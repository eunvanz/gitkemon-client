export interface CheckboxProps {
  label: string;
  name: string;
  defaultChecked?: boolean;
  onChange: (checked: boolean) => void;
  id: string;
}

const Checkbox: React.FC<CheckboxProps> = ({
  label,
  name,
  defaultChecked,
  onChange,
  id,
}) => {
  return (
    <div className="flex items-center">
      <input
        id={id}
        name={name}
        onChange={(e) => onChange(e.target.checked)}
        type="checkbox"
        defaultChecked={defaultChecked}
        className="h-4 w-4 border-gray-300 rounded text-blue-500"
      />
      <label htmlFor={id} className="ml-3 text-sm text-gray-600">
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
