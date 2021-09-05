import cx from "classnames";
import Image from "next/image";
import Typography from "../Typography";
import logo from "~/public/images/logo-white.png";
import styles from "./Logo.module.css";

export interface LogoProps {}

const Logo: React.FC<LogoProps> = ({}) => {
  return (
    <>
      <Image
        className="opacity-90"
        src={logo}
        width={40}
        height={40}
        alt="Gitkemon logo"
        priority
      />
      <Typography
        size="2xl"
        className={cx(styles.font, "ml-3")}
      >{`<gitkémon/>`}</Typography>
    </>
  );
};

export default Logo;
