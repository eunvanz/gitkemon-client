export interface MonCardGridProps {}

const MonCardGrid: React.FC<MonCardGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 m-auto">
      {children}
    </div>
  );
};

export default MonCardGrid;
