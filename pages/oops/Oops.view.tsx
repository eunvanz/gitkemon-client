import Error from "~/components/Error";

export interface OopsProps {}

const Oops: React.FC<OopsProps> = () => {
  return (
    <Error
      code="Oops"
      title="Unexpected Error"
      description="An unexpected error has occurred. Please try again in a few minutes."
      canRetry
    />
  );
};

export default Oops;
