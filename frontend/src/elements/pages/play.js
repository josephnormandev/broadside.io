import React from 'react';
import { withRouter } from 'react-router-dom';

import checkMe from '../../workers/check-me';
import Client from '../../workers/client';

class PlayPage extends React.Component
{
	constructor(props)
	{
		super(props);

		this.state = {
			authorized: false,
		};
	}

	async componentDidMount()
	{
		const { logged_in, in_game } = await checkMe();

		if(!logged_in)
		{
			return this.props.history.push('/login');
		}
		else if(!in_game)
		{
			return this.props.history.push('/lobby');
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

	}

	handleClose()
	{
		console.log('Websocket closed...');
	}

	render()
	{
		return (
			<div>
				Play the Game here!
			</div>
		);
	}
}

export default withRouter(PlayPage);
