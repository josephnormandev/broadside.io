import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import { Renderer } from 'game';

import GenericClient from '../workers/client.js';
import tokenMessage from '../workers/game/messages/token.js';
import * as ConnectedReceiver from '../workers/game/receivers/connected.js';
import * as BundledReceiver from '../workers/game/receivers/bundled.js';

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
        };

        this.receivers = new Map();
        this.receivers.set(ConnectedReceiver.receiver, ConnectedReceiver);
        this.receivers.set(BundledReceiver.receiver, BundledReceiver);

        this.renderer = null;
        this.renderer_mount = null;
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
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentWillUnmount()
    {
        window.removeEventListener('resize', this.handleResize.bind(this));

        if(this.state.connected)
            this.renderer.unmount();
    }

    handleMessage(receiver, data)
    {
        if(this.receivers.has(receiver))
        {
            this.receivers.get(receiver).receive(this, data);
        }
        else if(this.renderer != null)
        {
            this.renderer.handleMessage(receiver, data);
        }
    }

    handleConnected()
    {
        this.setState({
            opened: false,
            connected: true,
            closed: false,
        });
        this.renderer = new Renderer(this);
        this.renderer.mount(this.renderer_mount);
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
                        <h6>Player 1's Password: <i>1234</i></h6>
                        <h6>Player 2's Password: <i>abcd</i></h6>
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
                        width: '100vw',
                        height: 'calc(100vh - 100px)',
                    }} ref={
                        ref => (this.renderer_mount = ref)
                    } />
                } </>
                <Badge variant={ variant }>Connection</Badge><br />
                <small><b>Green:</b> Connected and logged in, play the game!</small><br />
                <small><b>Yellow:</b> Connected, need to sign in</small><br />
                <small><b>Red:</b> Disconnected, try refreshing</small><br />
            </div>
        );
    }

    handleResize()
    {
        if(this.state.connected)
        {
            this.renderer.unmount(this.renderer_mount);
            this.renderer.mount(this.renderer_mount);
        }
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
        this.password = data.value;
    }
}
