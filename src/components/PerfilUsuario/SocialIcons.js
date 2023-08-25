import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import PermContactCalendarOutlinedIcon from "@mui/icons-material/PermContactCalendarOutlined";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import PhoneIcon from "@mui/icons-material/Phone";

export const SocialIcons = ({ name }) => {
  switch (name.toLowerCase()) {
    case "facebook":
      return <FacebookIcon sx={{ color: "#3b5998" }} />;
      break;

    case "whatsapp":
      return <WhatsAppIcon sx={{ color: "#25D366" }} />;
      break;

    case "github":
      return <GitHubIcon sx={{ color: "#171515" }} />;
      break;

    case "linkedin":
      return <LinkedInIcon sx={{ color: "#0077b5" }} />;
      break;

    case "twitter":
      return <TwitterIcon sx={{ color: "#1DA1F2" }} />;
      break;

    case "gmail":
      return <MailOutlineIcon sx={{ color: "#c71610" }} />;
      break;

    case "hotmail":
      return <MailOutlineIcon sx={{ color: "#1DA1F2" }} />;
      break;

    case "outlook":
      return <MailOutlineIcon sx={{ color: "#0072C6" }} />;
      break;

    case "telefono":
      return <PhoneIcon sx={{ color: "#0d47a1" }} />;
      break;

    case "correo":
      return <MailOutlineIcon sx={{ color: "#0d47a1" }} />;
      break;

    case "email":
      return <MailOutlineIcon sx={{ color: "#0d47a1" }} />;
      break;

    default:
      return <PermContactCalendarOutlinedIcon sx={{ color: "#0d47a1" }} />;
      break;
  }
};
