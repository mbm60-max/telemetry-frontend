'use client'
import { AppProps } from "next/app";
import { AuthProvider } from "../components/authProvider"
import { WarningProvider } from "../components/authProviderWarnings";

function MyApp({ Component, pageProps }:AppProps) {

  return (
    <AuthProvider>
       <WarningProvider>
      <Component {...pageProps} />
      </WarningProvider>
    </AuthProvider>
  );
}

export default MyApp;