'use client'
import { AppProps } from "next/app";
import { AuthProvider } from "../components/authProvider"
import { SettingsProvider } from "../components/authProviderSettings";
import { WarningProvider } from "../components/authProviderWarnings";
import ThemeDiv from "../components/themeDiv";

function MyApp({ Component, pageProps }:AppProps) {

  return (
    <AuthProvider>
       <WarningProvider>
        <SettingsProvider>
          <ThemeDiv>
          <Component {...pageProps}  />
          </ThemeDiv>
      </SettingsProvider>
      </WarningProvider>
    </AuthProvider>
  );
}

export default MyApp;