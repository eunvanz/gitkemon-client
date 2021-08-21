export interface MonCardGridProps {}

const MonCardGrid: React.FC<MonCardGridProps> = ({ children }) => {
  return <div className="flex flex-wrap justify-center">{children}</div>;
};

export default MonCardGrid;
