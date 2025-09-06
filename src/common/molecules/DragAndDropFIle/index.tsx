import React, { useEffect, useState } from "react";
import { DropzoneOptions, FileRejection, useDropzone } from "react-dropzone";
import { v4 as uuidv4 } from "uuid";
import Div from "../../atoms/Div";
import CustomButton from "../../atoms/CustomButton";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import Text from "../../atoms/Text";
import { List, ListItem } from "@mui/material";

export interface FileWithId extends File {
  id: string;
}

export interface DragAndDropConfig {
  supportedFileTypes: Record<string, string[]>;
  multiFiles?: boolean;
  maximumFileSize?: string | null;
  isDisable?: boolean;
  fileUploaderDesc?: string;
}

interface DragAndDropFileProps {
  config?: DragAndDropConfig;
  validation?: (file: File) => null | { code: string; message: string };
  onSuccess?: (acceptedFiles: File[], allFiles: FileWithId[]) => void;
  onFail?: (fileRejections: FileRejection[]) => void;
  // onUploadButtonClick?: (files: FileWithId[]) => void;
  files: FileWithId[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithId[]>>;
  inputProps?: Record<string, string>;
  fileUploaderLabel?: React.ReactNode;
  fileUploaderDesc?: string;
  fileUploaderListRemove?: string;
  // uploadFilesText?: string;
  clearAllText?: string;
  removeIcon?: React.ReactNode;
  // uploadButtonText?: string;
  disableDeleteAction?: boolean;
  isFailedRecords?: boolean;
}

const DragAndDropFile: React.FC<DragAndDropFileProps> = ({
  config = {
    supportedFileTypes: {},
    multiFiles: true,
    maximumFileSize: null,
    isDisable: false,
  },
  validation = () => null,
  onSuccess = () => {},
  onFail = () => {},
  // onUploadButtonClick = () => {},
  files = [],
  setFiles = () => {},
  inputProps = { "data-testid": "file-upload-input-field" },
  fileUploaderLabel = (
    <Text textAlign='center' variant='body1SemiBold' color='neutral.700'>
      Drag & drop files or{" "}
      <Div component='span' color='primary.main'>
        Browse
      </Div>
    </Text>
  ),
  fileUploaderDesc = "Supported formats: JPEG, PNG",
  fileUploaderListRemove = "",
  // uploadFilesText = "Uploaded files",
  clearAllText = "Clear All",
  removeIcon = <DeleteOutlineOutlinedIcon />,
  // uploadButtonText = "Upload",
  disableDeleteAction = false,
  isFailedRecords = false,
}) => {
  const {
    supportedFileTypes = {},
    multiFiles = true,
    maximumFileSize = null,
    isDisable = false,
  } = config;
  const [maxSize, setMaxSize] = useState<number>(0);

  /**
   * @description converting the string value to bytes.
   */
  function toBytes(value: string): number {
    const formattedFileSize = value.split(/([0-9]+)/).filter(Boolean);
    const size = parseInt(formattedFileSize[0]);
    const type = formattedFileSize[1] ? formattedFileSize[1] : "kb";
    const types = ["B", "KB", "MB", "GB", "TB"];
    const key = types.indexOf(type.toUpperCase());
    if (key !== -1) {
      return size * Math.pow(1024, key);
    }
    return 0;
  }
  /**
   * @description based on the maximumFileSize updating component state [maxState] and need to * *   called the function only once.
   */
  useEffect(() => {
    if (maximumFileSize) {
      const maxSize = toBytes(maximumFileSize);
      setMaxSize(maxSize);
    } else {
      setMaxSize(0);
    }
  }, [maximumFileSize]);

  const dropzoneOptions: DropzoneOptions = {
    accept: supportedFileTypes,
    multiple: multiFiles,
    disabled: isDisable,
    maxSize: maxSize,
    validator: validation,
  };
  /**
   * @description dropzone hook.
   */
  const {
    acceptedFiles,
    getRootProps,
    getInputProps,
    fileRejections,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone(dropzoneOptions);

  /**
   * @description based on fileRejection variable change updating the onFail function.
   */
  useEffect(() => {
    if (fileRejections.length) {
      onFail([...fileRejections]);
    }
  }, [fileRejections]);

  /**
   * @description function to remove the file from the file list.
   */
  const removeFile = (fileToRemove: FileWithId): void => {
    setFiles((prevFiles) =>
      prevFiles.filter((file) => file.id !== fileToRemove.id),
    );
  };

  /**
   * @description based on acceptedFiles change  updating onSuccess function and returning all uploaded list.
   */
  useEffect(() => {
    if (acceptedFiles.length) {
      let allFiles: FileWithId[] = [...files];
      // Convert acceptedFiles to FileWithId array
      const newFiles: FileWithId[] = acceptedFiles.map((file) => {
        // Create a new object that combines File properties with id
        return Object.assign(file, { id: uuidv4() });
      });
      // Add new files to allFiles array
      allFiles.push(...newFiles);

      onSuccess([...acceptedFiles], allFiles);
      if (multiFiles) {
        setFiles(allFiles);
      } else {
        setFiles([allFiles[allFiles.length - 1]]);
      }
    }
  }, [acceptedFiles]);

  /**
   * @description clearing all files from the file state.
   */
  const clearAllFiles = () => {
    setFiles([]);
  };

  const filesList = files.map((file, idx) => (
    <ListItem
      key={file.id}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "10px",
        padding: 0,
      }}
    >
      <Text
        sx={{
          backgroundColor: "neutral.main",
          padding: "10px",
          borderRadius: "4px",
          width: "100%",
          borderBottom: "1px solid",
          borderColor: isFailedRecords ? "error.main" : "primary.main",
        }}
      >
        {file.name}
      </Text>

      <CustomButton
        data-testid={`remove-file-${idx}`}
        onClick={() => removeFile(file)}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          color: "error.main",
          padding: 0,
          minWidth: "auto",
        }}
        disabled={disableDeleteAction}
      >
        {removeIcon}
        <span className='removeTitle'>{fileUploaderListRemove}</span>
      </CustomButton>
    </ListItem>
  ));

  const getDropzoneClassName = (): string => {
    return `dropzone
      ${isFocused ? "focused" : ""}
      ${isDragAccept ? "accept" : ""}
      ${isDragReject ? "reject" : ""}
    `.trim();
  };

  return (
    <Div
      bgcolor={isFailedRecords ? "error.100" : "primary.100"}
      border={(theme) =>
        `1px dashed ${isFailedRecords ? theme.palette.error.main : theme.palette.primary.main}`
      }
      borderRadius='6px'
      p={"36px"}
      sx={{ cursor: "pointer" }}
    >
      <section
        {...getRootProps({ isFocused, isDragAccept, isDragReject })}
        data-testid='upload-input-area'
        className={getDropzoneClassName()}
      >
        <input {...getInputProps()} {...inputProps} />
        {fileUploaderLabel}
        <Text textAlign='center' variant='caption1' color='neutral.600'>
          {fileUploaderDesc}
        </Text>
      </section>
      {files.length ? (
        <Div data-testid='uploaded-list' sx={{ paddingTop: "14px" }}>
          <aside>
            <Div>
              {/* <h4>{uploadFilesText}</h4> */}
              {files.length > 1 ? (
                <CustomButton
                  variant='outlined'
                  sx={{ borderColor: "error.main", color: "error.main" }}
                  onClick={clearAllFiles}
                  disabled={disableDeleteAction}
                >
                  {clearAllText}
                </CustomButton>
              ) : null}
            </Div>
            <List
              sx={{ display: "flex", flexDirection: "column", gap: "10px" }}
            >
              {filesList}
            </List>
          </aside>
          {/* <Div className='uploadButton'>
            <CustomButton
              variant='contained'
              onClick={() => {
                onUploadButtonClick(files);
              }}
            >
              {uploadButtonText}
            </CustomButton>
          </Div> */}
        </Div>
      ) : null}
    </Div>
  );
};

export default DragAndDropFile;
