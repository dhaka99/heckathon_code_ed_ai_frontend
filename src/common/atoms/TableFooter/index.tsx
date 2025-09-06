import MuiTableFooter, {
  type TableFooterProps,
} from "@mui/material/TableFooter";

const TableFooter: React.FC<TableFooterProps> = (props) => {
  const { children, ...otherProps } = props;
  return <MuiTableFooter {...otherProps}>{children}</MuiTableFooter>;
};

export default TableFooter;
