import { useMemo } from "react";
import {
  CheckCircleIcon,
  ExclamationIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/solid";

export interface AlertProps {
  type: "success" | "info" | "warning" | "error";
  title?: string;
  hasIcon?: boolean;
}

const Alert: React.FC<AlertProps> = ({ type, title, hasIcon, children }) => {
  const Icon = useMemo(() => {
    switch (type) {
      case "success":
        return CheckCircleIcon;
      case "info":
        return InformationCircleIcon;
      case "warning":
        return ExclamationIcon;
      case "error":
        return XCircleIcon;
    }
  }, [type]);

  const color = useMemo(() => {
    switch (type) {
      case "success":
        return "green";
      case "info":
        return "blue";
      case "warning":
        return "yellow";
      case "error":
        return "red";
    }
  }, [type]);

  return (
    <div className={`rounded-md bg-${color}-50 p-4`}>
      <div className="flex">
        <div className="flex-shrink-0">
          {hasIcon && <Icon className={`h-5 w-5 text-${color}-400`} aria-hidden="true" />}
        </div>
        <div className="ml-3">
          {title && <h3 className={`text-sm font-medium text-${color}-800`}>{title}</h3>}
          <div className={`text-${color}-700`}>{children}</div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
