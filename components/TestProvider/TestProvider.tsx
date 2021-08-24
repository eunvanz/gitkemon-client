import { QueryClientProvider } from "react-query";
import { RecoilRoot } from "recoil";
import queryClient from "../../helpers/queryClient";

export interface TestProviderProps {}

const TestProvider: React.FC<TestProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>{children}</RecoilRoot>
    </QueryClientProvider>
  );
};

export default TestProvider;
