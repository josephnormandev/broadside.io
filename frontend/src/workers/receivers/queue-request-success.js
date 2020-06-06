export function receive(page, data)
{
	page.setState({
		pending: false,
	});

	return page.props.history.push('/play');
}

export const receiver = 'queue-request-success';
