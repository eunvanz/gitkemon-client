import { useCallback, useMemo, useState } from "react";
import Table from "~/components/Table";
import { getLocaleProperty } from "~/helpers/projectHelpers";
import { Collection } from "~/types";
import Intersection from "../Intersection";
import LevelBadge from "../LevelBadge";
import MonModalContainer from "../MonModal";
import MonStars from "../MonStars";
import MonTierBadge from "../MonTierBadge";
import MonTypeBadge from "../MonTypeBadge";
import PotentialBadge from "../PotentialBadge";
import { Column } from "../Table/Table";
import Typography from "../Typography";

interface RankingItem extends Collection {
  rank: number;
  key: number;
}

export interface MonRankingTableProps {
  collections?: Collection[];
  hasNextPage?: boolean;
  onFetchNextPage?: VoidFunction;
}

const MonRankingTable: React.FC<MonRankingTableProps> = ({
  collections,
  hasNextPage,
  onFetchNextPage,
}) => {
  const [isMonModalOpen, setIsMonModalOpen] = useState(false);
  const [modalMonId, setModalMonId] = useState<number>(0);

  const handleOnOpenMonModal = useCallback((collectionId: number) => {
    setModalMonId(collectionId);
    setIsMonModalOpen(true);
  }, []);

  const handleOnCloseMonModal = useCallback(() => {
    setIsMonModalOpen(false);
  }, []);

  const dataSource: RankingItem[] = useMemo(() => {
    return collections
      ? collections.map((collection, index) => ({
          ...collection,
          rank: index + 1,
          key: collection.id,
        }))
      : [];
  }, [collections]);

  const columns: Column<RankingItem>[] = useMemo(() => {
    return [
      {
        title: "rank",
        dataIndex: "rank",
      },
      {
        title: "name",
        dataIndex: "name",
        render: (data) => (
          <div className="flex items-center">
            <div className="flex-shrink-0 h-10 w-10">
              {/* eslint-disable-next-line */}
              <img className="h-10 w-10" src={data.monImageUrl} alt={data.name} />
            </div>
            <div className="ml-4">
              <Typography as="a" onClick={() => handleOnOpenMonModal(data.id)}>
                {getLocaleProperty(data, "name")}
              </Typography>
              <LevelBadge className="ml-2" level={data.level} />
              <PotentialBadge className="ml-2" potential={data.potential} />
            </div>
          </div>
        ),
      },
      {
        title: "user",
        dataIndex: "__user__",
        render: (data) => (
          <Typography as="a" onClick={() => {}}>
            {data.__user__!.nickname}
          </Typography>
        ),
      },
      {
        title: "total",
        dataIndex: "total",
      },
      {
        title: "stars",
        dataIndex: "stars",
        render: (data) => <MonStars stars={data.stars} />,
      },
      {
        title: "tier",
        dataIndex: "tier",
        render: (data) => <MonTierBadge tier={data.tier} />,
      },
      {
        title: "type",
        dataIndex: "firstType",
        render: (data) => (
          <>
            <MonTypeBadge type={data.firstType} />
            {data.secondType && <MonTypeBadge className="ml-1" type={data.secondType} />}
          </>
        ),
      },
    ];
  }, [handleOnOpenMonModal]);

  return (
    <>
      <Table dataSource={dataSource} columns={columns} />
      {hasNextPage && <Intersection onIntersect={onFetchNextPage} />}
      <MonModalContainer
        isOpen={isMonModalOpen}
        onClose={handleOnCloseMonModal}
        onOpen={() => handleOnOpenMonModal(modalMonId)}
        collectionId={modalMonId}
      />
    </>
  );
};

export default MonRankingTable;