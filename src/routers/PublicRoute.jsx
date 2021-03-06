import React from 'react';

import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const PublickRoute = ({ component: Component, ...restProps }) => {
	const isAuthenticated = useSelector((state) => state.logger.isAuthorized);

	return (
		<Route
			{...restProps}
			render={(props) =>
				//if user is logger we redirect on home (overview), if not jsut show that Public route which we give from outside
				isAuthenticated ? <Redirect to="/overview" /> : <Component {...props} />
			}
		/>
	);
};

export default PublickRoute;
