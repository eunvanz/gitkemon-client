import { NextPageContext } from "next";
import Error from "~/components/Error";

export interface CustomErrorProps {
  statusCode: number;
  title?: string;
  description?: string;
}

const CustomError = ({ statusCode, title, description }: CustomErrorProps) => (
  <Error
    code={statusCode.toString()}
    title={title || "Error"}
    description={
      description ||
      "An unexpected error has occurred. Please try again in a few minutes."
    }
  />
);

CustomError.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default CustomError;
