'use client'
import { AuthProvider } from "../../components/authProvider";
import Home from "../../pages/home";
function MyApp() {
  return (
    <AuthProvider>
      <Home></Home>
    </AuthProvider>
  );
}

export default MyApp;