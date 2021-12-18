import TestProvider from "~/components/TestProvider";

const withTestProvider = (Story: any) => {
  return (
    <TestProvider>
      <Story />
    </TestProvider>
  );
};

export default withTestProvider;
