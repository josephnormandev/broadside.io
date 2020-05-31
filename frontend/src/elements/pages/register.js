import React from 'react';
import { withRouter } from 'react-router-dom';

import GenericForm from '../../forms/generic-form';

import checkMe from '../../workers/check-me';
import post from '../../workers/post';

class RegisterPage extends React.Component
{
	constructor(props)
	{
		super(props);

		this.fields = [{
			type: 'text-field',
			id: 'email',
			label: 'Email',
			required: false,
			placeholder: 'example@email.com',
		}, {
			type: 'password-field',
			id: 'password',
			label: 'Password',
			required: false,
			placeholder: 'Your password here',
		}, {
			type: 'text-field',
			id: 'username',
			label: 'Username',
			required: false,
			placeholder: 'n00bmaster69',
		}];

		this.state = {
			authorized: false,
		};
	}

	async componentDidMount()
	{
		const { logged_in, in_game } = await checkMe();

		if(logged_in && !in_game)
		{
			return this.props.history.push('/lobby');
		}
		else if(logged_in && in_game)
		{
			return this.props.history.push('/game');
		}

		this.setState({
			authorized: true,
		});
	}

	async handleSuccess(status, response)
	{
		if(status === 201)
		{
			// successful register
			this.props.history.push('/login');
		}
		else if(status === 401)
		{
			// shouldn't be trying to register bc already logged in
			this.props.history.push('/');
		}
		return false;
	}

	render()
	{
		return (
			<div>
				<h1>
					Register Page
				</h1>
				<GenericForm
					url="/players"
					method={ post }
					fields={ this.fields }
					values={{ }}
					onSuccess={ this.handleSuccess.bind(this) }
				/>
			</div>
		);
	}
}

export default withRouter(RegisterPage);
