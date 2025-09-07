import React, { useEffect, useState } from "react";
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
import { useDispatch } from "react-redux";
import useSelector from "../../../domain/useCase/common/selectorUseCase";
import { getQuizListAction } from "../../../store/slices/contentSlice";

const Quizes: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { quizList, contentLoading } = useSelector((state) => state.content);
  

  const handleOnViewClick = (row: any) => {
    navigate(`/quizes/${row?.quiz?.quizId}`);
  };  

  useEffect(() => {
    dispatch(getQuizListAction({}));
  }, []);

  const tableColumns = [
    {
      key: "idx",
      header: (
        <Text variant="body1Medium" color="primary" whiteSpace={"nowrap"}>
          Quiz ID
        </Text>
      ),
      render: (row: any) => {
        return <Text variant="body1Medium"  whiteSpace={"nowrap"}>{row?.idx}</Text>;
      },
    },
    {
      key: "quizTitle",
      header: (
        <Text variant="body1Medium" color="primary" whiteSpace={"nowrap"}>
          Quiz Title
        </Text>
      ),
      render: (row: any) => {
        return <Text variant="body1Medium"  whiteSpace={"nowrap"}>{row?.quiz?.title}</Text>;
      },
    },
    {
      key: "noOfQuestions",
      header: (
        <Text variant="body1Medium" color="primary" whiteSpace={"nowrap"}>
          No. of Questions
        </Text>
      ),
      render: (row: any) => {
        return <Text variant="body1Medium" color="primary" whiteSpace={"nowrap"}>{row?.quiz?.questions?.length}</Text>;
      },
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
        return <CustomChip label={"MCQ"} />;
      },
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
        {contentLoading?.getQuizList === "pending" ? (
          <TableSkeleton />
        ) : (
          <CustomTable
          columns={tableColumns}
          data={quizList?.data?.map((row, idx) => ({...row, idx: idx + 1}))|| []}
          
          noDataMessage="No Data Found"
        />
        )}

      </CustomCard>

    </Div>
  );
};

export default Quizes;
