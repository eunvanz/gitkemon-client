import { QueryClientProvider } from "react-query";
import queryClient from "../../helpers/queryClient";

export interface TestProviderProps {}

const TestProvider: React.FC<TestProviderProps> = ({ children }) => {
  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default TestProvider;
