export interface NewBadgeProps {}

const NewBadge: React.FC<NewBadgeProps> = ({ children }) => {
  return (
    <div className="relative inline-flex">
      <span className="flex absolute h-1.5 w-1.5 top-0 right-0 -mt-0.5 -mr-0.5">
        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-400"></span>
      </span>
      {children}
    </div>
  );
};

export default NewBadge;
