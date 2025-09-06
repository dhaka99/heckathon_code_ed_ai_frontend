import CloseIcon from "@mui/icons-material/Close";
import { type BoxProps, type IconButtonProps, Modal } from "@mui/material";
import CustomIconButton from "../CustomIconButton/index.tsx";
import Div from "../Div/index.tsx";

type PropTypes = {
  children: React.ReactNode;
  onClose?: () => void;
  open: boolean;
  closeIcon?: boolean;
  onBackdropClick?: () => void;
  containerProps?: BoxProps;
  closeIconButtonProps?: IconButtonProps;
  slotProps?: React.ComponentProps<typeof Modal>["slotProps"];
};

const CommonModal: React.FC<PropTypes> = (props) => {
  const {
    open,
    onClose,
    children,
    closeIcon,
    onBackdropClick,
    containerProps,
    closeIconButtonProps,
    slotProps,
  } = props;
  return (
    <Modal
      open={open}
      onClose={onBackdropClick}
      disableAutoFocus
      disableRestoreFocus
      slotProps={slotProps}
    >
      <Div
        position='absolute'
        top='50%'
        left='50%'
        bgcolor='background.paper'
        borderRadius='6px'
        border={(theme) => `1px solid ${theme.palette.neutral[400]}`}
        boxShadow={24}
        p={3}
        sx={{
          transform: "translate(-50%, -50%)",
          ...containerProps?.sx,
        }}
        {...containerProps}
      >
        {closeIcon && (
          <CustomIconButton
            onClick={onClose}
            size='small'
            {...closeIconButtonProps}
            sx={{
              position: "absolute",
              top: 10,
              right: 10,
              color: "neutral.700",
              ...closeIconButtonProps?.sx,
            }}
          >
            <CloseIcon fontSize='small' />
          </CustomIconButton>
        )}

        {children}
      </Div>
    </Modal>
  );
};

export default CommonModal;
