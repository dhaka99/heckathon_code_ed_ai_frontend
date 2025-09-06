import MuiTableContainer, {
  type TableContainerProps,
} from "@mui/material/TableContainer";

const TableContainer: React.FC<TableContainerProps> = (props) => (
  <MuiTableContainer {...props}>{props.children}</MuiTableContainer>
);

export default TableContainer;
