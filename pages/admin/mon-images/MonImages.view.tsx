import { useCallback, useMemo, useState } from "react";
import { Button, Input, Modal, Select, Space, Table } from "antd";
import { Option } from "antd/lib/mentions";
import Image from "next/image";
import { MonImage } from "../../../types";
import styles from "./MonImages.module.css";

export interface MonImagesProps {
  monImages: MonImage[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onCreate: VoidFunction;
  onSearch: (condition: string, value: string) => void;
  isSearching: boolean;
}

const MonImages: React.FC<MonImagesProps> = ({
  monImages,
  onEdit,
  onDelete,
  onCreate,
  onSearch,
  isSearching,
}) => {
  const onViewImage = useCallback((imageUrl: string) => {
    Modal.info({
      content: <Image src={imageUrl} alt="Mon image" layout="fill" />,
    });
  }, []);

  const dataSource = useMemo(() => {
    return monImages.map((monImage) => ({
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
        title: "View image",
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
          <Button type="link" onClick={() => onDelete(id)}>
            Delete
          </Button>
        ),
      },
    ];
  }, [onDelete, onEdit, onViewImage]);

  const [searchCondition, setSearchCondition] = useState<"monName" | "designerName">(
    "monName",
  );

  const [searchValue, setSearchValue] = useState<string>("");

  return (
    <div className={styles.container}>
      <Space direction="horizontal">
        <Select defaultValue={searchCondition}>
          <Option value="monName">Mon name</Option>
          <Option value="designerName">Designer name</Option>
        </Select>
        <Input.Search
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          onSearch={() => onSearch(searchCondition, searchValue)}
          enterButton="Search"
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
