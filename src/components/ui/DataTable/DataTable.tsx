import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import React, { Key, ReactNode } from "react";

interface PropsType {
  columns: Record<string, unknown>[];
  data: Record<string, unknown>[];
  renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode;
}

const DataTable = (props: PropsType) => {
  const { columns, data, renderCell } = props;

  return (
    <Table>
      <TableHeader columns={columns}>
        {(column) => (
          <TableColumn key={column.uid as Key}>
            {column.name as string}
          </TableColumn>
        )}
      </TableHeader>

      <TableBody items={data}>
        {(item) => (
          <TableRow key={item._id as Key}>
            {(columnKey) => (
              <TableCell>{renderCell(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default DataTable;
