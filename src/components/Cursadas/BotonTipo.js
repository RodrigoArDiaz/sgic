import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import { Tooltip } from '@mui/material';
import {  Grid } from '@mui/material';
import HdrAutoIcon from '@mui/icons-material/HdrAuto';
import LayersIcon from '@mui/icons-material/Layers';

export const BotonTipo = (props) => {

    const [salto, setSalto] = React.useState(props.tipo); 

return (<>
  {(salto==='P') &&<Grid item xs={12} sm="auto">
<Tooltip title="Promediable">
<IconButton aria-label="estado" size='small' color="success" >
        <LayersIcon />
      </IconButton>
      </Tooltip>
      </Grid>
  }
  {(salto==='A') &&<Grid item xs={12} sm="auto">
<Tooltip title="Acumulable">
<IconButton aria-label="estado2"  size='small' color="success" >
        <HdrAutoIcon />
      </IconButton>
      </Tooltip>
      </Grid>
  }
  
  </>

);

}
