import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";
import InfoIcon from "@mui/icons-material/Info";
import WarningIcon from "@mui/icons-material/Warning";
import type { JSX } from "react";
import Text from "../../atoms/Text/index.tsx";
import Div from "../../atoms/Div/index.tsx";
import CustomIconButton from "../../atoms/CustomIconButton/index.tsx";
import Snackbar from "../../atoms/Snackbar/index.tsx";
import useAlertSnackbar from "../../../domain/useCase/snackbarUseCase.ts";

const variantStyles: {
  [key: string]: {
    bgcolor: string;
    borderColor: string;
    icon: JSX.Element;
  };
} = {
  success: {
    bgcolor: "success.100",
    borderColor: "success.main",
    icon: <CheckBoxIcon color='success' />,
  },
  error: {
    bgcolor: "error.100",
    borderColor: "error.main",
    icon: <ErrorIcon color='error' />,
  },
  info: {
    bgcolor: "info.100",
    borderColor: "info.main",
    icon: <InfoIcon color='info' />,
  },
  warning: {
    bgcolor: "warning.100",
    borderColor: "warning.main",
    icon: <WarningIcon color='warning' />,
  },
};

const AlertSnackbar: React.FC = () => {
  const { closeSnackbar, alertState } = useAlertSnackbar();
  const { show, title, message, type, alertExpirationonTime } = alertState;

  const style: {
    bgcolor: string;
    borderColor: string;
    icon: JSX.Element;
  } = variantStyles[type];

  return (
    <Snackbar
      open={show}
      autoHideDuration={alertExpirationonTime || 3000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      onClose={closeSnackbar}
    >
      <Div
        width={342}
        padding={1.5}
        border={1}
        borderRadius='12px'
        bgcolor={style.bgcolor}
        borderColor={style.borderColor}
        position='relative'
      >
        <Div display='flex' gap={1.5}>
          <Div>{style.icon}</Div>

          <Div>
            <Text color='neutral.700' variant='body2SemiBold'>
              {title}
            </Text>
            <Text variant='caption1' mt={0.5}>
              {message}
            </Text>
          </Div>
        </Div>

        <CustomIconButton
          size='small'
          onClick={closeSnackbar}
          sx={{ position: "absolute", top: "8px", right: "8px" }}
        >
          <CloseIcon
            sx={{
              fontSize: "15px",
              color: (theme) => theme.palette.neutral[500],
            }}
          />
        </CustomIconButton>
      </Div>
    </Snackbar>
  );
};

export default AlertSnackbar;
