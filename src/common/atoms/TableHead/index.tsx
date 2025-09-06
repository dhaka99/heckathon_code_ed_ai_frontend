import MuiTableHead, { type TableHeadProps } from "@mui/material/TableHead";

const TableHead: React.FC<TableHeadProps> = (props) => (
  <MuiTableHead {...props}>{props.children}</MuiTableHead>
);

export default TableHead;
