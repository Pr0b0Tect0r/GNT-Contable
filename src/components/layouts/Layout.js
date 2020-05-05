import React, { Suspense } from 'react';
import Cabecera from './Topbar';
import { Paper } from '@material-ui/core';
// import { useHistory } from 'react-router-dom';
import Footer from './Footer/Footer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Menu from './Sidebar';
import { makeStyles } from '@material-ui/core/styles';
import AppInteractionContext from 'app/context/appInteraction';
// import { AuthTokenRequest } from 'helpers/AxiosInstance';
import Routes from 'routes/Router'


function Layout() {
	const { interactions } = React.useContext(AppInteractionContext)

	// let location = useHistory()

	const useStyles = makeStyles(theme => ({
		root: {
			width: 'auto',
			paddingBottom: theme.spacing(5),
			marginRight: 'auto',
			marginLeft: interactions.menuOpen === true ? theme.spacing(27) : 'auto',
			[theme.breakpoints.down(768 + theme.spacing(2) * 2)]: {
				marginLeft: 'auto'
			}
		},
		speedDial: {
			position: 'fixed',
			bottom: theme.spacing(7),
			right: theme.spacing(2),
		}
	}));
	const classes = useStyles()

	// const consultar = () => {
	// 	if (localStorage.getItem('token')) {
	// 		AuthTokenRequest.get('/api/usuario/obtener')
	// 			.then(resp => {
	// 				const status = resp.status || resp.response.status
	// 				if (status !== 200)
	// 					location.push('/401')

	// 			})
	// 			.catch(err => {
	// 				location.push('/401')
	// 			})
	// 	}
	// }

	// React.useEffect(consultar, [])


	return (
		<React.Fragment>
			<CssBaseline />
			<div className="app">
				<Paper elevation={4}>
					<Suspense>
						<Cabecera />
					</Suspense>
				</Paper>
				<Suspense style={{ position: 'fixed' }}>
					<Menu />
				</Suspense>

				<main className={classes.root}>
					<Suspense>
						<Routes />
					</Suspense>
				</main>
				<Suspense >
					<Footer />
				</Suspense>
			</div>
		</React.Fragment>
	);
}
export default Layout;