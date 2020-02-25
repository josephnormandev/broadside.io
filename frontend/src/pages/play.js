import React from 'react';
import { Button } from 'react-bootstrap';

import GenericClient from '../workers/client.js';
import tokenMessage from '../workers/game/messages/token.js';

import PasswordField from '../forms/fields/password';

export default class PlayPage extends React.Component
{
    constructor(props)
    {
        super(props);

        this.client = new GenericClient(
            'localhost',
            8081,
            this.handleMessage.bind(this),
            this.handleClose.bind(this)
        );

        this.password = null;

        this.state = {
            opened: false,
            open_fail: false,
            closed: false,
            submitted: false,
        };
    }

    async componentDidMount()
    {
        if(await this.client.open())
        {
            this.setState({
                opened: true,
            });
        }
        else
        {
            this.setState({
                open_fail: true,
            });
        }
    }

    handleMessage(receiver, data)
    {
        console.log(receiver, data);
    }

    handleClose()
    {
        this.setState({
            opened: false,
            closed: true,
        });
    }

    render()
    {
        return (
            <div>
                <> { !this.state.submitted &&
                    <div>
                        <PasswordField
                            key={ 'password' }
                            field={{
                                type: 'password-field',
                                id: 'password',
                                label: 'Password',
                                required: false,
                                placeholder: 'Your Password Here',
                            }}
                            value={ null }
                            error={ null }
                            onChange={ this.handlePasswordChange.bind(this) }
                        />
                        <Button variant="primary" onClick={ this.handleSubmit.bind(this) }>
                            Submit
                        </Button>
                    </div>
                } </>
                <h3>Opened: { this.state.opened ? 'true' : 'false' }</h3>
                <h3>Open Failed: { this.state.open_fail ? 'true' : 'false' }</h3>
                <h3>Closed: { this.state.closed ? 'true' : 'false' }</h3>
            </div>
        );
    }

    handleSubmit(e)
    {
        e.preventDefault();


        if(this.password != null)
        {
            this.client.sendMessage(tokenMessage(this.password));

            this.setState({
                submitted: true,
            });
        }
    }

    handlePasswordChange(data)
    {
        console.log(data.value);
        this.password = data.value;
    }
}
