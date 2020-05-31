import React from 'react';
import { withRouter } from 'react-router-dom';

import get from '../../workers/get';
import Client from '../../workers/client';

class LogoutPage extends React.Component
{
	async componentDidMount()
	{
		await Client.close();
		
		const response = await get('/players/logout');

		if(response.status === 200)
		{
			this.props.history.push('/login');
		}
	}

	render()
	{
		return (
			<div />
		);
	}
}

export default withRouter(LogoutPage);
