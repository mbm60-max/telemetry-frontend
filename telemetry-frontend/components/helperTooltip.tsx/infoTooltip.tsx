import * as React from 'react';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { JsxElement } from 'typescript';
import InfoIcon from '@mui/icons-material/Info';

interface InfoToolTipProps{
    name:string;
    info:JSX.Element;
    iconColor:string;
}
const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} placement="right" arrow classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    border: '1px solid #dadde9',
  },
}));

export default function InfoToolTip({name,info,iconColor}:InfoToolTipProps) {
  return (
    <>
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">{name}</Typography>
            {info}
          </React.Fragment>
        }
      >
        <Button><InfoIcon sx={{color:iconColor}}/></Button>
      </HtmlTooltip>
    </>
  );
}