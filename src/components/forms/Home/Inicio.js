import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import AppInteractionContext from 'app/context/appInteraction';


const useStyles = makeStyles((theme) => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(8),
		paddingLeft: theme.spacing(4)
	},
	usuarios: {
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1)
	}
}));

export default function Inicio() {
	const { dispatch } = React.useContext(AppInteractionContext)
	const classes = useStyles()

	const consultarAcciones = () => {
		dispatch(['inicio', window.location.pathname])
	}

	React.useEffect(consultarAcciones, [])


	return (
		<React.Fragment>
			<CssBaseline />
			<Grid container spacing={1} className={classes.root} />
		</React.Fragment>
	);
}