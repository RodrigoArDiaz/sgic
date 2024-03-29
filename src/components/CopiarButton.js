import React, { useState } from "react";
//MUI
import { IconButton, Tooltip, Zoom } from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

/*** Componente CopiarButton ***/
const CopiarButton = ({ textoCopiar }) => {
  const [copiar, setCopiar] = useState(false);
  return (
    <Tooltip
      title={copiar ? "¡Copiado!" : "Copiar"}
      TransitionComponent={Zoom}
      onBlur={() => setCopiar(false)}
      arrow
      placement="left"
    >
      <span>
        <IconButton
          size="small"
          color="secondary"
          sx={{ mr: "0.3rem" }}
          onClick={() => {
            navigator.clipboard.writeText(textoCopiar);
            setCopiar(true);
          }}
        >
          <ContentCopyIcon fontSize="small" />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default CopiarButton;
