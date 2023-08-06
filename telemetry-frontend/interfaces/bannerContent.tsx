import { ReactNode, ElementType } from 'react'; 
export default interface BannerInterface {
    title:string;
    titleSize:number;
    titleFontStyle:string;
    titleFontWeight:string;
    body:string[];
    bodySize:number[];
    bodyFontStyle:string;
    bodyFontWeight:string;
    customIcon: ElementType;
    ctaButton: JSX.Element;
    ctaTarget:string;
  }