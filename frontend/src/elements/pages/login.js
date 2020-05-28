import React from 'react';
import { withRouter } from 'react-router-dom';

import GenericForm from '../../forms/generic-form';

import post from '../../workers/post';

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
	}

	async handleSuccess(status, response)
	{
		if(status === 200)
		{
			// successful login
			this.props.history.push('/');
		}
		else if(status === 401)
		{
			// shouldn't be trying to login (already logged in)
			this.props.history.push('/');
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
		);
	}
}

export default withRouter(LoginPage);
