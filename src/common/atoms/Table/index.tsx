import MuiTable, { type TableProps } from "@mui/material/Table";

const Table: React.FC<TableProps> = (props) => (
  <MuiTable {...props}>{props.children}</MuiTable>
);

export default Table;
