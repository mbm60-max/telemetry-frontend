'use client'
import dynamic from "next/dynamic";
import { AuthProvider } from "../../components/authProvider";
import Home from "../../pages/home";


function MyApp() {
  // Get the current pathname from the window object
  const { pathname } = window.location;
  const DynamicSession = dynamic(() => import("../../pages/session"), {
    ssr: false,
  });
  // Determine the current route and render the corresponding component
  const renderPage = () => {
    
    return <Home />;
  };

  return <AuthProvider>{renderPage()}</AuthProvider>;
}

export default MyApp;
