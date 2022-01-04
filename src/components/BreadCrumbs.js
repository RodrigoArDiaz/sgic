import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

function handleClick(event) {
  event.preventDefault();
  console.info('You clicked a breadcrumb.');
}

export default function BreadCrumbs() {
  // const breadcrumbs = [
  //   <Link 
  //     underline="hover"
  //     key="1" 
  //     color="inherit" 
  //     href="/" 
  //     onClick={handleClick}>
  //     SGIC
  //   </Link>,
  //   <Typography key="3" color="text.primary">
  //     Catedras
  //   </Typography>,
  // ];

  const crumbs = [
    {
      nombreRuta: "Inicio",
      href: "enlace",
    },
    {
      nombreRuta: "Inicio",
      href: "enlace",
    },
    {
      nombreRuta: "Inicio",
      href: "enlace",
    },
  ]
  

  return (
    <Stack spacing={2}>     
      <Breadcrumbs
        separator={<NavigateNextIcon fontSize="small" />}
        aria-label="breadcrumb"
      >
        {/* {breadcrumbs} */}

        {
          crumbs.map((crumb,index) => {
            return (
            
            
            
<Link 
              underline="hover"
              key="1" 
              color="inherit" 
              href="/" 
              onClick={handleClick}>
              SGIC
            </Link>
            )
          })
        }
      </Breadcrumbs>
    </Stack>
  );
}
