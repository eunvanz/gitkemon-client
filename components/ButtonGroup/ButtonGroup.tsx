import { Children, cloneElement, useMemo } from "react";
import cx from "classnames";

export interface ButtonGroupProps {
  children: React.ReactElement<HTMLButtonElement>[];
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ children }) => {
  const enhancedChildren = useMemo(() => {
    return Children.map(children, (child, index) => {
      return cloneElement(child, {
        className: cx(
          child.props.className,
          {
            "rounded-l-md": index === 0,
            "-ml-px": index !== 0,
            "rounded-r-md": index === children.length - 1,
          },
          "relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50",
        ),
      });
    });
  }, [children]);

  return (
    <span className="relative z-0 inline-flex shadow-sm rounded-md">
      {enhancedChildren}
    </span>
  );
};

export default ButtonGroup;
