import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { APP } from 'constants/app';


const useStyles = makeStyles(theme => ({
    root: {
        marginTop: theme.spacing(8)
    }
}));

export default function InfoAcercade() {
    const classes = useStyles()


    return (
        <React.Fragment>
            <CssBaseline />
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={2} />
                <Grid item xs={8}>
                    <Typography variant='h5' align='center'>{`${APP.APP_NAME} ${APP.APP_VERSION}`}</Typography>
                </Grid>
                <Grid item xs={2} />
            </Grid>
        </React.Fragment>
    );
}