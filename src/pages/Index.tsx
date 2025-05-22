
import { Navigate } from "react-router-dom";

// Forward the index page to the dashboard
const Index = () => {
  return <Navigate to="/dashboard" replace />;
};

export default Index;
