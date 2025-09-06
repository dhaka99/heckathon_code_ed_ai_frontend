import MuiTableRow, { type TableRowProps } from "@mui/material/TableRow";

const TableRow: React.FC<TableRowProps> = (props) => (
  <MuiTableRow {...props}>{props.children}</MuiTableRow>
);

export default TableRow;
