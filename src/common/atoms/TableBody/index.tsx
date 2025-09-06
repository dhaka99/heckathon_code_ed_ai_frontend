import MuiTableBody, { type TableBodyProps } from "@mui/material/TableBody";

const TableBody: React.FC<TableBodyProps> = (props) => (
  <MuiTableBody {...props}>{props.children}</MuiTableBody>
);

export default TableBody;
