import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AppInteractionContextProvider } from './context/appInteraction';
import { LoginContextProviders } from './context/loginContext';
import { ThemeContextProviders } from './context/themeContext';
import { Box, CircularProgress } from '@material-ui/core';

const loading = () => {
	return (
		<Box position="absolute" top="50%" left="50%">
			<CircularProgress color='primary' />
		</Box>
	);
}

function App() {
	const Login = React.lazy(() => import('../components/forms/Login'));
	const Layout = React.lazy(() => import('../components/layouts'));
	const Page401 = React.lazy(() => import('../components/views/errors'))

	return (
		<LoginContextProviders>
			<AppInteractionContextProvider>
				<ThemeContextProviders>
					<Router>
						<React.Suspense fallback={loading()}>
							<Switch>
								<Route exact path='/login' name='Login' render={props => <Login {...props} />} />
								<Route exact path='/401' name='Unauthorized' render={props => <Page401 {...props} />} />
								<Route path='/' name='Layout' render={props => <Layout {...props} />} />
							</Switch>
						</React.Suspense>
					</Router>
				</ThemeContextProviders>
			</AppInteractionContextProvider>
		</LoginContextProviders>
	);
}
export default App;
