import { useMemo } from "react";
import MonCard from "../../components/MonCard";
import MonCardGrid from "../../components/MonCardGrid";
import { convertCollectionToCardMon } from "../../helpers/projectHelpers";
import { Collection, Mon } from "../../types";

export interface CollectionsProps {
  collections?: Collection[];
  mons?: Mon[];
}

const Collections: React.FC<CollectionsProps> = ({ collections, mons }) => {
  const isLoading = useMemo(() => {
    return !collections || !mons;
  }, [collections, mons]);

  return !isLoading ? (
    <div className="flex flex-col justify-start">
      <MonCardGrid>
        {collections!.map((collection) => (
          <MonCard key={collection.id} mon={convertCollectionToCardMon(collection)} />
        ))}
      </MonCardGrid>
    </div>
  ) : (
    <>{/* TODO: 스켈레톤 */}</>
  );
};

export default Collections;
