

import * as React from 'react';
//import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import {ModificarPractico} from './ModificarPractico';
//import {ListarIntegrantes} from './ListarIntegrantes';
//import {InscribirEnGrupo} from './InscribirEnGrupo';
import {BorrarPractico} from './BorrarPractico';
export const BotonAcciones = (props) => {


       

    return (


    <Stack direction="row">
<ModificarPractico/>
<BorrarPractico cambio={'1'}/>

    </Stack>
  );

}
