import React from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import LoginPage from './elements/pages/login';
import RegisterPage from './elements/pages/register';
import LogoutPage from './elements/pages/logout';
import LobbyPage from './elements/pages/lobby';
import PlayPage from './elements/pages/play';

export default class Pages extends React.Component
{
    async componentDidMount()
    {

    }

    render()
    {
        return (
            <div>
                <Router>
                    <Switch>
                        <Route exact path="/login" component={ LoginPage } />
                        <Route exact path="/logout" component={ LogoutPage } />
                        <Route exact path="/register" component={ RegisterPage } />
                        <Route exact path="/lobby" component={ LobbyPage } />
                        <Route exact path="/logout" component={ PlayPage } />
                    </Switch>
                </Router>
            </div>
        );
    }
}
