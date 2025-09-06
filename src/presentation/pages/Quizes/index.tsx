import React, { useState } from "react";
import Div from "../../../common/atoms/Div";
import Text from "../../../common/atoms/Text";
import CustomCard from "../../../common/atoms/CustomCard";
import CustomTable from "../../../common/molecules/CustomTable";
import CustomPagination from "../../../common/molecules/CustomPagination";
import TableSkeleton from "../../../common/skeletons/TableSkeleton";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { quizData } from "../../../mocks/quizData";
import CustomButton from "../../../common/atoms/CustomButton";
import CustomChip from "../../../common/atoms/CustomChip";
import { useNavigate } from "react-router";

const Quizes: React.FC = () => {
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    totalPages: 10,
    totalItems: 100,
    page: 2,
  });
  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, page: page });
  };

  const handleOnViewClick = (row: any) => {
    navigate(`/quizes/${row.quizId}`);
  };

  const tableColumns = [
    {
      key: "quizId",
      header: (
        <Text variant="body1Medium" color="primary" whiteSpace={"nowrap"}>
          Quiz ID
        </Text>
      ),
    },
    {
      key: "quizTitle",
      header: (
        <Text variant="body1Medium" color="primary" whiteSpace={"nowrap"}>
          Quiz Title
        </Text>
      ),
    },
    {
      key: "quizSummary",
      header: (
        <Text variant="body1Medium" color="primary" whiteSpace={"nowrap"}>
          Quiz Summary
        </Text>
      ),
    },
    {
      key: "noOfQuestions",
      header: (
        <Text variant="body1Medium" color="primary" whiteSpace={"nowrap"}>
          No. of Questions
        </Text>
      ),
      sx: { width: "140px" },
    },
    {
      key: "quizType",
      header: (
        <Text variant="body1Medium" color="primary" whiteSpace={"nowrap"}>
          Quiz Type
        </Text>
      ),
      sx: { width: "140px" },
      render: (row: any) => {
        return <CustomChip label={row.quizType} />;
      },
    },
    {
      key: "maxMarks",
      header: (
        <Text variant="body1Medium" color="primary" whiteSpace={"nowrap"}>
          Max Marks
        </Text>
      ),
      sx: { width: "120px" },
    },
    {
      key: "actions",
      stickyRight: true,
      header: (
        <Text variant="body1Medium" color="primary" whiteSpace={"nowrap"}>
          Action
        </Text>
      ),
      render: (row: any) => {
        return (
          <Div>
            <CustomButton onClick={() => handleOnViewClick(row)}>
              <VisibilityIcon />
            </CustomButton>
          </Div>
        );
      },
    },
  ];
  return (
    <Div display="flex" gap="24px" flexDirection="column">
      <Div
        display="flex"
        flexDirection="row"
        justifyContent="space-between"
        alignItems="center"
        flexWrap={"wrap"}
        gap="24px"
      >
        <Text variant="h2Bold" color="primary" whiteSpace={"nowrap"}>
          Quizzes
        </Text>
      </Div>
      <CustomCard sx={{ padding: 0 }}>
        <CustomTable
          columns={tableColumns}
          data={quizData}
          paginationComponent={
            <CustomPagination
              pagination={pagination}
              handlePageChange={handlePageChange}
            />
          }
          noDataMessage="No Data Found"
        />
      </CustomCard>

      {/* <TableSkeleton/> */}
    </Div>
  );
};

export default Quizes;
