import React from 'react';
import { Button, Badge } from 'react-bootstrap';

import GenericClient from '../workers/client.js';
import tokenMessage from '../workers/game/messages/token.js';
import setPositionMessage from '../workers/game/messages/set-position.js';
import * as ConnectedReceiver from '../workers/game/receivers/connected.js';
import * as PositionChangeReceiver from '../workers/game/receivers/position-change.js';

import PasswordField from '../forms/fields/password';

export default class PlayPage extends React.Component
{
    constructor(props)
    {
        super(props);

        this.client = new GenericClient(
            window.location.hostname,
            8081,
            this.handleMessage.bind(this),
            this.handleClose.bind(this)
        );

        this.password = null;

        this.state = {
            opened: false,
            connected: false,
            closed: false,
            submitted: false,
            pos_self: {
                x: 0,
                y: 0,
            },
            pos_enemy: {
                x: 0,
                y: 0,
            },
        };

        this.receivers = new Map();
        this.receivers.set(ConnectedReceiver.receiver, ConnectedReceiver);
        this.receivers.set(PositionChangeReceiver.receiver, PositionChangeReceiver);
    }

    async componentDidMount()
    {
        if(await this.client.open())
        {
            this.setState({
                opened: true,
                connected: false,
                closed: false,
            });
        }
        else
        {
            this.setState({
                opened: false,
                connected: false,
                closed: true,
            });
        }
    }

    handleMessage(receiver, data)
    {
        if(this.receivers.has(receiver))
        {
            this.receivers.get(receiver).receive(this, data);
        }
    }

    handleConnected()
    {
        this.setState({
            opened: false,
            connected: true,
            closed: false,
        });
    }

    handleClose()
    {
        this.setState({
            opened: false,
            connected: false,
            closed: true,
        });
    }

    render()
    {
        var variant = this.state.opened ? 'warning' :
                            this.state.connected ? 'success' :
                                this.state.closed ? 'danger' : 'secondary';
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
                } { this.state.submitted &&
                    <div style={{
                        margin: '0px',
                        width: '500px',
                        height: '500px',
                        backgroundColor: 'black',
                    }} onClick={ this.handleClick.bind(this) }>
                        <div style={{
                            borderRadius: '50%',
                            width: '25px',
                            height: '25px',
                            backgroundColor: 'blue',
                            position: 'absolute',
                            left: this.state.pos_self.x,
                            top: this.state.pos_self.y,
                        }} />
                        <div style={{
                            borderRadius: '50%',
                            width: '25px',
                            height: '25px',
                            backgroundColor: 'red',
                            position: 'absolute',
                            left: this.state.pos_enemy.x,
                            top: this.state.pos_enemy.y,
                        }} />
                    </div>
                } </>
                <Badge variant={ variant }>Connection</Badge>
            </div>
        );
    }

    handleClick(e)
    {
        this.client.sendMessage(setPositionMessage(e.pageX, e.pageY));
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
