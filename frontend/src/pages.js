import React from 'react';
import Helmet from 'react-helmet';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PlayPage from './pages/play';

export default class Pages extends React.Component
{
    async componentDidMount()
    {

    }

    render()
    {
        return (
            <div>
                <Helmet />
                <Router>
                    <Switch>
                        <Route exact path="/games/play" component={ PlayPage } />
                    </Switch>
                </Router>
            </div>
        );
    }
}
