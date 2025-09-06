import MuiTableCell, { type TableCellProps } from "@mui/material/TableCell";

const TableCell: React.FC<TableCellProps> = (props) => (
  <MuiTableCell {...props}>{props.children}</MuiTableCell>
);

export default TableCell;
