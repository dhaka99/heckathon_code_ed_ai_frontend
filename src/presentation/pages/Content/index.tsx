import React, { useEffect, useState } from "react";
import Div from "../../../common/atoms/Div";
import CustomButton from "../../../common/atoms/CustomButton";
import AddIcon from "@mui/icons-material/Add";
import Text from "../../../common/atoms/Text";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../constants";
import CustomCard from "../../../common/atoms/CustomCard";
import CustomTable from "../../../common/molecules/CustomTable";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomChip from "../../../common/atoms/CustomChip";
import CustomPagination from "../../../common/molecules/CustomPagination";
import { quizData } from "../../../mocks/quizData";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import QuizOutlinedIcon from "@mui/icons-material/QuizOutlined";
import { contentData } from "../../../mocks/contentData";
import { contentSummarizationAction } from "../../../store/slices/contentSlice";
import { useDispatch } from "react-redux";

const Content: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleOnAddContent = () => {
    navigate(ROUTES.CONTENT_CREATION);
  };
  const [pagination, setPagination] = useState({
    totalPages: 10,
    totalItems: 100,
    page: 2,
  });
  const handlePageChange = (page: number) => {
    setPagination({ ...pagination, page: page });
  };
  
  const handleOnViewClick = (row?: any) => {
    console.log("view details", row);
  };

  const handleCreateNotes = (row?: any) => {
    navigate(ROUTES.CONTENT_CREATION);
  };

  const handleCreateQuiz = (row?: any) => {
    navigate(ROUTES.QUIZES);
  };

  useEffect(() => {
    dispatch(contentSummarizationAction({
      content: "content",
      language: "language",
      length: 100,
      generateThumbnail: true,
    }));
  }, []);
  const tableColumns = [
    {
      key: "contentId",
      header: (
        <Text variant="body1Medium" color="primary" whiteSpace={"nowrap"}>
          Content ID
        </Text>
      ),
      sx: { width: "160px" },
    },
    {
      key: "contentTitle",
      header: (
        <Text variant="body1Medium" color="primary" whiteSpace={"nowrap"}>
          Content Title
        </Text>
      ),
    },
    {
      key: "actions",
      stickyRight: true,
      header: (
        <Text variant="body1Medium" color="primary" whiteSpace={"nowrap"}>
          Actions
        </Text>
      ),
      render: (row: any) => (
        <Div display="flex" gap="8px">
          <CustomButton
            size="small"
            variant="outlined"
            onClick={() => handleCreateNotes(row)}
          >
            <NoteAddOutlinedIcon fontSize="small" /> <span>Create Notes</span>
          </CustomButton>
          <CustomButton
            size="small"
            variant="outlined"
            onClick={() => handleCreateQuiz(row)}
          >
            <QuizOutlinedIcon fontSize="small" /> <span>Create Quiz</span>
          </CustomButton>
          <CustomButton
            size="small"
            variant="outlined"
            onClick={() => handleOnViewClick(row)}
          >
            <VisibilityIcon fontSize="small" />
          </CustomButton>
        </Div>
      ),
      sx: { width: "380px" },
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
          Content
        </Text>
        <CustomButton
          variant="outlined"
          size="large"
          startIcon={<AddIcon />}
          onClick={handleOnAddContent}
        >
          Add Content
        </CustomButton>
      </Div>
      <CustomCard sx={{ padding: 0 }}>
        <CustomTable
          columns={tableColumns}
          data={contentData}
          paginationComponent={
            <CustomPagination
              pagination={pagination}
              handlePageChange={handlePageChange}
            />
          }
          noDataMessage="No Data Found"
        />
      </CustomCard>
    </Div>
  );
};

export default Content;
