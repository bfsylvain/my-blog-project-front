import PropTypes from "prop-types";
import { Navigate, useOutletContext } from "react-router-dom";
function ProtectedRoute({ element }) {
    const userInfo = useOutletContext();
  return userInfo ? (
    element
  ) : (
    <Navigate to="/articles" replace />
  );
}
ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};
export default ProtectedRoute;