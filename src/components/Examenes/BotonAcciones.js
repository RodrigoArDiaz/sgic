

import * as React from 'react';
//import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {ModificarExamen} from './ModificarExamen';
//import {ListarIntegrantes} from './ListarIntegrantes';
//import {InscribirEnGrupo} from './InscribirEnGrupo';
import {BorrarExamen} from './BorrarExamen';
export const BotonAcciones = (props) => {


       

    return (


    <Stack direction="row">
<ModificarExamen/>
<BorrarExamen cambio={'1'}/>

    </Stack>
  );

}
