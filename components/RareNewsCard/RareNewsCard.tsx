import { useCallback, useMemo, useState } from "react";
import cx from "classnames";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { getLocaleProperty } from "~/helpers/projectHelpers";
import { ExtendableHTMLProps, RareNews } from "~/types";
import MonModalContainer from "../MonModal";
import Typography from "../Typography";
import UserItem from "../UserItem";

dayjs.extend(relativeTime);

export interface RareNewsCardProps extends ExtendableHTMLProps<HTMLDivElement> {
  item: RareNews;
}

const RareNewsCard: React.FC<RareNewsCardProps> = ({ item, className, ...restProps }) => {
  const decoratorText = useMemo(() => {
    let text = "a ";
    if (["SS", "S"].includes(item.collection.potential)) {
      text = `${text}superior `;
    }
    if (["legend", "elite", "myth"].includes(item.collection.tier)) {
      text = `${text}${item.collection.tier} pokémon `;
    }
    return text;
  }, [item.collection.potential, item.collection.tier]);

  const methodText = useMemo(() => {
    if (item.method === "blend") {
      return "blending";
    } else if (item.method === "evolve") {
      return "evolution";
    } else if (item.method === "hunt") {
      return "hunting";
    }
  }, [item.method]);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const openMonModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  return (
    <div className={cx("border rounded-md p-4 flex flex-col", className)} {...restProps}>
      <Typography as="div">
        <UserItem user={item.user} isInline /> got {decoratorText}
        <Typography as="a" weight="bold" onClick={openMonModal}>
          {getLocaleProperty(item.collection, "name")}
        </Typography>{" "}
        by {methodText}!
      </Typography>
      <Typography as="div" color="hint">
        {dayjs(item.createdAt).fromNow()}
      </Typography>
      <MonModalContainer
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        collectionId={item.collectionId}
        onOpen={openMonModal}
      />
    </div>
  );
};

export default RareNewsCard;
