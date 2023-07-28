'use client'
import { AppProps } from "next/app";
import { AuthProvider } from "../components/authProvider"
import { SettingsProvider } from "../components/authProviderSettings";
import { WarningProvider } from "../components/authProviderWarnings";

function MyApp({ Component, pageProps }:AppProps) {

  return (
    <AuthProvider>
       <WarningProvider>
        <SettingsProvider>
      <Component {...pageProps} />
      </SettingsProvider>
      </WarningProvider>
    </AuthProvider>
  );
}

export default MyApp;