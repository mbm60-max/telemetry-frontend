import Avatar from '@mui/material/Avatar'

interface CustomAvatarProps{
    pfpSVG:string;
    hasBadge?:boolean;
}
const CustomAvatar = ({ pfpSVG }:CustomAvatarProps) => {
    return (
      <Avatar alt="User Avatar">
        <img src={`data:image/svg+xml;base64,${btoa(pfpSVG)}`} alt="User Avatar" />
      </Avatar>
    );
  };

  export default CustomAvatar