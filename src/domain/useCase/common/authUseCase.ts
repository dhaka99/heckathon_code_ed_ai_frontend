import { LOCAL_STORAGE_KEYS } from "../../../constants/local-storage-keys";
import { useNavigate } from "react-router";
// import { routes } from "../../../routes/AuthRoutes";
import useSelector from "./selectorUseCase";
import { useDispatch } from "./dispatchUseCase";
import { loginAction, logout } from "../../../store/slices/authSlice";
import type { LoginFormValues } from "../../../presentation/pages/LoginPage/form-helpers";

const useAuth = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const login = async ({ username, password }: LoginFormValues) => {
    try {
      const data = await dispatch(loginAction({ username, password }));
      if (loginAction.rejected.match(data)) {
        // TODO: handle error/show toast messages
        // alert(`Login failed: ${data.payload}`);
        return;
      }
      const response = data.payload.data;
      localStorage.setItem(LOCAL_STORAGE_KEYS.TOKEN, response.token);
      // const role = response!.role!;
      navigate("/");
      // navigate(routes[role]);
    } catch (error) {
      throw error;
    }
  };
  const handleLogout = () => {
    localStorage.removeItem(LOCAL_STORAGE_KEYS.TOKEN);
    // Reset auth state
    dispatch(logout());
    // Redirect to login
    navigate("/login");
  };

  return { auth, login, logout: handleLogout };
};

export default useAuth;
