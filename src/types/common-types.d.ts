export type RoleType = "ADMIN" | "SUPER_ADMIN";

export type ApiResponse<T> = {
  status: boolean;
  data: T;
};

export type AsyncStatusType = "idle" | "pending" | "succeeded" | "failed";

export type AlertType = "info" | "success" | "error" | "warning";

type CustomTypographyVariantTypes = OverridableStringUnion<
  Variant | "inherit",
  {
    h1Medium?: true;
    h1Bold?: true;
    h2Medium?: true;
    h2Bold?: true;
    body1Medium?: true;
    body1Bold?: true;
    body2Medium?: true;
    body2Bold?: true;
    caption1?: true;
    caption1Medium?: true;
    caption1Bold?: true;
    caption2?: true;
    caption2Bold?: true;
    supporting?: true;
    body2SemiBold?: true;
  }
>;

export type ModalOptionType = {
  isOpen: boolean;
  handleClose?: () => void;
  closeIcon?: boolean;
  onSuccessClick?: () => void;
  title?: string;
  description?: string;
};

export type CommonColorTypes =
  | "primary"
  | "success"
  | "error"
  | "info"
  | "warning";

export interface AlertState {
  show: boolean;
  title: string;
  message: string;
  type: "info" | "success" | "error" | "warning";
  alertExpirationonTime?: number | null;
}
