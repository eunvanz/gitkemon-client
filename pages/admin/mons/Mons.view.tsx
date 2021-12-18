import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { Table, Input, Space, Button, Radio } from "antd";
import { ColumnsType } from "antd/lib/table";
import Highlighter from "react-highlight-words";
import { MON_TIERS, MON_TYPES } from "~/constants/rules";
import { Mon } from "~/types";

export type MonFilter = "all" | "active" | "inactive";

export interface MonsProps {
  mons?: Mon[];
  onEdit: (id: number) => void;
  onChangeMonFilter: (filter: MonFilter) => void;
  monFilter: MonFilter;
}

const Mons: React.FC<MonsProps> = ({ mons, onEdit, onChangeMonFilter, monFilter }) => {
  const searchInputRef = useRef<Input>(null);

  const [search, setSearch] = useState<{ searchText: string; searchedColumn?: string }>({
    searchText: "",
  });

  const handleSearch = useCallback((selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearch({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  }, []);

  const handleReset = useCallback((clearFilters) => {
    clearFilters();
    setSearch({ searchText: "" });
  }, []);

  const getColumnSearchProps = useCallback(
    (dataIndex: keyof Mon) => ({
      filterDropdown: ({
        setSelectedKeys,
        selectedKeys,
        confirm,
        clearFilters,
      }: {
        setSelectedKeys: (keys: string[]) => void;
        selectedKeys: string[];
        confirm: (option?: any) => void;
        clearFilters: () => void;
      }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={searchInputRef}
            placeholder="Keyword"
            value={selectedKeys[0]}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSelectedKeys(e.target.value ? [e.target.value] : [])
            }
            onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
            style={{ width: 188, marginBottom: 8, display: "block" }}
          />
          <Space>
            <Button
              type="primary"
              onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
              icon={<SearchOutlined />}
              size="small"
              style={{ width: 90 }}
            >
              Search
            </Button>
            <Button
              onClick={() => handleReset(clearFilters)}
              size="small"
              style={{ width: 90 }}
            >
              Reset
            </Button>
            <Button
              type="link"
              size="small"
              onClick={() => {
                confirm({ closeDropdown: false });
                setSearch({
                  searchText: selectedKeys[0],
                  searchedColumn: dataIndex,
                });
              }}
            >
              Filter
            </Button>
          </Space>
        </div>
      ),
      filterIcon: (filtered: boolean) => (
        <SearchOutlined style={{ color: filtered ? "#1890ff" : undefined }} />
      ),
      onFilter: (value: string | number | boolean, record: Mon) =>
        record[dataIndex]
          ? record[dataIndex]
              ?.toString()
              .toLowerCase()
              .includes(value as string)
          : false,
      onFilterDropdownVisibleChange: (visible: boolean) => {
        if (visible) {
          setTimeout(() => searchInputRef.current?.select(), 100);
        }
      },
      render: (text: string) =>
        search.searchedColumn === dataIndex ? (
          <Highlighter
            highlightStyle={{ backgroundColor: "#ffc069", padding: 0 }}
            searchWords={[search.searchText]}
            autoEscape
            textToHighlight={text ? text.toString() : ""}
          />
        ) : (
          text
        ),
    }),
    [handleReset, handleSearch, search.searchText, search.searchedColumn],
  );

  // @ts-ignore
  const columns: ColumnsType<Mon> = useMemo(() => {
    return [
      {
        title: "ID",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Name",
        dataIndex: "nameKo",
        key: "name",
        ...getColumnSearchProps("nameKo"),
      },
      {
        title: "Tier",
        dataIndex: "tier",
        key: "tier",
        filters: MON_TIERS.map((tier) => ({ text: tier, value: tier })),
        onFilter: (value, record) => record.tier === value,
      },
      {
        title: "Stars",
        dataIndex: "stars",
        key: "stars",
        filters: Array.from({ length: 10 }).map((_, index) => ({
          text: (index + 1).toString(),
          value: index + 1,
        })),
        onFilter: (value, record) => record.stars === value,
      },
      {
        title: "First type",
        dataIndex: "firstType",
        key: "firstType",
        filters: MON_TYPES.map((monType) => ({ text: monType, value: monType })),
        onFilter: (value, record) => record.firstType === value,
      },
      {
        title: "Second type",
        dataIndex: "secondType",
        key: "secondType",
        filters: MON_TYPES.map((monType) => ({ text: monType, value: monType })),
        onFilter: (value, record) => record.secondType === value,
      },
      {
        title: "Total",
        dataIndex: "total",
        key: "total",
        filters: [100, 200, 300, 400, 500, 600, 700].map((total) => ({
          text: `${total} ~ ${total + 100}`,
          value: total,
        })),
        onFilter: (value: number, record) =>
          record.total >= value && record.total < value + 100,
      },
      {
        title: "Evolve",
        dataIndex: "evolutionLevel",
        key: "evolveLevel",
        filters: [
          {
            text: "0",
            value: 0,
          },
          {
            text: "all",
            value: 1,
          },
        ],
        onFilter: (value: number, record) =>
          value === 0 ? record.evolutionLevel === value : true,
      },
      {
        title: "CP",
        dataIndex: "colPoint",
        key: "collectionPoint",
        filters: [
          {
            text: "0",
            value: 0,
          },
          {
            text: "all",
            value: 1,
          },
        ],
        onFilter: (value: number, record) =>
          value === 0 ? record.colPoint === value : true,
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
    ];
  }, [getColumnSearchProps, onEdit]);

  return (
    <div className="p-4 bg-white">
      <div className="mb-4">
        <Radio.Group
          value={monFilter}
          onChange={(e) => onChangeMonFilter(e.target.value)}
        >
          <Radio.Button value="all">All</Radio.Button>
          <Radio.Button value="active">Active</Radio.Button>
          <Radio.Button value="inactive">Inactive</Radio.Button>
        </Radio.Group>
      </div>
      <Table columns={columns} dataSource={mons} />
    </div>
  );
};

export default Mons;
