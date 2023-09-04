'use client'
import { AppProps } from "next/app";
import { AuthProvider } from "../components/authProvider"
import { SettingsProvider } from "../components/authProviderSettings";
import { WarningProvider } from "../components/authProviderWarnings";
import ThemeDiv from "../components/themeDiv";

function MyApp({ Component, pageProps }:AppProps) {

  return (
    <AuthProvider>
      <SettingsProvider>
       <WarningProvider>
        
          <ThemeDiv>
          <Component {...pageProps}  />
          </ThemeDiv>
      
      </WarningProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}

export default MyApp;