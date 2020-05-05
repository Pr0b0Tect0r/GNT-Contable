import React from 'react';
import { Snackbar, Typography } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(() => ({
	snack: {
		opacity: '0.8',
		width: '90%'
	}
}));

function Alerta(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Alert(props) {
	const classes = useStyles()
	const { openAlert, closeAlert, mensaje, severity } = props

	return (
		<>
			<Snackbar
				anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
				open={openAlert} autoHideDuration={3000}
				onClose={closeAlert}
				className={classes.snack}>
				<Alerta onClose={closeAlert} severity={severity}>
					<Typography variant='button'>{mensaje}</Typography>
				</Alerta>
			</Snackbar>
		</>
	);

}