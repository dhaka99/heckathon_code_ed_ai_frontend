import Pagination from "../../atoms/Pagination";
import Stack from "../../atoms/Stack";

type ConfigPaginationProps = {
  pagination: {
    totalPages: number;
    totalItems: number;
    pageNumber: number;
  };
  handlePageChange(_event: React.ChangeEvent<unknown>, value: number): void;
};

const CustomPagination: React.FC<ConfigPaginationProps> = ({
  pagination,
  handlePageChange,
}) => {
  return (
    <Stack paddingY='24px' alignItems={"center"} bgcolor='neutral.main'>
      <Pagination
        page={pagination.pageNumber + 1}
        count={pagination.totalPages}
        onChange={handlePageChange}
        color='primary'
        showFirstButton
        showLastButton
      />
    </Stack>
  );
};

export default CustomPagination;
