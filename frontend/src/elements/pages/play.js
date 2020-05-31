import React from 'react';
import { withRouter } from 'react-router-dom';

import checkMe from '../../workers/check-me';

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

		this.setState({
			authorized: true,
		});
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
