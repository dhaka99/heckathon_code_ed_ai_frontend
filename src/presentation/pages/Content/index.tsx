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
import {
  contentSummarizationAction,
  createQuizAction,
  getContentListAction,
} from "../../../store/slices/contentSlice";
import { useDispatch, useSelector } from "react-redux";
import CommonModal from "../../../common/atoms/CommonModal";
import CustomAutocomplete from "../../../common/molecules/CustomAutocomplete";
import { languageOptions } from "../../../mocks/lang";
import CustomFormControl from "../../../common/atoms/CustomFormControl";
import CustomSkeleton from "../../../common/atoms/CustomSkeleton";
import TableSkeleton from "../../../common/skeletons/TableSkeleton";

const Content: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [open, setOpen] = useState({
    contentSummarization: false,
    contentToQuiz: false,
  });
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const { contentList , contentLoading} = useSelector((state) => state.content);
  const [numQuestions, setNumQuestions] = useState(null);
  useEffect(() => {
    setPagination({
      totalPages: contentList?.totalPages,
      totalItems: contentList?.totalItems,
      page: contentList?.pageNumber,
    });
  }, [contentList]);

  useEffect(() => {
    dispatch(getContentListAction({}));
  }, []);

  const [language, setLanguage] = useState(null);
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
    navigate(ROUTES.CONTENT_DETAILS.replace(":id", row?.id));
  };

  const handleOnModalCreateNotesOpen = (row?: any) => {
    setOpen({ ...open, contentSummarization: true });
    setSelectedContent(row);
  };
  const handleCreateNotes = async (row?: any) => {
    const result = await dispatch(
      contentSummarizationAction({
        contentId: selectedContent?.id,
        language: language?.value || "en",
        length: 100,
        generateThumbnail: true,
      })
    );
    if (contentSummarizationAction.fulfilled.match(result)) {
      navigate(ROUTES.MICRO_LEARNING);
    }
  };

  const handleOnModalCreateQuizOpen = (row?: any) => {
    setOpen({ ...open, contentToQuiz: true });
    setSelectedContent(row);
  };
  const handleCreateQuiz = async(row?: any) => {
    const result = await dispatch(
      createQuizAction({
        contentId: selectedContent?.id,
        language: language?.label?.toUpperCase() || "ENGLISH",
        questionType: "mcq",
        numQuestions: numQuestions?.value || 5,
        difficulty: "EASY",
      })
    );
    if (createQuizAction.fulfilled.match(result)) {
      navigate(ROUTES.QUIZES);
    }
  };

  const tableColumns = [
    {
      key: "idx",
      header: (
        <Text variant="body1Medium" color="primary" whiteSpace={"nowrap"}>
          Content ID
        </Text>
      ),
      sx: { width: "160px" },
    },
    {
      key: "fileName",
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
            onClick={() => handleOnModalCreateNotesOpen(row)}
            sx={{gap: "8px"}}
          >
            <NoteAddOutlinedIcon fontSize="small" /> <span>Create Notes</span>
          </CustomButton>
          <CustomButton
            size="small"
            variant="outlined"
            onClick={() => handleOnModalCreateQuizOpen(row)}
            sx={{gap: "8px"}}
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

  const onClose = () => {
    setOpen(false);
  };

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
        {contentLoading?.getContentList === "pending" ? (
          <TableSkeleton  />
        ) : (
          <CustomTable
          columns={tableColumns}
          data={contentList?.data?.map((row, idx) => ({...row, idx: idx + 1})) || []}
          paginationComponent={
            <CustomPagination
              pagination={pagination}
              handlePageChange={handlePageChange}
            />
          }
          noDataMessage="No Data Found"
        />
        )}
        
      </CustomCard>
      
      {open.contentSummarization && (
        <CommonModal
          open={open.contentSummarization}
          onBackdropClick={onClose}
          onClose={onClose}
          maxWidth="512px"
        >
          <Div display="flex" gap="16px" flexDirection={"column"}>
            <Text variant="h3Bold" color="primary.main">
              Select Language
            </Text>
            <CustomFormControl sx={{width: "100%"}}>
              <CustomAutocomplete
                value={language}
                onChange={setLanguage}
                valueKey="value"
                labelKey="label"
                options={languageOptions}
                sx={{width: "100%"}}
              />
            </CustomFormControl>

            <Div display="flex" justifyContent="flex-end" gap="8px">
              <CustomButton
                variant="contained"
                size="large"
                disabled={!language}
                onClick={handleCreateNotes}
                loading={contentLoading?.contentSummarization === "pending"}
              >
                Generate Summary Notes
              </CustomButton>
            </Div>
          </Div>
        </CommonModal>
      )}
      {open.contentToQuiz && (
        <CommonModal
          open={open.contentToQuiz}
          onBackdropClick={onClose}
          onClose={onClose}
          maxWidth="512px"
        >
          <Div display="flex" gap="16px" flexDirection={"column"}>
            <Text variant="h3Bold" color="primary.main">
              Select Language
            </Text>
            <CustomFormControl sx={{width: "100%"}}>
              <CustomAutocomplete
                value={language}
                onChange={setLanguage}
                valueKey="value"
                labelKey="label"
                options={languageOptions}
                sx={{width: "100%"}}
              />
            </CustomFormControl>
            <Div>
            <Text variant="h3Bold" color="primary.main">
              Select Number of Questions
            </Text>
            <CustomFormControl sx={{width: "100%"}}>
              <CustomAutocomplete
                value={numQuestions}
                onChange={setNumQuestions}
                valueKey="value"
                labelKey="label"
                options={[{label: "1", value: 1}, {label: "2", value: 2}, {label: "3", value: 3}, {label: "4", value: 4}, {label: "5", value: 5}, {label: "6", value: 6}]}
                sx={{width: "100%"}}
              />
            </CustomFormControl>
            </Div>

            <Div display="flex" justifyContent="flex-end" gap="8px">
              <CustomButton
                variant="contained"
                size="large"
                disabled={!language && !numQuestions}
                onClick={handleCreateQuiz}
                loading={contentLoading?.createQuiz === "pending"}
              >
                Generate Quiz
              </CustomButton>
            </Div>
          </Div>
        </CommonModal>
      )}
    </Div>
  );
};

export default Content;
