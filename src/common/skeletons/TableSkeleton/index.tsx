import React from "react";
import CustomSkeleton from "../../../common/atoms/CustomSkeleton";
import Div from "../../../common/atoms/Div";
import Table from "../../../common/atoms/Table";
import TableBody from "../../../common/atoms/TableBody";
import TableCell from "../../../common/atoms/TableCell";
import TableHead from "../../../common/atoms/TableHead";
import TableRow from "../../../common/atoms/TableRow";
import Stack from "../../atoms/Stack";

interface TableSkeletonProps {
  pagination?: boolean;
  rows?: number;
}
const TableSkeleton: React.FC<TableSkeletonProps> = ({
  pagination = true,
  rows = 6,
}) => {
  return (
    <Div border={1} borderColor='divider' borderRadius={2} overflow='hidden'>
      <Table>
        {/* Table Header */}
        <TableHead>
          <TableRow>
            <TableCell sx={{ padding: '8px 12px' }}>
              <CustomSkeleton variant='text' width='100%' />
            </TableCell>
            <TableCell sx={{ padding: '8px 12px' }}>
              <CustomSkeleton variant='text' width='100%' />
            </TableCell>
            <TableCell sx={{ padding: '8px 12px' }}>
              <CustomSkeleton variant='text' width='100%' />
            </TableCell>
            <TableCell sx={{ padding: '8px 12px' }}>
              <CustomSkeleton variant='text' width='100%' />
            </TableCell>
          </TableRow>
        </TableHead>

        {/* Table Body */}
        <TableBody>
          {Array.from({ length: rows }).map((_, index) => (
            <TableRow key={index}>
              <TableCell sx={{ padding: '8px 12px' }}>
                <CustomSkeleton variant='text' />
              </TableCell>
              <TableCell sx={{ padding: '8px 12px' }}>
                <CustomSkeleton variant='text' />
              </TableCell>
              <TableCell sx={{ padding: '8px 12px' }}>
                <CustomSkeleton variant='text' />
              </TableCell>
              <TableCell sx={{ padding: '8px 12px' }}>
                <CustomSkeleton variant='rounded' height={30} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination CustomSkeleton */}
      {pagination && (
        <Stack
          paddingY='10px'
          direction='row'
          justifyContent='center'
          spacing={1}
        >
          <CustomSkeleton variant='circular' width={32} height={32} />
          <CustomSkeleton variant='circular' width={32} height={32} />
          <CustomSkeleton variant='circular' width={32} height={32} />
        </Stack>
      )}
    </Div>
  );
};
export default TableSkeleton;
