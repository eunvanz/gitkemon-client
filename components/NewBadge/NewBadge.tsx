export interface NewBadgeProps {
  size?: number;
  right?: number;
  top?: number;
  className?: string;
}

const NewBadge: React.FC<NewBadgeProps> = ({
  size = 1.5,
  right = 0,
  top = 0,
  className,
  children,
}) => {
  return (
    <div className="relative inline-flex">
      <span
        className={`flex absolute h-${size} w-${size} top-${top} right-${right} -mt-0.5 -mr-0.5 ${className}`}
      >
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-400"></span>
      </span>
      {children}
    </div>
  );
};

export default NewBadge;
