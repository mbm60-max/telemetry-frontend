'use client'
import { Box, Button } from '@mui/material';
import { useRouter } from 'next/router';
import React from 'react';
import Homepage from '../components/background/background';
import SessionTabs from '../components/sessionTabs/sessiontabs';
import SettingsWrapper from '../components/settings/settingsWrapper';
const Settings = () => {
  const router = useRouter();
  function handleExitReview(){
      router.push('/')
    }
return (
  <>
<SettingsWrapper/>
  </>
     
);
};
export default Settings