import cx from "classnames";
import Image from "next/image";
import logo from "~/public/images/logo-white.png";
import styles from "./CardBack.module.css";

export interface CardBackProps {}

const CardBack: React.FC<CardBackProps> = ({}) => {
  return (
    <div
      className={cx(
        "flex justify-center flex-col items-center w-full h-full",
        styles.pattern,
      )}
    >
      <div className="rounded-full p-2 bg-gray-300 w-14 h-14">
        <Image
          className="opacity-80"
          src={logo}
          width={40}
          height={40}
          alt="logo"
          priority
        />
      </div>
    </div>
  );
};

export default CardBack;
