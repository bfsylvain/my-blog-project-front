import PropTypes from "prop-types";
import { Navigate, useOutletContext } from "react-router-dom";
function ProtectedRoute({ element }) {
    const userInfo = useOutletContext();
    console.log(userInfo);
  return userInfo ? (
    element
  ) : (
    <Navigate to="/articles" replace />
  );
}
ProtectedRoute.propTypes = {
  element: PropTypes.elementType.isRequired,
};
export default ProtectedRoute;