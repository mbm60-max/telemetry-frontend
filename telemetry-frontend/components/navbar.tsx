import { Button } from "@mui/material";
import { Box, Container } from "@mui/system";
import Link from "next/link";

const NavBar = () => {
    return (
        <div>
            <Box sx={{ width: '100%', height: 60, backgroundColor: '#9F160C', display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
                <Button sx={{width: 150, height:25 , backgroundColor:'#1E1E1E', color:'white', borderRadius:1, ml:6}}><Link style={{ color: 'white', textDecoration: 'none' }}href={"/"}>Home</Link></Button>
                <Button sx={{width: 150, height:25 , backgroundColor:'#1E1E1E', color:'white',borderRadius:1,ml:4}}><Link style={{ color: 'white', textDecoration: 'none' }}href={"/session"}>Start Session</Link></Button>
                <Button sx={{width: 150, height:25 , backgroundColor:'#1E1E1E', color:'white',borderRadius:1,ml:4}}><Link style={{ color: 'white', textDecoration: 'none' }}href={"/review"}>Review</Link></Button>
                <Button sx={{width: 150, height:25 , backgroundColor:'#1E1E1E', color:'white',borderRadius:1,ml:'auto', mr:6}}><Link style={{ color: 'white', textDecoration: 'none' }}href={"/settings"}>Settings</Link></Button>
            </Box>
        </div>
      );
};
export default NavBar