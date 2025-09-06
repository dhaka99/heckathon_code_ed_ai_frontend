import React, { useState } from "react";
import Div from "../../../common/atoms/Div";
import Text from "../../../common/atoms/Text";
import DragAndDropFile, {
  DragAndDropConfig,
  FileWithId,
} from "../../../common/molecules/DragAndDropFIle";
import CustomCard from "../../../common/atoms/CustomCard";
import UploadIcon from "@mui/icons-material/Upload";
import { useDispatch } from "../../../domain/useCase/common/dispatchUseCase";
import { showAlert } from "../../../store/slices/alertSlice";
import CustomButton from "../../../common/atoms/CustomButton";
import { FileRejection } from "react-dropzone";
import { useNavigate } from "react-router";
import { ROUTES } from "../../../constants";

const ContentCreation: React.FC = () => {
  const [files, setFiles] = useState<FileWithId[]>([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const config: DragAndDropConfig = {
    supportedFileTypes: {
      "text/csv": [".csv"],
      "application/vnd.ms-excel": [".csv"],
      "application/csv": [".csv"],
      "application/pdf": [".pdf"],
      "text/plain": [".txt"],
      "application/json": [".json"],
      "application/msword": [".doc"],
      "application/octet-stream": [".dt"],
      "video/mp4": [".mp4"],
      "video/quicktime": [".mov"],
      "audio/mpeg": [".mp3"],
      "audio/wav": [".wav"],
    },
    maximumFileSize: "1GB",
    multiFiles: false,
    isDisable: false,
  };

  const handleFail = (rejections: FileRejection[]) => {
    let errorMessage = "";
    rejections.forEach((rejection) => {
      errorMessage += rejection.errors
        .map((error: any) => {
          if (error.code === "file-too-large") {
            return `File is larger than ${config?.maximumFileSize}`;
          } else {
            return error.message;
          }
        })
        .join(", ");
    });
    dispatch(
      showAlert({
        message: errorMessage,
        type: "error",
        show: true,
      })
    );
  };

  const handleOnSave = () => {
    const fileData = new FormData();
    fileData.append("file", files[0]);
    // dispatch(uploadExemptExamFeeListAction({ formData: fileData }));
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
          Content Creation
        </Text>
        <CustomButton
          variant="outlined"
          size="large"
          sx={{ width: "fit-content" }}
          onClick={() => {
            navigate(ROUTES.CONTENT);
          }}
        >
          Back to content list
        </CustomButton>
      </Div>
      <Div display="flex" flexDirection="column" gap="16px">
        <CustomCard
          sx={{ padding: "16px 24px", backgroundColor: "primary.200" }}
        >
          <Div display={"flex"} gap="12px" alignItems={"center"}>
            <UploadIcon sx={{ color: "primary.main" }} />
            <Text variant="h3Medium" whiteSpace={"nowrap"}>
              Upload Document to create content
            </Text>
          </Div>
        </CustomCard>

        <DragAndDropFile
          config={config}
          files={files}
          setFiles={setFiles}
          onFail={handleFail}
          fileUploaderDesc="Supported: .doc, .pdf, .txt, .json, .csv, .dt, .mp4, .mov, .mp3, .wav | max fileSize: 1GB"
        />
        <CustomButton
          variant="outlined"
          size="large"
          sx={{ width: "fit-content" }}
          onClick={handleOnSave}
          loadingPosition="end"
          disabled={!(files.length > 0)}
        >
          Save
        </CustomButton>
      </Div>
    </Div>
  );
};

export default ContentCreation;
