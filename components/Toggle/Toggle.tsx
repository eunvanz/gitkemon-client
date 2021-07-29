import { Switch } from "@headlessui/react";
import cx from "classnames";

export interface ToggleProps {
  isEnabled: boolean;
  onChange: (isEnabled: boolean) => void;
  label?: string | React.ReactNode;
  hiddenLabel?: string;
}

const Toggle: React.FC<ToggleProps> = ({ isEnabled, onChange, label, hiddenLabel }) => {
  return (
    <Switch.Group as="div" className="flex items-center">
      <Switch
        checked={isEnabled}
        onChange={onChange}
        className={cx(
          isEnabled ? "bg-blue-500" : "bg-gray-200",
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200",
        )}
      >
        {hiddenLabel ||
          (label && <span className="sr-only">{hiddenLabel || label}</span>)}
        <span
          aria-hidden="true"
          className={cx(
            isEnabled ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200",
          )}
        />
      </Switch>
      {label && (
        <Switch.Label as="span" className="ml-3">
          {typeof label === "string" ? (
            <span className="text-sm font-medium text-gray-900">{label}</span>
          ) : (
            label
          )}
        </Switch.Label>
      )}
    </Switch.Group>
  );
};

export default Toggle;
