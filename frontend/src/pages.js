import React from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';

import LoginPage from './elements/pages/login';
import RegisterPage from './elements/pages/register';
import LogoutPage from './elements/pages/logout';
import LobbyPage from './elements/pages/lobby';
import PlayPage from './elements/pages/play';

import Client from './workers/client.js';

export default class Pages extends React.Component
{
    async componentDidMount()
    {
		Client.initialize();
    }

    render()
    {
        return (
            <div>
                <Router>
                    <Switch>
						<Route exact path="/">
							<Redirect to="/login"/>
						</Route>
                        <Route exact path="/login">
							<LoginPage />
						</Route>
                        <Route exact path="/logout">
							<LogoutPage />
						</Route>
                        <Route exact path="/register">
							<RegisterPage />
						</Route>
                        <Route exact path="/lobby">
							<LobbyPage />
						</Route>
                        <Route exact path="/play">
							<PlayPage />
						</Route>
                    </Switch>
                </Router>
            </div>
        );
    }
}
