import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks.ts";
function ProtectedRoute({ element }) {
    const userRTK = useAppSelector((state) => state.auth)
  return userRTK.id ? (
    element
  ) : (
    <Navigate to="/articles" replace />
  );
}
ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};
export default ProtectedRoute;