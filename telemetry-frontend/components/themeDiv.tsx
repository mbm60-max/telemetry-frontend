import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { SettingsContext } from './authProviderSettings';
interface ThemeDivProps{
children:React.ReactNode
}
export default function ThemeDiv({children}:ThemeDivProps) {
    const {appearance} = React.useContext(SettingsContext);
    const theme = (appearance.lightModeEnabled === true ? "light" : "dark")
  return (
    <div id={theme}>{children}</div>
  );
}