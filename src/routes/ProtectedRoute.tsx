import { Navigate, Outlet } from "react-router";
// import useAuth from "../domain/useCase/common/authUseCase.ts";
import type { RoleType } from "../types/common-types";
import { LOCAL_STORAGE_KEYS } from "../constants/local-storage-keys";
import { ROUTES } from "../constants";
import useAuth from "../domain/useCase/common/authUseCase";

interface PropTypes {
  roles: RoleType[];
}

const ProtectedRoute: React.FC<PropTypes> = ({ roles }) => {
  // 🚀 Get user from store (Replace with actual selector)
  const { auth } = useAuth();
  const user = auth.user;
  const token = localStorage.getItem(LOCAL_STORAGE_KEYS.TOKEN);
  // 🔒 Check authentication
  if (!token || !user) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  const userRoles = [user.role];
  const canAccess = userRoles?.some((userRole) => roles.includes(userRole!));
  // ⛔ Check authorization
  if (roles.length > 0 && !canAccess) {
    return <Navigate to='*' replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
