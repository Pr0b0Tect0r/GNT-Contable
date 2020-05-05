import React from 'react';
import { CssBaseline, Container } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Copyright from './Copyright'


const useStyles = makeStyles(theme => ({
	root: {
		display: 'flex',
		flexDirection: 'column'
	},
	main: {
		marginTop: theme.spacing(8),
		marginBottom: theme.spacing(2),
	},
	footer: {
		padding: theme.spacing(2),
		marginTop: 'auto',
		backgroundColor: theme.palette.background.default,
		position: 'fixed',
		bottom: 0,
		width: '100%'
	},
}));

export default function StickyFooter() {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			<CssBaseline />
			<footer className={classes.footer}>
				<Container maxWidth="sm">
					<Copyright />
				</Container>
			</footer>
		</div>
	);
}