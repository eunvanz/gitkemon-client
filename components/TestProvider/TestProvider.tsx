import { QueryClientProvider } from "react-query";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import { colorHashes } from "~/constants/styles";
import queryClient from "~/helpers/queryClient";

export interface TestProviderProps {}

const TestProvider: React.FC<TestProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <ToastContainer
          position="bottom-right"
          newestOnTop
          progressStyle={{ backgroundColor: colorHashes.WATER }}
        />
        {children}
      </RecoilRoot>
    </QueryClientProvider>
  );
};

export default TestProvider;
