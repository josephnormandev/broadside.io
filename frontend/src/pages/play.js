import React from 'react';
import { Button, Badge } from 'react-bootstrap';
import { Simulation } from 'game';

import GenericClient from '../workers/client.js';
import tokenMessage from '../workers/game/messages/token.js';
import setPositionMessage from '../workers/game/messages/set-position.js';
import * as ConnectedReceiver from '../workers/game/receivers/connected.js';
import * as TeamAssignmentReceiver from '../workers/game/receivers/team-assignment.js';
import * as BundledReceiver from '../workers/game/receivers/bundled.js';
import * as AddObjectReceiver from '../workers/game/receivers/add-object.js';
import * as UpdateObjectReceiver from '../workers/game/receivers/update-object.js';

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
        this.receivers.set(TeamAssignmentReceiver.receiver, TeamAssignmentReceiver);
        this.receivers.set(BundledReceiver.receiver, BundledReceiver);
        this.receivers.set(AddObjectReceiver.receiver, AddObjectReceiver);
        this.receivers.set(UpdateObjectReceiver.receiver, UpdateObjectReceiver);
        console.log(this.receivers);

        this.team_num = null;
        this.simulation = new Simulation();
        this.simulation_mount = null;
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
        this.simulation.createRender(this.simulation_mount);
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
                        width: '100vw',
                        height: 'calc(100vh - 50px)',
                    }} onClick={
                        this.handleClick.bind(this)
                    } ref={
                        ref => ( this.simulation_mount = ref)
                    } />
                } </>
                <Badge variant={ variant }>Connection</Badge>
            </div>
        );
    }

    handleClick(e)
    {
        for(var [s_id, object] of this.simulation.objects)
        {
            if(object.team_num == this.team_num)
            {
                this.client.sendMessage(setPositionMessage(s_id, e.pageX, e.pageY));
            }
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
