import Error from "~/components/Error";

const Custom404 = () => (
  <Error
    code="404"
    title="Page not found"
    description="This is not the web page you are looking for."
  />
);

export default Custom404;
