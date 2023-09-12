import { Box } from '@mui/material';
import React from 'react';

interface SvgRendererProps {
    svgString: string;
    className?: string;
    style?: React.CSSProperties;
  }
function SvgRenderer({ svgString,className, style  }: SvgRendererProps) {
  return (
    <div className={`svg-renderer ${className}`} style={style}>
      <div dangerouslySetInnerHTML={{ __html: svgString }} />
    </div>
  );
}

export default SvgRenderer;
