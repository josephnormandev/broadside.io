import React from 'react';
import { withRouter } from 'react-router-dom';

import get from '../../workers/get';

class LogoutPage extends React.Component
{
	async componentDidMount()
	{
		const response = await get('players/logout');

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
