export function receive(page, data)
{
	page.setState({
		pending: true,
	});
}

export const receiver = 'queue-request-pending';
