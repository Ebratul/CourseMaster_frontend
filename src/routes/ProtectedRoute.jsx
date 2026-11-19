import { Navigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getToken } from "../utils/auth";
import { getMe } from "../services/auth.api";

export default function ProtectedRoute({ children }) {
  const token = getToken();
  // null = still checking; no token means we already know the answer
  const [isValid, setIsValid] = useState(token ? null : false);
  const location = useLocation();

  useEffect(() => {
    if (!token) return;

    // Verify the token with the server; any failure means the user must log in again
    let cancelled = false;
    getMe()
      .then(() => !cancelled && setIsValid(true))
      .catch(() => !cancelled && setIsValid(false));
    return () => {
      cancelled = true;
    };
  }, [token]);

  if (isValid === null) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (!isValid) {
    return <Navigate to="/login" replace state={{ from: location.pathname }} />;
  }

  return children;
}
