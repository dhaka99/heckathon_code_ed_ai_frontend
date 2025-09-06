import { Paper, type SxProps, type Theme } from "@mui/material";
import Table from "../../atoms/Table";
import TableCell from "../../atoms/TableCell";
import TableContainer from "../../atoms/TableContainer";
import TableHead from "../../atoms/TableHead";
import TableRow from "../../atoms/TableRow";
import TableBody from "../../atoms/TableBody";
import Text from "../../atoms/Text";
import type { JSX } from "react";
interface Column<T> {
  key: keyof T | string;
  header: React.ReactNode;
  render?: (row: T) => React.ReactNode;
  align?: "left" | "right" | "center" | "inherit" | "justify";
  sx?: SxProps<Theme>;
  width?: string;
  stickyRight?: boolean;
}

interface CustomTableProps<T> {
  data: T[];
  columns: Column<T>[];
  paginationComponent?: React.ReactNode;
  containerSx?: SxProps<Theme>;
  headSx?: SxProps<Theme>;
  noDataMessage?: string;
  stickyHeader?: boolean;
}

const CustomTable = <T,>({
  data,
  columns,
  paginationComponent,
  containerSx,
  headSx,
  noDataMessage,
  stickyHeader = false,
}: CustomTableProps<T>): JSX.Element => {
  const getStickySx = (col: Column<any>): SxProps<Theme> | undefined => {
    if (!col.stickyRight) return undefined;
    return {
      position: "sticky",
      boxSizing: "border-box",
      right: 0,
      zIndex: 20,
      backgroundColor: "background.paper",
      color: "primary.main",
      "&::before": {
        content: '""',
        position: "absolute",
        top: 0,
        bottom: 0,
        left: 0,
        width: "2px",
        backgroundColor: "primary.400", // divider color
      },
    } as SxProps<Theme>;
  };
  return (
    <>
      <TableContainer component={Paper} sx={{ ...containerSx }}>
        <Table stickyHeader={stickyHeader}>
          <TableHead sx={{ backgroundColor: "primary.200", ...headSx }}>
            {columns.length > 0 && (
              <TableRow>
                {columns.map((col, index) => (
                  <TableCell
                    key={index}
                    align={col.align || "left"}
                    sx={
                      [
                        col.sx,
                        getStickySx(col),
                        { backgroundColor: "primary.200" },
                      ]
                        .filter(Boolean)
                        .reduce(
                          (acc, style) => ({ ...acc, ...style }),
                          {},
                        ) as SxProps<Theme>
                    }
                  >
                    {col.header}
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableHead>
          <TableBody>
            {data.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} align='center'>
                  <Text variant='body2' color='text.secondary'>
                    {noDataMessage || "No data available"}
                  </Text>
                </TableCell>
              </TableRow>
            ) : (
              data.map((row, rowIndex) => (
                <TableRow key={rowIndex}>
                  {columns.map((col, colIndex) => (
                    <TableCell
                      key={colIndex}
                      align={col.align || "left"}
                      sx={
                        [col.sx, getStickySx(col)]
                          .filter(Boolean)
                          .reduce(
                            (acc, style) => ({ ...acc, ...style }),
                            {},
                          ) as SxProps<Theme>
                      }
                    >
                      {col.render ? col.render(row) : (row as any)[col.key]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {data.length > 0 && paginationComponent && <>{paginationComponent}</>}
    </>
  );
};

export default CustomTable;
