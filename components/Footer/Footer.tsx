import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Typography from "../Typography";

export interface FooterProps {}

const Footer: React.FC<FooterProps> = ({}) => {
  return (
    <div className="flex justify-center items-center h-20 border-t mt-10">
      <Typography color="hint">
        © 2021 Benjamin.{" "}
        <FontAwesomeIcon
          className="cursor-pointer hover:text-gray-600"
          onClick={() => window.open("https://github.com/eunvanz/gitkemon-client")}
          icon={faGithub}
          size="lg"
        />
      </Typography>
    </div>
  );
};

export default Footer;
