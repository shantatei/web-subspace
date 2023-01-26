import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { AppRoute } from "../utils/routes";

const RequireAuth = () => {
  const isAuth = useSelector((state: RootState) => state.auth.isAuth);
  const location = useLocation();

  return isAuth ? (
    <Outlet />
  ) : (
    <Navigate to={AppRoute.Home} state={{ from: location }} replace />
  );
};

export default RequireAuth;
