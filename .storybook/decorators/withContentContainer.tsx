import TestProvider from "~/components/TestProvider";

const withContentContainer = (Story: any) => {
  return (
    <div className="content-container">
      <Story />
    </div>
  );
};

export default withContentContainer;
