import React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import checkMe from '../../workers/check-me';
import Client from '../../workers/client';

import queueRequestMessage from '../../workers/messages/queue-request';

import * as QueueRequestPendingReceiver from '../../workers/receivers/queue-request-pending';
import * as QueueRequestSuccessReceiver from '../../workers/receivers/queue-request-success';
import * as QueueRequestFailReceiver from '../../workers/receivers/queue-request-fail';

class LobbyPage extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			authorized: false,
			pending: false,
		};

		this.receivers = new Map();
		this.receivers.set(
			QueueRequestPendingReceiver.receiver,
			QueueRequestPendingReceiver.receive
		);
		this.receivers.set(
			QueueRequestSuccessReceiver.receiver,
			QueueRequestSuccessReceiver.receive
		);
		this.receivers.set(
			QueueRequestFailReceiver.receiver,
			QueueRequestFailReceiver.receive
		);
	}

	async componentDidMount()
	{
		const { logged_in, in_game } = await checkMe();

		if(!logged_in)
		{
			return this.props.history.push('/login');
		}
		else if(in_game)
		{
			return this.props.history.push('/play');
		}

		if(await Client.open(this.handleMessage.bind(this), this.handleClose.bind(this)))
		{
			this.setState({
				authorized: true,
			});
			console.log('Websocket opened...');
		}
		else
		{
			console.log('Websocket failed to open');
		}
	}

	handleMessage(receiver, data)
	{
		if(this.receivers.has(receiver))
		{
			this.receivers.get(receiver)(this, data);
		}
	}

	handleClose()
	{
		console.log('Websocket closed...');
	}

	queueRequest()
	{
		Client.sendMessage(queueRequestMessage());
	}

	render()
	{
		return (
			<div>
				<> { this.state.authorized &&
					<div>
						<h1>Lobby</h1>
						<Button variant="primary" onClick={ this.queueRequest.bind(this) }>
							<> { this.state.pending &&
								<> Queueing <Spinner animation="border" size="sm" variant="light" /> </>
							} { !this.state.pending &&
								<> Queue </>
							} </>
						</Button>
						<p> You have to be an admin in order to queue for games. </p>
					</div>
				} { !this.state.authorized &&
					<h2> Authorizing... </h2>
				} </>
			</div>
		);
	}
}

export default withRouter(LobbyPage);
