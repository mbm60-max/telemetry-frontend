'use client'
import { AuthProvider } from "../../components/authProvider";
import Home from "../../pages/home";
import Session from "../../pages/session";

function MyApp() {

  return (
    <AuthProvider>
      <Home></Home>
    </AuthProvider>
  );
}

export default MyApp;