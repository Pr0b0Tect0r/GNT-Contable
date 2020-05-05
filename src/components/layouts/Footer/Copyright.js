import React from 'react';
import { Typography, Link } from '@material-ui/core';


function Copyright() {
    return (
        <Typography variant="body2" align="center">
            {'Copyright © '}
            <Link href="http://newtransport.net/">
                GNT Servicios generales S.A.
      </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default Copyright;