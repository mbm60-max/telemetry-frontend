import React from 'react';
import BoringAvatar from 'boring-avatars';

interface UserAvatarProps{
    name:string;
    variant:"marble" | "beam" | "pixel" | "sunset" | "ring" | "bauhaus" | undefined;
    size:number;
}
function UserAvatar({name,variant,size}:UserAvatarProps) {
  return (
    <div className="user-avatar">
      <BoringAvatar
        size={size}
        name={name} // The name to generate the avatar based on
        variant={variant} // Choose from "marble", "beam", "pixel", "sunset", and more
      />
    </div>
  );
}

export default UserAvatar;