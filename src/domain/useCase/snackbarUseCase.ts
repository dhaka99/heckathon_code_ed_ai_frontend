import { useCallback } from "react";
import { hideAlert, showAlert } from "../../store/slices/alertSlice.ts";
import type { AlertState } from "../../types/common-types";
import { useDispatch } from "./common/dispatchUseCase.ts";
import useSelector from "./common/selectorUseCase.ts";

const useAlertSnackbar = () => {
  const dispatch = useDispatch();
  const alertState = useSelector((state) => state.alert);

  const openSnackbar = useCallback(
    (data: Partial<AlertState>) => {
      dispatch(
        showAlert({
          show: true,
          ...data,
        }),
      );
    },
    [dispatch],
  );

  const closeSnackbar = useCallback(() => {
    dispatch(hideAlert());
  }, [dispatch]);

  return {
    openSnackbar,
    closeSnackbar,
    alertState,
  };
};

export default useAlertSnackbar;
