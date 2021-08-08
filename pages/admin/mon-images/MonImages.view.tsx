import { useCallback, useMemo, useState } from "react";
import { Button, Input, Modal, Select, Space, Table } from "antd";
import Image from "next/image";
import { MonImage, MonImageSearchCondition } from "../../../types";
import styles from "./MonImages.module.css";

export interface MonImagesProps {
  monImages?: MonImage[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onCreate: VoidFunction;
  onSearch: (condition: MonImageSearchCondition, value: string) => void;
  isSearching: boolean;
  isDeleting?: number;
}

const MonImages: React.FC<MonImagesProps> = ({
  monImages,
  onEdit,
  onDelete,
  onCreate,
  onSearch,
  isSearching,
  isDeleting,
}) => {
  const onViewImage = useCallback((imageUrl: string) => {
    Modal.info({
      content: <Image src={imageUrl} alt="Mon image" width={200} height={200} />,
    });
  }, []);

  const dataSource = useMemo(() => {
    return monImages?.map((monImage) => ({
      key: monImage.id,
      id: monImage.id,
      monName: monImage.__mon__!.nameKo,
      designerName: monImage.designerName,
      imageUrl: monImage.imageUrl,
    }));
  }, [monImages]);

  const columns = useMemo(() => {
    return [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Mon name",
        dataIndex: "monName",
        key: "monName",
      },
      {
        title: "Designer name",
        dataIndex: "designerName",
        key: "designerName",
      },
      {
        title: "Image",
        dataIndex: "imageUrl",
        key: "imageUrl",
        render: (imageUrl: string) => (
          <Button type="link" onClick={() => onViewImage(imageUrl)}>
            View
          </Button>
        ),
      },
      {
        title: "Edit",
        dataIndex: "id",
        key: "Edit",
        render: (id: number) => (
          <Button type="link" onClick={() => onEdit(id)}>
            Edit
          </Button>
        ),
      },
      {
        title: "Delete",
        dataIndex: "id",
        key: "Delete",
        render: (id: number) => (
          <Button
            danger
            type="link"
            onClick={() => onDelete(id)}
            loading={isDeleting === id}
          >
            Delete
          </Button>
        ),
      },
    ];
  }, [isDeleting, onDelete, onEdit, onViewImage]);

  const [searchCondition, setSearchCondition] = useState<MonImageSearchCondition>(
    "monName",
  );

  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className={styles.container}>
      <Space direction="horizontal">
        <Select defaultValue={searchCondition} onChange={setSearchCondition}>
          <Select.Option value="monName">Mon name</Select.Option>
          <Select.Option value="designerName">Designer name</Select.Option>
        </Select>
        <Input.Search
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={() => onSearch(searchCondition, searchValue)}
          enterButton="Search"
          loading={isSearching}
        />
      </Space>
      <div className={styles.action}>
        <Button type="primary" onClick={onCreate}>
          Create new
        </Button>
      </div>
      <Table dataSource={dataSource} columns={columns} />
    </div>
  );
};

export default MonImages;
