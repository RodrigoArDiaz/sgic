import React from "react";
import { Chip, IconButton, Tooltip, Typography, Zoom } from "@mui/material";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import CopiarButton from "../../CopiarButton";
import { isValidUrl } from "../../../helpers/valiidarUrl";

/*** Componente ECVisual ***/
export default function ECVisual({ label, type, ...props }) {
  React.useEffect(() => {
    console.log(props.valor);
  }, []);

  return (
    <>
      {props.valor == "-" || props.valor.trim() == "" ? (
        <Chip label={label} variant="outlined" color={type} />
      ) : (
        <>
          <Typography variant="body1">{props.valor}</Typography>

          {isValidUrl(props.valor) && (
            <Tooltip
              title={"Ir a " + props.valor}
              TransitionComponent={Zoom}
              arrow
              placement="top"
            >
              <IconButton color="secondary">
                <LinkOffOutlinedIcon
                  onClick={() => {
                    window.open(props.valor, "_blank");
                  }}
                />
              </IconButton>
            </Tooltip>
          )}

          <CopiarButton textoCopiar={props.valor} />
        </>
      )}
    </>
  );
}
