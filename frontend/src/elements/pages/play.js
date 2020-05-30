import React from 'react';
import { withRouter } from 'react-router-dom';

class PlayPage extends React.Component
{
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
