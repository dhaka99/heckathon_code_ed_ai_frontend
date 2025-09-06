import { Navigate, Outlet } from "react-router";
import type { RoleType } from "../types/common-types";
import useAuth from "../domain/useCase/common/authUseCase";

interface PublicRouteGuard {
  children?: React.ReactNode;
  roles: RoleType[];
}
const PublicRoute: React.FC<PublicRouteGuard> = ({ children }) => {
  const token = localStorage.getItem("token");
  const { auth } = useAuth();
  const user = auth.user;
  if (token && user) {
    return <Navigate to={"/"} replace />;
  }
  return <>{children ? children : <Outlet />}</>;
};
export default PublicRoute;
