export default function bundled(messages)
{
	return {
		receiver: 'bundled',
		data: {
			messages: messages,
		},
	};
}
