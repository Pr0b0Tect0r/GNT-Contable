import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
	Grid,
	CssBaseline,
	Zoom
} from '@material-ui/core';
import AppInteractionContext from 'app/context/appInteraction';
import Logo from '../../../assets/images/Logo.svg';


const useStyles = makeStyles(theme => ({
	root: {
		width: '100%',
		marginTop: theme.spacing(10),
		paddingLeft: theme.spacing(4)
	},
	bigAvatar: {
		marginLeft: 'auto',
		marginRight: 'auto',
		marginTop: theme.spacing(1),
		marginBottom: theme.spacing(1),
		width: 200,
		height: 'auto'
	},
}));


export default function Acercade() {
	const { dispatch } = React.useContext(AppInteractionContext)
	const classes = useStyles()


	const consultarAcciones = () => {
		dispatch(['acercade', '/acercade'])

	}

	React.useEffect(consultarAcciones, [])

	return (
		<React.Fragment>
			<CssBaseline />
			<Zoom in={true} timeout={500}>
				<Grid container spacing={1} className={classes.root}>
					<img alt='...' src={Logo} className={classes.bigAvatar} />
				</Grid>
			</Zoom>
		</React.Fragment>
	);
}