import { useCallback, useMemo } from "react";
import { Select, Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { Content, ContentType } from "~/types";

export interface ContentsProps {
  contentType: ContentType;
  onChangeContentType: (type: ContentType) => void;
  contents?: Content[];
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Contents: React.FC<ContentsProps> = ({
  contentType,
  onChangeContentType,
  contents,
  onEdit,
  onDelete,
}) => {
  const handleOnDelete = useCallback(
    (id: number) => {
      if (confirm("Are you sure to delete?")) {
        onDelete(id);
      }
    },
    [onDelete],
  );

  const columns: ColumnsType<Content> = useMemo(() => {
    return [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Title",
        dataIndex: "title",
        key: "title",
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
          <Button type="link" danger onClick={() => handleOnDelete(id)}>
            Delete
          </Button>
        ),
      },
    ];
  }, [handleOnDelete, onEdit]);

  return (
    <div className="content-container bg-white p-4">
      <div className="mb-4">
        <Select value={contentType} onChange={onChangeContentType}>
          {[
            {
              value: "notice",
              name: "Notice",
            },
          ].map(({ value, name }) => (
            <Select.Option key={value} value={value}>
              {name}
            </Select.Option>
          ))}
        </Select>
      </div>
      <Table columns={columns} dataSource={contents} />
    </div>
  );
};

export default Contents;
