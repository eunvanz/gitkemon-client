export interface MonCardGridProps {}

const MonCardGrid: React.FC<MonCardGridProps> = ({ children }) => {
  return (
    <div className="flex flex-wrap justify-center max-w-screen-lg m-auto">{children}</div>
  );
};

export default MonCardGrid;
