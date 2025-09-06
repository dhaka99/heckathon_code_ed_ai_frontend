import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import InfoIcon from "@mui/icons-material/Info";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import PauseIcon from "@mui/icons-material/Pause";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import type { BoxProps } from "@mui/material";
import type { ModalOptionType } from "../../../types/common-types";
import CommonModal from "../CommonModal/index.tsx";
import CustomButton from "../CustomButton/index.tsx";
import Div from "../Div/index.tsx";
import Text from "../Text/index.tsx";

type PropTypes = {
  children?: React.ReactNode;
  isOpen: boolean;
  title: string | React.ReactNode;
  description?: string | React.ReactNode;
  type: "warning" | "success" | "primary" | "error" | "info";
  iconType?: "warning" | "success" | "primary" | "error" | "info" | "infoBold";
  iconColor?:
    | "primary"
    | "secondary"
    | "error"
    | "warning"
    | "info"
    | "success";
  Icon?: React.ElementType;
  handleClose?: () => void;
  confirmationModal?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
  containerProps?: BoxProps;
};

/**
 * children: React.ReactNode, Rendere other things as children those are not common
 *
 * For confirmation modal there is no need to pass the action buttons
 */
const CustomModal: React.FC<PropTypes & ModalOptionType> = (props) => {
  const {
    isOpen,
    title,
    description,
    type,
    children,
    Icon,
    handleClose,
    confirmationModal,
    onCancel,
    onConfirm,
    containerProps,
    closeIcon = false,
    iconType,
    iconColor,
  } = props;

  const Icons = {
    warning: PauseIcon,
    success: CheckCircleIcon,
    primary: AssignmentTurnedInIcon,
    error: RemoveCircleIcon,
    info: InfoOutlinedIcon,
    infoBold: InfoIcon,
  };

  const Icon_ = Icons[iconType || type];

  return (
    // TODO: replace modal
    <CommonModal
      open={isOpen}
      onClose={handleClose}
      containerProps={{ width: 512, ...containerProps }}
      closeIcon={closeIcon}
    >
      {Icon ? (
        <Icon color={iconColor || type} sx={{ mb: 2, width: 36, height: 36 }} />
      ) : (
        <Icon_
          color={iconColor || type}
          sx={{ mb: 2, width: 36, height: 36 }}
        />
      )}

      {typeof title === "string" ? (
        <Text
          color={type}
          id='modal-modal-title'
          variant={confirmationModal ? "h2Medium" : "h3Bold"}
          sx={{ mb: 1 }}
        >
          {title}
        </Text>
      ) : (
        title
      )}
      {description &&
        (typeof description === "string" ? (
          <Text
            id='modal-modal-description'
            variant='body1'
            color='neutral.600'
          >
            {description}
          </Text>
        ) : (
          description
        ))}

      {confirmationModal ? (
        <Div display='flex' gap={1} justifyContent='flex-end' mt={2}>
          <CustomButton
            onClick={onConfirm}
            size='medium'
            color='primary'
            variant='outlined'
          >
            Yes, I’m sure
          </CustomButton>
          <CustomButton
            onClick={onCancel}
            size='medium'
            color='primary'
            variant='contained'
          >
            Cancel
          </CustomButton>
        </Div>
      ) : (
        children
      )}
    </CommonModal>
  );
};

export default CustomModal;
