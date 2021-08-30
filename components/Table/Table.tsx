import cx from "classnames";

export interface DataSource {
  key: number | string;
}

export interface Column<T> {
  title: string;
  dataIndex: keyof T;
  key?: string;
  render?: (data: T) => React.ReactNode;
  align?: "left" | "right" | "center";
  width?: number;
}

export interface TableProps<T extends DataSource> {
  dataSource: T[];
  columns: Column<T>[];
}

const Table: React.FC<TableProps<any>> = ({ dataSource, columns }) => {
  return (
    <div className="flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {columns.map((col) => (
                    <th
                      // @ts-ignore
                      key={col.key || col.dataIndex}
                      className={cx(
                        `px-6 py-3 text-${
                          col.align || "left"
                        } text-xs font-medium text-gray-500 uppercase tracking-wider`,
                        col.width ? `w-${col.width}` : undefined,
                      )}
                    >
                      {col.title}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {dataSource.map((data) => (
                  <tr key={data.key}>
                    {columns.map((col) => (
                      <td
                        // @ts-ignore
                        key={col.key || col.dataIndex}
                        className={cx(`text-${col.align || "left"}`)}
                      >
                        {col.render ? col.render(data) : data[col.dataIndex]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
