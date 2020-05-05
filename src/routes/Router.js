import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom';

import routes from './routeConfig'

const Router = () => {
	return (
		<Switch>
			{routes.map((route) => {
				return route.component ? (
					<Route
						key={route.id}
						path={route.path}
						exact={route.exact}
						name={route.name}
						render={props => (
							<route.component key={route.id} {...props} />
						)} />
				) : (null);
			})}
			<Redirect to="/login" />
		</Switch>
	)
}

export default Router
