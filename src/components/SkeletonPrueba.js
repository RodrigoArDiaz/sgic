import { Button, Typography } from '@mui/material'
import React, { useState } from 'react';
import { Skeleton } from '@mui/material';


export default function SkeletonPrueba() {
    const [loading, setLoading] = useState(true);

    const handleClick = () =>{
        setLoading(!loading);
        console.log(loading);
    }
    return (
        <div>
            <Button variant='contained'
                onClick={handleClick}>
                Mostrar
            </Button>

            <Typography >
                        {loading ? <Skeleton></Skeleton>  : 'Carga terminada'}
            </Typography>
        </div>
    )
}
