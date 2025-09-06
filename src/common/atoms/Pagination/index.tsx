import MuiPagination, { type PaginationProps } from "@mui/material/Pagination";

const Pagination: React.FC<PaginationProps> = (props) => (
  <MuiPagination {...props} />
);

export default Pagination;
