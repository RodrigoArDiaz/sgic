

import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Tooltip } from '@mui/material';
import {  Grid } from '@mui/material';


export const BotonGrupo = (props) => {


    const [salto, setSalto] = React.useState(props.grupos); 


return (<>
  {(salto==='S') &&<Grid item xs={12} sm="auto">
<Tooltip title="Permitido">
<IconButton aria-label="estado" size='small' color="success" >
        <CheckIcon />
      </IconButton>
      </Tooltip>
      </Grid>
  }
  {(salto==='N') &&<Grid item xs={12} sm="auto">
<Tooltip title="No permitido">
<IconButton aria-label="estado2"  size='small' color="error" >
        <CloseIcon />
      </IconButton>
      </Tooltip>
      </Grid>
  }

  </>

);
}