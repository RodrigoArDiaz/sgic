import { Avatar } from "@mui/material";
import React from "react";

const AvatarCustom = ({
  outlined,
  valueOne,
  valueTwo,
  defineColor,
  sx,
  children,
  ...props
}) => {
  return (
    <Avatar
      {...props}
      sx={{
        width: 28,
        height: 28,
        ...(outlined && {
          fontSize: "1rem",
          fontWeight: "600",
          bgcolor: "transparent",
          border: "2px solid ",
          ...(defineColor
            ? { borderColor: defineColor, color: defineColor }
            : { borderColor: "secondary.main", color: "secondary.main" }),
          ...(valueOne && valueTwo && { fontSize: "0.8rem" }),
        }),
        ...sx,
      }}
    >
      {valueOne && valueOne.toString().charAt(0)}
      {valueTwo && valueTwo.toString().charAt(0)}
      {children}
    </Avatar>
  );
};

AvatarCustom.defaultProps = {
  outlined: false,
  defineColor: false,
};

export default AvatarCustom;
