import Error from "~/components/Error";

export interface Custom500Props {
  statusCode: number;
  description?: string;
}

const Custom500 = ({ statusCode, description }: Custom500Props) => (
  <Error
    code={statusCode.toString()}
    title="Error"
    description={
      description ||
      "An unexpected error has occurred. Please try again in a few minutes."
    }
  />
);

export default Custom500;
