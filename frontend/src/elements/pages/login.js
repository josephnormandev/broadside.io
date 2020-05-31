import React from 'react';
import { withRouter } from 'react-router-dom';

import GenericForm from '../../forms/generic-form';

import checkMe from '../../workers/check-me';
import post from '../../workers/post';
import Client from '../../workers/client';

class LoginPage extends React.Component
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

		await Client.close();

		this.setState({
			authorized: true,
		});
	}

	async handleSuccess(status, response)
	{
		if(status === 200)
		{
			// successful login
			this.props.history.push('/lobby');
		}
		else if(status === 401)
		{
			// shouldn't be trying to login (already logged in)
			this.props.history.push('/lobby');
		}
		return false;
	}

	async handleForbidden()
	{
		return 'Email or Password Incorrect';
	}

	render()
	{
		return (
			<div>
				<> { this.state.authorized &&
					<div>
						<h1>
							Login Page
						</h1>
						<GenericForm
							url="/players/login"
							method={ post }
							fields={ this.fields }
							values={{ }}
							onSuccess={ this.handleSuccess.bind(this) }
							onForbidden={ this.handleForbidden.bind(this) }
						/>
					</div>
				} { !this.state.authorized &&
					<h2>Authorizing...</h2>
				} </>
			</div>
		);
	}
}

export default withRouter(LoginPage);
