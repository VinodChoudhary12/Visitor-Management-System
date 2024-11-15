// // PrivateRoute.js
// import { Navigate, useLocation } from "react-router-dom";
// import Swal from "sweetalert2";

// const PrivateRoute = ({ children, allowedRoles, path }) => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     const location = useLocation();

//     // Define routes restricted to only "SECURITY" role
//     const securityOnlyRoutes = ["/today-all-meetings", "/scan"];

//     // Check if user exists and has a matching role
//     if (!user || !allowedRoles.includes(user.role.toUpperCase())) {
//         Swal.fire({
//             icon: "warning",
//             title: "Unauthorized Access",
//             text: "You are not authorized to access this page.",
//         });
//         return <Navigate to="/login" replace />;
//     }

//     // Restrict non-security roles from accessing security-only routes
//     if (securityOnlyRoutes.includes(path) && user.role.toUpperCase() !== "SECURITY") {
//         Swal.fire({
//             icon: "warning",
//             title: "Access Restricted",
//             text: "You do not have permission to access this page.",
//         });
//         return <Navigate to="/" replace />;
//     }

//     return children;
// };

// export default PrivateRoute;
