export function receive(page, data)
{
	page.setState({
		pending: false,
	});
}

export const receiver = 'queue-request-fail';
