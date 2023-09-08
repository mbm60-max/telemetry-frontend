import {
    Box,
    Button,
    Divider,
    Grid,
    styled,
    Typography,
  } from "@mui/material";
import SeriousActionModal from "./seriousChangeWarningModal";
import SeriousActionAddModal from "./seriousChangeWarningModal";

  
  interface SeriousActionButtonProps {
    targetSetting: string;
    hasDivider: boolean;
    tooltipText:string;
    username:string;
    warningMessage:string;
    action:string;
  }
  const StyledHorizontalDivider = styled(Divider)(({ theme }) => ({
      borderWidth: "1px", // Adjust the thickness of the line here
      borderColor: "#EBF2E8", // You can change the color to any valid CSS color value
    width:'99%',
    }));
  
  const SeriousActionButton= ({
    targetSetting,
    hasDivider,
    tooltipText,
    username,
    warningMessage,
    action,
  }: SeriousActionButtonProps) => {

    const tooltipInfo = (
        <>
          <em>
              {tooltipText}
          </em>
        </>
      );
    return (
        <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
        <Grid container spacing={2} alignItems="center">
        <Grid item xs={12}>
            <Typography sx={{ fontSize: 30 }} fontWeight="Bold">
             {targetSetting}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography sx={{ fontSize: 20 }} fontWeight="Bold">
              {warningMessage}
            </Typography>
          </Grid>
          <Grid item xs={12}>
          <SeriousActionModal action={action}/>
          </Grid>
          {hasDivider && <Grid item xs={12}>
           <StyledHorizontalDivider/>
           </Grid>}
         
        </Grid>
      </Box>
    );
  };
  
  export default SeriousActionButton;