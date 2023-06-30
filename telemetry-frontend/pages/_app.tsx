'use client'
import { AppProps } from "next/app";
import { Component } from "react";
import { AuthProvider } from "../components/authProvider"
import Home from ".";
import Session from "./session";

function MyApp({ Component, pageProps }:AppProps) {

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;