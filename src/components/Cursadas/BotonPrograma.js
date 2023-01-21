import * as React from "react";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Tooltip } from "@mui/material";
import { Grid } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined";
import LinkOffOutlinedIcon from "@mui/icons-material/LinkOffOutlined";
import { Zoom } from "@mui/material";

const isEmpty = (string) => {
  if (string == undefined) return true;
  if (string == null) return true;
  if (string.lenght == 0) return true;
  return false;
};

export const BotonPrograma = (props) => {
  const [salto, setSalto] = React.useState(props.programa);

  React.useEffect(() => {
    console.log(props.programa);
  }, []);

  return (
    <>
      {salto === undefined && (
        <Grid item xs={12} sm="auto">
          <Tooltip title="Sin programa">
            <IconButton aria-label="estado" size="small" color="success">
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Grid>
      )}
      {salto !== undefined && (
        <Grid item xs={12} sm="auto">
          {isEmpty(props.programa) ? (
            <Tooltip title="Sin programa" TransitionComponent={Zoom} arrow>
              <a href={props.programa}>
                <LinkOffOutlinedIcon sx={{ color: "text.disabled" }} />
              </a>
            </Tooltip>
          ) : (
            <Tooltip title="Ver programa" TransitionComponent={Zoom} arrow>
              <a href={props.programa} target="_blank">
                <LinkOutlinedIcon sx={{ color: "secondary.main" }} />
              </a>
            </Tooltip>
          )}
        </Grid>
      )}
    </>
  );

  /*
if (salto ==='A') 
{
    return (
      

        
        <Grid item xs={12} sm="auto">
<Tooltip title="Activa">
<IconButton aria-label="estado" size='small' color="success" onClick={()=>manejador()}>
        <CheckIcon />
      </IconButton>
      </Tooltip>
      </Grid>
      

  );}
*/
  /*
  if (salto==='B') 
  {
      return (

        
        <Grid item xs={12} sm="auto">
<Tooltip title="Baja">
<IconButton aria-label="estado2"  size='small' color="error" onClick={()=>manejador()}>
        <CloseIcon />
      </IconButton>
      </Tooltip>
      </Grid>
     
    );}
*/
};
